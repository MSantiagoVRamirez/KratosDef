using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace kratos.Server.Models.Kratos
{
    [Table("Usuarios")] // Explicit table name
    public class Usuarios
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int id { get; set; }

        [Column("rolesId")]
        public int rolesId { get; set; }

        [ForeignKey("rolesId")]
      
        public virtual Roles? usuariosrolesFk { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        [Column("contrasena", TypeName = "varchar(100)")]
        public string contrasena { get; set; } = string.Empty;

       
        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        [Compare("contrasena", ErrorMessage = "Las contraseñas no coinciden")]
        [DataType(DataType.Password)]
        public string confirmarContrasena { get; set; } = string.Empty;

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        [Column("token", TypeName = "varchar(100)")]
        public string token { get; set; } = string.Empty;

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        [Column("email", TypeName = "varchar(100)")]
        [DataType(DataType.EmailAddress)]
        public string email { get; set; } = string.Empty;

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        [Column("nombres", TypeName = "varchar(100)")]
        public string nombres { get; set; } = string.Empty;

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        [Column("apellidos", TypeName = "varchar(100)")]
        public string apellidos { get; set; } = string.Empty;

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(20, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")] // Reduced length for phone numbers
        [Column("telefono", TypeName = "varchar(20)")]
        [DataType(DataType.PhoneNumber)]
        public string telefono { get; set; } = string.Empty;

        [Column("estado", TypeName = "tinyint(1)")]
        public bool estado { get; set; } = true; // Default to active

        [Column("creadoEn", TypeName = "datetime")]
        public DateTime creadoEn { get; set; } = DateTime.UtcNow;

        [Column("actualizadoEn", TypeName = "datetime")]
        public DateTime actualizadoEn { get; set; } = DateTime.UtcNow;
        public virtual ICollection<PuntoVentas> PuntosVenta { get; set; } = new List<PuntoVentas>();
    }
}