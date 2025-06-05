using System.ComponentModel.DataAnnotations;

namespace kratos.Server.Models.Kratos
{
    public class IniciarSesionRequest
    {
        public string email {get; set;}
        public string contraseña {get; set;}
    }
}
