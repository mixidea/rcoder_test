import { Component, OnInit } from '@angular/core';
declare var MediaRecorder: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  mediaRecorder;

IsRecoding = false;




  ngOnInit() {

    if (navigator.mediaDevices) {
      console.log('getUserMedia supported.');

      const constraints = { audio: true };
      let chunks = [];

      navigator.mediaDevices.getUserMedia(constraints)
        .then( (stream) => {

          this.mediaRecorder = new MediaRecorder(stream);
          // visualize(stream);

          // record.onclick = function() {
          //   mediaRecorder.start();
          //   console.log(mediaRecorder.state);
          //   console.log('recorder started');
          //   record.style.background = 'red';
          //   record.style.color = 'black';
          // }

          // stop.onclick = function() {
          //   mediaRecorder.stop();
          //   console.log(mediaRecorder.state);
          //   console.log('recorder stopped');
          //   record.style.background = '';
          //   record.style.color = '';
          // }
          this.mediaRecorder.onstart = function (e) {
            console.log('オンスタート');
          };
          this.mediaRecorder.onstop = function (e) {
            console.log('data available after MediaRecorder.stop() called.');

            const clipName = prompt('Enter a name for your sound clip');

            const clipContainer = document.createElement('article');
            const clipLabel = document.createElement('p');
            const audio = document.createElement('audio');
            const deleteButton = document.createElement('button');

            clipContainer.classList.add('clip');
            audio.setAttribute('controls', '');
            deleteButton.innerHTML = 'Delete';
            clipLabel.innerHTML = clipName;

            clipContainer.appendChild(audio);
            clipContainer.appendChild(clipLabel);
            clipContainer.appendChild(deleteButton);
            const soundClips = document.getElementById('audio_container');
            soundClips.appendChild(clipContainer);

            audio.controls = true;
            const blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
            chunks = [];
            const audioURL = URL.createObjectURL(blob);
            audio.src = audioURL;
            console.log('recorder stopped');

            deleteButton.onclick = function (e: any) {
              const evtTgt = e.target;
              evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
            };
          };

          this.mediaRecorder.ondataavailable = function (e) {
            chunks.push(e.data);
          };
        })
        .catch(function (err) {
          console.log('The following error occurred: ' + err);
        });
    }





  }

  aaa() {
    console.log('recorder started');
    this.mediaRecorder.start();
    console.log(this.mediaRecorder.state);
    this.IsRecoding = true;
  }
  bbb() {
    this.mediaRecorder.stop();
    console.log(this.mediaRecorder.state);
    console.log('recorder stopped');
    this.IsRecoding = false;
  }

}
