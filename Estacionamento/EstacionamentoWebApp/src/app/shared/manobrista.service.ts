import { Manobrista } from "./manobrista.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ManobristaService {
  formData: Manobrista;
  list: Manobrista[];
  readonly rootURL = "http://localhost:5000/api";

  constructor(private http: HttpClient) {}

  postManobrista(formData: Manobrista) {
    return this.http.post(this.rootURL + "/Manobrista", formData);
  }

  refreshList() {
    this.http
      .get(this.rootURL + "/Manobrista")
      .toPromise()
      .then(res => (this.list = res as Manobrista[]));
  }

  putManobrista(formData: Manobrista) {
    return this.http.put(this.rootURL + "/Manobrista/" + formData.id, formData);
  }

  deleteManobrista(id: number) {
    return this.http.delete(this.rootURL + "/Manobrista/" + id);
  }
}
