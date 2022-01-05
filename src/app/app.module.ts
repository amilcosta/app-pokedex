import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TestcomponentComponent } from './componentes/testcomponent/testcomponent.component';
import { BarraComponent } from './componentes/barra/barra.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { LstPokemonSearchComponent } from './componentes/lst-pokemon-search/lst-pokemon-search.component';

const routes: Routes = [
  { path: 'principal', component: PrincipalComponent},
  { path: 'lstPokemonSearch', component: LstPokemonSearchComponent},
  { path: '', component: PrincipalComponent},
  { path: '**', component: PrincipalComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    TestcomponentComponent,
    BarraComponent,
    PrincipalComponent,
    LstPokemonSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
