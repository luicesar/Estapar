import { Pessoa } from "./../../shared/pessoa.model";
import { Component, OnInit } from "@angular/core";
import { PessoaService } from "src/app/shared/pessoa.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-pessoa-list",
  templateUrl: "./pessoa-list.component.html",
  styleUrls: ["./pessoa-list.component.css"]
})
export class PessoaListComponent implements OnInit {
  private dataHoje: string;
  constructor(private service: PessoaService, private toastr: ToastrService) {
    this.dataHoje = new Date().toJSON();
  }

  ngOnInit() {
    this.service.refreshList();
  }

  resetForm() {
    this.service.formData = {
      id: 0,
      nome: "",
      cpf: "",
      dataNascimento: "",
      dataCriacao: this.dataHoje
    };
  }

  populateForm(pessoa: Pessoa) {
    pessoa.dataNascimento = this.parseDate(pessoa.dataNascimento);
    this.service.formData = Object.assign({}, pessoa);
  }

  parseDate(dateString: string): string {
    if (dateString) {
      return new Date(dateString).toISOString().split("T")[0];
    }
    return null;
  }

  onDelete(id: number) {
    if (confirm("Deseja apagar o registro ?")) {
      this.service.deletePessoa(id).subscribe(res => {
        this.service.refreshList();
        this.toastr.warning("Registro apagado sucesso.", "Informação");
        this.resetForm();
      });
    }
  }
}
