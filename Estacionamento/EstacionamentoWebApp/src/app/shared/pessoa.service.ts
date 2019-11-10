import { Pessoa } from "./pessoa.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class PessoaService {
  formData: Pessoa;
  list: Pessoa[];
  readonly rootURL = "http://localhost:5000/api";
  constructor(private http: HttpClient) {}

  postPessoa(formData: Pessoa) {
    return this.http.post(this.rootURL + "/Pessoa", formData);
  }

  refreshList() {
    this.http
      .get(this.rootURL + "/Pessoa")
      .toPromise()
      .then(res => (this.list = res as Pessoa[]));
  }

  putPessoa(formData: Pessoa) {
    return this.http.put(this.rootURL + "/Pessoa/" + formData.id, formData);
  }

  deletePessoa(id: number) {
    return this.http.delete(this.rootURL + "/Pessoa/" + id);
  }
}
