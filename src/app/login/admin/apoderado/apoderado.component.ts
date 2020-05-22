import { Component, OnInit } from '@angular/core';
import { ApoderadoService } from 'src/app/servicios/apoderado.service';
import { Apoderado } from 'src/app/modelos/apoderado';
import Swal from 'sweetalert2';
import { UserService} from 'src/app/servicios/user.service';


@Component({
  selector: 'app-apoderado',
  templateUrl: './apoderado.component.html',
  styleUrls: ['./apoderado.component.css']
})
export class ApoderadoComponent implements OnInit {
  today:number=Date.now();
  _listFilter:string;
  apoderados:Apoderado[];
  apoderadosi:Apoderado[];
  mostrarapoderados:Apoderado[];
  public apoderado:Apoderado={id:null,nombre:"",apellido:"",telefono:"",email:"",parentesco:"",actividad:"",direccion:"",nivel_educacional:"",estado:"Activo"};
  public status:string;
  public activarModal:string='';
  public config;
  public identity;
  countAct;
  countInac;
  valor="Activo";
  
  constructor(public apoderadoService: ApoderadoService ,private _userService:UserService) { 
    this.identity=_userService.getIdentity(); //obtenemos la identidad de quien esta logueado 
    if(this.valor=="Activo"){
      this.config = {
        itemsPerPage: 5,
        currentPage: 1,
        totalItems: this.countAct
      };
    }if(this.valor=="Inactivo"){
      this.config = {
        itemsPerPage: 5,
        currentPage: 1,
        totalItems: this.countInac
      };
    }
  }

  ngOnInit() {
    this.getApoderados();
    this.getApoderadosi();
  }
  getApoderados(){
    this.apoderadoService.getApoderados().subscribe(response =>{
      if(response.status =='success'){
        this.apoderados=response.apoderados;
        this.countAct=this.apoderados.length;
        this.setValue();
      }      
    },
      err=>console.log(err)
    )      
  }
  getApoderadosi(){
    this.apoderadoService.getApoderadosi().subscribe(response =>{
      if(response.status =='success'){
        this.apoderadosi=response.apoderados;
        this.setValue();
      }      
      this.countInac=this.apoderadosi.length;
    },
      err=>console.log(err)
    )      
  }

  setValue(){
    console.log(this.valor);
    if(this.valor=="Inactivo"){
      this.getApoderadosi();
      this.mostrarapoderados=this.apoderadosi;
    }if(this.valor=="Activo"){
      this.mostrarapoderados=this.apoderados;

    }
  }

  pageChanged(event){
    this.config.currentPage = event;
  }
   /**
   * onSubmit crea o actualiza un modelo según el this.modelo
   * contenga un id o no, el id se asigna dependiendo de donde
   * accede al modal (desde crear modelo o editar modelo)
   */
  onSubmit(form){
    if(this.apoderado.id==null){
      //crear un modelo
      this.apoderadoService.create(this.apoderado).subscribe(
        response=>{
          if(response.status=="success"){
            this.apoderado=response.apoderado;
            this.status="success";
            this.getApoderados();
            this.activarModal='';
            this.apoderado.id=null;
            this.apoderado.nombre="";
            this.apoderado.apellido="";
            this.apoderado.telefono="";
            this.apoderado.email="";
            this.apoderado.parentesco="";
            this.apoderado.actividad="";
            this.apoderado.direccion="";
            this.apoderado.nivel_educacional="";
           
            this.getApoderadosi();
            this.ocultarModal();
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Apoderado registrado con exito!!',
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
      //actualiza el apoderado
      this.apoderadoService.update(this.apoderado).subscribe(
        response=>{
          if(response.status=="success"){
            this.apoderado=response.apoderado;
            this.status="success";
            this.getApoderados();
            this.activarModal='';
            this.apoderado.id=null;
            this.apoderado.nombre="";
            this.apoderado.apellido="";
            this.apoderado.telefono="";
            this.apoderado.email="";
            this.apoderado.parentesco="";
            this.apoderado.actividad="";
            this.apoderado.direccion="";
            this.apoderado.nivel_educacional="";
         
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Apoderado actualizado con exito!!',
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
  mostrarModal(id?,nombre?,apellido?,telefono?,email?,parentesco?,actividad?,direccion?,nivel_educacional?,estado?){
    this.activarModal='block';
    if(id){
      this.apoderado.id=id;
      this.apoderado.nombre = nombre
      this.apoderado.apellido=apellido;
      this.apoderado.telefono=telefono;
      this.apoderado.email=email;
      this.apoderado.parentesco=parentesco;
      this.apoderado.actividad=actividad;
      this.apoderado.direccion=direccion;
      this.apoderado.nivel_educacional=nivel_educacional;
      this.apoderado.estado=estado;
    }
  }

  /**
   * ocultarModal oculta el modal y reinicia los valores para que el form no siga msotrando
   * los valores que se habian asignado
   */
  ocultarModal(){
    this.activarModal='';
    this.apoderado.id=null;
            this.apoderado.nombre="";
            this.apoderado.apellido="";
            this.apoderado.telefono="";
            this.apoderado.email="";
            this.apoderado.parentesco="";
            this.apoderado.actividad="";
            this.apoderado.direccion="";
            this.apoderado.nivel_educacional="";
         
  }
//deshabilita el apoderado 
  disableApoderado(id, nombre, apellido){
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
      text: `¿Está seguro que desea deshabilitar a ${nombre +' '+apellido} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!', 
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.apoderadoService.disableApoderado(id).subscribe(
          response=>{
            if(response.status=="success"){
              console.log(response);
              swalWithBootstrapButtons.fire(
                'Apoderado deshabilitado!',
                `Apoderado ${id} deshabilitado con éxito.`,
                'success'
              )
              this.getApoderados();
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
