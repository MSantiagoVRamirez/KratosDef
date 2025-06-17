using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace kratos.Server.Models.Kratos;

public class IniciarSesionRequest
{
    [Required(ErrorMessage = "El email es obligatorio")]
    [EmailAddress(ErrorMessage = "El email no tiene un formato válido")]
    [StringLength(100, ErrorMessage = "El email no puede exceder los 100 caracteres")]
    [Column(TypeName = "varchar(100)")] // Especificación para MySQL
    public string email { get; set; }

    [Required(ErrorMessage = "La contraseña es obligatoria")]
    [DataType(DataType.Password)]
    [StringLength(100, MinimumLength = 8, ErrorMessage = "La contraseña debe tener entre 8 y 100 caracteres")]
    [Column(TypeName = "varchar(100)")] // Especificación para MySQL
    public string contrasena { get; set; }
}