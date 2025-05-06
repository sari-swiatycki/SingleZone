using SingleZone.Core.entities;
using System.Collections.Generic;

namespace SingleZone.Core.Interfaces
{
    public interface IRepository<T>
    {
        List<T> GetAll();

        T  Add(T entity);

        T GetById(int id);

        int GetIndexById(int id);

        bool Update(T entity, int index);

        bool Delete(int index);
     
    }
}
