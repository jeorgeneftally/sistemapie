import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {global} from '../modelos/global';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  url;
  headers;
  constructor(public http:HttpClient) { 
    this.url=global.url;
    this.headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
  }
  getDocumentos():Observable<any>{    
    return this.http.get(this.url+'documentos',{headers:this.headers});
  } 

  getDocumentosi():Observable<any>{    
    return this.http.get(this.url+'documentosi',{headers:this.headers});
  } 

  /**
   * getModelo obtiene un modelo en especifico desde el backend
   * @param id id del modelo que se quiere obtener
   */
  getDocumento(id):Observable<any>{
    return this.http.get(this.url+'documento/'+id,{headers:this.headers});
  }
   /**
   * create crea un nuevo modelo enviandolo al backend
   * @param documento objeto que contiene los datos de modelo
   */
  create(documento):Observable<any>{
    let json=JSON.stringify(documento);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.post(this.url+'documento',params,{headers:headers});
  }

  /**
   * update actualiza un modelo enviandolo al backend
   * @param documento objeto que contiene los datos de modelo
   */
  update(documento):Observable<any>{
    let json=JSON.stringify(documento);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.put(this.url+'documento/'+documento.id,params,{headers:headers});
  }
   
  destroyDocumento(id):Observable<any>{
    return this.http.delete(this.url+"documento/"+id,{headers:this.headers});
  }
  
  disableDocumento(id):Observable<any>{
    return this.http.put(this.url+"documentoDisable/"+id,{headers:this.headers});
  }
}
