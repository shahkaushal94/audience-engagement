var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Audience Engagement Analyzer'
  });
});

router.get('/getImage', function(req, res, next){
	var spawn = require('child_process').spawn,
		  py    = spawn('python', ['emotions.py']),
		  data = [1,2,3,4,5,6,7,8,9],
		  dataString = '';

	py.stdout.on('data', function(data){
		//dataString += data.toString();
		console.log(data.toString());
		res.end(data.toString());
	});

	py.stdin.write(JSON.stringify(data));
	py.stdin.end();
})

module.exports = router;
