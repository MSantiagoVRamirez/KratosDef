
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

        // EmpresaController.cs
        [HttpPost("insertar")]  // This must match your frontend call
        public async Task<IActionResult> InsertarEmpresa([FromBody] Empresas empresa)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new
                {
                    message = "Errores de validación",
                    errors = ModelState.ToDictionary(
                        kvp => kvp.Key,
                        kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
                    )
                });
            }

            try
            {
                // Validar que el NIT no exista
                if (await _context.Empresas.AnyAsync(e => e.nit == empresa.nit))
                {
                    return BadRequest(new { message = "El NIT ya está registrado" });
                }

                // Validar que las contraseñas coincidan
                if (empresa.contrasena != empresa.confirmarContrasena)
                {
                    return BadRequest(new { message = "Las contraseñas no coinciden" });
                }

                // Encriptar contraseñas
                empresa.contrasena = Encriptar.EncriptarClave(empresa.contrasena);
                empresa.confirmarContrasena = empresa.contrasena; // Asignar el mismo hash

                // Establecer fechas automáticamente
                empresa.creadoEn = DateTime.UtcNow;
                empresa.actualizadoEn = DateTime.UtcNow;
                empresa.activo = true;

                await _context.Empresas.AddAsync(empresa);
                await _context.SaveChangesAsync();

                // No devolver las contraseñas ni información sensible
                return Ok(new
                {
                    message = "Empresa registrada exitosamente",
                    empresaId = empresa.id,
                    razonSocial = empresa.razonSocial,
                    nit = empresa.nit
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error interno del servidor",
                    details = ex.Message
                });
            }
        }

        [HttpPut]
        [Route("editar")]
        public async Task<IActionResult> ActualizarEmpresa([FromBody] Empresas empresa)
        {
            try
            {
                var empresaExistente = await _context.Empresas.FindAsync(empresa.id);
                if (empresaExistente == null)
                {
                    return NotFound(new { message = "Empresa no encontrada" });
                }

                // Validar NIT único (si se está modificando)
                if (empresaExistente.nit != empresa.nit &&
                    await _context.Empresas.AnyAsync(e => e.nit == empresa.nit))
                {
                    return BadRequest(new { message = "El NIT ya está registrado por otra empresa" });
                }

                // Actualizar campos permitidos
                empresaExistente.razonSocial = empresa.razonSocial;
                empresaExistente.nombreComercial = empresa.nombreComercial;
                empresaExistente.nit = empresa.nit;
                empresaExistente.dv = empresa.dv;
                empresaExistente.telefono = empresa.telefono;
                empresaExistente.email = empresa.email;
                empresaExistente.representanteLegal = empresa.representanteLegal;
                empresaExistente.token = empresa.token;
                empresaExistente.tiposociedadId = empresa.tiposociedadId;
                empresaExistente.actividadId = empresa.actividadId;
                empresaExistente.regimenId = empresa.regimenId;
                empresaExistente.activo = empresa.activo;
                empresaExistente.actualizadoEn = DateTime.UtcNow;

                // Actualizar contraseña solo si se proporcionó una nueva
                if (!string.IsNullOrEmpty(empresa.contrasena))
                {
                    if (empresa.contrasena != empresa.confirmarContrasena)
                    {
                        return BadRequest(new { message = "Las contraseñas no coinciden" });
                    }
                    empresaExistente.contrasena = Encriptar.EncriptarClave(empresa.contrasena);
                }

                _context.Empresas.Update(empresaExistente);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Empresa actualizada correctamente",
                    empresaId = empresaExistente.id
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error al actualizar la empresa",
                    details = ex.Message
                });
            }
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

        [HttpDelete]
        [Route("Eliminar/{id}")]
        public async Task<IActionResult> EliminarEmpresa(int id)
        {
            try
            {
                var empresa = await _context.Empresas.FindAsync(id);
                if (empresa == null)
                {
                    return NotFound(new { message = "Empresa no encontrada" });
                }

                // Cambiar a eliminación lógica en lugar de física
                empresa.activo = false;
                empresa.actualizadoEn = DateTime.UtcNow;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Empresa desactivada correctamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error al eliminar la empresa",
                    details = ex.Message
                });
            }
        }
    }
}