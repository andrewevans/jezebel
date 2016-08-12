import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend({
  min_duration: 0.05,
  max_duration: 0.2,
  sorted_characters: Ember.computed.sort('characters', 'sort_definition'),
  sort_definition: ['weight_ranked:desc'],
  is_playing: false,
  player: null,
  is_inverse: false,
  current_character: null,

  //@TODO: Hack to make CSS animation restart due to the span being reapplied
  current_character_name: Ember.computed('current_character', function() {
    var current_character = this.get('current_character');

    if (current_character !== null) {
      return Ember.String.htmlSafe('<span style="animation-duration: ' + this.get('min_duration') + 's">' + current_character.get('title') + '</span>');
    } else {
      return Ember.String.htmlSafe('<span style="animation-duration: ' + this.get('min_duration') + 's"></span>');
    }
  }),
  didInsertElement() {
    this._super(...arguments);

    this.set('player', this.$('audio')[0]);
  },
  cycleNames: task(function * () {
    var characters = this.shuffle(this.get('characters')),
      character_length = characters.get('length'),
      count = 0,
      player = this.get('player');

    this.set('is_playing', true); // Flag that the cycle is currently playing

    player.currentTime = 16;

    while (count !== character_length) {
      player.play();
      let character = characters.objectAt(count),
      character_duration = this.normalizeDuration(character);

      this.animationFlare(character, count);

      this.set('current_character', character);

      count++;

      if (count === character_length) {
        count = 0;
        characters = this.shuffle(this.get('characters')); // Get a freshly shuffled list of characters
      }

      yield timeout(character_duration);
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
  normalizeDuration(character) {

    // Max weight of all characters
    var max_weight_ranked = parseInt(this.get('sorted_characters').objectAt(0).get('weight_ranked')),
      min_duration = this.get('min_duration'),
      max_duration = this.get('max_duration'),

    // Character's weight expressed as a percentage of max weight
      character_weight_percentile = parseInt(character.get('weight_ranked')) / max_weight_ranked,

    // Character's normalized duration expressed in seconds off of min duration
      character_duration = ((character_weight_percentile * (max_duration - min_duration)) + min_duration) * 1000;

    return character_duration;
  },

  // Copied/pasted implementation of the Fisher–Yates shuffle
  shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  },
  actions: {
    cancelAll() {
      this.get('player').pause();

      this.get('cycleNames').cancelAll();
    },
  },
});
