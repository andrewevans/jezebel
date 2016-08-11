import Ember from 'ember';

export default Ember.Component.extend({
  shades: null, // Unsorted shades, only used to seed Ember.computed.sort()
  didReceiveAttrs() {
    var palette = this.get('palette');

    this.set('shades', palette.get('shades'));

    this.setWeights();
  },
  sorted_shades: Ember.computed.sort('shades', 'sort_definition'), // Component methods only reference this, never the 'shades' property
  sort_definition: ['weight:desc'],

  //@TODO: This business logic should not reside inside a component, especially with setters
  /**
   * This only sets the weights for each shade from the order it is in. This value is then used as part of the overall
   * weight that is assigned to each character. But at this point, all this component does is assign weight according
   * to its sorted order.
   */
  setWeights: function(new_sorted_shades) {

    new_sorted_shades = new_sorted_shades || this.get('sorted_shades');

    var multiplier = 10, //@TODO: Don't hardcode multiplier
      num_shades = new_sorted_shades.get('length');

    // Assign new weights to shades according to their sort order
    new_sorted_shades.forEach((shade, i) => {
      let weight = multiplier * (num_shades - i);

      this.sendAction('updateShadeWeights', shade, weight);
    });
  },
  actions: {

    // This can be used by child components to recalculate weights after changes have happened
    updateWeights() {
      this.setWeights();
    },
    reorderItems(itemModels) {
      this.setWeights(itemModels);
    },
  },
});
