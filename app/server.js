var bodyParser = require('body-parser');
var express = require("express");
var favicon = require("serve-favicon");
var fs = require("fs");
var morgan = require("morgan");
var path = require("path");
var request = require("request");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("combined", {
    skip: function(req, res) {
        return res.statuscode < 400;
    }
}));

app.use(express.static(path.join(__dirname, "/.")));
//app.use(favicon(__dirname + "/app/assets/imgs/favicon.ico"));

app.use(function(req, res, next) {
    console.log("/" + req.method);
    next();
});

app.get("/random", function(req, res) {
    res.redirect("https://en.wikipedia.org/wiki/Special:Random");
});

app.get("/search", function(req, res) {
    var query = req.query.searchQuery;

    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + query + "&format=json";
    request.get({ url: url, json: true, headers: { "User-Agent": "request" } }, function(err, data) {
        if (err) {
            return err; }
        if (!err) {
            res.setHeader("Content-Type", "application/json");
            res.send(data);
        }
    });
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("*", function(req, res) {
    res.status(404).send("No such page");
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Listening on port 3000");
});