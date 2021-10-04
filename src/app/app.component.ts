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
  { url: './assets/01 Losing It.mp3', name: '01 Losing It.mp3' },
  { url: './assets/01 Lucky Penny.mp3', name: '01 Lucky Penny.mp3' },
  {
    url: './assets/01 Pulling Every String.mp3',
    name: '01 Pulling Every String.mp3'
  },
  {
    url: './assets/02 House Of Dreams.mp3',
    name: '02 House Of Dreams.mp3'
  },
  { url: './assets/02 Like A Ghost.mp3', name: '02 Like A Ghost.mp3' },
  { url: './assets/02 The Base.mp3', name: '02 The Base.mp3' },
  {
    url: './assets/03 All That Blue.mp3',
    name: '03 All That Blue.mp3'
  },
  { url: './assets/04 Under Ufo.mp3', name: '04 Under Ufo.mp3' },
  { url: './assets/05 Lifting You.mp3', name: '05 Lifting You.mp3' },
  { url: './assets/05 On a High.mp3', name: '05 On a High.mp3' },
  {
    url: './assets/05 The People Groove.mp3',
    name: '05 The People Groove.mp3'
  },
  {
    url: './assets/06 Looking Glass.mp3',
    name: '06 Looking Glass.mp3'
  },
  { url: './assets/06 Take It Slow.mp3', name: '06 Take It Slow.mp3' },
  { url: './assets/06 double Tap.mp3', name: '06 double Tap.mp3' },
  { url: './assets/07 Boileau.mp3', name: '07 Boileau.mp3' },
  { url: './assets/07 Instant Life.mp3', name: '07 Instant Life.mp3' },
  {
    url: './assets/08 Can We Go Back.mp3',
    name: '08 Can We Go Back.mp3'
  },
  { url: './assets/08 Italobingo.mp3', name: '08 Italobingo.mp3' },
  { url: './assets/1-02 Motorbike.mp3', name: '1-02 Motorbike.mp3' },
  {
    url: './assets/1-08 Under Control.mp3',
    name: '1-08 Under Control.mp3'
  },
  { url: './assets/1-11 Blue Mesas.mp3', name: '1-11 Blue Mesas.mp3' },
  {
    url: './assets/10 Ante Meridiem.mp3',
    name: '10 Ante Meridiem.mp3'
  },
  {
    url: './assets/11 the drift _ resist.mp3',
    name: '11 the drift _ resist.mp3'
  },
  { url: './assets/15 blu.mp3', name: '15 blu.mp3' },
  { url: './assets/17 800 minutes.mp3', name: '17 800 minutes.mp3' }
];

  // currentTime = '00:00:00';
  // duration = '00:00:00';
  currentTime = '';
  duration = '00: 00: 00';

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
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();
      this.prevIndex = this.files.findIndex(x => x.url === url);
    
      
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
      
      // make sure player plays after the last song in the list
      if(this.index == this.files.length){
        this.index = 0;
      }

      const handler = (event: Event) =>{
        // console.log(event);
        this.seek = this.audioObj.currentTime;
        this.endseek = this.audioObj.duration;

        // this.duration = this.timeFormat(this.audioObj.duration);
        // this.currentTime = this.timeFormat(this.audioObj.currentTime);
        this.duration = this.timeFunction(this.audioObj.duration);
        this.currentTime = this.timeFunction(this.audioObj.currentTime);

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
        this.audioObj.currentTime = 0;
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

  // timeFormat(time:any, format="HH:mm:ss"){
  //   const momentTime = time * 1000;
  //   return moment.utc(momentTime).format(format);

  // }

  timeFunction(time: any){
    var seconds = Math.floor(time);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    seconds = Math.floor(time) - minutes * 60;
    
    if(minutes < 10 && seconds < 10) { return '0' + hours + ':0' + minutes + ':0' + seconds;}
      else if (seconds < 10)         { return '0' + hours + ':' + minutes + ':0' + seconds; }
      else if(minutes < 10)          { return '0' + hours + ':0' + minutes + ':' + seconds; }
      else                           { return  hours + ':' + minutes + ':' + seconds; }
  }

  setSeekTo(ev:any){
    this.audioObj.currentTime = ev.target.value;
  }
  


}


