const routes = require('express-promise-router')();

const purchasingController = require('../app/controllers/purchasing');
const purchasingValidation = require('../app/validations/purchasing')

routes.post(
    '/api/v1/purchase', 
    purchasingValidation.purchaseItem,
    purchasingController.purchasing
)

module.exports = routes
