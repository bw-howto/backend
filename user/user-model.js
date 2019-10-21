const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove
};

function find() {
  return db("users").select("id", "username");
}

function findBy(filter) {
  return db("users").where(filter);
}

function add(user) {
  return db("users")
    .insert(user, "id")
    .then(id => {
      findById(id);
    });
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function remove() {

}
