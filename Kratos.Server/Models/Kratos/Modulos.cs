using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace kratos.Server.Models.Kratos
{
    [Table("Modulos")] // Explicit MySQL table name
    public class Modulos
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int id { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        [Column("nombre", TypeName = "varchar(100)")] // Explicit MySQL column type
        public string nombre { get; set; } = string.Empty; // Non-nullable initialization
    }
}