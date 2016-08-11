import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
    this._super(...arguments);

    Ember.$(".dropdown-menu li a").click(function(){
      Ember.$(this).parents(".dropdown").find('a.dropdown-toggle').html(Ember.$(this).text() + ' <span class="caret"></span>');
      Ember.$(this).parents(".dropdown").find('a.dropdown-toggle').val(Ember.$(this).data('value'));
    });
  },
  click() {
  },
});
