using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace kratos.Server.Models.Kratos
{
    [Table("Permisos")] // Explicit table name
    public class Permisos
    {
        [Key]
        [Column("id")]
        public int id { get; set; }

        [Column("rolesId")]
        public int rolesId { get; set; }

        [ForeignKey("rolesId")]
        public virtual Roles rol { get; set; }

        [ForeignKey("permisos")]
        public virtual Roles? permisosrolesId { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [Column("modulosId")]
        public int modulosId { get; set; }

        [ForeignKey("modulosId")]
    
        public virtual Modulos? permisosmodulosId { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        [Column("nombre", TypeName = "varchar(100)")]
        public string nombre { get; set; } = string.Empty;

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        [Column("descripcion", TypeName = "varchar(100)")]
        public string descripcion { get; set; } = string.Empty;

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        [Column("codigo", TypeName = "varchar(100)")]
        public string codigo { get; set; } = string.Empty;

        [Column("consultar", TypeName = "tinyint(1)")]
        public bool consultar { get; set; }

        [Column("leer", TypeName = "tinyint(1)")]
        public bool leer { get; set; }

        [Column("insertar", TypeName = "tinyint(1)")]
        public bool insertar { get; set; }

        [Column("editar", TypeName = "tinyint(1)")]
        public bool editar { get; set; }

        [Column("eliminar", TypeName = "tinyint(1)")]
        public bool eliminar { get; set; }

        [Column("importar", TypeName = "tinyint(1)")]
        public bool importar { get; set; }

        [Column("exportar", TypeName = "tinyint(1)")]
        public bool exportar { get; set; }
    }
}