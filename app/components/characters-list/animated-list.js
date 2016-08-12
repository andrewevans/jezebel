import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend({
  is_playing: false,
  current_character_title: null,
  sorted_characters: Ember.computed.sort('characters', 'sort_definition'),
  sort_definition: ['weight_ranked:desc'],
  cycleNames: task(function * () {
    var characters = this.get('sorted_characters'),
      character_length = characters.get('length'),
      count = character_length - 1,
      player = this.$('audio')[0];

    this.set('is_playing', true); // Flag that the cycle is currently playing

    player.currentTime = 16;
    player.play();

    while (count > 0) {
      let character = characters.objectAt(count);

      this.set('current_character_title', character.get('title'));

      count--;

      if (count === 0) {
        count = character_length - 1;
      }

      yield timeout((character.get('weight_ranked') * 1.1) + 10);
    }
  }).restartable(),
});
