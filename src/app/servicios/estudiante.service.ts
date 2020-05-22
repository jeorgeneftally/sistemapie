import { Injectable } from '@angular/core';
import {Estudiante} from '../modelos/estudiante';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {global} from '../modelos/global';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  url;
  headers;
  constructor(public http:HttpClient) { 
    this.url=global.url;
    this.headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
  }
  getEstudiantes():Observable<any>{    
    return this.http.get(this.url+'estudiantes',{headers:this.headers});
  } 
  getEstudiantesi():Observable<any>{    
    return this.http.get(this.url+'estudiantesi',{headers:this.headers});
  } 
  /**
   * getModelo obtiene un modelo en especifico desde el backend
   * @param id id del modelo que se quiere obtener
   */
  getEstudiante(id):Observable<any>{
    return this.http.get(this.url+'estudiante/'+id,{headers:this.headers});
  }
   /**
   * create crea un nuevo modelo enviandolo al backend
   * @param estudiante objeto que contiene los datos de modelo
   */
  create(estudiante):Observable<any>{
    let json=JSON.stringify(estudiante);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.post(this.url+'estudiante',params,{headers:headers});
  }

  /**
   * update actualiza un modelo enviandolo al backend
   * @param estudiante objeto que contiene los datos de modelo
   */
  update(estudiante):Observable<any>{
    let json=JSON.stringify(estudiante);
    let params="json="+json;
    let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this.http.put(this.url+'estudiante/'+estudiante.id,params,{headers:headers});
  }
   
  destroyEstudiante(id):Observable<any>{
    return this.http.delete(this.url+"estudiante/"+id,{headers:this.headers});
  }
  
  disableEstudiante(id):Observable<any>{
    return this.http.put(this.url+"estudianteDisable/"+id,{headers:this.headers});
  }

  /**
   * getModelo obtiene un modelo en especifico desde el backend
   * @param id id del modelo que se quiere obtener
   */
  getApoderadosByEstudiantes(id):Observable<any>{
    return this.http.get(this.url+'estudiante/apoderado/'+id,{headers:this.headers});
  }
  /**
   * getModelo obtiene un modelo en especifico desde el backend
   * @param id id del modelo que se quiere obtener
   */
  getDiagnosticosByEstudiantes(id):Observable<any>{
    return this.http.get(this.url+'estudiante/diagnostico/'+id,{headers:this.headers});
  }
/**
   * getModelo obtiene un modelo en especifico desde el backend
   * @param id id del modelo que se quiere obtener
   */
  getDoc(id):Observable<any>{
    return this.http.get(this.url+'estudiante/doc/'+id,{headers:this.headers});
  }

  /**
   * getModelo obtiene un modelo en especifico desde el backend
   * @param id id del modelo que se quiere obtener
   */
  getUltimoDiagnostico(id):Observable<any>{
    return this.http.get(this.url+'estudiante/ultimodiagnostico/'+id,{headers:this.headers});
  }
  /**
   * getModelo obtiene un modelo en especifico desde el backend
   * @param id id del modelo que se quiere obtener
   */
  getFichasByEstudiantes(id):Observable<any>{
    return this.http.get(this.url+'estudiante/ficha/'+id,{headers:this.headers});
  }
  /**
   * getModelo obtiene un modelo en especifico desde el backend
   * @param id id del modelo que se quiere obtener
   */
  getDocumentosByEstudiantes(id):Observable<any>{
    return this.http.get(this.url+'estudiante/documento/'+id,{headers:this.headers});
  }
  /**
   * getModelo obtiene un modelo en especifico desde el backend
   * @param id id del modelo que se quiere obtener
   */
  getHistorialesByEstudiantes(id):Observable<any>{
    return this.http.get(this.url+'estudiante/historial/'+id,{headers:this.headers});
  }
  
  /**
   * getModelo obtiene un modelo en especifico desde el backend
   * @param id id del modelo que se quiere obtener
   */
  getEntrevistasByEstudiantes(id):Observable<any>{
    return this.http.get(this.url+'estudiante/entrevista/'+id,{headers:this.headers});
  }


}
