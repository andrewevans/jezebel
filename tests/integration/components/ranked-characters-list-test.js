import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ranked-characters-list', 'Integration | Component | ranked characters list', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ranked-characters-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ranked-characters-list}}
      template block text
    {{/ranked-characters-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
