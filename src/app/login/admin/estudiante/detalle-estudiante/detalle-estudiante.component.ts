import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router'
import { EstudianteService } from 'src/app/servicios/estudiante.service';
import { Apoderado } from 'src/app/modelos/apoderado';
import { global } from '../../../../modelos/global';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-detalle-estudiante',
  templateUrl: './detalle-estudiante.component.html',
  styleUrls: ['./detalle-estudiante.component.css']
})
export class DetalleEstudianteComponent implements OnInit {
   
  public estudiante:any={};
  public apoderados;
  public diagnosticos;
  public entrevistas;
  public historial;
  public documentos;
  public fichas;
  public doc;
  public c1;c2;c3;c4;c5;c6;c7;
  public url;
  public activarModal:string='';
  public fecha=new Date();
  public ano= this.fecha.getFullYear();
  public ultimo:any={};


  constructor(private _route:ActivatedRoute, private _router:Router, public estudianteService:EstudianteService) { 
    this.url=global.url;
  }

  ngOnInit() {
    this.getDetalles();
  }
  
  public generatePDF()  
  {  
    var data = document.getElementById('content');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'legal'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('Ficha-'+this.estudiante.nombre+' '+this.estudiante.apellido+'.pdf'); // Generated PDF   
    });  
   
  } 

mostrarModal(){
  this.activarModal='block';
}
ocultarModal(){
  this.activarModal='';
}
  getDetalles(){
    this._route.params.subscribe(params=>{
      let id=params['id'];
    console.log(id);
    this.estudianteService.getEstudiante(id).subscribe(response =>{
      if(response.status =='success'){
        this.estudiante=response.estudiante;
        console.log(this.estudiante);
      }      
    },
      err=>console.log(err)
    )
    this.estudianteService.getDoc(id).subscribe(response =>{
      if(response.status =='success'){
        this.doc=response.doc;
        console.log(this.doc);
      }      
    },
      err=>console.log(err)
    )
    this.estudianteService.getApoderadosByEstudiantes(id).subscribe(response =>{
      if(response.status =='success'){
        this.apoderados=response.apoderados;
        this.c1=this.apoderados.length;
        console.log(this.apoderados);
      }      
    },
      err=>console.log(err)
    )
    this.estudianteService.getDiagnosticosByEstudiantes(id).subscribe(response =>{
      if(response.status =='success'){
        this.diagnosticos=response.diagnosticos;
        this.c2=this.diagnosticos.length;
        console.log(this.diagnosticos);
      }      
    },
      err=>console.log(err)
    )
    this.estudianteService.getDocumentosByEstudiantes(id).subscribe(response =>{
      if(response.status =='success'){
        this.documentos=response.documentos;
        this.c3=this.documentos.length;
        console.log(this.documentos);
      }      
    },
      err=>console.log(err)
    )
    
    this.estudianteService.getHistorialesByEstudiantes(id).subscribe(response =>{
      if(response.status =='success'){
        this.historial=response.historial;
        this.c4=this.historial.length;
        console.log(this.historial);
      }      
    },
      err=>console.log(err)
    )
    this.estudianteService.getEntrevistasByEstudiantes(id).subscribe(response =>{
      if(response.status =='success'){
        this.entrevistas=response.entrevistas;
        this.c5=this.entrevistas.length;
        console.log(this.entrevistas);
      }      
    },
      err=>console.log(err)
    )
    this.estudianteService.getFichasByEstudiantes(id).subscribe(response =>{
      if(response.status =='success'){
        this.fichas=response.fichas;
        this.c6=this.fichas.length;
        console.log(this.fichas);
      }      
    },
      err=>console.log(err)
    )
    this.estudianteService.getUltimoDiagnostico(id).subscribe(response =>{
      if(response.status =='success'){
        this.ultimo=response.diagnosticos;
        console.log(this.ultimo);
      }      
    },
      err=>console.log(err)
    )
    });
  }

  mostrarApoderados(){
      document.getElementById("Apoderados").setAttribute("style","display:normal");
      document.getElementById("Entrevistas").setAttribute("style","display:none"); 
      document.getElementById("Diagnosticos").setAttribute("style","display:none"); 
      document.getElementById("Documentos").setAttribute("style","display:none");
      document.getElementById("Fichas").setAttribute("style","display:none");  
      document.getElementById("Historial").setAttribute("style","display:none");
   }
  mostrarEntrevistas(){
      document.getElementById("Apoderados").setAttribute("style","display:none");
      document.getElementById("Entrevistas").setAttribute("style","display:normal");
      document.getElementById("Diagnosticos").setAttribute("style","display:none"); 
      document.getElementById("Documentos").setAttribute("style","display:none");
      document.getElementById("Fichas").setAttribute("style","display:none");  
      document.getElementById("Historial").setAttribute("style","display:none");
    }
    mostrarDiagnosticos(){
      document.getElementById("Apoderados").setAttribute("style","display:none");
      document.getElementById("Entrevistas").setAttribute("style","display:none");
      document.getElementById("Diagnosticos").setAttribute("style","display:normal"); 
      document.getElementById("Documentos").setAttribute("style","display:none");
      document.getElementById("Fichas").setAttribute("style","display:none");  
      document.getElementById("Historial").setAttribute("style","display:none");
    }
    mostrarDocumentos(){
      document.getElementById("Apoderados").setAttribute("style","display:none");
      document.getElementById("Entrevistas").setAttribute("style","display:none");
      document.getElementById("Diagnosticos").setAttribute("style","display:none"); 
      document.getElementById("Documentos").setAttribute("style","display:normal");
      document.getElementById("Fichas").setAttribute("style","display:none"); 
      document.getElementById("Historial").setAttribute("style","display:none"); 
    }
    mostrarFichas(){
      document.getElementById("Apoderados").setAttribute("style","display:none");
      document.getElementById("Entrevistas").setAttribute("style","display:none");
      document.getElementById("Diagnosticos").setAttribute("style","display:none"); 
      document.getElementById("Documentos").setAttribute("style","display:none");
      document.getElementById("Historial").setAttribute("style","display:none"); 
      document.getElementById("Fichas").setAttribute("style","display:normal"); 
    }
    mostrarHistorial(){
      document.getElementById("Apoderados").setAttribute("style","display:none");
      document.getElementById("Entrevistas").setAttribute("style","display:none");
      document.getElementById("Diagnosticos").setAttribute("style","display:none"); 
      document.getElementById("Documentos").setAttribute("style","display:none"); 
      document.getElementById("Fichas").setAttribute("style","display:none"); 
      document.getElementById("Historial").setAttribute("style","display:normal"); 
    }
}
