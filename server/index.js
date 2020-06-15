const express = require("express");
const mongoose  = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
    bodyParser.urlencoded({
      extended: false
    })
);
app.use(bodyParser.json());
app.use(cors());

app.use(function(req,res,next){
    console.log(req.body);
    next();
})

const db = require('./config/keys').mongoGotBattles

mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

const list = require('./routes/list')
app.use('/list', list)

const count = require('./routes/count')
app.use('/count', count)

const search = require('./routes/search')
app.use('/search', search)

const suggest = require('./routes/suggest')
app.use('/suggest', suggest)

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
