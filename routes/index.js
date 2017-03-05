var express = require('express');
var router = express.Router();
var getImages = require('../getImage.js');

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', {
    title: 'Audience Engagement Analyzer'
  });
});

router.get('/getImage', function(req, res){
	console.log(getImages());

	res.send({
		data: getImages()
	})
})


module.exports = router;
