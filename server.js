var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var nodemailer = require('nodemailer');
var exphbs = require('express-handlebars');
var fs = require('fs');

var CONFIG_EMAIL = 'addyour@email.com';
var CONFIG_PASS = 'Sup3r$ec8re852';

var smtpTransport = nodemailer.createTransport("SMTP",{
  service: "Gmail",
  auth: {
    user: CONFIG_EMAIL,
    pass: CONFIG_PASS
  }
});
var transport = nodemailer.createTransport();

app.use(function(req, res, next) {
	console.log(req.host);
	if(req.headers.host.match(/^www/) !== null ) {
		res.redirect('http://' + req.headers.host.replace(/^www\./, '') + req.url);
	} else {
		next();
	}
});

app.use(bodyParser.json()); // for processing post data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.static(__dirname + '/public'));

app.post('/lets-work-together', function(req, res) {
	console.log('submit feedback');
	var mailOptions = {
		to : 'gxc7243@gmail.com',
		subject : 'Let\'s Work Together',
		text : 'Name: '+req.body.name+'\nEmail: '+req.body.email+'\nMessage: '+req.body.message
	};
	console.log(mailOptions);
	smtpTransport.sendMail(mailOptions, function(error, response){
		if(error){
			console.log(error);
			res.end("error");
		}else{
			console.log("Message sent: " + response.message);
			res.end("sent");
		}
	});
});

app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.get('/', function (req, res) {

var imgArr = [];

fs.readdir('public/images/portfolio/thumbs/',function(err,files){
    if(err) throw err;
    files.forEach(function(file){
    	var ext = file.substr(file.lastIndexOf('.') + 1);
    	if(ext === 'jpg') {
    		var encodedName = encodeURIComponent(file);
        	console.log(encodedName);
        	imgArr.push(encodedName);
    	}

    });
 });

	var data = {
		layout: false,
		imgArr: imgArr
	};
	// encodeURIComponent(myUrl);
	res.render('index', data);
});

var server = app.listen(80, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});