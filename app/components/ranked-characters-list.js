import Ember from 'ember';

export default Ember.Component.extend({
  sortedCharacters: Ember.computed.sort('characters', 'sortDefinition'),
  sortDefinition: ['weight_ranked:desc'],
});
