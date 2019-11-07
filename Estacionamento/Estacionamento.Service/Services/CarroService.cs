using System;
using System.Collections.Generic;
using System.Text;
using Estacionamento.Domain.Entities;
using Estacionamento.Repository.DataContext;
using Estacionamento.Repository.Interfaces;
using Estacionamento.Service.Interfaces;

namespace Estacionamento.Service.Services {
  public class CarroService : ServiceBase<CarroDomain>, ICarroService {
    public CarroService (EstacionamentoDataContext dbContext, ICarroRepository categoria) : base (dbContext) {

    }
  }
}