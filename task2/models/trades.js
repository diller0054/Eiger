const mongoose = require('mongoose');
const mongooseSeq = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const TradeSchema = new Schema({
    id: {
        type: Number,
        unique: true,
        index: true
    },
    type: {
        type: String,
        required: true,
        enum: ['buy', 'sell']
    },
    user_id: {
        type: Number,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    shares: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    price: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    }
});

TradeSchema.plugin(mongooseSeq, { inc_field: 'id' });

const Trade = mongoose.model('Trade', TradeSchema);

module.exports = Trade;