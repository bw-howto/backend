const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
  update
};

function find() {
  return db("posts").select("id", "postName", "description");
}

function findBy(filter) {
  return db("posts").where(filter);
}

function add(post) {
  return db("posts")
    .insert(post, "id")
    .then(id => {
      findById(id);
    });
}



function findById(id) {
  return db("posts")
    .where({ id })
    .first();
}

function remove() {
    return db('posts')
    .where('id', id)
    .del();
}

function update(id, changes) {
    return db('posts')
      .where('id', id)
      .update(changes)
      .then(count => (count > 0 ? this.get(id) : null));
  }