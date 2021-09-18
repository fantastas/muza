import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'muza';
  

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
  [{
    url: './assets/02 Like A Ghost.mp3',
    name: 'Like A Ghost'
  },
  {
    url: './assets/01 Pulling Every String.mp3',
    name: 'Pulling Every String'
  }
  
  ];

  currentTime = '00:00:00';
  duration = '00:00:00';
  seek = 0;
  endseek = 0;

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
    this.streamObserver(url).subscribe(event =>{

    });
  }  

  setVolume(ev:any){
    this.audioObj.volume = ev.target.value;
    console.log(ev.target.value);
    
  }

  streamObserver(url:any){
    return new Observable(observer =>{
      
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();

      const handler = (event: Event) =>{
        console.log(event);
        this.seek = this.audioObj.currentTime;
        this.endseek = this.audioObj.duration;
        this.duration = this.timeFormat(this.audioObj.duration);
        this.currentTime = this.timeFormat(this.audioObj.currentTime);

        
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
