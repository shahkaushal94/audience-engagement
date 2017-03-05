function getImage(req, res){

<<<<<<< HEAD
=======
var spawn = require('child_process').spawn,
    py    = spawn('python', ['emotions.py']),
    data = [1,2,3,4,5,6,7,8,9],
    dataString = '';
    score = null;
>>>>>>> 94976735c28b5f733baac18dbefe35a263a5a942


return py.stdout;
}

module.exports = getImage;

setInterval(getImage, 5000)