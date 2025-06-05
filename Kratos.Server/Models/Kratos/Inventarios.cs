using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace kratos.Server.Models.Kratos
{
    public class Inventarios
    {
        public int id { get; set; }


        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [ForeignKey("Productos")]
        public int productoId { get; set; }
        public Productos? productoFk { get; set; }


        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [ForeignKey("PuntoVentas")]
        public int puntoventaId { get; set; }
        public PuntoVentas? puntoventaFk { get; set; }


        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        public int cantidad { get; set; }
        
        
        [DataType(DataType.DateTime)]
        public DateTime creadoEn { get; set; }
        
        
        [DataType(DataType.DateTime)]
        public DateTime actualizadoEn { get; set; }

    }
}
