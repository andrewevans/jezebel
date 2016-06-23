import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  title: attr(),
  description: attr(),
  type: attr(),
  palettes: hasMany('palette'),
  shades: hasMany('shade'),
});