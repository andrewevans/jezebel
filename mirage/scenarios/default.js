export default function(server) {

  server.loadFixtures();

  let user = server.schema.users.where({ username: 'mama' }).models[0],
    gender = server.schema.colors.where({ title: 'gender' }).models[0],
    startsWith = server.schema.colors.where({ title: 'startsWith' }).models[0];

  // Create the user's palette
  let palette = user.createPalette({
    title: 'The mama palette',
  });

  // Create some shades
  let very_female = palette.createShade({
    value: 5,
    color: gender,
  });

  let startsWith_a = palette.createShade({
    value: 'a',
    color: startsWith,
  });

  let startsWith_el = palette.createShade({
    value: 'el',
    color: startsWith,
  });

  // Add some shades to the user's palette
  palette.shades = [
    very_female,
    startsWith_a,
    startsWith_el,
  ];

  palette.save();

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  // server.createList('post', 10);
}
