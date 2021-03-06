import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  palette: belongsTo(),
  color: belongsTo(), // uses color as if it was its prototype
});
