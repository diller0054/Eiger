const Trade = require("../models/trades");

const createTrade = async (req, res) => {
    try {
        const { type, user_id, symbol, shares, price, timestamp } = req.body;

        if (shares < 1 || shares > 100 || !['buy', 'sell'].includes(type)) {
            return res.status(400).json({ error: 'Invalid trade data' });
        }

        const trade = new Trade({
            type,
            user_id,
            symbol,
            shares,
            price,
            timestamp
        });

        await trade.save();

        res.status(201).json({
            id: trade.id,
            type,
            user_id,
            symbol,
            shares,
            price,
            timestamp
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getTrades = async (req, res) => {
    try {
        const { type, user_id } = req.query;

        const query = {};

        if (type) query.type = type;
        if (user_id) query.user_id = user_id;

        const trades = await Trade.find(query).sort('id')

        res.status(200).json(trades.map(trade => ({
            id: trade.id,
            type: trade.type,
            user_id: trade.user_id,
            symbol: trade.symbol,
            shares: trade.shares,
            price: trade.price,
            timestamp: trade.timestamp
        })));
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getTradeById = async (req, res) => {
    try {
        const trade = await Trade.findOne({
            id: req.params.id
        });

        if (!trade) {
            return res.status(404).send('ID not found');
        }

        res.status(200).json({
            id: trade.id,
            type: trade.type,
            user_id: trade.user_id,
            symbol: trade.symbol,
            shares: trade.shares,
            price: trade.price,
            timestamp: trade.timestamp
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const methodNotAllowed = (req, res) => {
    res.status(405).json({ error: 'Method not allowed' });
};

module.exports = {
    createTrade,
    getTrades,
    getTradeById,
    methodNotAllowed
};