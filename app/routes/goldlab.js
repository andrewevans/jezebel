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
    updateCharacterWeightRanks(user) {
      var characters = this.store.peekAll('character'),
        shades = user.get('palette').get('getShades');

      characters.forEach(function(character) {
        character.set('weight_ranked', 0); // Zero out ranked weight, to be freshly calculated here

        shades.forEach(function(shade) {

          switch(shade.get('color').get('title')) {

            case 'gender':
              if (shade.get('value') === character.get('gender')) {
                // Found a match, so give the character the points
                character.set('weight_ranked', (character.get('weight_ranked') + shade.get('weight_ranked')));
              }
              break;

            case 'startsWith':
              var startsWith_value = shade.get('value');
              var character_title = character.get('title').toLowerCase();
              if (character_title.indexOf(startsWith_value) === 0) {
                character.set('weight_ranked', (character.get('weight_ranked') + shade.get('weight_ranked')));
              }
              break;

            default:
              break;
          }
        });
      });
    },
  },
});
