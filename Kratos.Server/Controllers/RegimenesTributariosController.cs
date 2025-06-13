
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
    public class RegimenesTributariosController : ControllerBase
    {
        private readonly KratosContext _context;
        public RegimenesTributariosController(KratosContext context)
        {
            _context = context;
        }
        [HttpPost]
        [Route("Registrar")]
        public async Task<IActionResult> RegistrarRegimenTributario(RegimenesTributarios regimen)
        {
            if (regimen == null)
            {
                return BadRequest("Datos de régimen tributario inválidos.");
            }

            await _context.RegimenesTributarios.AddAsync(regimen);
            await _context.SaveChangesAsync();
            return Ok(regimen);
        }
        [HttpGet]
        [Route("Listar")]
        public async Task<List<RegimenesTributarios>> Listar()
        {
            var regimenes = await _context.RegimenesTributarios.ToListAsync();
            return regimenes;
        }

        [HttpGet]
        [Route("Consultar")]
        public async Task<RegimenesTributarios?> Consultar(int id)
        {
            var regimen = await _context.RegimenesTributarios.FirstOrDefaultAsync(r => r.id == id);
            return regimen;
        }

        [HttpPut]
        [Route("Actualizar")]
        public async Task<IActionResult> Actualizar(RegimenesTributarios regimen)
        {
            var regimenExistente = await _context.RegimenesTributarios.FirstOrDefaultAsync(r => r.id == regimen.id);
            if (regimenExistente == null)
            {
                return BadRequest();
            }
            regimenExistente.descripcion = regimen.descripcion;
            regimenExistente.estado = regimen.estado;
            _context.RegimenesTributarios.Update(regimenExistente);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("Eliminar")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var regimen = await _context.RegimenesTributarios.FindAsync(id);
            if (regimen == null)
            {
                return BadRequest();
            }
            _context.RegimenesTributarios.Remove(regimen);
            await _context.SaveChangesAsync();
            return Ok();
        }
        
    }
}
