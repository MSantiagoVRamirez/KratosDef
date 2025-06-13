using System.ComponentModel.DataAnnotations;

namespace kratos.Server.Models.Kratos
{
    public class IniciarSesionRequest
    {
        [Required(ErrorMessage = "El email es obligatorio")]
        [EmailAddress(ErrorMessage = "El email no tiene un formato válido")]
        public string email { get; set; }

        [Required(ErrorMessage = "La contraseña es obligatoria")]
        [DataType(DataType.Password)]
        public string contrasena { get; set; }
    }
}