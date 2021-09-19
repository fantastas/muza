import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Muzika';
 
  audioObj = new Audio();

  audioEvents = [
     "ended",
     "error",
     "play",
     "playing",
     "pause",
     "timeupdate",
     "canplay",
     "loadedmetadata",
     "loadstart"
  ];
  
  files = 
  [
    {
      url: './assets/01 Pulling Every String.mp3',
      name: '01 Pulling Every String.mp3'
    },
    { url: './assets/02 Like A Ghost.mp3', name: '02 Like A Ghost.mp3' },
    {
      url: './assets/03 Even Without Me.mp3',
      name: '03 Even Without Me.mp3'
    },
    { url: './assets/04 It Was Love.mp3', name: '04 It Was Love.mp3' },
    {
      url: './assets/05 Thoughts In My Head.mp3',
      name: '05 Thoughts In My Head.mp3'
    },
    { url: './assets/06 Never Forget.mp3', name: '06 Never Forget.mp3' },
    { url: './assets/07 Embers.mp3', name: '07 Embers.mp3' }
  ]

  currentTime = '00:00:00';
  duration = '00:00:00';
  seek = 0;
  endseek = 0;
  fileName: string= '';

  play(){
    this.audioObj.play();
   
  }

  pause(){
    this.audioObj.pause();
  }

  stop(){
    this.audioObj.pause();
    this.audioObj.currentTime = 0;
  }

  openFile(url:any){
    this.streamObserver(url).subscribe(event =>{

    });
  }  

  setVolume(ev:any){
    this.audioObj.volume = ev.target.value;
    // console.log(ev.target.value);
    
  }

  streamObserver(url:any){
    return new Observable(observer =>{
      
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();
      
      this.files.forEach(element => {
        if(url == element.url){
          this.fileName = element.name;
        }
      });

      const handler = (event: Event) =>{
        // console.log(event);
        this.seek = this.audioObj.currentTime;
        this.endseek = this.audioObj.duration;
        this.duration = this.timeFormat(this.audioObj.duration);
        this.currentTime = this.timeFormat(this.audioObj.currentTime);

        if(this.audioObj.currentTime == this.audioObj.duration){
          var randSong = this.files[Math.floor(Math.random() * this.files.length)].url;
          this.openFile(randSong)
        }

        
      }

      this.addEvent(this.audioObj, this.audioEvents, handler);

      return () => {
        this.audioObj.pause();
        this.audioObj.currentTime =0;
        this.removeEvent(this.audioObj, this.audioEvents, handler);
      }
    })
  }

  addEvent(obj:any, events:any, handler:any){
    events.forEach((event: any) => {
      obj.addEventListener(event, handler);
    });

  }

  removeEvent(obj:any, events:any, handler:any){
    events.forEach((event: any) => {
      obj.removeEventListener(event, handler);
    });
  }

  timeFormat(time:any, format="HH:mm:ss"){
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);

  }

  setSeekTo(ev:any){
    this.audioObj.currentTime = ev.target.value;
  }

}
function file(file: any, arg1: (any: any) => void) {
  throw new Error('Function not implemented.');
}

