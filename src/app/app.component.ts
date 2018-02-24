import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(){

    var mediaRecorder;
    if (navigator.mediaDevices) {
      console.log('getUserMedia supported.');
  
      var constraints = { audio: true };
      var chunks = [];
  
      navigator.mediaDevices.getUserMedia(constraints)
      .then(function(stream) {
  
        mediaRecorder = new MediaRecorder(stream);
        // visualize(stream);
  
        // record.onclick = function() {
        //   mediaRecorder.start();
        //   console.log(mediaRecorder.state);
        //   console.log("recorder started");
        //   record.style.background = "red";
        //   record.style.color = "black";
        // }
  
        // stop.onclick = function() {
        //   mediaRecorder.stop();
        //   console.log(mediaRecorder.state);
        //   console.log("recorder stopped");
        //   record.style.background = "";
        //   record.style.color = "";
        // }
        mediaRecorder.onstart = function(e) {
          console.log("オンスタート");
        }
        mediaRecorder.onstop = function(e) {
          console.log("data available after MediaRecorder.stop() called.");
  
          var clipName = prompt('Enter a name for your sound clip');
  
          var clipContainer = document.createElement('article');
          var clipLabel = document.createElement('p');
          var audio = document.createElement('audio');
          var deleteButton = document.createElement('button');
  
          clipContainer.classList.add('clip');
          audio.setAttribute('controls', '');
          deleteButton.innerHTML = "Delete";
          clipLabel.innerHTML = clipName;
  
          clipContainer.appendChild(audio);
          clipContainer.appendChild(clipLabel);
          clipContainer.appendChild(deleteButton);
          var soundClips = document.getElementById("audio_container");
          soundClips.appendChild(clipContainer);
  
          audio.controls = true;
          var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
          chunks = [];
          var audioURL = URL.createObjectURL(blob);
          audio.src = audioURL;
          console.log("recorder stopped");
  
          deleteButton.onclick = function(e) {
            evtTgt = e.target;
            evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
          }
        }
  
        mediaRecorder.ondataavailable = function(e) {
          chunks.push(e.data);
        }
      })
      .catch(function(err) {
        console.log('The following error occurred: ' + err);
      })
    }





  }

  aaa(){
    mediaRecorder.start();
    console.log(mediaRecorder.state);
    console.log("recorder started");
    record.style.background = "red";
    record.style.color = "black";
  }
  bbb(){
    mediaRecorder.stop();
    console.log(mediaRecorder.state);
    console.log("recorder stopped");
    record.style.background = "";
    record.style.color = "";
  }





}
