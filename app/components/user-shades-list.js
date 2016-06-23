import Ember from 'ember';

export default Ember.Component.extend({
  sortedShades: Ember.computed.sort('shades', 'sortDefinition'),
  sortDefinition: ['weight'],
  actions: {
    reorderItems(itemModels) {
      // Reassign weights according to the order
      // of their new index
      itemModels.forEach(function (item, index) {
        item.set('weight', index);
      });
    },
  },
});
