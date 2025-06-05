
using kratos.Server.Models.Kratos;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Kratos.Server.Models;
using Microsoft.AspNetCore.Authorization;

namespace kratos.Server.Controllers
{
  //  [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        private readonly KratosContext _context;
        public ProductosController(KratosContext context)
        {
            _context = context;
        }
        [HttpPost]
        [Route("RegistrarProducto")]
        public async Task<IActionResult> RegistrarProducto(Productos producto)
        {
            if (producto == null)
            {
                return BadRequest("Datos de producto inválidos.");
            }

            await _context.Productos.AddAsync(producto);
            await _context.SaveChangesAsync();
            return Ok(producto);
        }
        [HttpGet]
        [Route("Listar")]
        public async Task<List<Productos>> Listar()
        {
            var productos = await _context.Productos.ToListAsync();
            return productos;
        }

        [HttpGet]
        [Route("Consultar")]
        public async Task<Productos?> Consultar(int id)
        {
            var producto = await _context.Productos.FirstOrDefaultAsync(p => p.id == id);
            return producto;
        }

        [HttpPut]
        [Route("Actualizar")]
        public async Task<IActionResult> Actualizar(Productos producto)
        {
            var productoExistente = await _context.Productos.FirstOrDefaultAsync(p => p.id == producto.id);
            if (productoExistente == null)
            {
                return BadRequest();
            }
            productoExistente.descripcion = producto.descripcion;
            productoExistente.categoriaId = producto.categoriaId;
            productoExistente.impuestoId = producto.impuestoId;
            productoExistente.activo = producto.activo;
            productoExistente.actualizadoEn = DateTime.Now;
            _context.Productos.Update(productoExistente);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("Eliminar")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var producto = await _context.Productos.FindAsync(id);
            if (producto == null)
            {
                return BadRequest();
            }
            _context.Productos.Remove(producto);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
