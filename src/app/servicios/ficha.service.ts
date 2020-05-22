import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {global} from '../modelos/global';

@Injectable({
  providedIn: 'root'
})
export class FichaService {
  url;
  headers;
  constructor(public http:HttpClient) { 
    this.url=global.url;
    this.headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
  }
  getfichas():Observable<any>{    
    return this.http.get(this.url+'fichas',{headers:this.headers});
  } 

  getfichasi():Observable<any>{    
    return this.http.get(this.url+'fichasi',{headers:this.headers});
  } 
    /**
   * create crea un nuevo modelo enviandolo al backend
   * @param ficha objeto que contiene los datos de modelo
   */
  create(ficha):Observable<any>{
    let json=JSON.stringify(ficha);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.post(this.url+'ficha',params,{headers:headers});
  }

  /**
   * update actualiza un modelo enviandolo al backend
   * @param ficha objeto que contiene los datos de modelo
   */
  update(ficha):Observable<any>{
    let json=JSON.stringify(ficha);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.put(this.url+'ficha/'+ficha.id,params,{headers:headers});
  }

  destroyFicha(id):Observable<any>{
    return this.http.delete(this.url+"ficha/"+id,{headers:this.headers});
  }

  disableFicha(id):Observable<any>{
    return this.http.put(this.url+"fichaDisable/"+id,{headers:this.headers});
  }
  
}
