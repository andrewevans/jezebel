export default function(server) {

  server.loadFixtures();

  let users = server.schema.users.where({ username: 'mama' });
  let user = users.models[0];

  var palette = user.createPalette({
    title: 'The mama palette',
  });

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  // server.createList('post', 10);
}
