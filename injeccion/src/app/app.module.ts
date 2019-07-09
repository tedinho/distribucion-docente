import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParametroListaComponent } from './parametro-lista/parametro-lista.component';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ParametroFormComponent } from './parametro-form/parametro-form.component';
import { FormsModule } from '@angular/forms';
import { DocenteListaComponent } from './docente-lista/docente-lista.component';
import { DocenteFormComponent } from './docente-form/docente-form.component';
import { CarreraListaComponent } from './carrera-lista/carrera-lista.component';
import { CarreraFormComponent } from './carrera-form/carrera-form.component';

//dependencias externas
import {NgxPaginationModule} from 'ngx-pagination';


const routes: Routes = [
  { path: 'parametro-lista', component: ParametroListaComponent },
  { path: 'parametro-form' , component: ParametroFormComponent },
  { path: 'docente-lista' , component: DocenteListaComponent },
  { path: 'docente-form' , component: DocenteFormComponent },
  { path: 'carrera-form' , component: CarreraFormComponent },
  { path: 'carrera-lista' , component: CarreraListaComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ParametroListaComponent,
    ParametroFormComponent,
    DocenteListaComponent,
    DocenteFormComponent,
    CarreraFormComponent,
    CarreraListaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

