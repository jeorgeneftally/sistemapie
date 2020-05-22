import { Component, OnInit } from '@angular/core';
import { HistorialacademicoService } from 'src/app/servicios/historialacademico.service';
import { HistorialAcademico } from 'src/app/modelos/historialacademico';
import { EstudianteService } from 'src/app/servicios/estudiante.service';
import Swal from 'sweetalert2';
import { UserService} from 'src/app/servicios/user.service';


@Component({
  selector: 'app-historialacademico',
  templateUrl: './historialacademico.component.html',
  styleUrls: ['./historialacademico.component.css']
})
export class HistorialacademicoComponent implements OnInit {

  public historialesAcademico: HistorialAcademico[];
  public historialesAcademicoi:HistorialAcademico[];
  public mostrarhistoriales:HistorialAcademico[];
  public historialacademico: HistorialAcademico = { id: null, ingreso_cpc:null,ingreso_pie:null,colegio_anterior:"",curso_repetido:"",activid_extraprogra:"",  estudiante_id: null,estado:"Activo"  };
  public status: string;
  public activarModal: string = '';
  public config;
  public estudiantes;
  public identity;
  countAct;
  countInac;
  valor="Activo";

  constructor(public historialService: HistorialacademicoService, public estudianteService: EstudianteService, private _userService:UserService) { 
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
    this.getHistoriales();
    this.getHistorialesi();
  }
  getHistoriales() {
    this.historialService.getHistoriales().subscribe(response => {
      if (response.status == 'success') {
        this.historialesAcademico = response.historial;
        this.countAct=this.historialesAcademico.length;
        console.log(this.historialesAcademico);
        this.setValue();
      }
    },
      err => console.log(err)
    )
  }

  getHistorialesi() {
    this.historialService.getHistorialesi().subscribe(response => {
      if (response.status == 'success') {
        this.historialesAcademicoi = response.historial;
        this.countInac=this.historialesAcademicoi.length;
        console.log(this.historialesAcademicoi);
        this.setValue();
      }
    },
      err => console.log(err)
    )
  }
  getEstudiantes() {
    this.estudianteService.getEstudiantes().subscribe(response => {
      if (response.status == 'success') {
        this.estudiantes = response.estudiantes;
        console.log(this.estudiantes);
      }
    },
      err => console.log(err)
    )

  }
  setValue(){
    console.log(this.valor);
    if(this.valor=="Inactivo"){
      this.mostrarhistoriales=this.historialesAcademicoi;
      this.getHistorialesi();
    }if(this.valor=="Activo"){
      this.mostrarhistoriales=this.historialesAcademico;
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
  onSubmit(form) {
    if (this.historialacademico.id == null) {
      //crear un modelo
      console.log(this.historialacademico.estudiante_id);
      this.historialService.create(this.historialacademico).subscribe(
        response => {
          if (response.status == "success") {
            this.historialacademico = response.historial;
            this.status = "success";
            this.getHistoriales();
            this.getHistorialesi();
            this.activarModal = '';
            this.historialacademico.id = null;
            this.historialacademico.ingreso_cpc = null;
            this.historialacademico.ingreso_pie = null;
            this.historialacademico.curso_repetido= "";
            this.historialacademico.activid_extraprogra= "";
            this.historialacademico.colegio_anterior= "";
            this.historialacademico.estudiante_id = null;
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
        error => {
          console.log(error);
          this.status = "error";
        }
      )
    } else {
      //actualiza la ficha
      this.historialService.update(this.historialacademico).subscribe(
        response => {
          if (response.status == "success") {
            this.historialacademico = response.historial;
            this.status = "success";
            this.getHistoriales();
            this.getHistorialesi();
            this.activarModal = '';
            this.historialacademico.id = null;
            this.historialacademico.ingreso_cpc = null;
            this.historialacademico.ingreso_pie = null;
            this.historialacademico.curso_repetido= "";
            this.historialacademico.activid_extraprogra= "";
            this.historialacademico.colegio_anterior= "";
            this.historialacademico.estudiante_id = null;
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
        error => {
          console.log(error);
          this.status = "error";
        }
      )
    }

  }

  /**
  * mostrarModal despliega el modal y puede cargar los datos en el formulario
  * en caso de que se reciban por parametro (si se accede desde el boton editar)
  */
  mostrarModal(id?,ingreso_cpc?,ingreso_pie?,colegio_anterior?,curso_repetido?,activid_extraprogra?, estudiante_id? ) {
    this.getEstudiantes();
    this.activarModal = 'block';
    if (id) {
            this.historialacademico.id = id;
            this.historialacademico.ingreso_cpc = ingreso_cpc;
            this.historialacademico.ingreso_pie = ingreso_pie;
            this.historialacademico.curso_repetido= curso_repetido;
            this.historialacademico.activid_extraprogra= activid_extraprogra;
            this.historialacademico.colegio_anterior= colegio_anterior;
            this.historialacademico.estudiante_id = estudiante_id;
    }
  }
  /**
    * ocultarModal oculta el modal y reinicia los valores para que el form no siga msotrando
    * los valores que se habian asignado
    */
  ocultarModal() {
    this.activarModal = '';
    this.historialacademico.id = null;
    this.historialacademico.ingreso_cpc = null;
    this.historialacademico.ingreso_pie = null;
    this.historialacademico.curso_repetido= "";
    this.historialacademico.activid_extraprogra= "";
    this.historialacademico.colegio_anterior= "";
    this.historialacademico.estudiante_id = null;
  }

  disableHistorial(id) {
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
      text: `¿Está seguro que desea deshabilitar el historial ${id} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.historialService.disableHistorial(id).subscribe(
          response => {
            if (response.status == "success") {
              console.log(response);
              swalWithBootstrapButtons.fire(
                'Historial Deshabilitado!',
                `Historial ${id} deshabilitado con éxito.`,
                'success'
              )
              this.getHistoriales();
              this.getHistorialesi();
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
