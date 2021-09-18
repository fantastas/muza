import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { Track } from 'ngx-audio-player';   


msaapDisplayTitle = true;
msaapDisplayPlayList = true;
msaapPageSizeOptions = [2,4,6];
msaapDisplayVolumeControls = true;
msaapDisplayRepeatControls = true;
msaapDisplayArtist = false;
msaapDisplayDuration = false;
msaapDisablePositionSlider = true;
   
// Material Style Advance Audio Player Playlist
msaapPlaylist: Track[] = [
  {
    title: 'Audio One Title',
    link: 'Link to Audio One URL',
    artist: 'Audio One Artist',
    duration: 'Audio One Duration in seconds'
  },
  {
    title: 'Audio Two Title',
    link: 'Link to Audio Two URL',
    artist: 'Audio Two Artist',
    duration: 'Audio Two Duration in seconds'
  },
  {
    title: 'Audio Three Title',
    link: 'Link to Audio Three URL',
    artist: 'Audio Three Artist',
    duration: 'Audio Three Duration in seconds'
  },
];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxAudioPlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
