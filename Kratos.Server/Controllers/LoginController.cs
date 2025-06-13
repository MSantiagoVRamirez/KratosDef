
using kratos.Server.Models.Kratos;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Kratos.Server.Models;
using Microsoft.AspNetCore.Authorization;
using kratos.Server.Services.Seguridad;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace Kratos.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly KratosContext _context;
        private readonly IUsuarioService _usuarioService;

        public LoginController(KratosContext context, IUsuarioService usuarioService)
        {
            _context = context;
            _usuarioService = usuarioService;
        }
        [HttpPost]
        [Route("registroUsuario")]
        public async Task<IActionResult> registroUsuario([FromBody] Empresas empresas)
        {
       
            // Valida que la contraseña y la confirmación coincidan
            if (empresas.contrasena != empresas.confirmarContrasena)
            {
                return BadRequest("Error: La contraseña no coincide.");
            }

            // Encripta la contraseña y configura otros datos
            empresas.contrasena = Encriptar.EncriptarClave(empresas.contrasena);
            empresas.confirmarContrasena = Encriptar.EncriptarClave(empresas.confirmarContrasena);
            empresas.creadoEn = DateTime.Now;
      
        
            // Agrega el usuario a la base de datos
            _context.Empresas.Add(empresas);
            await _context.SaveChangesAsync();

            return Ok(empresas);
        }

        

        [HttpPost("iniciarSesion")]
        public async Task<IActionResult> iniciarSesion([FromBody] IniciarSesionRequest request)
        {
            if (string.IsNullOrEmpty(request.email) || string.IsNullOrEmpty(request.contrasena))
            {
                return BadRequest("Por favor, complete todos los campos.");
            }
            request.contrasena = Encriptar.EncriptarClave(request.contrasena);

            var empresa = await _usuarioService.ObtenerEmpresa(request.email, request.contrasena);

            if (empresa == null)
            {
                return BadRequest("Nombre de usuario o contrasena incorrectos.");
            }
            var Claim = new List<Claim>();
            {
                new Claim(ClaimTypes.Name, empresa.email);
            }
            return Ok(new { Message = "Inicio de sesión exitoso", empresa });
        }

        [HttpPost("cerrarSesion")]
        public async Task<IActionResult> cerrarSesion()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            return Ok(new { Message = "Sesión cerrada exitosamente" });
        }

    }
}