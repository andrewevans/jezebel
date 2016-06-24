import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend({
  sortedCharacters: Ember.computed.sort('characters', 'sortDefinition'),
  sortDefinition: ['weight_ranked:desc'],

  count: 0,
  showInception: false,
  isInverse: false,
  isImportant: false,
  isMasculine: false,
  displayCharacterName: 'Begin inception.',
  totalWeightPoints: Ember.computed('', function() {
    return 500;
  }),

  myTask: task(function * () {
    this.set('count', 0);
    while (this.count < 5) {
      this.incrementProperty('count');
      yield timeout(300);
    }
    this.set('count', "DONE!");
  }).restartable(),

  cycleNames: task(function * () {
    this.set('showInception', true);
    var characters = this.get('sortedCharacters');
    var max = 75;
    var min = 1;

    var player = this.$('audio')[0];
    player.currentTime = 16;
    player.play();

    this.set('displayCharacterName', 0);
    while (this.count < characters.get('length')) {
      this.set('isSponsored', false);
      this.set('isMasculine', false);

      this.set('displayCharacterName', characters.objectAt(this.count).get('title'));

      if (parseInt(characters.objectAt(this.count).get('gender')) < 0) {
        this.set('isMasculine', true);
      }

      if (this.count % 2 === 0) {
        this.set('isInverse', true);
      } else {
        this.set('isInverse', false);
      }

      if (characters.objectAt(this.count).get('weight_ranked') > 40) {
        this.set('isImportant', true);
      } else {
        this.set('isImportant', false);
      }
      this.incrementProperty('count');

      if (this.get('count') === characters.get('length')) {
        this.set('count', 0);
      }

      if ((Math.floor(Math.random() * (max - min + 1)) + min) === 5) {
        this.set('isSponsored', true);
      }

      yield timeout((characters.objectAt(this.count).get('weight_ranked') * 1.1) + 10);
    }

    this.set('displayCharacterName', "DONE!");
  }).restartable(),
});
