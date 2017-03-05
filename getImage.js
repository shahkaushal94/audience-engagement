function getImages(){

var spawn = require('child_process').spawn,
    py    = spawn('python', ['emotions.py']),
    data = [1,2,3,4,5,6,7,8,9],
    dataString = '';
    score = null;

py.stdout.on('data', function(data){
  //dataString += data.toString();
  console.log(data.toString());
  score = data.toString();
  //return score;
});
py.stdout.on('end', function(){
 //console.log('Sum of numbers=',dataString);
});

py.stdin.write(JSON.stringify(data));
py.stdin.end();

return score;
}

module.exports = getImages;

setInterval(getImages, 5000)