
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
        [Route("insertar")]
        public async Task<IActionResult> Insertar([FromBody] ActividadEconomicas actividad)
        {

            await _context.ActividadEconomicas.AddAsync(actividad);
            await _context.SaveChangesAsync();
            return Ok(actividad);
        }

        [HttpGet]
        [Route("leer")]
        public async Task<List<ActividadEconomicas>> Leer()
        {
            var actividades = await _context.ActividadEconomicas.ToListAsync();
            return actividades;
        }

        [HttpGet]
        [Route("consultar")]
        public async Task<ActividadEconomicas?> Consultar([FromQuery] int Id)
        {
            var actividad = await _context.ActividadEconomicas.FirstOrDefaultAsync(a => a.id == Id);
            return actividad;
        }

        [HttpPut]
        [Route("editar")]
        public async Task<IActionResult> Editar(ActividadEconomicas actividad)
        {
            var actividadExistente = await _context.ActividadEconomicas.FirstOrDefaultAsync(a => a.id == actividad.id);
            if (actividadExistente == null)
            {
                return BadRequest();
            }
            actividadExistente.descripcion = actividad.descripcion;
            actividadExistente.categoria = actividad.categoria;
            actividadExistente.codigoCiiu = actividad.codigoCiiu;
            actividadExistente.nombre = actividad.nombre;
            _context.ActividadEconomicas.Update(actividadExistente);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("eliminar")]
        public async Task<IActionResult> Eliminar([FromQuery] int Id)
        {
            var actividad = await _context.ActividadEconomicas.FindAsync(Id);
            if (actividad == null)
            {
                return BadRequest();
            }
            _context.ActividadEconomicas.Remove(actividad);
            await _context.SaveChangesAsync();
            return Ok();
        }
        // Pseudocódigo:
        // 1. Agregar un nuevo endpoint GET con la ruta "listar".
        // 2. El método debe devolver la lista de actividades económicas, igual que el método "Leer".
        // 3. El método debe ser público, asíncrono y retornar Task<List<ActividadEconomicas>>.
        // 4. Usar el mismo código que el método "Leer" para obtener los datos de la base de datos.

        [HttpGet]
        [Route("listar")]
        public async Task<List<ActividadEconomicas>> Listar()
        {
            var actividades = await _context.ActividadEconomicas.ToListAsync();
            return actividades;
        }
    }
}
