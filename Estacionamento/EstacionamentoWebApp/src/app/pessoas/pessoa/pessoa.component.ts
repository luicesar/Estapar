import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PessoaService } from 'src/app/shared/pessoa.service';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {
  private dataHoje: string;

  constructor(private service: PessoaService, private toastr: ToastrService) {
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
      nome: '',
      cpf: '',
      dataNascimento: '',
      dataCriacao: this.dataHoje
    };
  }

  parseDate(dateString: string): string {
    if (dateString) {
      return new Date(dateString).toISOString().split('T')[0];
    }
    return null;
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
    this.service.postPessoa(form.value).subscribe(res => {
      this.toastr.success('Dados Salvo Com Sucesso', 'Informação');
      this.resetForm(form);
      this.service.refreshList();
    });
  }

  updateRecord(form: NgForm) {
    this.service.putPessoa(form.value).subscribe(res => {
      this.toastr.info('Dados Salvo Com Sucesso', 'Informação');
      this.resetForm(form);
      this.service.refreshList();
    });
  }
}
