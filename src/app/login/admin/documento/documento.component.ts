import { Component, OnInit } from '@angular/core';
import { DocumentoService } from 'src/app/servicios/documento.service';
import { Documento } from '../../../modelos/documento';
import { EstudianteService } from 'src/app/servicios/estudiante.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css']
})
export class DocumentoComponent implements OnInit {

  today: number = Date.now();
  documentos: Documento[];
  documentosi:Documento[];
  public mostrardocumento:Documento[];
  public documento: Documento = { id: null, certificado_nac:null,
    autorizacion_padres:null,
    derivacion:null,
    anamnesis:null,
    pruebas:null,
    protocolos:null,
    formulario_ingreso:null,
    valoracion_salud:null,
    fonoaudiologico:null,
    psicopedagogico:null,
    psicologico:null,
    neurologico:null, estudiante_id: null,estado:"Activo"  };
  public status: string;
  public activarModal: string = '';
  public config;
  public estudiantes;
  public identity;
  countAct;
  countInac;
  valor="Activo";

  constructor(public documentoService: DocumentoService, public estudianteService: EstudianteService) {
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
    this.getDocumentos();
    this.getDocumentosi();
  }
  getDocumentos() {
    this.documentoService.getDocumentos().subscribe(response => {
      if (response.status == 'success') {
        this.documentos = response.documentos;
        console.log(this.documentos);
        this.countAct=this.documentos.length;
        this.setValue();
      }
    },
      err => console.log(err)
    )
  }

  getDocumentosi() {
    this.documentoService.getDocumentosi().subscribe(response => {
      if (response.status == 'success') {
        this.documentosi = response.documentos;
        console.log(this.documentosi);
        this.countInac=this.documentosi.length;
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
      this.mostrardocumento=this.documentosi;
      this.getDocumentosi();
    }if(this.valor=="Activo"){
      this.mostrardocumento=this.documentos;
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
    if (this.documento.id == null) {
      //crear un modelo
      console.log(this.documento.estudiante_id);
      this.documentoService.create(this.documento).subscribe(
        response => {
          if (response.status == "success") {
            this.documento = response.documento;
            this.status = "success";
            this.getDocumentos();
            this.getDocumentosi();
            this.activarModal = '';
            this.documento.id = null;
            this.documento.certificado_nac = null;
            this.documento.autorizacion_padres = null;
            this.documento.derivacion = null;
            this.documento.anamnesis = null;
            this.documento.pruebas = null;
            this.documento.fonoaudiologico = null;
            this.documento.protocolos = null;
            this.documento.formulario_ingreso = null;
            this.documento.valoracion_salud = null;
            this.documento.psicopedagogico = null;
            this.documento.psicologico = null;
            this.documento.neurologico = null;
            this.documento.estudiante_id = null;
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
      this.documentoService.update(this.documento).subscribe(
        response => {
          if (response.status == "success") {
            this.documento = response.documento;
            this.status = "success";
            this.getDocumentos();
            this.getDocumentosi();
            this.activarModal = '';
            this.documento.id = null;
            this.documento.certificado_nac = null;
            this.documento.autorizacion_padres = null;
            this.documento.derivacion = null;
            this.documento.anamnesis = null;
            this.documento.pruebas = null;
            this.documento.fonoaudiologico = null;
            this.documento.protocolos = null;
            this.documento.formulario_ingreso = null;
            this.documento.valoracion_salud = null;
            this.documento.psicopedagogico = null;
            this.documento.psicologico = null;
            this.documento.neurologico = null;
            this.documento.estudiante_id = null;
   
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
  mostrarModal(id?, certificado_nac?, autorizacion_padres?, derivacion?,anamnesis?,pruebas?,fonoaudiologico?,protocolos?,formulario_ingreso?,valoracion_salud?,psicopedagogico?,psicologico?,neurologico?, estudiante_id?,estado?) {
    this.getEstudiantes();
    this.activarModal = 'block';
    if (id) {
      this.documento.id = id;
      this.documento.certificado_nac = certificado_nac;
      this.documento.autorizacion_padres = autorizacion_padres;
      this.documento.derivacion = derivacion;
      this.documento.anamnesis = anamnesis;
      this.documento.pruebas = pruebas;
      this.documento.fonoaudiologico = fonoaudiologico;
      this.documento.protocolos = protocolos;
      this.documento.formulario_ingreso = formulario_ingreso;
      this.documento.valoracion_salud = valoracion_salud;
      this.documento.psicopedagogico = psicopedagogico;
      this.documento.psicologico = psicologico;
      this.documento.neurologico = neurologico;
      this.documento.estudiante_id = estudiante_id;
      this.documento.estado=estado;
    }
  }
  /**
    * ocultarModal oculta el modal y reinicia los valores para que el form no siga msotrando
    * los valores que se habian asignado
    */
  ocultarModal() {
    this.activarModal = '';
    this.documento.id = null;
            this.documento.certificado_nac = null;
            this.documento.autorizacion_padres = null;
            this.documento.derivacion = null;
            this.documento.anamnesis = null;
            this.documento.pruebas = null;
            this.documento.fonoaudiologico = null;
            this.documento.protocolos = null;
            this.documento.formulario_ingreso = null;
            this.documento.valoracion_salud = null;
            this.documento.psicopedagogico = null;
            this.documento.psicologico = null;
            this.documento.neurologico = null;
            this.documento.estudiante_id = null;

  }

  disableDocumento(id) {
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
      text: `¿Está seguro que desea deshabilitar el documento ${id} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.documentoService.disableDocumento(id).subscribe(
          response => {
            if (response.status == "success") {
              console.log(response);
              swalWithBootstrapButtons.fire(
                'Documento Deshabilitado!',
                `Documento ${id} deshabilitado con éxito.`,
                'success'
              )
              this.getDocumentos();
              this.getDocumentosi();
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
