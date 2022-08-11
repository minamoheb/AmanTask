using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using RepositoryLayer.Repository;

namespace RepositoryLayer.UnitOfWork
{
    public interface IUnitOfWork<TContext> where TContext :DbContext
    {
        IRepository<TEntity> GetRepository<TEntity>() where TEntity : class;
      
    }
}
