import { Component, OnInit } from "@angular/core";
import { CarroService } from "src/app/shared/carro.service";
import { ToastrService } from "ngx-toastr";
import { Carro } from "src/app/shared/carro.model";

@Component({
  selector: "app-carro-list",
  templateUrl: "./carro-list.component.html",
  styleUrls: ["./carro-list.component.css"]
})
export class CarroListComponent implements OnInit {
  private dataHoje: string;
  constructor(private service: CarroService, private toastr: ToastrService) {
    this.dataHoje = new Date().toJSON();
  }

  ngOnInit() {
    this.service.refreshList();
  }

  resetForm() {
    this.service.formData = {
      id: 0,
      marca: "",
      modelo: "",
      placa: "",
      dataCriacao: this.dataHoje
    };
  }

  populateForm(car: Carro) {
    this.service.formData = Object.assign({}, car);
  }

  onDelete(id: number) {
    if (confirm("Deseja apagar o registro ?")) {
      this.service.deleteCarro(id).subscribe(res => {
        this.service.refreshList();
        this.toastr.warning("Registro apagado sucesso.", "Informação");
        this.resetForm();
      });
    }
  }
}
