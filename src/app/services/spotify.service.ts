import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

    artistas: any[] = [];
    urlSpotify: string = 'https://api.spotify.com/v1/';
    token: string = 'BQBdeAeMLjUBHOJ6FZ2_tIQiW-WQne3r6puKtMwQrDHqhime1jwePfPpKSPWEq9OU9W0fINDcpKrCxN5sxA';


  constructor(public http: HttpClient) {
    console.log('Servicio Spotify');

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
