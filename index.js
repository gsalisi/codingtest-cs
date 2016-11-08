const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/app'));

app.get('/', function (req, res) {
  res.sendfile('index.html', {root: './app'});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
