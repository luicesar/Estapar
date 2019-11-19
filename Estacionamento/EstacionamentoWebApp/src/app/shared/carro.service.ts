import { Carro } from './carro.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarroService {
  formData: Carro;
  list: Carro[];
  readonly rootURL = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  postCarro(formData: Carro) {
    return this.http.post(this.rootURL + '/Carro', formData);
  }

  refreshList() {
    this.http
      .get(this.rootURL + '/Carro')
      .toPromise()
      .then(res => (this.list = res as Carro[]));
  }

  putCarro(formData: Carro) {
    return this.http.put(this.rootURL + '/Carro/' + formData.id, formData);
  }

  deleteCarro(id: number) {
    return this.http.delete(this.rootURL + '/Carro/' + id);
  }
}
