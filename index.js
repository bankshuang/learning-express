var express = require('express');

var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next){
  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
  next();
});

app.get('/', function(req, res){
  // res.type('text/plain');
  // res.send('Learning Express');
  res.render('home');
});

var fortunes = [
  "Conquer your fears or they will conquer you.",
  "Rivers need springs.",
  "Do not fear what your don't know.",
  "You will have a pleasant surprise.",
  "Whenever possible, keep it simple."
];
app.get('/about', function(req, res){
  // res.type('text/plain');
  // res.send('About Learning Express');
  var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render('about', {
    fortune: randomFortune,
    pageTestScript: '/qa/tests-about.js'
  });
});

app.get('/tours/hood-river', function(req, res){
  res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function(req, res){
  console.log('visit request-group-rate');
  res.render('tours/request-group-rate');
});

app.use(function(req, res){
  // res.type('text/plain');
  res.status(404);
  // res.send('404 - Not Found');
  res.render('404');

});

app.use(function(err, req, res, next){
  console.error(err.stack);
  // res.type('test/plain');
  res.status(500);
  // res.send('500 - Server Error');
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://locahost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
