import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {global} from '../modelos/global';


@Injectable({
  providedIn: 'root'
})
export class ApoderadoService {

  url;
  headers;
  constructor(public http:HttpClient) { 
    this.url=global.url;
    this.headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
  }
  getApoderados():Observable<any>{    
    return this.http.get(this.url+'apoderados',{headers:this.headers});
  } 

  getApoderadosi():Observable<any>{    
    return this.http.get(this.url+'apoderadosi',{headers:this.headers});
  } 

  /**
   * getModelo obtiene un modelo en especifico desde el backend
   * @param id id del modelo que se quiere obtener
   */
  getApoderado(id):Observable<any>{
    return this.http.get(this.url+'apoderado/'+id,{headers:this.headers});
  }
   /**
   * create crea un nuevo modelo enviandolo al backend
   * @param apoderado objeto que contiene los datos de modelo
   */
  create(apoderado):Observable<any>{
    let json=JSON.stringify(apoderado);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.post(this.url+'apoderado',params,{headers:headers});
  }

  /**
   * update actualiza un modelo enviandolo al backend
   * @param apoderado objeto que contiene los datos de modelo
   */
  update(apoderado):Observable<any>{
    let json=JSON.stringify(apoderado);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.put(this.url+'apoderado/'+apoderado.id,params,{headers:headers});
  }

  disableApoderado(id):Observable<any>{
    return this.http.put(this.url+"apoderadoDisable/"+id,{headers:this.headers});
  }
}
