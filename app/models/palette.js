import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import Ember from 'ember';

export default Model.extend({
  title: attr(),
  user: belongsTo(),
  shades: hasMany(),
  /*
   Returns a flattened list of shades.
   It is necessary to compare shades across colors.
   */
  getShades: Ember.computed('colors', function() {
    var colors = this.get('colors');
    var palette_shades = [];

    colors.forEach(function (color) {
      var shades = color.get('shades');

      // Flatten each set of a color's shades
      shades.forEach(function (shade) {
        // Add the shade to the palette's list of shades
        palette_shades.pushObject(shade);
      });
    });

    return palette_shades;
  }),
});
