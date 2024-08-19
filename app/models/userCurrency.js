const {Model} = require('objection');
const knex = require('./knex');

Model.knex(knex);


class UserCurrency extends Model {

  static get tableName() {
    return 'user_currency';
  }

}

module.exports = UserCurrency;
