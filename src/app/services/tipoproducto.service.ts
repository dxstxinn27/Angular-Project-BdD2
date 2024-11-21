import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoProductoI } from '../models/tipoproducto';

@Injectable({
  providedIn: 'root'
})
export class TipoproductoService {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/tipo-productos/`

  constructor(
    private http:HttpClient
  ) { }

  getAllTipoproducto():Observable<TipoProductoI[]>{
    return this.http
      .get<TipoProductoI[]>(this.base_path)
  }

  getOneTipoproducto(id: number):Observable<TipoProductoI>{
    return this.http
      .get<TipoProductoI>(`${this.base_path}${id}`)
  }
}