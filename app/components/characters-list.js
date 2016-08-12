import Ember from 'ember';

export default Ember.Component.extend({
  characters: null,
  sorted_characters: Ember.computed.sort('characters', 'sort_definition'),
  sort_definition: ['weight_ranked:desc'],
  didReceiveAttrs() {
    var characters = this.get('characters'),
      shades = this.get('palette').get('shades');

    characters.forEach((character) => {

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
});
