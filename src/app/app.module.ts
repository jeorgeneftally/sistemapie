import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './login/admin/admin.component';
import { EstudianteComponent } from './login/admin/estudiante/estudiante.component';
import { ApoderadoComponent } from './login/admin/apoderado/apoderado.component';
import { FichaSaludComponent } from './login/admin/ficha-salud/ficha-salud.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import {LOCALE_ID} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeEsCL from '@angular/common/locales/es-CL';
import { EntrevistaComponent } from './login/admin/entrevista/entrevista.component';
import { DocumentoComponent } from './login/admin/documento/documento.component';
import { DiagnosticoComponent } from './login/admin/diagnostico/diagnostico.component';
import { HistorialacademicoComponent } from './login/admin/historialacademico/historialacademico.component';
import { RegistroUsuariosComponent } from './login/admin/registro-usuarios/registro-usuarios.component';
import { FilterPipe } from './pipes/filter.pipe';
import { NgxPaginationModule} from 'ngx-pagination';
import { InicioComponent } from './login/admin/inicio/inicio.component';
import { DetalleEstudianteComponent } from './login/admin/estudiante/detalle-estudiante/detalle-estudiante.component';
import { EstudianteapoderadoComponent } from './login/admin/estudianteapoderado/estudianteapoderado.component';
import { EditarPerfilComponent } from './login/admin/registro-usuarios/editar-perfil/editar-perfil.component';
import { UsuariosComponent } from './login/admin/registro-usuarios/usuarios/usuarios.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import {AuthGuard} from '././guard/auth.guard';


registerLocaleData(localeEsCL,'es-CL');
const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'Admin',component:LoginComponent},
  {path:'logout/:sure',component:LoginComponent},
  
  {path:'Inicio',component:AdminComponent,
    children:[
      {
        path:'',
        component:InicioComponent,
        canActivate:[AuthGuard]
      },
      {path:'Detalle/:id',component:DetalleEstudianteComponent,
      canActivate:[AuthGuard]},
      {path:'Estudiantes',component:EstudianteComponent,
      canActivate:[AuthGuard]
      },
      {
        path:'Apoderados',
        component:ApoderadoComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'Ficha_Salud',
        component:FichaSaludComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'Entrevistas',
        component:EntrevistaComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'Diagnosticos',
        component:DiagnosticoComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'Registro',
        component:RegistroUsuariosComponent,
        canActivate:[AuthGuard],
       
      }
      ,
      {
        path:'Historial',
        component:HistorialacademicoComponent,
        canActivate:[AuthGuard]
      }
      ,
      {
        path:'Documentos',
        component:DocumentoComponent,
        canActivate:[AuthGuard]

      }
      ,
      {
        path:'Relacion',
        component:EstudianteapoderadoComponent,
        canActivate:[AuthGuard]
      }
      ,
      {
        path:'EditarPerfil',
        component:EditarPerfilComponent,
        canActivate:[AuthGuard]
      }
      ,
      {
        path:'Usuarios',
        component:UsuariosComponent,
        canActivate:[AuthGuard]
      }
    ]
  },
  
];

@NgModule({
      declarations: [
        AppComponent,
        LoginComponent,
        
        EstudianteComponent,
        ApoderadoComponent,
        FichaSaludComponent,
        EntrevistaComponent,
        DocumentoComponent,
        DiagnosticoComponent,
        HistorialacademicoComponent,
        RegistroUsuariosComponent,
        FilterPipe,
        InicioComponent,
        DetalleEstudianteComponent,
        EstudianteapoderadoComponent,
        EditarPerfilComponent,
        UsuariosComponent,
        AdminComponent,
      
      ],
      imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        FormsModule,
        HttpClientModule,
        NgxPaginationModule,
        AngularFileUploaderModule
      ],
      providers: [{provide: LOCALE_ID, useValue:'es-CL'}],
      bootstrap: [AppComponent]
    })
export class AppModule { }
