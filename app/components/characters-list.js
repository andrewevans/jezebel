import Ember from 'ember';

export default Ember.Component.extend({
  characters: null,
  sorted_characters: Ember.computed.sort('characters', 'sort_definition'),
  sort_definition: ['weight_ranked:desc'],
});
