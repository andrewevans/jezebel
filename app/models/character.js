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
  popularity: attr('number', { defaultValue: 50 }), // Default value is neutral, 50 out of 100
  syllables: attr(),
});
