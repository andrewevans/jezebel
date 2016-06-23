import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    /*
    Static mock data
     */
    var gender = this.store.createRecord('color', {
      title: 'gender',
    });

    var startsWith = this.store.createRecord('color', {
      title: 'startsWith',
    });

    /*
    Dynamic Mock user data
     */
    var user = this.store.createRecord('user', {
      username: 'mama',
    });

    this.store.createRecord('palette', {
      title: 'my colorful palette',
      user: user,
    });

    var my_palette = user.get('palette');

    gender.get('shades').pushObject(
      this.store.createRecord('shade', {
        value: '3',
      })
    );

    gender.get('shades').pushObject(
      this.store.createRecord('shade', {
        value: '-5',
      })
    );

    startsWith.get('shades').pushObject(
      this.store.createRecord('shade', {
        value: 'a',
      })
    );

    startsWith.get('shades').pushObject(
      this.store.createRecord('shade', {
        value: 's',
      })
    );

    startsWith.get('shades').pushObject(
      this.store.createRecord('shade', {
        value: 'el',
      })
    );

    my_palette.get('colors').pushObject(gender);
    my_palette.get('colors').pushObject(startsWith);

    return Ember.RSVP.hash({
      user: user,
    });
  }
});
