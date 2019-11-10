import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CarrosComponent } from "./carros/carros.component";
import { PessoasComponent } from "./pessoas/pessoas.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "Carro", component: CarrosComponent },
  { path: "Pessoa", component: PessoasComponent },

  // otherwise redirect to home
  { path: "**", redirectTo: "" }
];

export const appRoutingModule = RouterModule.forRoot(routes);
