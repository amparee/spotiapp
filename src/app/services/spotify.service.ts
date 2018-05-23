import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

    artistas: any[] = [];

  constructor(public http: HttpClient) {
    console.log('Servicio Spotify');

  }

  getArtistas(termino: string) {

    let url = `https://api.spotify.com/v1/search?query=${termino}&type=artist&limit=20`;
    let headers = new HttpHeaders({
        'authorization': 'Bearer BQBkuOVN5FgVa2tiOKV60sKi38NEUftwJbx6qmR-wk2Tn9WTURmcCsK3rBetDWLynH_wnikKSD0t__t-1N4'
    });
    
    return this.http.get(url, { headers }).pipe(map( (resp: any) => {
                            this.artistas = resp.artists.items;
                            return this.artistas;
                          }));

  }
}
