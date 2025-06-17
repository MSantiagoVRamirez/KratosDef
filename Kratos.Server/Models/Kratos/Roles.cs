using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace kratos.Server.Models.Kratos
{
    [Table("roles")] // Nombre de tabla en minúsculas
    public class Roles
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
        [MaxLength(500, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        [Column("descripcion", TypeName = "varchar(500)")]
        public string descripcion { get; set; } = string.Empty;

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [Column("empresaId")]
        public int empresaId { get; set; }

        // Relación con Empresas
        [ForeignKey("empresaId")]
        public virtual Empresas? rolempresaFk { get; set; }

        // Relación con Permisos (colección)
        public virtual ICollection<Permisos> Permisos { get; set; } = new List<Permisos>();
    }
}