using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Query;

namespace RepositoryLayer.Repository
{
    public interface IRepository<T>
    {
        Task<List<T>> GetList(Expression<Func<T, bool>> predicate = null,
              Func<IQueryable<T>,
                  IOrderedQueryable<T>> orderBy = null,
              Func<IQueryable<T>,
                  IIncludableQueryable<T, object>> include = null,
              bool disableTracking = true);
        //    T Get(int Id);
        Task<T> Find(object id);

        void Insert(T entity);
        void Update(T entity);
        void Delete(T entity);
        void SaveChanges();
    }
}
