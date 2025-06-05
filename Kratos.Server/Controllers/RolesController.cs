
using kratos.Server.Models.Kratos;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Kratos.Server.Models;
using Microsoft.AspNetCore.Authorization;

namespace kratos.Server.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly KratosContext _context;
        public RolesController(KratosContext context)
        {
            _context = context;
        }
        [HttpPost]
        [Route("RegistrarRol")]
        public async Task<IActionResult> RegistrarRol(Roles rol)
        {
            if (rol == null)
            {
                return BadRequest("Datos de rol inválidos.");
            }

            await _context.Roles.AddAsync(rol);
            await _context.SaveChangesAsync();
            return Ok(rol);
        }
        [HttpGet]
        [Route("Listar")]
        public async Task<List<Roles>> Listar()
        {
            var roles = await _context.Roles.ToListAsync();
            return roles;
        }

        [HttpGet]
        [Route("Consultar")]
        public async Task<Roles?> Consultar(int id)
        {
            var rol = await _context.Roles.FirstOrDefaultAsync(r => r.id == id);
            return rol;
        }

        [HttpPut]
        [Route("Actualizar")]
        public async Task<IActionResult> Actualizar(Roles rol)
        {
            var rolExistente = await _context.Roles.FirstOrDefaultAsync(r => r.id == rol.id);
            if (rolExistente == null)
            {
                return BadRequest();
            }
            rolExistente.descripcion = rol.descripcion;
            rolExistente.empresaId = rol.empresaId;
            _context.Roles.Update(rolExistente);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("Eliminar")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var rol = await _context.Roles.FindAsync(id);
            if (rol == null)
            {
                return BadRequest();
            }
            _context.Roles.Remove(rol);
            await _context.SaveChangesAsync();
            return Ok();
        }
       
    }
}
