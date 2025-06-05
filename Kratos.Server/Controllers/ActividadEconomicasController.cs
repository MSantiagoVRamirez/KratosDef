
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
    public class ActividadEconomicasController : ControllerBase
    {
        private readonly KratosContext _context;
        public ActividadEconomicasController(KratosContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("RegistrarActividad")]
        public async Task<IActionResult> RegistrarActividad(ActividadEconomicas actividad)
        {
            if (actividad == null)
            {
                return BadRequest("Datos de actividad inválidos.");
            }

            await _context.ActividadEconomicas.AddAsync(actividad);
            await _context.SaveChangesAsync();
            return Ok(actividad);
        }
        [HttpGet]
        [Route("Listar")]
        public async Task<List<ActividadEconomicas>> Listar()
        {
            var actividades = await _context.ActividadEconomicas.ToListAsync();
            return actividades;
        }

        [HttpGet]
        [Route("Consultar")]
        public async Task<ActividadEconomicas?> Consultar(int id)
        {
            var actividad = await _context.ActividadEconomicas.FirstOrDefaultAsync(a => a.id == id);
            return actividad;
        }

        [HttpPut]
        [Route("Actualizar")]
        public async Task<IActionResult> Actualizar(ActividadEconomicas actividad)
        {
            var actividadExistente = await _context.ActividadEconomicas.FirstOrDefaultAsync(a => a.id == actividad.id);
            if (actividadExistente == null)
            {
                return BadRequest();
            }
            actividadExistente.descripcion = actividad.descripcion;
            actividadExistente.categoria = actividad.categoria;
            _context.ActividadEconomicas.Update(actividadExistente);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("Eliminar")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var actividad = await _context.ActividadEconomicas.FindAsync(id);
            if (actividad == null)
            {
                return BadRequest();
            }
            _context.ActividadEconomicas.Remove(actividad);
            await _context.SaveChangesAsync();
            return Ok();
        }
    
    }
}
