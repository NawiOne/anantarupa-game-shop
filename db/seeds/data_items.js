exports.seed = async function (knex) {
  const data = [
    { item_id: 1, price: 100, currency_type: 2, max_owned_item: 50 },
    { item_id: 2, price: 2, currency_type: 1, max_owned_item: 10 },
    { item_id: 3, price: null, currency_type: null, max_owned_item: null },
    { item_id: 4, price: 3000, currency_type: 3, max_owned_item: 3 }
  ]

  const requests = []

  for (const item of data) {
    const request = knex('items').where('item_id', item.item_id)
      .update({
        price: item.price,
        currency_type: item.currency_type,
        max_owned_item: item.max_owned_item
      })
    requests.push(request)
  }
  await Promise.all(requests)


};
