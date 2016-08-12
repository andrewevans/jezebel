import Ember from 'ember';

export default Ember.Component.extend({
  sorted_characters: Ember.computed.sort('characters', 'sort_definition'),
  sort_definition: ['weight_ranked:desc'],

  // Filter out characters who have a weight of 0
  filtered_characters: Ember.computed.filter('characters', function(character) {
    if (character.get('weight_ranked') > 0) {
      return true;
    }
  }),
});
