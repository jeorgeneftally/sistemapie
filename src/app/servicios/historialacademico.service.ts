import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {global} from '../modelos/global';

@Injectable({
  providedIn: 'root'
})
export class HistorialacademicoService {

  url;
  headers;
  constructor(public http:HttpClient) { 
    this.url=global.url;
    this.headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
  }
  getHistoriales():Observable<any>{    
    return this.http.get(this.url+'historiales',{headers:this.headers});
  } 

  getHistorialesi():Observable<any>{    
    return this.http.get(this.url+'historialesi',{headers:this.headers});
  } 


  /**
   * getModelo obtiene un modelo en especifico desde el backend
   * @param id id del modelo que se quiere obtener
   */
  getHistorial(id):Observable<any>{
    return this.http.get(this.url+'historial/'+id,{headers:this.headers});
  }
   /**
   * create crea un nuevo modelo enviandolo al backend
   * @param historial objeto que contiene los datos de modelo
   */
  create(historial):Observable<any>{
    let json=JSON.stringify(historial);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.post(this.url+'historial',params,{headers:headers});
  }

  /**
   * update actualiza un modelo enviandolo al backend
   * @param historial objeto que contiene los datos de modelo
   */
  update(historial):Observable<any>{
    let json=JSON.stringify(historial);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.put(this.url+'historial/'+historial.id,params,{headers:headers});
  }
   
  destroyHistorial(id):Observable<any>{
    return this.http.delete(this.url+"historial/"+id,{headers:this.headers});
  }
  
  disableHistorial(id):Observable<any>{
    return this.http.put(this.url+"historialDisable/"+id,{headers:this.headers});
  }
}
