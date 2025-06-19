using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace kratos.Server.Models.Kratos
{

    [Table("ActividadEconomicas")] // Especifica el nombre de la tabla en MySQL
    public class ActividadEconomicas
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

      
        [Column("nombre", TypeName = "varchar(100)")]
        public string nombre { get; set; }

        [Column("descripcion", TypeName = "varchar(500)")]
        public string? descripcion { get; set; }

        [Column("categoria", TypeName = "varchar(50)")]
        public string? categoria { get; set; }

        [Column("codigoCiiu", TypeName = "varchar(20)")]
        public string? codigoCiiu { get; set; }
    }
}

