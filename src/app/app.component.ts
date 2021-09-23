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
  { url: './assets/Hipis & D&B .mp3', name: 'Hipis & D&B .mp3' },
  { url: './assets/Noizas.mp3', name: 'Noizas.mp3' },
  { url: './assets/Teisuolis.mp3', name: 'Teisuolis.mp3' },
  { url: './assets/atvirukass.mp3', name: 'atvirukass.mp3' },
  { url: './assets/dviratis.mp3', name: 'dviratis.mp3' },
  { url: './assets/ezeras.mp3', name: 'ezeras.mp3' },
  { url: './assets/grazuolis.mp3', name: 'grazuolis.mp3' },
  { url: './assets/jogos pozoj.mp3', name: 'jogos pozoj.mp3' },
  { url: './assets/lietaus lasai.mp3', name: 'lietaus lasai.mp3' },
  { url: './assets/logika.mp3', name: 'logika.mp3' },
  { url: './assets/open air .mp3', name: 'open air .mp3' },
  { url: './assets/paukstis .mp3', name: 'paukstis .mp3' },
  { url: './assets/pofik.mp3', name: 'pofik.mp3' },
  { url: './assets/prerisju suo.mp3', name: 'prerisju suo.mp3' },
  { url: './assets/radijas .mp3', name: 'radijas .mp3' },
  { url: './assets/rusiska .mp3', name: 'rusiska .mp3' },
  { url: './assets/tau .mp3', name: 'tau .mp3' },
  { url: './assets/virdulys.mp3', name: 'virdulys.mp3' }
]

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


