//start.js


function getImage(){

var spawn = require('child_process').spawn,
    py    = spawn('python', ['emotions.py']),
    data = [1,2,3,4,5,6,7,8,9],
    dataString = '';

py.stdout.on('data', function(data){
  //dataString += data.toString();
  console.log(data.toString() + "BOLO")
  console.log(data.toString() + "YOLO")
});
py.stdout.on('end', function(){
 //console.log('Sum of numbers=',dataString);
});
py.stdin.write(JSON.stringify(data));
py.stdin.end();

}


setInterval(getImage, 5000)
