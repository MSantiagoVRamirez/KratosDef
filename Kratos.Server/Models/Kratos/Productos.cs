using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace kratos.Server.Models.Kratos
{
    [Table("productos")] // Explicit table name
    public class Productos
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int id { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        [Column("codigo", TypeName = "varchar(100)")]
        public string Codigo { get; set; } = string.Empty;

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [Column("impuestoId")]
        public int impuestoId { get; set; }

        [ForeignKey("impuestoId")]
        public virtual TratamientosEmpresas? impuestoFk { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        [Column("nombre", TypeName = "varchar(100)")]
        public string nombre { get; set; } = string.Empty;

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        [Column("descripcion", TypeName = "varchar(100)")]
        public string descripcion { get; set; } = string.Empty;

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [Column("categoria_id")]
        public int categoriaId { get; set; }

        [ForeignKey("CategoriaId")]
        public virtual Categorias? categoriaFk { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [Column("precio", TypeName = "decimal(18,2)")] // Better for monetary values
        public decimal precio { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [Column("costo", TypeName = "decimal(18,2)")]
        public decimal costo { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [Column("stock_minimo")]
        public int stockMinimo { get; set; } // Changed to int as it's more logical for minimum stock

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [Column("activo", TypeName = "tinyint(1)")]
        public bool activo { get; set; }

        [Column("creado_en", TypeName = "datetime")]
        public DateTime creadoEn { get; set; } = DateTime.UtcNow;

        [Column("actualizado_en", TypeName = "datetime")]
        public DateTime actualizadoEn { get; set; } = DateTime.UtcNow;
    }
}