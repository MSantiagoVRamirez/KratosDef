using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace kratos.Server.Models.Kratos
{
    [Table("RegimenesTributarios")] // Snake_case table name
    public class RegimenesTributarios
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int id { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        [Column("nombre", TypeName = "varchar(100)")] // Explicit MySQL type
        public string nombre { get; set; } = string.Empty; // Non-nullable initialization

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        [Column("descripcion", TypeName = "varchar(100)")]
        public string descripcion { get; set; } = string.Empty;

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        [Column("codigo", TypeName = "varchar(100)")]
        public string codigo { get; set; } = string.Empty;

        [Column("estado", TypeName = "tinyint(1)")] // MySQL boolean type
        public bool estado { get; set; } = true; // Default value
    }
}