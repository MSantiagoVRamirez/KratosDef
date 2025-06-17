using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace kratos.Server.Models.Kratos
{
    [Table("PuntoVentas")] // Explicit table name in snake_case
    public class PuntoVentas
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int id { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        [Column("nombre", TypeName = "varchar(100)")]
        public string nombre { get; set; } = string.Empty;

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        [Column("direccion", TypeName = "varchar(100)")]
        public string direccion { get; set; } = string.Empty;

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        [Column("telefono", TypeName = "varchar(20)")] // More appropriate length for phone numbers
        public string telefono { get; set; } = string.Empty;

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [Column("responsableId")]
        public int responsableId { get; set; }

        [ForeignKey("responsableId")]
        [InverseProperty("PuntosVenta")] // Assuming Usuarios has a PuntosVenta collection
        public virtual Usuarios? usuarioFk { get; set; }

        [Column("activo", TypeName = "tinyint(1)")]
        public bool activo { get; set; } = true; // Default value

        [Column("creadoEn", TypeName = "datetime")]
        public DateTime creadoEn { get; set; } = DateTime.UtcNow;

        [Column("actualizadoEn", TypeName = "datetime")]
        public DateTime actualizadoEn { get; set; } = DateTime.UtcNow;
    }
}