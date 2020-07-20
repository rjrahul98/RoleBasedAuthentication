const express = require('express')
const bodyParser = require('body-parser')
import { Database } from './db'
import { configRoutes } from './routes'
const passport = require('passport')

export const app = express();
const dbClient = new Database();
dbClient.connectMongooseServer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

require('./helper/passport')(passport);

configRoutes(app);

let port = 3000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})