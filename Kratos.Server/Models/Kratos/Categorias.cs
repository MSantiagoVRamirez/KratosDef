using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



namespace kratos.Server.Models.Kratos;
[Table("Categorias")] // Especifica el nombre de la tabla en MySQL
public class Categorias
{
    [Key]
    [Column("id")]
    public int id { get; set; }

    [Column("categoriapadreid")]
    public int? categoriapadreId { get; set; }

    [ForeignKey("categoriapadreId")]
    public virtual Categorias? categoriapadreFk { get; set; }

    public virtual ICollection<Categorias> Subcategorias { get; set; } = new List<Categorias>();


    [Required(ErrorMessage = "El campo {0} es obligatorio")]
    [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
    [Column("nombre", TypeName = "varchar(100)")]
    public string nombre { get; set; }

    [Required(ErrorMessage = "El campo {0} es obligatorio")]
    [MaxLength(500, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
    [Column("descripcion", TypeName = "varchar(500)")]
    public string descripcion { get; set; }

    [Required(ErrorMessage = "El campo {0} es obligatorio")]
    [Column("activo", TypeName = "tinyint(1)")]
    public bool activo { get; set; }

    [DataType(DataType.DateTime)]
    [Column("creadoEn", TypeName = "datetime")]
    public DateTime creadoEn { get; set; } = DateTime.UtcNow; // Valor por defecto

    [DataType(DataType.DateTime)]
    [Column("actualizadoEn", TypeName = "datetime")]
    public DateTime actualizadoEn { get; set; } = DateTime.UtcNow; // Valor por defecto

  
}