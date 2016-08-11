import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  value: attr(),
  weight: attr('number', { defaultValue: 0 }),
  weight_ranked: attr(),
  color: belongsTo(), // uses color as if it was its prototype
  palette: belongsTo(),
});
