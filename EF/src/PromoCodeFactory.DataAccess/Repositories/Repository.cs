using PromoCodeFactory.Core.Domain;
using PromoCodeFactory.Core.Abstractions.Repositories;

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace PromoCodeFactory.DataAccess.Repositories
{
    public class Repository<T> : IRepository<T> where T : BaseEntity
    {
        protected readonly AppDbContext _db;
        private readonly DbSet<T> _entitySet;

        protected IEnumerable<T> Data { get; set; }

        public Repository(AppDbContext db)
        {
            _db = db;
            _entitySet = _db.Set<T>();
        }



        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _entitySet.ToListAsync();
        }

        public async Task<T> GetByIdAsync(Guid id)
        {
            return await _entitySet.FirstOrDefaultAsync(id);
        }
    }
}
