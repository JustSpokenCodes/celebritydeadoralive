exports.up = function(knex) {
  return knex.schema
    .createTable('users', users => {
      users.increments();

      users.string('username', 128).unique();
      users.string('password', 128).notNullable();
      users.string('email', 256).unique();
    })
    .createTable('celebs', celebs => {
      celebs.increments();
      celebs.string('celebs_name', 128);
      celebs
        .integer('celebs_age')
        .unsigned()
        .notNullable();
      celebs.integer('time_limit');
    });
};
//somthing
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users').dropTableIfExists('celebs');
};
