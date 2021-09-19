import { Component } from '@angular/core';
import { never, Observable } from 'rxjs';
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
  shuffle = false;
  index = 0;
  prevIndex=0;
  prevUrl: any = [];

  

  play(){
    if(this.audioObj.src == ''){
      this.openFile(this.files[0].url);
    }else{
    this.audioObj.play();
    }
   
  }

  pause(){
    this.audioObj.pause();
  }

  stop(){
    this.audioObj.pause();
    this.audioObj.currentTime = 0;
  }
 

  // need to finish working on the song stack
  prevTack(){
    console.log(this.prevUrl[this.prevUrl.length]);
    this.prevUrl.pop();
    this.openFile(this.prevUrl[this.prevUrl.length-1]);
 }
 ////////////////////////////////
 
  nextTrack(){
    if(this.shuffle == true){
      var randSong = this.files[Math.floor(Math.random() * this.files.length)].url;
      this.openFile(randSong)
    } 
    else{this.openFile(this.files[this.prevIndex+1].url);}
   }

  openFile(url:any){
    
    this.prevUrl.push(url);
    console.log(this.prevUrl);
    this.streamObserver(url).subscribe(event =>{

    });
  }  

  setVolume(ev:any){
    this.audioObj.volume = ev.target.value;
    // console.log(ev.target.value);
    
  }

  streamObserver(url:any){
    return new Observable(observer =>{
      this.prevIndex = this.files.findIndex(x => x.url === url);
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();
      
      // current song loop
      this.files.forEach(element => {
        if(url == element.url){
          this.fileName = element.name;
        }
      });


      // no shuffle loop
      var i = 0;
      this.files.forEach(element => {
        if(url == element.url){
           this.index = i + 1;
        }
        i++;
      });
      
      if(this.index == this.files.length){
        this.index = 0;
      }

      const handler = (event: Event) =>{
        // console.log(event);
        this.seek = this.audioObj.currentTime;
        this.endseek = this.audioObj.duration;
        this.duration = this.timeFormat(this.audioObj.duration);
        this.currentTime = this.timeFormat(this.audioObj.currentTime);

        // shufle is on
        if(this.audioObj.currentTime == this.audioObj.duration && this.shuffle == true){
          var randSong = this.files[Math.floor(Math.random() * this.files.length)].url;
          this.openFile(randSong)
        }
        // shuffle is off
        else if(this.audioObj.currentTime == this.audioObj.duration && this.shuffle == false){
          this.openFile(this.files[this.index].url);
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


