import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

    artistas: any[] = [];
    urlSpotify = 'https://api.spotify.com/v1/';
    urlPostToken = 'https://accounts.spotify.com/api/token/';
    token = 'BQBstUmWhTMqzA5VnjTgzgqH4Hx7hoUtZvd8my1AZxBjGMxUawIA7TxA26PPMI-8PlvFviWvz1Gmgcst5dY';

    post = {
      'grant_type': 'client_credentials',
      'client_id': 'f9de2e0e896241008fa908a0fded1a9e',
      'client_secret': 'f339596ecd2c45e48797153c3b5dcdc5'};

  constructor(public http: HttpClient) {
    console.log('Servicio Spotify');

  }

  getToken() {

    const body = JSON.stringify(this.post);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': `Bearer  ${ this.getToken() }`
    });
    return this.http.post( this.urlPostToken, body, {headers})
            .pipe(map( (res: any) => {
              console.log(res.json);
              return res.json;
            }));

  }

  private getHeaders(): HttpHeaders {
        let headers = new HttpHeaders({
          'authorization': `Bearer  ${ this.token }`
      });
      return headers;
  }

  getTop(id: string){

    let url = `${ this.urlSpotify }artists/${ id }/top-tracks?country=US`;

    let headers = this.getHeaders();
    
    return this.http.get(url, { headers });

  }

  getArtista(id: string){
    let url = `${ this.urlSpotify }artists/${ id }`;

    let headers = this.getHeaders();
    
    return this.http.get(url, { headers });
  }


  getArtistas(termino: string) {

    let url = `${this.urlSpotify}search?query=${termino}&type=artist&limit=20`;
    
    let headers = this.getHeaders();
    
    return this.http.get(url, { headers }).pipe(map( (resp: any) => {
                            this.artistas = resp.artists.items;
                            return this.artistas;
                          }));

  }
}
