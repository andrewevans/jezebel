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

    this.store.createRecord('character', {
      title: 'Jezebel',
      gender: '5',
    });

    this.store.createRecord('character', {
      title: 'Andrew',
      gender: '-5',
    });

    this.store.createRecord('character', {
      title: 'Andrea',
      gender: '1',
    });

    this.store.createRecord('character', {
      title: 'Ana',
      gender: '2',
    });

    this.store.createRecord('character', {
      title: 'Brittany',
      gender: '1',
    });

    this.store.createRecord('character', {
      title: 'Ellis',
      gender: '0',
    });

    this.store.createRecord('character', {
      title: 'Sari',
      gender: '1',
    });

    this.store.createRecord('character', {
      title: 'Victoria',
      gender: '5',
    });

    this.store.createRecord('character', {
      title: 'Eli',
      gender: '-2',
    });

    this.store.createRecord('character', {
      title: 'Isa',
      gender: '1',
    });

    this.store.createRecord('character', {
      title: 'Sandra',
      gender: '3',
    });

    this.store.createRecord('character', {
      title: 'Denise',
      gender: '4',
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
        weight: '0',
      })
    );

    gender.get('shades').pushObject(
      this.store.createRecord('shade', {
        value: '-5',
        weight: '4',
      })
    );

    startsWith.get('shades').pushObject(
      this.store.createRecord('shade', {
        value: 'a',
        weight: '1',
      })
    );

    startsWith.get('shades').pushObject(
      this.store.createRecord('shade', {
        value: 'el',
        weight: '2',
      })
    );

    startsWith.get('shades').pushObject(
      this.store.createRecord('shade', {
        value: 's',
        weight: '3',
      })
    );

    my_palette.get('colors').pushObject(gender);
    my_palette.get('colors').pushObject(startsWith);

    return Ember.RSVP.hash({
      user: user,
      characters: this.store.peekAll('character'),
    });
  }
});
