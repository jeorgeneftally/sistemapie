import { Component, OnInit } from '@angular/core';
import { EstudianteApoderadoService } from 'src/app/servicios/estudianteapoderado.service';
import { EstudianteApoderado } from 'src/app/modelos/estudianteapoderado';
import { Estudiante } from 'src/app/modelos/estudiante';
import { Apoderado } from 'src/app/modelos/apoderado';
import { EstudianteService } from 'src/app/servicios/estudiante.service'
import { ApoderadoService } from 'src/app/servicios/apoderado.service'
import Swal from 'sweetalert2'


@Component({
  selector: 'app-estudianteapoderado',
  templateUrl: './estudianteapoderado.component.html',
  styleUrls: ['./estudianteapoderado.component.css']
})
export class EstudianteapoderadoComponent implements OnInit {

  estudianteapoderados: EstudianteApoderado[];
  estudiantes: Estudiante[];
  apoderados: Apoderado[];
  public estudianteapoderado: EstudianteApoderado = { id: null, estudiante_id:null, apoderado_id:null, tipo:""};
  public status: string;
  public activarModal: string = '';
  public config;
  countAct;


  constructor(public estudianteapoderadoService: EstudianteApoderadoService, public estudianteService: EstudianteService, public apoderadoService: ApoderadoService) {
   
      this.config = {
        itemsPerPage: 5,
        currentPage: 1,
        totalItems: this.countAct
      };
 }

  ngOnInit(): void {
    this.getEstudiantesApoderados();
    this.getEstudiantes();
    this.getApoderados();
  }

  getEstudiantesApoderados() {
    this.estudianteapoderadoService.getEstudianteApoderados().subscribe(response => {
      if (response.status == 'success') {
        this.estudianteapoderados = response.estudianteapoderado;
        console.log(this.estudianteapoderados);
        this.countAct=this.estudianteapoderados.length;
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
  getApoderados() {
    this.apoderadoService.getApoderados().subscribe(response => {
      if (response.status == 'success') {
        this.apoderados = response.apoderados;
        console.log(this.apoderados);
      }
    },
      err => console.log(err)
    )

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
    if (this.estudianteapoderado.id == null) {
      //crear un modelo
      this.estudianteapoderadoService.create(this.estudianteapoderado).subscribe(
        response => {
          if (response.status == "success") {
            this.estudianteapoderado = response.estudianteapoderado;
            this.status = "success";
            this.getEstudiantesApoderados();
            this.activarModal = '';
            this.estudianteapoderado.id = null;
            this.estudianteapoderado.apoderado_id = null;
            this.estudianteapoderado.tipo = "";
            this.estudianteapoderado.estudiante_id = null;
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
      this.estudianteapoderadoService.update(this.estudianteapoderado).subscribe(
        response => {
          if (response.status == "success") {
            this.estudianteapoderado = response.estudianteapoderado;
            this.status = "success";
            this.getEstudiantesApoderados();
            this.activarModal = '';
            this.estudianteapoderado.id = null;
            this.estudianteapoderado.apoderado_id = null;
            this.estudianteapoderado.tipo = "";
            this.estudianteapoderado.estudiante_id = null;
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
  mostrarModal(id?, tipo?, estudiante_id?, apoderado_id?) {
    this.getEstudiantesApoderados();
    this.activarModal = 'block';
    if (id) {
      this.estudianteapoderado.id = id;
      this.estudianteapoderado.tipo = tipo;
      this.estudianteapoderado.apoderado_id = apoderado_id;
      this.estudianteapoderado.estudiante_id = estudiante_id;
    }
  }
  /**
    * ocultarModal oculta el modal y reinicia los valores para que el form no siga msotrando
    * los valores que se habian asignado
    */
  ocultarModal() {
    this.activarModal = '';
    this.estudianteapoderado.id = null;
    this.estudianteapoderado.apoderado_id = null;
    this.estudianteapoderado.tipo = "";
    this.estudianteapoderado.estudiante_id = null;
    this.getEstudiantesApoderados();
  }

  deleteRelacion(id) {
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
      text: `¿Está seguro que desea eliminar la relación ${id} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.estudianteapoderadoService.destroyEstudianteApoderado(id).subscribe(
          response => {
            if (response.status == "success") {
              console.log(response);
              swalWithBootstrapButtons.fire(
                'Relacion Eliminada!',
                `Relacion ${id} eliminada con éxito.`,
                'success'
              )
              this.getEstudiantesApoderados();
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
