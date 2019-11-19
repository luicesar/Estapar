import { Manobrista } from './../../shared/manobrista.model';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ManobristaService } from 'src/app/shared/manobrista.service';

@Component({
  selector: 'app-manobrista-list',
  templateUrl: './manobrista-list.component.html',
  styleUrls: ['./manobrista-list.component.css']
})
export class ManobristaListComponent implements OnInit {
  private dataHoje: string;
  constructor(
    private service: ManobristaService,
    private toastr: ToastrService
  ) {
    this.dataHoje = new Date().toJSON();
  }

  ngOnInit() {
    this.service.refreshList();
  }

  resetForm() {
    this.service.formData = {
      id: 0,
      pessoaId: 0,
      pessoaNome: '',
      carroId: 0,
      marcaNome: '',
      modeloNome: '',
      dataCriacao: this.dataHoje
    };
  }

  populateForm(manobrista: Manobrista) {
    this.service.formData = Object.assign({}, manobrista);
  }

  onDelete(id: number) {
    if (confirm('Deseja apagar o registro ?')) {
      this.service.deleteManobrista(id).subscribe(res => {
        this.service.refreshList();
        this.toastr.warning('Registro apagado sucesso.', 'Informação');
        this.resetForm();
      });
    }
  }
}
