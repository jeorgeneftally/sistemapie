import { Component, OnInit } from '@angular/core';
import { DiagnosticoService } from 'src/app/servicios/diagnostico.service';
import { Diagnostico } from 'src/app/modelos/diagnostico';
import { EstudianteService} from 'src/app/servicios/estudiante.service'
import { UserService} from 'src/app/servicios/user.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.css']
})
export class DiagnosticoComponent implements OnInit {
  today: number = Date.now();
  diagnosticos: Diagnostico[];
  diagnosticosi: Diagnostico[];
  mostrardiagnosticos: any[];
  public diagnostico: Diagnostico = { id: null, fecha_autorizacion: null, fecha_evaluacion: null, fecha_reevaluacion: null, nee_postulada: "", tipo_nee: "", derivacion: "", observacion: "", user_id: null, estudiante_id: null,estado:"Activo" };
  public status: string;
  public activarModal: string = '';
  public config;
  public identity;
  public estudiantes;
  countAct;
  countInac;
  valor="Activo";

  constructor(public diagnosticoService: DiagnosticoService,public estudianteService: EstudianteService,public userService: UserService) {
    if(this.valor=="Activo"){
      this.config = {
        itemsPerPage: 20,
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
    this.identity=userService.getIdentity();
  }

  ngOnInit(): void {
    //this.products=this.productService.getProducts();
    //ahora asigna a los arreglos de ProductService
    this.getDiagnosticos();
    this.getDiagnosticosi();
    this.identity=this.userService.getIdentity();
    this.getEstudiantes();
    console.log(this.identity);
  }

  getDiagnosticos() {
    this.diagnosticoService.getDiagnosticos().subscribe(response => {
      if (response.status == 'success') {
        this.diagnosticos = response.diagnosticos;
        this.countAct = this.diagnosticos.length;
        console.log(this.diagnosticos);
        this.setValue();
      }
    },
      err => console.log(err)
    )
  }
  getDiagnosticosi() {
    this.diagnosticoService.getDiagnosticosi().subscribe(response => {
      if (response.status == 'success') {
        this.diagnosticosi = response.diagnosticos;
        this.countInac = this.diagnosticosi.length;
        console.log(this.diagnosticosi);
        this.setValue()
      }
    },
      err => console.log(err)
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
      this.mostrardiagnosticos=this.diagnosticosi;
      this.getDiagnosticosi();
      
    }if(this.valor=="Activo"){
      this.mostrardiagnosticos=this.diagnosticos;
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
    if (this.diagnostico.id == null) {
      //crear un modelo
      console.log(this.diagnostico);
      this.diagnosticoService.create(this.diagnostico).subscribe(
        response => {
          if (response.status == "success") {
            this.diagnostico = response.diagnostico;
            this.status = "success";
            this.getDiagnosticos();
            this.getDiagnosticosi();
            this.activarModal = '';
            this.diagnostico.id = null;
            this.diagnostico.fecha_autorizacion = null;
            this.diagnostico.fecha_evaluacion = null;
            this.diagnostico.fecha_reevaluacion = null;
            this.diagnostico.nee_postulada = "";
            this.diagnostico.tipo_nee = "";
            this.diagnostico.derivacion = "";
            this.diagnostico.observacion = "";
            this.diagnostico.user_id = null;
            this.diagnostico.estudiante_id = null;
            this.ocultarModal();
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Diagnóstico registrado con exito!!',
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
      this.diagnosticoService.update(this.diagnostico).subscribe(
        response => {
          if (response.status == "success") {
            this.diagnostico = response.diagnostico;
            this.status = "success";
            this.getDiagnosticos();
            this.getDiagnosticosi();
            this.activarModal = '';
            this.diagnostico.id = null;
            this.diagnostico.fecha_autorizacion = null;
            this.diagnostico.fecha_evaluacion = null;
            this.diagnostico.fecha_reevaluacion = null;
            this.diagnostico.nee_postulada = "";
            this.diagnostico.tipo_nee = "";
            this.diagnostico.derivacion = "";
            this.diagnostico.observacion = "";
            this.diagnostico.user_id = null;
            this.diagnostico.estudiante_id = null;
            this.ocultarModal();
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Diagnóstico actualizado con exito!!',
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
  mostrarModal(id?, fecha_autorizacion?, fecha_evaluacion?, fecha_reevaluacion?, nee_postulada?, tipo_nee?, derivacion?, observacion?, user_id?, estudiante_id?) {
    this.activarModal = 'block';
    if (id) {
      this.diagnostico.id = id;
      this.diagnostico.fecha_autorizacion = fecha_autorizacion;
      this.diagnostico.fecha_evaluacion = fecha_evaluacion;
      this.diagnostico.fecha_reevaluacion = fecha_reevaluacion;
      this.diagnostico.nee_postulada = nee_postulada
      this.diagnostico.tipo_nee = tipo_nee
      this.diagnostico.derivacion = derivacion
      this.diagnostico.observacion = observacion;
      this.diagnostico.user_id = user_id;
      this.diagnostico.estudiante_id = estudiante_id;
    }
  }
  /**
    * ocultarModal oculta el modal y reinicia los valores para que el form no siga msotrando
    * los valores que se habian asignado
    */
  ocultarModal() {
    this.activarModal = '';
    this.diagnostico.id = null;
    this.diagnostico.fecha_autorizacion = null;
    this.diagnostico.fecha_evaluacion = null;
    this.diagnostico.fecha_reevaluacion = null;
    this.diagnostico.nee_postulada = "";
    this.diagnostico.tipo_nee = "";
    this.diagnostico.derivacion = "";
    this.diagnostico.observacion = "";
    this.diagnostico.user_id = null;
    this.diagnostico.estudiante_id = null;
  }

  disableDiagnostico(id){
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
      text: `¿Está seguro que desea deshabilitar el diagnostico ${id} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!', 
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.diagnosticoService.disableDiagnostico(id).subscribe(
          response=>{
            if(response.status=="success"){
              console.log(response);
              swalWithBootstrapButtons.fire(
                'Diagnostico deshabilitado!',
                `Diagnostico ${id} deshabilitado con éxito.`,
                'success'
              )
              this.getDiagnosticos();
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





