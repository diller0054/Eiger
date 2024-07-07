const express = require('express');
const { createTrade, getTrades, getTradeById, methodNotAllowed } = require('../controllers/trades');

const router = express.Router();

router.post('/', createTrade);
router.get('/', getTrades);
router.get('/:id', getTradeById);
router.delete('/:id', methodNotAllowed);
router.put('/:id', methodNotAllowed);
router.patch('/:id', methodNotAllowed);

module.exports = router;
