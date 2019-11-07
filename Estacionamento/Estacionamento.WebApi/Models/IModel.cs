using Estacionamento.Shared.Entities;

namespace Estacionamento.WebApi.Models {
  public interface IModel<D> where D : Entity {
    D MapForDomain ();
  }
}