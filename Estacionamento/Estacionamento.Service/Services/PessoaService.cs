using System;
using System.Collections.Generic;
using System.Text;
using Estacionamento.Domain.Entities;
using Estacionamento.Repository.DataContext;
using Estacionamento.Repository.Interfaces;
using Estacionamento.Service.Interfaces;

namespace Estacionamento.Service.Services {
  public class PessoaService : ServiceBase<PessoaDomain>, IPessoaService {
    public PessoaService (EstacionamentoDataContext dbContext, IPessoaRepository categoria) : base (dbContext) {

    }
  }
}