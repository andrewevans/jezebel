import Ember from 'ember';

export default Ember.Component.extend({
  color: null,
  shade_value: null,
  didInsertElement() {
    this._super(...arguments);

    var self = this;

    this.$(".dropdown-menu li a").click(function(){
      self.$(this).parents(".dropdown").find('a.dropdown-toggle').html(self.$(this).text() + ' <span class="caret"></span>');
      self.$(this).parents(".dropdown").find('a.dropdown-toggle').val(self.$(this).data('value'));
    });
  },
  click() {
  },
  actions: {
    selectColor(color) {
      this.set('color', color);
    },
    addShade() {
      this.sendAction('addShade', this.get('color'), this.get('shade_value'));
    },
  },
});
