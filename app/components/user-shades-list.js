import Ember from 'ember';

export default Ember.Component.extend({
  sortedShades: Ember.computed.sort('color.shades', 'sortDefinition'),
  sortDefinition: ['weight'],
});
