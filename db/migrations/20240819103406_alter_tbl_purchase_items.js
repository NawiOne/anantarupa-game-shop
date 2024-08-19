exports.up = async function (knex) {
    await knex.schema.alterTable('purchase_items', (table) => {
        table.renameColumn('currency_type_id', 'currency_type');
    })
};


exports.down = async function (knex) {
    await knex.schema.alterTable('items', (table) => {
        table.renameColumn('currency_type', 'currency_type_id');
    })
};
