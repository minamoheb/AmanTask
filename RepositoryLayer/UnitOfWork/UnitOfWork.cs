using Microsoft.EntityFrameworkCore;
using RepositoryLayer.Repository;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RepositoryLayer.UnitOfWork
{
    public class UnitOfWork<TContext> : IUnitOfWork<TContext> where TContext : DbContext
    {
        private Dictionary<Type, object> _repositories;
        private DbContext Context { get; }
        public UnitOfWork(DbContext context)
        {
            Context = context ?? throw new ArgumentNullException(nameof(context));
        }
        
        public IRepository<TEntity> GetRepository<TEntity>() where TEntity : class
        {
            if (_repositories == null) _repositories = new Dictionary<Type, object>();

            var type = typeof(TEntity);
            if (!_repositories.ContainsKey(type)) _repositories[type] = new Repository<TEntity>(Context);
            return (IRepository<TEntity>) _repositories[type];
        }

    
    }
}
