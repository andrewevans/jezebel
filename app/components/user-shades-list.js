import Ember from 'ember';

export default Ember.Component.extend({
  didReceiveAttrs() {
    this.setWeightRanked();
  },
  sortedShades: Ember.computed.sort('shades', 'sortDefinition'),
  sortDefinition: ['weight'],
  //@TODO: This business logic should not reside inside a component, especially with setters
  setWeightRanked: function() {
    var user = this.get('user'),
      shades = user.get('palette').get('getShades'),
      multiplier = 10, //@TODO: Hardcoded constant
      shades_length = shades.get('length'),
      weight,
      weight_ranked;

    shades.forEach(function(shade) {
      weight = shade.get('weight');

      weight_ranked = (multiplier * (shades_length - weight));

      //@TODO: Move setting to somewhere like a route-action
      shade.set('weight_ranked', weight_ranked);
    });

    this.sendAction('updateCharacterWeightRanks');
  },
  actions: {
    reorderItems(itemModels) {
      // Reassign weights according to the order
      // of their new index
      itemModels.forEach(function (item, index) {
        //@TODO: Move setting to somewhere like a route-action
        item.set('weight', index);
      });

      this.setWeightRanked();
    },
  },
});
