const {Model} = require('objection');
const knex = require('./knex');

Model.knex(knex);


class UserData extends Model{

  static get tableName() {
    return 'user_data';
  }

}

module.exports = UserData;
