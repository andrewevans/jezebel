import Model from 'ember-data/model';
import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  title: attr(),
  description: attr(),
  weight_ranked: attr('number', { defaultValue: 0 }),
  gender: attr(),
  origin: attr(),
  theme: attr(),
  rarity: attr(),
  syllables: attr(),
});
