const {Model} = require('objection');
const knex = require('./knex');

Model.knex(knex);


class Items extends Model {

  static get tableName() {
    return 'items';
  }

}

module.exports = Items;
