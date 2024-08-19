const {Model} = require('objection');
const knex = require('./knex');

Model.knex(knex);


class Currencies extends Model {

  static get tableName() {
    return 'currencies';
  }

}

module.exports = Currencies;
