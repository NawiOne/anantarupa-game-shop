const itemModel = require('../models/Items');
const userCurrencyModel = require('../models/userCurrency');
const userItemsModel = require('../models/userItems');
const purchaseItemModel = require('../models/purchaseItems')

const DataNotFound = require('../exceptions/dataNotFound');
const InvalidData = require('../exceptions/invalidData');

async function purchaseItem({ userId, itemId, qty }) {
    const item = await getItemById(itemId)

    if (!item) throw new DataNotFound('Item not found');

    const totalPrice = item.price * qty;
    const userCurrency = await getUserCurrency(userId, item.currency_type)

    if (!userCurrency) {
        throw new InvalidData('User or currency is not available to buy the item')
    }

    await purcashingValidate({
        qty,
        userId,
        itemId,
        totalPrice,
        amount: userCurrency.amount,
        maxOwnedItem: item.max_owned_item
    })

    return await insertPurchaseAndUserItem({
        qty,
        userId,
        itemId,
        totalPrice,
        currencyType: item.currency_type,
        amount: userCurrency.amount
    })
}

async function insertPurchaseAndUserItem({
    userId,
    itemId,
    qty,
    totalPrice,
    currencyType,
    amount
}) {
    return await purchaseItemModel.transaction(async (trx) => {
        const userItem = await getUserItem(userId, itemId);
        const userItemId = userItem?.id
        const qtyToInsert = qty + (userItem?.current_user_item_qty || 0)

        const insertPurchaseItem = await purchaseItemModel.query(trx)
            .insertAndFetch({
                qty,
                user_id: userId,
                item_id: itemId,
                total_price: totalPrice,
                currency_type: currencyType,
            })

        await userCurrencyModel.query()
            .update({ amount: amount - totalPrice })
            .where({
                user_id: userId,
                currency_type: currencyType
            })

        await userItemsModel.query()
            .upsertGraph({
                id: userItemId,
                qty: qtyToInsert,
                user_id: userId,
                item_id: itemId,
            })

        return {
            purchase_item_id: insertPurchaseItem.id
        }
    })
}

async function purcashingValidate({
    userId,
    itemId,
    qty,
    amount,
    totalPrice,
    maxOwnedItem,
}) {
    const userItem = await getUserItem(userId, itemId)
    const currentUserItem = userItem?.current_user_item_qty ?? 0;

    validateMaxOwnedItem(qty, currentUserItem, maxOwnedItem);
    validateAmount(amount, totalPrice);
}

function validateAmount(amount, totalPrice) {
    if (amount < totalPrice) {
        throw new InvalidData('Not enough amount')
    }
}

function validateMaxOwnedItem(qty, currentUserItem, maxOwnedItem) {
    const totalUserItems = qty + currentUserItem;

    if (totalUserItems > maxOwnedItem) {
        throw new InvalidData('Cannot purchase more than the allowed quantity.')
    }
}

async function getItemById(itemId) {
    return await itemModel.query()
        .select(
            'item_id',
            'price',
            'currency_type',
            'max_owned_item'
        )
        .findOne({ item_id: itemId })
}

async function getUserItem(userId, itemId) {
    return await userItemsModel.query()
        .select(
            'id',
            'user_id',
            'item_id',
            'qty as current_user_item_qty'
        )
        .findOne({
            user_id: userId,
            item_id: itemId
        })
}

async function getUserCurrency(userId, currentType) {
    return await userCurrencyModel.query()
        .select(
            'user_id',
            'currency_type',
            'amount',
        )
        .findOne({
            user_id: userId,
            currency_type: currentType
        })
}



module.exports = {
    purchaseItem
}