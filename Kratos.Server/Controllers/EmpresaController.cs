
using kratos.Server.Models.Kratos;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Kratos.Server.Models;
using Microsoft.AspNetCore.Authorization;
using kratos.Server.Services.Seguridad;

namespace kratos.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpresaController : ControllerBase
    {
        private readonly KratosContext _context;

        public EmpresaController(KratosContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("RegistroEmpresa")]
        public async Task<IActionResult> RegistroEmpresa(Empresas empresas)
        {
            empresas.contrasena = Encriptar.EncriptarClave(empresas.contrasena);
            empresas.confirmarContrasena = Encriptar.EncriptarClave(empresas.confirmarContrasena);

            await _context.Empresas.AddAsync(empresas);
            await _context.SaveChangesAsync();
            return Ok(empresas);
        }

        [HttpGet]
        [Route("ListarEmpresas")]
        public async Task<ActionResult<List<Empresas>>> ListarEmpresas()
        {
            var empresas = await _context.Empresas
                .Include(e => e.empresasociedadFk)
                .Include(e => e.empresaactividadFk)
                .Include(e => e.empresaregimenFk)
                .ToListAsync();

            // No se puede desencriptar un hash, así que no se hace nada aquí

            return empresas;
        }

        [HttpGet]
        [Route("ConsultarEmpresa")]
        public async Task<ActionResult<Empresas>> ConsultarEmpresa(int id)
        {
            var empresa = await _context.Empresas
                .Include(e => e.empresasociedadFk)
                .Include(e => e.empresaactividadFk)
                .Include(e => e.empresaregimenFk)
                .FirstOrDefaultAsync(e => e.id == id);

            if (empresa == null)
                return NotFound();

            // No se puede desencriptar un hash, así que no se hace nada aquí

            return empresa;
        }

        [HttpPut]
        [Route("ActualizarEmpresa")]
        public async Task<IActionResult> ActualizarEmpresa(Empresas empresa)
        {
            var empresaExistente = await _context.Empresas.FirstOrDefaultAsync(e => e.id == empresa.id);
            if (empresaExistente == null)
            {
                return BadRequest("La empresa no existe.");
            }

            if (!string.IsNullOrEmpty(empresa.contrasena))
                empresaExistente.contrasena = Encriptar.EncriptarClave(empresa.contrasena);

            if (!string.IsNullOrEmpty(empresa.confirmarContrasena))
                empresaExistente.confirmarContrasena = Encriptar.EncriptarClave(empresa.confirmarContrasena);

            empresaExistente.tiposociedadId = empresa.tiposociedadId;
            empresaExistente.actividadId = empresa.actividadId;
            empresaExistente.regimenId = empresa.regimenId;
            empresaExistente.token = empresa.token;
            empresaExistente.nit = empresa.nit;
            empresaExistente.dv = empresa.dv;
            empresaExistente.telefono = empresa.telefono;
            empresaExistente.activo = empresa.activo;
            empresaExistente.creadoEn = empresa.creadoEn;
            empresaExistente.actualizadoEn = DateTime.Now;

            _context.Empresas.Update(empresaExistente);
            await _context.SaveChangesAsync();
            return Ok(empresaExistente);
        }

        [HttpDelete]
        [Route("EliminarEmpresa")]
        public async Task<IActionResult> EliminarEmpresa(int id)
        {
            var empresaEliminada = await _context.Empresas.FindAsync(id);
            if (empresaEliminada == null)
            {
                return BadRequest();
            }
            _context.Empresas.Remove(empresaEliminada);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}