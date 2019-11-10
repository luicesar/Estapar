import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ManobristaService } from "src/app/shared/manobrista.service";
import { CarroService } from "src/app/shared/carro.service";
import { PessoaService } from "src/app/shared/pessoa.service";
import { Carro } from "src/app/shared/carro.model";
import { Pessoa } from "src/app/shared/pessoa.model";
import { Manobrista } from "src/app/shared/manobrista.model";

@Component({
  selector: "app-manobrista",
  templateUrl: "./manobrista.component.html",
  styleUrls: ["./manobrista.component.css"]
})
export class ManobristaComponent implements OnInit {
  private dataHoje: string;
  public manobrista: Manobrista;

  constructor(
    private service: ManobristaService,
    private serviceCarro: CarroService,
    private servicePessoa: PessoaService,
    private toastr: ToastrService
  ) {
    this.dataHoje = new Date().toJSON();
    this.manobrista = new Manobrista();
  }

  ngOnInit() {
    this.resetForm();
    this.serviceCarro.refreshList();
    this.servicePessoa.refreshList();
  }

  changeCarro(e) {
    this.manobrista.carroId = e.target.value;
    this.service.formData.carroId = e.target.value;

    console.log(e.target.value);
  }

  changePessoa(e) {
    this.manobrista.pessoaId = e.target.value;
    this.service.formData.pessoaId = e.target.value;
    console.log(e.target.value);
  }

  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.service.formData = {
      id: 0,
      pessoaId: 0,
      pessoaNome: "",
      carroId: 0,
      marcaNome: "",
      modeloNome: "",
      dataCriacao: this.dataHoje
    };

    this.manobrista = new Manobrista();
    this.manobrista.pessoaId = 0;
    this.manobrista.carroId = 0;
    this.manobrista.dataCriacao = this.dataHoje;
  }

  onSubmit(form: NgForm) {
    form.value.pessoaId = this.service.formData.pessoaId;
    form.value.carroId = this.service.formData.carroId;

    //form.value.pessoaId = this.manobrista.pessoaId;
    //form.value.carroId = this.manobrista.carroId;

    form.value.dataCriacao = this.dataHoje;

    if (form.value.id === 0) this.insertRecord(form);
    else this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postManobrista(form.value).subscribe(res => {
      this.toastr.success("Dados Salvo Com Sucesso", "Informação");
      this.resetForm(form);
      this.service.refreshList();
    });
  }

  updateRecord(form: NgForm) {
    this.service.putManobrista(form.value).subscribe(res => {
      this.toastr.info("Dados Salvo Com Sucesso", "Informação");
      this.resetForm(form);
      this.service.refreshList();
    });
  }
}
