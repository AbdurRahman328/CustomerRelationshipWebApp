var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
const router = require('./Routes/customerRoutes');
var app = express();

const dburl = "mongodb://localhost:27017/CustomersManagerRelation";
mongoose.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true});
const connection = mongoose.connection;
connection.once("open",function(){
    console.log("DB connected");
});

app.listen(8080);
app.use(cors());
app.use(bodyparser.json());
app.use(router);