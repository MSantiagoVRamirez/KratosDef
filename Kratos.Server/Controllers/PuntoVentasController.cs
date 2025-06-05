
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
    public class PuntoVentasController : ControllerBase
    {
        private readonly KratosContext _context;
        public PuntoVentasController(KratosContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("RegistrarPuntoVenta")]
        public async Task<IActionResult> RegistrarPuntoVenta(PuntoVentas puntoVenta)
        {
            if (puntoVenta == null)
            {
                return BadRequest("Datos de punto de venta inválidos.");
            }

            await _context.PuntoVentas.AddAsync(puntoVenta);
            await _context.SaveChangesAsync();
            return Ok(puntoVenta);
        }

        [HttpGet]
        [Route("Listar")]
        public async Task<List<PuntoVentas>> Listar()
        {
            var puntos = await _context.PuntoVentas.ToListAsync();
            return puntos;
        }

        [HttpGet]
        [Route("Consultar")]
        public async Task<PuntoVentas?> Consultar(int id)
        {
            var punto = await _context.PuntoVentas.FirstOrDefaultAsync(p => p.id == id);
            return punto;
        }

        [HttpPut]
        [Route("Actualizar")]
        public async Task<IActionResult> Actualizar(PuntoVentas punto)
        {
            var puntoExistente = await _context.PuntoVentas.FirstOrDefaultAsync(p => p.id == punto.id);
            if (puntoExistente == null)
            {
                return BadRequest();
            }
            puntoExistente.responsableId = punto.responsableId;
            puntoExistente.activo = punto.activo;
            puntoExistente.actualizadoEn = DateTime.Now;
            _context.PuntoVentas.Update(puntoExistente);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("Eliminar")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var punto = await _context.PuntoVentas.FindAsync(id);
            if (punto == null)
            {
                return BadRequest();
            }
            _context.PuntoVentas.Remove(punto);
            await _context.SaveChangesAsync();
            return Ok();
        }
      
    }
}
