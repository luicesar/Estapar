using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Estacionamento.Domain.Entities;
using Estacionamento.Repository.DataContext;
using Estacionamento.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Estacionamento.Repository.Repositorys {
  public class ManobristaRepository : RepositoryBase<ManobristaDomain>, IManobristaRepository {
    EstacionamentoDataContext Dbcontext;
    public ManobristaRepository (EstacionamentoDataContext dbcontext) : base (dbcontext) {
      this.Dbcontext = dbcontext;
    }
  }
}