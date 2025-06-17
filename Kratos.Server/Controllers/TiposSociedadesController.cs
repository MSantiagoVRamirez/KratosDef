
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
    public class TiposSociedadesController : ControllerBase
    {
        private readonly KratosContext _context;
        public TiposSociedadesController(KratosContext context)
        {
            _context = context;
        }
        [HttpPost]
        [Route("Registrar")]
        public async Task<IActionResult> Registrar(TiposSociedades tipoSociedad)
        {
            if (tipoSociedad == null)
            {
                return BadRequest("Datos de tipo de sociedad inválidos.");
            }

            await _context.TiposSociedades.AddAsync(tipoSociedad);
            await _context.SaveChangesAsync();
            return Ok(tipoSociedad);
        }
        [HttpGet]
        [Route("Listar")]
        public async Task<List<TiposSociedades>> Listar()
        {
            var tiposSociedades = await _context.TiposSociedades.ToListAsync();
            return tiposSociedades;
        }

        [HttpGet]
        [Route("Consultar")]
        public async Task<TiposSociedades?> Consultar(int id)
        {
            var tipoSociedad = await _context.TiposSociedades.FirstOrDefaultAsync(t => t.id == id);
            return tipoSociedad;
        }

        [HttpPut]
        [Route("Actualizar")]
        public async Task<IActionResult> Actualizar(TiposSociedades tipoSociedad)
        {
            var tipoSociedadExistente = await _context.TiposSociedades.FirstOrDefaultAsync(t => t.id == tipoSociedad.id);
            if (tipoSociedadExistente == null)
            {
                return BadRequest();
            }
            tipoSociedadExistente.descripcion = tipoSociedad.descripcion;
            _context.TiposSociedades.Update(tipoSociedadExistente);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("Eliminar")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var tipoSociedad = await _context.TiposSociedades.FindAsync(id);
            if (tipoSociedad == null)
            {
                return BadRequest();
            }
            _context.TiposSociedades.Remove(tipoSociedad);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
