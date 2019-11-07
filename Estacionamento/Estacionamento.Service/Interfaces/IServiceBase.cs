using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using Estacionamento.Domain.Entities;
using Estacionamento.Repository.Interfaces;
using Estacionamento.Shared.Entities;

namespace Estacionamento.Service.Interfaces {
  public interface IServiceBase<T> : IRepositoryBase<T> where T : Entity {

  }
}