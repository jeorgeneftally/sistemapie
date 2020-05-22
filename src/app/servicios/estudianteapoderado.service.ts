import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {global} from '../modelos/global';

@Injectable({
  providedIn: 'root'
})
export class EstudianteApoderadoService {
  url;
  headers;
  constructor(public http:HttpClient) { 
    this.url=global.url;
    this.headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
  }
  getEstudianteApoderados():Observable<any>{    
    return this.http.get(this.url+'estudiantesapoderados',{headers:this.headers});
  } 

  /**
   * getModelo obtiene un modelo en especifico desde el backend
   * @param id id del modelo que se quiere obtener
   */
  getEstudianteApoderado(id):Observable<any>{
    return this.http.get(this.url+'estudianteapoderado/'+id,{headers:this.headers});
  }
   /**
   * create crea un nuevo modelo enviandolo al backend
   * @param estudianteapoderado objeto que contiene los datos de modelo
   */
  create(estudianteapoderado):Observable<any>{
    let json=JSON.stringify(estudianteapoderado);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.post(this.url+'estudianteapoderado',params,{headers:headers});
  }

  /**
   * update actualiza un modelo enviandolo al backend
   * @param estudianteapoderado objeto que contiene los datos de modelo
   */
  update(estudianteapoderado):Observable<any>{
    let json=JSON.stringify(estudianteapoderado);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.put(this.url+'estudianteapoderado/'+estudianteapoderado.id,params,{headers:headers});
  }
   
  destroyEstudianteApoderado(id):Observable<any>{
    return this.http.delete(this.url+"estudianteapoderado/"+id,{headers:this.headers});
  }
}
