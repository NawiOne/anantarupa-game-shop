const {Model} = require('objection');
const knex = require('./knex');

Model.knex(knex);


class PucrhaseItems extends Model {

  static get tableName() {
    return 'purchase_items';
  }

}

module.exports = PucrhaseItems;
