using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace kratos.Server.Models.Kratos
{
    public class PuntoVentas
    {
        public int id { get; set; }


        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        public string nombre { get; set; }


        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        public string direccion { get; set; }



        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        public string telefono { get; set; }
        
        

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [ForeignKey("Usuario")]
        public int responsableId { get; set; }
        public Usuarios? usuarioFk { get; set; }
        
        

        public bool activo { get; set; }
        
        
        [DataType(DataType.DateTime)]
        public DateTime creadoEn { get; set; }
        
        
        [DataType(DataType.DateTime)]
        public DateTime actualizadoEn { get; set; }
    }
}
