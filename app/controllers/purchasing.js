const purchasingService = require('../services/purchasing');

async function purchasing(req, res) {
    const payload = req.body
    const data = await purchasingService.purchaseItem(payload);

    res.send({
        code: 200,
        message: 'Success',
        data: data
    })

}

module.exports = {
    purchasing
}