const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
import { Database } from './db'
import { configRoutes } from './routes'
require('dotenv').config()

export const app = express();
const dbClient = new Database();
dbClient.connectMongooseServer();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());

require('./helper/passport')(passport);

configRoutes(app);

let port = process.env.APP_PORT;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})