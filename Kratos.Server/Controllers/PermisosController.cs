
using kratos.Server.Models.Kratos;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Kratos.Server.Models;
using Microsoft.AspNetCore.Authorization;

namespace kratos.Server.Controllers
{
   // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PermisosController : ControllerBase
    {
        private readonly KratosContext _context;
        public PermisosController(KratosContext context)
        {
            _context = context;
        }
        [HttpPost]
        [Route("RegistrarPermiso")]
        public async Task<IActionResult> RegistrarPermiso(Permisos permiso)
        {
            if (permiso == null)
            {
                return BadRequest("Datos de permiso inválidos.");
            }

            await _context.Permisos.AddAsync(permiso);
            await _context.SaveChangesAsync();
            return Ok(permiso);
        }
        [HttpGet]
        [Route("Listar")]
        public async Task<List<Permisos>> Listar()
        {
            var permisos = await _context.Permisos.ToListAsync();
            return permisos;
        }

        [HttpGet]
        [Route("Consultar")]
        public async Task<Permisos?> Consultar(int id)
        {
            var permiso = await _context.Permisos.FirstOrDefaultAsync(p => p.id == id);
            return permiso;
        }

        [HttpPut]
        [Route("Actualizar")]
        public async Task<IActionResult> Actualizar(Permisos permiso)
        {
            var permisoExistente = await _context.Permisos.FirstOrDefaultAsync(p => p.id == permiso.id);
            if (permisoExistente == null)
            {
                return BadRequest();
            }
            permisoExistente.rolesId = permiso.rolesId;
            permisoExistente.modulosId = permiso.modulosId;
            permisoExistente.descripcion = permiso.descripcion;
            permisoExistente.consultar = permiso.consultar;
            permisoExistente.leer = permiso.leer;
            permisoExistente.insertar = permiso.insertar;
            permisoExistente.editar = permiso.editar;
            permisoExistente.eliminar = permiso.eliminar;
            permisoExistente.importar = permiso.importar;
            permisoExistente.exportar = permiso.exportar;
            _context.Permisos.Update(permisoExistente);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("Eliminar")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var permiso = await _context.Permisos.FindAsync(id);
            if (permiso == null)
            {
                return BadRequest();
            }
            _context.Permisos.Remove(permiso);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
