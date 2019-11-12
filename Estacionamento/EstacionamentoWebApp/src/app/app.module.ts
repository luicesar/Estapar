import { CarroService } from "./shared/carro.service";
import { PessoaService } from "./shared/pessoa.service";
import { ManobristaService } from "./shared/manobrista.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

import { appRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { CarrosComponent } from "./carros/carros.component";
import { CarroComponent } from "./carros/carro/carro.component";
import { CarroListComponent } from "./carros/carro-list/carro-list.component";
import { HomeComponent } from './home/home.component';
import { PessoasComponent } from './pessoas/pessoas.component';
import { PessoaComponent } from './pessoas/pessoa/pessoa.component';
import { PessoaListComponent } from './pessoas/pessoa-list/pessoa-list.component';
import { ManobristasComponent } from './manobristas/manobristas.component';
import { ManobristaComponent } from './manobristas/manobrista/manobrista.component';
import { ManobristaListComponent } from './manobristas/manobrista-list/manobrista-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CarrosComponent,
    CarroComponent,
    CarroListComponent,
    HomeComponent,
    PessoasComponent,
    PessoaComponent,
    PessoaListComponent,
    ManobristasComponent,
    ManobristaComponent,
    ManobristaListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    appRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [CarroService, PessoaService, ManobristaService],
  bootstrap: [AppComponent]
})
export class AppModule {}
