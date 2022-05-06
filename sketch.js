const mySoundModelURL = 'https://teachablemachine.withgoogle.com/models/-LSrD6F_0/';
let mySoundModel;
let resultDiv;
let serial;// variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem144301';// fill in your serial port name here
let outByte = 0;// for outgoing data

function preload() {
  mySoundModel = ml5.soundClassifier(mySoundModelURL+ 'model.json');
}

function setup() {
  resultDiv = createElement('h1',  '...');
  serial = new p5.SerialPort();    // make a new instance of the serialport library
  serial.on('error', serialError); // callback for errors
  serial.open(portName);           // open a serial port
  mySoundModel.classify(gotResults);
  mic = new p5.AudioIn();
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}


function gotResults(err, results) {
  if (err) console.log(err);
  if (results) {
    console.log(results);
    if (results[0].confidence < 0.7) return;
    resultDiv.html('Result is: ' + results[0].label);
    if (results[0].label === 'On') {
      outByte = 1;
      serial.write(outByte);
   
    } else if (results[0].label === 'Off') {
      outByte = 2;
      serial.write(outByte);
     
    } else if (results[0].label === 'Water') {
      outByte = 3;
      serial.write(outByte);
      
    } 
    else if (results[0].label === 'Fire') {
      outByte = 4;
      serial.write(outByte);
    } else if (results[0].label === 'Disco') {
      outByte = 5;
      serial.write(outByte);
      
    } else if (results[0].label === 'Rainbow') {
      outByte = 6;
      serial.write(outByte);
      
    } else if (results[0].label === 'Panic') {
      outByte = 7;
      serial.write(outByte);
      
    } else if (results[0].label === 'Music') {
      outByte = 8;
      serial.write(outByte);
      
    } else if (results[0].label === 'Run') {
      outByte = 9;
      serial.write(outByte);
    } else if (results[0].label === 'Smile') {
      outByte = 10;
      serial.write(outByte);
    } 
    //   else {
    //   outByte = 0;
    // }
    // send it out the serial port:
    console.log('outByte: ', outByte)
     //serial.write(outByte);
  
  }
}
