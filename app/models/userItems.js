const {Model} = require('objection');
const knex = require('./knex');

Model.knex(knex);


class UserItems extends Model {

  static get tableName() {
    return 'user_items';
  }

}

module.exports = UserItems;
