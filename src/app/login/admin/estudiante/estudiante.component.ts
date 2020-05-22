import { Component, OnInit } from '@angular/core';
import { EstudianteService } from 'src/app/servicios/estudiante.service';
import { Estudiante } from 'src/app/modelos/estudiante';
import { UserService} from 'src/app/servicios/user.service';
import Swal from 'sweetalert2'
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';
import {global} from '../../../modelos/global';


@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {
  public estudiantes:Estudiante[];
  public estudiantesi:Estudiante[];
  public mostrarestudiantes:Estudiante[];
  public estudiante:Estudiante={id:null,rut:"",nombre:"",apellido:"",fecha_nacimiento:null,direccion:"",curso:"",personas_vive:"",imagen_perfil:"",imagen_genograma:"",estado:"Activo"};
  public status:string;
  public activarModal:string='';
  filterEstudiantes='';
  public identity;
  config: any;
  countAct;
  countInac;
  valor="Activo";
  public activarbotones:string='block';
  public url;
  


  constructor(public estudianteService: EstudianteService,private _userService:UserService) { 
    this.identity=_userService.getIdentity(); //obtenemos la identidad de quien esta logueado
    this.url=global.url; //obtenemos la url del backend

    //validamos que tabla se muestra con la cantidad de datos
    if(this.valor=="Activo"){
      this.config = {
        itemsPerPage:20,
        currentPage: 1,
        totalItems: this.countAct
      };
    }if(this.valor=="Inactivo"){
      this.config = {
        itemsPerPage: 20,
        currentPage: 1,
        totalItems: this.countInac
      };
    }
  }
//configuracion para subir foto de perfil de la estudiante
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50",
    uploadAPI:  {
      url:global.url+'/estudiante/upload',
      headers: {
          "Authorization" : this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText:'Sube tu avatar de usuario',
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Attach Files...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
  };
//configuracion para subir imagen de genograma
  public afuConfig2 = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50",
    uploadAPI:  {
      url:global.url+'/estudiante/upload',
      headers: {
          "Authorization" : this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText:'Sube imagen genograma',
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Attach Files...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
  };



  ngOnInit():void{
    //obtenemos los arreglos de estudiantes al iniciar
    this.getEstudiantes();
    this.getEstudiantesi();
    this.identity=this._userService.getIdentity(); 
  }
  //ocultamos datos que no queremos exportar
  public exportar(){
    this.activarbotones='none';
    setTimeout(this.captureScreen,1000);
  }
  //motrar y ocultar botones
  activar(){
    this.activarbotones='block';
  }
  //exportar tabla con datos
  public captureScreen()  
  {  
    var data = document.getElementById('contenido');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'letter'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('Listado-Estudiantes.pdf'); // Generated PDF   
    });  
   
  }  

//muestra el arreglo con datos en la tabla
  setValue(){
    if(this.valor=="Inactivo"){
      this.mostrarestudiantes=this.estudiantesi;
      this.getEstudiantesi();
    }if(this.valor=="Activo"){
      this.mostrarestudiantes=this.estudiantes;
    }
   
  }

  //paginamiento de tabla
  pageChanged(event){
    this.config.currentPage = event;
  }


  //obtenemos datos de estudiantes inactivos
  getEstudiantesi(){
    this.estudianteService.getEstudiantesi().subscribe(response =>{
      if(response.status =='success'){
        this.estudiantesi=response.estudiantes;
        this.countInac=this.estudiantesi.length;
        console.log(this.estudiantesi);
        this.setValue();
      }      
    },
      err=>console.log(err)
    )
        
  }  
  //obtenemos datos de estudiantes activos
  getEstudiantes(){
    this.estudianteService.getEstudiantes().subscribe(response =>{
      if(response.status =='success'){
        this.estudiantes=response.estudiantes;
        console.log(this.estudiantes);
        this.countAct=this.estudiantes.length;
        this.setValue();
      }      
    },
      err=>console.log(err)
    )
        
  }  
 /**
   * onSubmit crea o actualiza un estudiante según el this.estudiante
   * contenga un id o no, el id se asigna dependiendo de donde
   * accede al modal (desde crear modelo o editar estudiantes)
   */
  onSubmit(form){
    if(this.estudiante.id==null){
      //crear un modelo
      console.log("guardara el estudiante");
     this.estudiante.estado="Activo";
      this.estudianteService.create(this.estudiante).subscribe(
        response=>{
          if(response.status=="success"){
            
            this.estudiante=response.estudiante;
            this.status="success";
            this.getEstudiantes();
            this.getEstudiantesi();
            this.estudiante.id=null;
            this.estudiante.rut="";
            this.estudiante.nombre="";
            this.estudiante.apellido="";
            this.estudiante.fecha_nacimiento=null;
            this.estudiante.direccion="";
            this.estudiante.curso="";
            this.estudiante.personas_vive="";
            this.estudiante.estado="";
            this.estudiante.imagen_genograma="";
            this.estudiante.imagen_perfil="";

            this.ocultarModal();
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Estudiante registrado con exito!!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        },
        error=>{
          console.log(error);
          this.status="error";
        }
      )
    }else{
      //actualiza la ficha
      this.estudianteService.update(this.estudiante).subscribe(
        response=>{
          if(response.status=="success"){
            this.estudiante=response.estudiante;
            this.status="success";
            this.estudiante.id=null;
            this.estudiante.nombre="";
            this.estudiante.rut="";
            this.estudiante.apellido="";
            this.estudiante.fecha_nacimiento=null;
            this.estudiante.direccion="";
            this.estudiante.curso="";
            this.estudiante.personas_vive="";
            this.estudiante.estado="";
            this.estudiante.imagen_genograma="";
            this.estudiante.imagen_perfil="";
            this.getEstudiantes();
            this.getEstudiantesi();
            this.ocultarModal();
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Estudiante actualizado con exito!!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        },
        error=>{
          console.log(error);
          this.status="error";
        }
      )
    }
    
  }
   /**
   * mostrarModal despliega el modal y puede cargar los datos en el formulario
   * en caso de que se reciban por parametro (si se accede desde el boton editar)
   */
  mostrarModal(id?,rut?,nombre?,apellido?,fecha_nacimiento?,direccion?,curso?,personas_vive?,estado?,imagen_perfil?,imagen_genograma?){
    this.activarModal='block';
    if(id){
      this.estudiante.id=id;
      this.estudiante.rut = rut;
      this.estudiante.nombre = nombre;
      this.estudiante.apellido=apellido;
      this.estudiante.fecha_nacimiento=fecha_nacimiento;
      this.estudiante.direccion=direccion;
      this.estudiante.curso=curso;
      this.estudiante.personas_vive=personas_vive;
      this.estudiante.estado=estado;
      this.estudiante.imagen_perfil=imagen_perfil;
      this.estudiante.imagen_genograma=imagen_genograma;
      
    }
  }

  /**
   * ocultarModal oculta el modal y reinicia los valores para que el form no siga msotrando
   * los valores que se habian asignado
   */
  ocultarModal(){
      this.activarModal='';
      this.estudiante.id=null;
      this.estudiante.rut="";
      this.estudiante.nombre = "";
      this.estudiante.apellido="";
      this.estudiante.fecha_nacimiento=null;
      this.estudiante.direccion="";
      this.estudiante.curso="";
      this.estudiante.personas_vive="";
      this.estudiante.estado="";
      this.estudiante.imagen_perfil="";
      this.estudiante.imagen_genograma="";

  }

   /**
   * imageUpload se activa una vez se sube la imagen al servidor---imagen perfil
   * guarda el nombre de la imagen en el estudiante para una vez se actualice
   * el producto desde el form, este ya tenga la imagen asignada
   * @param datos corresponde a la respuesta del servidor al subir la imagen
   */
  imageUpload(datos){
    //guardar datos de la respuesta del servidor en una variable
    let data=JSON.parse(datos.response);
    //asignar nombre de la imagen al producto
    this.estudiante.imagen_perfil= data.image;
  }

   /**
   * imageUpload se activa una vez se sube la imagen al servidor --- imagen genograma
   * guarda el nombre de la imagen en el estudiante para una vez se actualice
   * el producto desde el form, este ya tenga la imagen asignada
   * @param datos corresponde a la respuesta del servidor al subir la imagen
   */
  imageUpload2(datos){
    //guardar datos de la respuesta del servidor en una variable
    let dato=JSON.parse(datos.response);
    //asignar nombre de la imagen al producto
    this.estudiante.imagen_genograma= dato.image;
  }


  //desabilita estudiante -- actualiza campo de estado
  disableEstudiante(id,nombre,apellido){
    console.log(id);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true,
    })
    swalWithBootstrapButtons.fire({
      title: 'Está seguro',
      text: `¿Está seguro que desea deshabilitar a ${nombre +" "+ apellido} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, deshabilitar!', 
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.estudianteService.disableEstudiante(id).subscribe(
          response=>{
            if(response.status=="success"){
              console.log(response);
              swalWithBootstrapButtons.fire(
                'Deshabilitado!',
                `${nombre +" "+ apellido} deshabilitado con éxito.`,
                'success'
              )
              this.getEstudiantes();
            }
          },
          error=>{
            console.log(error);
          }
        )
     
      }
    });
  }
}