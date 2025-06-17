using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace kratos.Server.Models.Kratos
{
    [Table("TratamientosEmpresas")] // Explicit table name
    public class TratamientosEmpresas
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int id { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [Column("empresaId")]
        public int empresaId { get; set; }

        [ForeignKey("empresaId")]
    
        public virtual Empresas? empresaFk { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [Column("tipoimpuestoId")]
        public int tipoimpuestoId { get; set; }

        [ForeignKey("tipoimpuestoId")]

        public virtual Impuestos? impuestosFk { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        [Column("porcentaje", TypeName = "decimal(5,2)")] // Better for percentage values
        public decimal porcentaje { get; set; }
    }
}