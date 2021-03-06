var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req,res){

	var msg = '',num = req.query.validat_num;

	if(req.session.validat_num && num !== req.session.validat_num){
		msg = "validate number is error!"		
	}

	res.render("index",{msg:msg})

});


// require png-word.
var pw = require("png-word")();
var r = require("random-word")("0123456789");

// refresh png number.
app.get('/refresh',function(req,res){

 var numtxt = req.session.validat_num = r.random(4);

 pw.createPNG(numtxt,function(pngnum){
  res.send(pngnum);	
 })
  
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
