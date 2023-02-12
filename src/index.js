const express = require('express');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const {authentication} = require('./middlewares/authMiddleware');
const config = require('./config');
const setupViewEnigne = require('./config/viewEngine');
const initDatabase = require('./config/dataBaseinit');


const app = express();
setupViewEnigne(app);

app.use(express.static('src/static'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(authentication);
app.use(routes);

initDatabase()
.then(() => app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}...`)))
.catch((err) => console.log(err.message));

