
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
    public class TratamientosEmpresasController : ControllerBase
    {
        private readonly KratosContext _context;
        public TratamientosEmpresasController(KratosContext context)
        {
            _context = context;
        }
            [HttpPost]
            [Route("RegistrarTratamiento")]
            public async Task<IActionResult> RegistrarTratamiento(TratamientosEmpresas tratamiento)
            {
                if (tratamiento == null)
                {
                    return BadRequest("Datos de tratamiento inválidos.");
                }

                await _context.TratamientosEmpresas.AddAsync(tratamiento);
                await _context.SaveChangesAsync();
                return Ok(tratamiento);
            }
        [HttpGet]
        [Route("Listar")]
        public async Task<List<TratamientosEmpresas>> Listar()
        {
            var tratamientos = await _context.TratamientosEmpresas.ToListAsync();
            return tratamientos;
        }

        [HttpGet]
        [Route("Consultar")]
        public async Task<TratamientosEmpresas?> Consultar(int id)
        {
            var tratamiento = await _context.TratamientosEmpresas.FirstOrDefaultAsync(t => t.id == id);
            return tratamiento;
        }

        [HttpPut]
        [Route("Actualizar")]
        public async Task<IActionResult> Actualizar(TratamientosEmpresas tratamiento)
        {
            var tratamientoExistente = await _context.TratamientosEmpresas.FirstOrDefaultAsync(t => t.id == tratamiento.id);
            if (tratamientoExistente == null)
            {
                return BadRequest();
            }
            tratamientoExistente.empresaId = tratamiento.empresaId;
            tratamientoExistente.tipoimpuestoId = tratamiento.tipoimpuestoId;
            _context.TratamientosEmpresas.Update(tratamientoExistente);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("Eliminar")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var tratamiento = await _context.TratamientosEmpresas.FindAsync(id);
            if (tratamiento == null)
            {
                return BadRequest();
            }
            _context.TratamientosEmpresas.Remove(tratamiento);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
