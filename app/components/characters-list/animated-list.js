import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend({
  is_playing: false,
  player: null,
  is_inverse: false,
  current_character: null,
  sort_definition: ['weight_ranked:desc'],
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
    player.play();

    while (count !== character_length) {
      let character = characters.objectAt(count);

      this.animationFlare(character, count);

      this.set('current_character', character);

      count++;

      if (count === character_length) {
        count = 0;
        characters = this.shuffle(this.get('characters')); // Get a freshly shuffled list of characters
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
