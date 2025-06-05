
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
    public class CategoriasController : ControllerBase
    {
        private readonly KratosContext _context;
        public CategoriasController(KratosContext context)
        {
            _context = context;
        }
        [HttpPost]
        [Route("RegistrarCategoria")]
        public async Task<IActionResult> RegistrarCategoria(Categorias categoria)
        {
            if (categoria == null)
            {
                return BadRequest("Datos de categoría inválidos.");
            }

            await _context.Categorias.AddAsync(categoria);
            await _context.SaveChangesAsync();
            return Ok(categoria);
        }
        [HttpGet]
        [Route("Listar")]
        public async Task<List<Categorias>> Listar()
        {
            var categorias = await _context.Categorias.ToListAsync();
            return categorias;
        }

        [HttpGet]
        [Route("Consultar")]
        public async Task<Categorias?> Consultar(int id)
        {
            var categoria = await _context.Categorias.FirstOrDefaultAsync(c => c.id == id);
            return categoria;
        }

        [HttpPut]
        [Route("Actualizar")]
        public async Task<IActionResult> Actualizar(Categorias categoria)
        {
            var categoriaExistente = await _context.Categorias.FirstOrDefaultAsync(c => c.id == categoria.id);
            if (categoriaExistente == null)
            {
                return BadRequest();
            }
            categoriaExistente.descripcion = categoria.descripcion;
            categoriaExistente.categoriapadreId = categoria.categoriapadreId;
            categoriaExistente.activo = categoria.activo;
            categoriaExistente.actualizadoEn = DateTime.Now;
            _context.Categorias.Update(categoriaExistente);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("Eliminar")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var categoria = await _context.Categorias.FindAsync(id);
            if (categoria == null)
            {
                return BadRequest();
            }
            _context.Categorias.Remove(categoria);
            await _context.SaveChangesAsync();
            return Ok();
        }
       
     
    }
}
