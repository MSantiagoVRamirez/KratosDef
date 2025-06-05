
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
    public class ImpuestosController : ControllerBase
    {
        private readonly KratosContext _context;
        public ImpuestosController(KratosContext context)
        {
            _context = context;
        }
        [HttpPost]
        [Route("RegistrarImpuesto")]
        public async Task<IActionResult> RegistrarImpuesto(Impuestos impuesto)
        {
            if (impuesto == null)
            {
                return BadRequest("Datos de impuesto inválidos.");
            }

            await _context.Impuestos.AddAsync(impuesto);
            await _context.SaveChangesAsync();
            return Ok(impuesto);
        }
        [HttpGet]
        [Route("Listar")]
        public async Task<List<Impuestos>> Listar()
        {
            var impuestos = await _context.Impuestos.ToListAsync();
            return impuestos;
        }

        [HttpGet]
        [Route("Consultar")]
        public async Task<Impuestos?> Consultar(int id)
        {
            var impuesto = await _context.Impuestos.FirstOrDefaultAsync(i => i.id == id);
            return impuesto;
        }

        [HttpPut]
        [Route("Actualizar")]
        public async Task<IActionResult> Actualizar(Impuestos impuesto)
        {
            var impuestoExistente = await _context.Impuestos.FirstOrDefaultAsync(i => i.id == impuesto.id);
            if (impuestoExistente == null)
            {
                return BadRequest();
            }
            impuestoExistente.actividadId = impuesto.actividadId;
            impuestoExistente.regimenId = impuesto.regimenId;
            impuestoExistente.sociedadesId = impuesto.sociedadesId;
            impuestoExistente.descripcion = impuesto.descripcion;
            _context.Impuestos.Update(impuestoExistente);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("Eliminar")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var impuesto = await _context.Impuestos.FindAsync(id);
            if (impuesto == null)
            {
                return BadRequest();
            }
            _context.Impuestos.Remove(impuesto);
            await _context.SaveChangesAsync();
            return Ok();
        }
     
    }
}
