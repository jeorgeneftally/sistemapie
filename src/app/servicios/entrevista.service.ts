import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {global} from '../modelos/global';

@Injectable({
  providedIn: 'root'
})
export class EntrevistaService {
  url;
  headers;
  constructor(public http:HttpClient) { 
    this.url=global.url;
    this.headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
  }
  getEntrevistas():Observable<any>{    
    return this.http.get(this.url+'entrevistas',{headers:this.headers});
  } 

  getEntrevistasi():Observable<any>{    
    return this.http.get(this.url+'entrevistasi',{headers:this.headers});
  } 

  /**
   * getModelo obtiene un modelo en especifico desde el backend
   * @param id id del modelo que se quiere obtener
   */
  getEntrevista(id):Observable<any>{
    return this.http.get(this.url+'entrevista/'+id,{headers:this.headers});
  }
   /**
   * create crea un nuevo modelo enviandolo al backend
   * @param entrevista objeto que contiene los datos de modelo
   */
  create(entrevista):Observable<any>{
    let json=JSON.stringify(entrevista);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.post(this.url+'entrevista',params,{headers:headers});
  }

  /**
   * update actualiza un modelo enviandolo al backend
   * @param entrevista objeto que contiene los datos de modelo
   */
  update(entrevista):Observable<any>{
    let json=JSON.stringify(entrevista);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.put(this.url+'entrevista/'+entrevista.id,params,{headers:headers});
  }
  
  destroyEntrevista(id):Observable<any>{
    return this.http.delete(this.url+"entrevista/"+id,{headers:this.headers});
  }
  disableEntrevista(id):Observable<any>{
    return this.http.put(this.url+"entrevistaDisable/"+id,{headers:this.headers});
  }
}
