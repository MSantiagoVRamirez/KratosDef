
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
    public class InventariosController : ControllerBase
    {
        private readonly KratosContext _context;
        public InventariosController(KratosContext context)
        {
            _context = context;
        }
            [HttpPost]
            [Route("RegistrarInventario")]
            public async Task<IActionResult> RegistrarInventario(Inventarios inventario)
            {
                if (inventario == null)
                {
                    return BadRequest("Datos de inventario inválidos.");
                }

                await _context.Inventarios.AddAsync(inventario);
                await _context.SaveChangesAsync();
                return Ok(inventario);
            }
        [HttpGet]
        [Route("Listar")]
        public async Task<List<Inventarios>> Listar()
        {
            var inventarios = await _context.Inventarios.ToListAsync();
            return inventarios;
        }

        [HttpGet]
        [Route("Consultar")]
        public async Task<Inventarios?> Consultar(int id)
        {
            var inventario = await _context.Inventarios.FirstOrDefaultAsync(i => i.id == id);
            return inventario;
        }

        [HttpPut]
        [Route("Actualizar")]
        public async Task<IActionResult> Actualizar(Inventarios inventario)
        {
            var inventarioExistente = await _context.Inventarios.FirstOrDefaultAsync(i => i.id == inventario.id);
            if (inventarioExistente == null)
            {
                return BadRequest();
            }
            inventarioExistente.productoId = inventario.productoId;
            inventarioExistente.puntoventaId = inventario.puntoventaId;
            inventarioExistente.cantidad = inventario.cantidad;
            inventarioExistente.actualizadoEn = DateTime.Now;
            _context.Inventarios.Update(inventarioExistente);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("Eliminar")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var inventario = await _context.Inventarios.FindAsync(id);
            if (inventario == null)
            {
                return BadRequest();
            }
            _context.Inventarios.Remove(inventario);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
