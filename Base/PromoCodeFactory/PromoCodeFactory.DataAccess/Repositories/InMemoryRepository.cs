using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PromoCodeFactory.Core.Abstractions.Repositories;
using PromoCodeFactory.Core.Domain;
namespace PromoCodeFactory.DataAccess.Repositories
{
    public class InMemoryRepository<T>: IRepository<T> where T: BaseEntity
    {
        protected IEnumerable<T> Data { get; set; }

        public InMemoryRepository(IEnumerable<T> data)
        {
            Data = data;
        }

        public Task<IEnumerable<T>> GetAllAsync()
        {
            return Task.FromResult(Data);
        }

        public Task<T> GetByIdAsync(Guid id)
        {
            return Task.FromResult(Data.FirstOrDefault(x => x.Id == id));
        }

        public void DelById(Guid id)
        {
            Data = Data.Where(x => x.Id != id);
        }

        public void InsEmpl(T item)
        {
            //Data.ToList().Add(item);

            //IEnumerable<T> tt = new List<T>() { item };
            //Data.Concat(tt);

            //Data.Append(item);

            var dat = Data.ToList();
            dat.Add(item);
            Data = dat;
        }

        public void UpdEmpl(T item)
        {
            T tt = Data.ToList().FirstOrDefault(x => x.Id == item.Id);
            if (tt != null)
            {
                tt = item;
            }
            else
            {
                throw new ApplicationException("Record not found");
            }
        }
    }
}