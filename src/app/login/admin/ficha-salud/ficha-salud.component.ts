import { Component, OnInit } from '@angular/core';
import { FichaService } from 'src/app/servicios/ficha.service';
import { EstudianteService } from 'src/app/servicios/estudiante.service';
import { Ficha } from 'src/app/modelos/fichasalud';
import { UserService} from 'src/app/servicios/user.service';
import Swal from 'sweetalert2'
import { Estudiante } from 'src/app/modelos/estudiante';

@Component({
  selector: 'app-ficha-salud',
  templateUrl: './ficha-salud.component.html',
  styleUrls: ['./ficha-salud.component.css']
})
export class FichaSaludComponent implements OnInit {
  today:number=Date.now();
  _listFilter:string;
  public fichas:Ficha[];
  public fichasi:Ficha[];
  public mostrarfichas:any[];
  public ficha:Ficha={id:null,nombre_sistema:"",medicamentos:"",observacion:"",estudiante_id:null,estado:"Activo"};
  public status:string;
  public activarModal:string='';
  public estudiantes;
  public config;
  public identity;
  countAct;
  countInac;
  valor="Activo";

  constructor(public fichaService: FichaService, public estudianteService:EstudianteService,private _userService:UserService  ) {
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

  ngOnInit(): void {
    this.getFichas();
    this.getFichasi();
    this.getEstudiantes();
  }

  getFichas(){
    this.fichaService.getfichas().subscribe(response =>{
      if(response.status == 'success'){
        this.fichas=response.fichasaluds;
        console.log(this.fichas);
        this.countAct=this.fichas.length;
        this.setValue();
      }      
    },
      err=>console.log(err)
    )
  }

  getFichasi(){
    this.fichaService.getfichasi().subscribe(response =>{
      if(response.status == 'success'){
        this.fichasi=response.fichasaluds;
        this.countInac=this.fichasi.length;
        console.log(this.fichas);
        this.setValue();
      }      
    },
      err=>console.log(err)
    )
  }

  getEstudiantes(){
    this.estudianteService.getEstudiantes().subscribe(response =>{
      if(response.status =='success'){
        this.estudiantes=response.estudiantes;
        console.log(this.estudiantes);
      }      
    },
      err=>console.log(err)
    )     
  } 
  setValue(){
    console.log(this.valor);
    if(this.valor=="Inactivo"){
      this.mostrarfichas=this.fichasi;
      this.getFichasi();
    }if(this.valor=="Activo"){
      this.mostrarfichas=this.fichas;
    }
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }
  /**
   * onSubmit crea o actualiza un modelo según el this.modelo
   * contenga un id o no, el id se asigna dependiendo de donde
   * accede al modal (desde crear modelo o editar modelo)
   */
  onSubmit(form){
    console.log(this.ficha);
    if(this.ficha.id==null){
      //crear un modelo
      this.fichaService.create(this.ficha).subscribe(
        response=>{
          if(response.status=="success"){
            this.ficha=response.fichasalud;
            this.status="success";
            this.getFichas();
            this.getFichasi();
            this.activarModal='';
            this.ficha.id=null;
            this.ficha.nombre_sistema="";
            this.ficha.medicamentos="";
            this.ficha.observacion="";
            this.ficha.estudiante_id=null;
     
            this.ocultarModal();
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Registrado con exito!!',
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
      this.fichaService.update(this.ficha).subscribe(
        response=>{
          if(response.status=="success"){
            this.ficha=response.fichaSalud;
            this.status="success";
            this.getFichas();
            this.getFichasi();
            this.activarModal='';
            this.ficha.id=null;
            this.ficha.nombre_sistema="";
            this.ficha.medicamentos="";
            this.ficha.observacion="";
            this.ficha.estudiante_id=null; 
       
            this.ocultarModal();
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Actualizado con exito!!',
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
  mostrarModal(id?,nombre_sistema?,medicamentos?,observacion?,estudiante_id?,estado?){
    this.activarModal='block';
    if(id){
      this.ficha.id=id;
      this.ficha.nombre_sistema =nombre_sistema
      this.ficha.medicamentos=medicamentos;
      this.ficha.observacion=observacion;
      this.ficha.estudiante_id=estudiante_id;
      this.ficha.estado=estado; 
    }
  }
  /**
   * ocultarModal oculta el modal y reinicia los valores para que el form no siga msotrando
   * los valores que se habian asignado
   */
  ocultarModal(){
    this.activarModal='';
    this.ficha.id=null;
    this.ficha.nombre_sistema = "";
    this.ficha.medicamentos="";
    this.ficha.observacion="";
    this.ficha.estudiante_id=null;
 
  }

  disableFicha(id) {
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
      text: `¿Está seguro que desea deshabilitar la ficha ${id} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, deshabilitar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.fichaService.disableFicha(id).subscribe(
          response => {
            if (response.status == "success") {
              console.log(response);
              swalWithBootstrapButtons.fire(
                'Ficha Deshabilitada!',
                `Ficha ${id} Deshabilitada con éxito.`,
                'success'
              )
              this.getFichas();
            }
          },
          error => {
            console.log(error);
          }
        )
      }
    });
  }
}
