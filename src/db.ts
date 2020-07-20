const mongoose = require('mongoose')
require('dotenv').config()

export class Database {
    private mongoUrl: string = `${process.env.MONGO_URL}`;

    public connectMongooseServer() {
        mongoose.connect(this.mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true })
            .then(() => {
                console.log('mongo server connected');
            })
            .catch((error: any) => {
                console.log(error);
                console.log('mongo server connection failed');
            });

    }
}