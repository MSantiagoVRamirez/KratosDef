using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace kratos.Server.Models.Kratos;

    [Table("Inventarios")] // Explicit table name (optional)
    public class Inventarios
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int id { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [Column("productoId")]
        public int productoId { get; set; }

        [ForeignKey("productoId")]
        public virtual Productos? productoFk { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [Column("puntoventaId")]
        public int puntoventaId { get; set; }

        [ForeignKey("puntoventaId")]
        public virtual PuntoVentas? puntoventaFk { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [Column("cantidad")]
        public int cantidad { get; set; }

        [Column("creadoEn", TypeName = "datetime")]
        public DateTime creadoEn { get; set; } = DateTime.UtcNow; // Default value

        [Column("actualizadoEn", TypeName = "datetime")]
        public DateTime actualizadoEn { get; set; } = DateTime.UtcNow; // Default value
    }
