using Microsoft.AspNetCore.Mvc;
using Kratos.Server.Models;
using System.Security.Cryptography;
using System.Text;
using kratos.Server.Models.Kratos;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using kratos.Server.Services.Seguridad;


namespace kratos.Server.Services.Seguridad;
public class Usuario : IUsuarioService
{

    private readonly KratosContext _context;
    public Usuario(KratosContext context)
    {
        _context = context;
    }
    public async Task<Empresas> ObtenerEmpresa (string email , string contrasena)
    {
        var empresa = await _context.Empresas
            .Where(e => e.email == email && e.contrasena == contrasena)
            .FirstOrDefaultAsync();
        return empresa;
            
    }
}