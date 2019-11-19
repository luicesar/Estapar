import { CarroService } from './../../shared/carro.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.css']
})
export class CarroComponent implements OnInit {
  private dataHoje: string;

  constructor(private service: CarroService, private toastr: ToastrService) {
    this.dataHoje = new Date().toJSON();
  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      id: 0,
      marca: '',
      modelo: '',
      placa: '',
      dataCriacao: this.dataHoje
    };
  }

  onSubmit(form: NgForm) {
    form.value.dataCriacao = this.dataHoje;
    if (form.value.id === 0) {
      this.insertRecord(form);
    } else {
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.service.postCarro(form.value).subscribe(res => {
      this.toastr.success('Dados Salvo Com Sucesso', 'Informação');
      this.resetForm(form);
      this.service.refreshList();
    });
  }

  updateRecord(form: NgForm) {
    this.service.putCarro(form.value).subscribe(res => {
      this.toastr.info('Dados Salvo Com Sucesso', 'Informação');
      this.resetForm(form);
      this.service.refreshList();
    });
  }
}
