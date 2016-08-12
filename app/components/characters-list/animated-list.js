import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend({
  is_playing: false,
  player: null,
  is_inverse: false,
  current_character_title: null,
  sorted_characters: Ember.computed.sort('characters', 'sort_definition'),
  sort_definition: ['weight_ranked:desc'],
  didInsertElement() {
    this._super(...arguments);

    this.set('player', this.$('audio')[0]);
  },
  cycleNames: task(function * () {
    var characters = this.get('sorted_characters'),
      character_length = characters.get('length'),
      count = 0,
      player = this.get('player');

    this.set('is_playing', true); // Flag that the cycle is currently playing

    player.currentTime = 16;
    player.play();

    while (true) {
      let character = characters.objectAt(count);

      this.animationFlare(character, count);

      this.set('current_character', character);

      count++;

      if (count === characters.get('length')) {
        count = 0;
      }

      yield timeout((character.get('weight_ranked') * 1.1) + 10);
    }
  }).restartable(),
  animationFlare(character, count) {

    // Make an odd numbered index use an inverted style
    if (count % 2 === 0) {
      this.set('is_inverse', true);
    } else {
      this.set('is_inverse', false);
    }
  },
  actions: {
    cancelAll() {
      this.get('player').pause();

      this.get('cycleNames').cancelAll();
    },
  },
});
