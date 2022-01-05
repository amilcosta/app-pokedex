import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonSearchService {
    public httpOptions: any;
    public urlPokedex: string = '';
    public responseStatus: number=0;

    constructor(private http: HttpClient) { 
        this.urlPokedex = environment.urlPokedex
        this.httpOptions = {
            headers: new HttpHeaders({
              'X-AppTimezone' : "-180",
              'Content-Type'  : "application/json; odata.metadata=minimal",
              'Access-Control-Allow-Origin': '*'
            }),
            observe: 'response'
        };  
    }

    getPokemon(idname: string):Observable<any> {
        return this.http.get(this.urlPokedex+`pokemon/${idname}`,this.httpOptions)
    }

    getAbility(id: string): Observable<any>{
        return this.http.get(this.urlPokedex+`pokemon/ability/${id}`,this.httpOptions)
    }
}
