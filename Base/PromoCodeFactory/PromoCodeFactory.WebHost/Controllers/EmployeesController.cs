using Microsoft.AspNetCore.Mvc;
using PromoCodeFactory.Core.Abstractions.Repositories;
using PromoCodeFactory.Core.Domain.Administration;
using PromoCodeFactory.WebHost.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PromoCodeFactory.WebHost.Controllers
{
    /// <summary>
    /// Сотрудники
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly IRepository<Employee> _employeeRepository;
        private readonly IRepository<Role> _roleRepository;

        //public EmployeesController(IRepository<Employee> employeeRepository)
        //{
        //    _employeeRepository = employeeRepository;
        //}

        public EmployeesController(IRepository<Employee> employeeRepository, IRepository<Role> roleRepository)
        {
            _employeeRepository = employeeRepository;
            _roleRepository = roleRepository;
        }


        /// <summary>
        /// Получить данные всех сотрудников
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<List<EmployeeShortResponse>> GetEmployeesAsync()
        {
            var employees = await _employeeRepository.GetAllAsync();

            var employeesModelList = employees.Select(x =>
                new EmployeeShortResponse()
                {
                    Id = x.Id,
                    Email = x.Email,
                    FullName = x.FullName,
                }).ToList();

            return employeesModelList;
        }

        /// <summary>
        /// Получить данные сотрудника по Id
        /// </summary>
        /// <returns></returns>
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<EmployeeResponse>> GetEmployeeByIdAsync(Guid id)
        {
            var employee = await _employeeRepository.GetByIdAsync(id);

            if (employee == null)
                return NotFound();

            var employeeModel = new EmployeeResponse()
            {
                Id = employee.Id,
                Email = employee.Email,
                Roles = employee.Roles.Select(x => new RoleItemResponse()
                {
                    Name = x.Name,
                    Description = x.Description
                }).ToList(),
                FullName = employee.FullName,
                AppliedPromocodesCount = employee.AppliedPromocodesCount
            };

            return employeeModel;
        }


        /// <summary>
        /// Удалить данные сотрудника по Id
        /// </summary>
        [HttpDelete("{id:guid}")]
        public async Task<ActionResult> DelEmployeeByIdAsync(Guid id)
        {
            _employeeRepository.DelById(id);

            return Ok();
        }


        /// <summary>
        /// Добавить данные сотрудника
        /// </summary>
        [HttpPost]
        public async Task<ActionResult> InsEmployeeAsync(string fname, string lname, string email, string role)
        {
            Employee employee = new Employee();
            employee.Id = Guid.NewGuid();
            employee.FirstName = fname;
            employee.LastName = lname;
            employee.Email = email;
            employee.AppliedPromocodesCount = 0;
            employee.Roles = new List<Role>();

            IEnumerable<Role> roles = await _roleRepository.GetAllAsync();
            Role _role = roles.Where(x => x.Name == role).First();
            if (_role != null)
            { employee.Roles.Add(_role); }

            _employeeRepository.InsEmpl(employee);

            return Ok();
        }

        /// <summary>
        /// Обновить данные сотрудника
        /// </summary>
        [HttpPut]
        public async Task<ActionResult> UpdEmployeeAsync(Guid id, string fname, string lname, string email)
        {
            Employee employee = await _employeeRepository.GetByIdAsync(id);
            if (employee != null)
            {
                employee.FirstName = fname;
                employee.LastName = lname;
                employee.Email = email;
            }

            _employeeRepository.UpdEmpl(employee);

            return Ok();
        }

    }
}