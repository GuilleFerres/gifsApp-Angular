import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';


@Injectable({
  providedIn: 'root'
})

export class GifsService {
  private apiKey      : string = 'R2VMjBW2G50txZiILloDu37myEe9qZyO';
  private _historial  : string[] = [];
  private servicioUrl : string = 'https://api.giphy.com/v1/gifs';
  public resultados   : Gif[] = [];

  get historial(){
    return [...this._historial];

  }


  constructor( private http: HttpClient ){
    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
    this.resultados = JSON.parse( localStorage.getItem('resultados')! ) || [];
    // this._historial = localStorage.getItem('historial');
    // if( localStorage.getItem('historial') ){
    //   this._historial = JSON.parse( localStorage.getItem('historial')! ); Es lo mismo que this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
    // }
  }
  buscarGifs ( query: string ){
    query = query.trim().toLocaleLowerCase();
    if( !this._historial.includes( query )){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);
      localStorage.setItem( 'historial', JSON.stringify( this._historial) );
      
    }

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', query);
  

    this.http.get<SearchGifsResponse>(`${ this.servicioUrl}/search`, { params })
    .subscribe( ( resp ) =>{
      
      this.resultados = resp.data;
      localStorage.setItem( 'resultados', JSON.stringify( this.resultados) );
    })
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=R2VMjBW2G50txZiILloDu37myEe9qZyO&limit=10').then(resp=>{
    //   resp.json().then(data=> {
    //     console.log(data);
    //   })
    // })
  }
}
