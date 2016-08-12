import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('characters-list/animated-list', 'Integration | Component | characters list/animated list', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{characters-list/animated-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#characters-list/animated-list}}
      template block text
    {{/characters-list/animated-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
