const mongoose = require('mongoose');
const ConnectionBase = require('./connection-base');
const Trades = require('../models/trades');
const {MongoMemoryServer} = require("mongodb-memory-server");

mongoose.Promise = Promise;

const connect = async (promise) => {

    const mongoServer = await MongoMemoryServer.create(),
        uri = mongoServer.getUri('trades')

    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    await mongoose.connect(uri, mongooseOpts);

    mongoose.connection.on('error', (e) => {
        promise = null;

        if (e.message.code === 'ETIMEDOUT') {
            console.log(e);
            mongoose.connect(uri, mongooseOpts);
        }

        console.log(e);
    });

    mongoose.connection.once('open', () => {
        promise = null;
        console.log(`MongoDB successfully connected to ${mongoUri}`);
    });

    return mongoose;
}

class MongooseConnection extends ConnectionBase {

    getConnection() {
        if (this.promise) {
            return this.promise;
        }

        this.promise = connect(this.promise)
            .then(connection => {
                this.connection = connection;
                return connection;
            });

        return this.promise
    }

    async clearDatabase() {
        return Trades.deleteMany();
    }

    async closeConnection() {
        return this.connection.connection.close();
    }
}

module.exports = MongooseConnection;
