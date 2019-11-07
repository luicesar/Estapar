using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using Estacionamento.Domain.Entities;
using Estacionamento.Repository;
using Estacionamento.Repository.DataContext;
using Estacionamento.Service.Interfaces;
using Estacionamento.Shared.Entities;

namespace Estacionamento.Service {
  public class ServiceBase<T> : RepositoryBase<T>, IServiceBase<T> where T : Entity {
    public ServiceBase (EstacionamentoDataContext dbContext) : base (dbContext) { }

  }
}