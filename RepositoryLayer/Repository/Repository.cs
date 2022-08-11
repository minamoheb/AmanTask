using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;


namespace RepositoryLayer.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        #region property

        private readonly DbContext _dbContext;
        private  DbSet<T> _dbSet;

        #endregion

        #region Constructor
        public Repository(DbContext context)
        {
            _dbContext = context ?? throw new ArgumentException(nameof(context));
            _dbSet = _dbContext.Set<T>();
        }
        #endregion
        public void Insert(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            _dbSet.Add(entity);
            _dbContext.SaveChanges();
        }
        public void Update(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            _dbSet.Update(entity);
            _dbContext.SaveChanges();
        }
   
        public void Delete(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            _dbContext.Set<T>().Remove(entity);
            _dbContext.SaveChanges();
        }

        //public T Get(int Id)
        //{
        //    return entities.SingleOrDefault(c => c.Id == Id);
        //}
        public async Task<T> Find(object id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<List<T>> GetList(Expression<Func<T, bool>> predicate,
           Func<IQueryable<T>, IOrderedQueryable<T>> orderBy,
           Func<IQueryable<T>, IIncludableQueryable<T, object>> include,
           bool disableTracking)
        {
            IQueryable<T> query = _dbSet;

            if (disableTracking) query = query.AsNoTracking();

            if (include != null) query = include(query);

            if (predicate != null) query = query.Where(predicate);

            if (orderBy != null)
                return await orderBy(query).ToListAsync();
            return await query.ToListAsync();
        }




        public void SaveChanges()
        {
            _dbContext.SaveChanges();
        }


    }
}