import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent {

  termino: string = '';

  constructor( public _spotifyService: SpotifyService ) {

   
  }

  buscarArtista(){

    if (this.termino.length == 0) {
      return;
      
    }
    this._spotifyService.getArtistas(this.termino)
    .subscribe(  resp => {
        console.log('info lista');
        console.log(resp);
    });

   
  }
}
