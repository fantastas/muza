import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'muza';
  

  audioObj = new Audio();
  
  files = 
  [{
    url: './assets/02 Like A Ghost.mp3',
    name: 'Like A Ghost'
  },
  {
    url: './assets/01 Pulling Every String.mp3',
    name: 'Pulling Every String'
  }
  
  ];

  play(){
    console.log('play');
    this.audioObj.play();
  }

  pause(){
    console.log('pause');
    this.audioObj.pause();
  }

  stop(){
    console.log('stop');
    this.audioObj.pause();
    this.audioObj.currentTime = 0;
  }

  openFile(url:any){
    this.audioObj.src = url;
    this.audioObj.load();
    this.audioObj.play();
    console.log(url);
  }  

  setVolume(ev:any){
    this.audioObj.volume = ev.target.value;
    console.log(ev.target.value);
    
  }

}
