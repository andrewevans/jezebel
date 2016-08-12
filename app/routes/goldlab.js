import Ember from 'ember';

export default Ember.Route.extend({
  model() {

    return Ember.RSVP.hash({
      user: this.store.findRecord('user', 4, { include: 'palettes, shades' }),
      colors: this.store.findAll('color'),
      characters: this.store.findAll('character'),
    });
  },
  actions: {
    addShade(palette, color, shade_value) {
      var shade = this.store.createRecord('shade', {
        value: shade_value,
        color: color,
        palette: palette,
      });

      //@TODO: Save shade here.

      palette.save();
    },
    updateShadeWeights(shade, weight) {

      shade.set('weight', weight);
      shade.save();
    },

    // Cycle through all of the characters and add weights according to rules from all of the shades
    updateCharacterWeightRanks(characters, palette) {
      var shades = palette.get('shades');

      characters.forEach((character) => {

        character.set('weight_ranked', 0); // Zero out ranked weight, to be freshly calculated here

        shades.forEach((shade) => {

          let isQualified = false;

          switch(shade.get('color').get('title')) {

            case 'gender':
              if (parseInt(shade.get('value')) === parseInt(character.get('gender'))) {
                isQualified = true; // Found a match, so give the character the points
              }
              break;

            case 'startsWith':
              let startsWith_value = shade.get('value').toLowerCase();
              let character_title = character.get('title').toLowerCase();

              if (character_title.indexOf(startsWith_value) === 0) {
                isQualified = true; // Found a match, so give the character the points
              }
              break;

            default:
              Ember.Logger.warn('The color "' + shade.get('color').get('title') + '" does not have any rules.');
              break;
          }

          if (isQualified) {
            character.set('weight_ranked', (parseInt(character.get('weight_ranked')) + parseInt(shade.get('weight'))));
          }
        });
      });
    },
  },
});
