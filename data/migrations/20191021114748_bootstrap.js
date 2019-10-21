exports.up = function(knex) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments("id");

      tbl
        .string("username", 24)
        .notNullable()
        .unique();
      tbl.string("password").notNullable();
      tbl.string("accountType").notNullable();
    })
    .createTable("posts", tbl => {
      tbl.increments("id");
      tbl
        .string("postName", 24)
        .notNullable()
        .unique();
      tbl.string("description").notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
