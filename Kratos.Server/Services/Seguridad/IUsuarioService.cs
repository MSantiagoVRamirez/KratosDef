using kratos.Server.Models.Kratos;

namespace kratos.Server.Services.Seguridad
{
    public interface IUsuarioService
    {
        Task<Empresas> ObtenerEmpresa(string email, string contraseña);
    }
}
