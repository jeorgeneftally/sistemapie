import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {global} from '../modelos/global';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {

  url;
  headers;
  constructor(public http:HttpClient) { 
    this.url=global.url;
    this.headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
  }
  getDiagnosticos():Observable<any>{    
    return this.http.get(this.url+'diagnosticos',{headers:this.headers});
  } 

  getDiagnosticosi():Observable<any>{    
    return this.http.get(this.url+'diagnosticosi',{headers:this.headers});
  } 


  /**
   * getModelo obtiene un modelo en especifico desde el backend
   * @param id id del modelo que se quiere obtener
   */
  getDiagnostico(id):Observable<any>{
    return this.http.get(this.url+'diagnostico/'+id,{headers:this.headers});
  }
   /**
   * create crea un nuevo modelo enviandolo al backend
   * @param diagnostico objeto que contiene los datos de modelo
   */
  create(diagnostico):Observable<any>{
    let json=JSON.stringify(diagnostico);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.post(this.url+'diagnostico',params,{headers:headers});
  }

  /**
   * update actualiza un modelo enviandolo al backend
   * @param diagnostico objeto que contiene los datos de modelo
   */
  update(diagnostico):Observable<any>{
    let json=JSON.stringify(diagnostico);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.put(this.url+'diagnostico/'+diagnostico.id,params,{headers:headers});
  }
  
  destroyDiagnostico(id):Observable<any>{
    return this.http.delete(this.url+"diagnostico/"+id,{headers:this.headers});
  }

  disableDiagnostico(id):Observable<any>{
    return this.http.put(this.url+"diagnosticoDisable/"+id,{headers:this.headers});
  }
}
