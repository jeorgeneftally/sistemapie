import { Component, OnInit } from '@angular/core';
import { EntrevistaService } from 'src/app/servicios/entrevista.service';
import { Entrevista } from 'src/app/modelos/entrevista';
import { EstudianteService } from 'src/app/servicios/estudiante.service'
import Swal from 'sweetalert2'
import { UserService } from 'src/app/servicios/user.service';

@Component({
  selector: 'app-entrevista',
  templateUrl: './entrevista.component.html',
  styleUrls: ['./entrevista.component.css']
})
export class EntrevistaComponent implements OnInit {
  today: number = Date.now();
  entrevistas: Entrevista[];
  entrevistasi:Entrevista[];
  public mostrarentrevista:Entrevista[];
  public entrevista: Entrevista = { id: null, fecha: null, observacion: "", user_id: null, estudiante_id: null,estado:"Activo"  };
  public status: string;
  public activarModal: string = '';
  public config;
  public estudiantes;
  public identity;
  countAct;
  countInac;
  valor="Activo";
 

  constructor(public entrevistaService: EntrevistaService, public estudianteService: EstudianteService, public userService: UserService) {
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
    this.identity=userService.getIdentity();
    console.log(this.identity);
   }

  ngOnInit(): void {
    this.getEntrevistas();
    this.getEntrevistasi();
  }
  getEntrevistas() {
    this.entrevistaService.getEntrevistas().subscribe(response => {
      if (response.status == 'success') {
        this.entrevistas = response.entrevistas;
        console.log(this.entrevistas);
        this.countAct=this.entrevistas.length;
        this.setValue();
      }
    },
      err => console.log(err)
    )
  }

  getEntrevistasi() {
    this.entrevistaService.getEntrevistasi().subscribe(response => {
      if (response.status == 'success') {
        this.entrevistasi = response.entrevistas;
        console.log(this.entrevistasi);
        this.countInac=this.entrevistasi.length;
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
      this.mostrarentrevista=this.entrevistasi;
      this.getEntrevistasi()
    }if(this.valor=="Activo"){
      this.mostrarentrevista=this.entrevistas;
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
    if (this.entrevista.id == null) {
      //crear un modelo
      console.log(this.userService.identity.sub);
      this.entrevista.user_id=this.userService.identity.sub;
      this.entrevista.estado="Activo";
      this.entrevistaService.create(this.entrevista).subscribe(
        response => {
          if (response.status == "success") {
            this.entrevista = response.entrevista;
            this.status = "success";
            this.getEntrevistas();
            this.getEntrevistasi();
            this.activarModal = '';
            this.entrevista.id = null;
            this.entrevista.fecha = null;
            this.entrevista.observacion = "";
            this.entrevista.user_id = null;
            this.entrevista.estudiante_id = null;
    
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
      this.entrevistaService.update(this.entrevista).subscribe(
        response => {
          if (response.status == "success") {
            this.entrevista = response.entrevista;
            this.status = "success";
            this.getEntrevistas();
            this.getEntrevistasi();
            this.activarModal = '';
            this.entrevista.id = null;
            this.entrevista.fecha = null;
            this.entrevista.observacion = "";
            this.entrevista.user_id = null;
            this.entrevista.estudiante_id = null;
      
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
  mostrarModal(id?, fecha?, observacion?, user_id?, estudiante_id?,estado?) {
    this.getEstudiantes();
    this.activarModal = 'block';
    if (id) {
      this.entrevista.id = id;
      this.entrevista.fecha = fecha;
      this.entrevista.observacion = observacion;
      this.entrevista.user_id = user_id;
      this.entrevista.estudiante_id = estudiante_id;
      this.entrevista.estado=estado;
    }
  }
  /**
    * ocultarModal oculta el modal y reinicia los valores para que el form no siga msotrando
    * los valores que se habian asignado
    */
  ocultarModal() {
    this.activarModal = '';
    this.entrevista.id = null;
    this.entrevista.fecha = null;
    this.entrevista.observacion = "";
    this.entrevista.user_id = null;
    this.entrevista.estudiante_id = null;
 
  }

  disableEntrevista(id) {
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

        this.entrevistaService.disableEntrevista(id).subscribe(
          response => {
            if (response.status == "success") {
              console.log(response);
              swalWithBootstrapButtons.fire(
                'Entrevista Deshabilitada!',
                `Entrevista ${id} deshabilitada con éxito.`,
                'success'
              )
              this.getEntrevistas();
              this.getEntrevistasi();
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
