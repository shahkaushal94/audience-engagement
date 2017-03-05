var express = require('express');
var router = express.Router();
//var getImage = require('../getImage.js');

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', {
    title: 'Audience Engagement Analyzer'
  });
});

router.get('/getImage', function(req, res, next){
	function getScore(){
		var spawn = require('child_process').spawn,
		  py    = spawn('python27', ['emotions.py']),
		  data = [1,2,3,4,5,6,7,8,9],
		  dataString = '';

		py.stdout.on('data', function(data){
			//dataString += data.toString();
			console.log(data.toString());
			res.end(data.toString());
		});

		py.stdin.write(JSON.stringify(data));
		py.stdin.end();
	}
	setInterval(getScore, 5000)
})


module.exports = router;
