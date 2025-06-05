using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace kratos.Server.Models.Kratos
{
    public class Productos
    {
        public int id { get; set; }
      
        
        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        public string codigo { get; set; }
        
        
        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [ForeignKey("TratamientosEmpresas")]
        public int impuestoId { get; set; }
        public TratamientosEmpresas? impuestoFk { get; set; }


        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        public string nombre { get; set; }


        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        public string descripcion { get; set; }



        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [ForeignKey("Categorias")]
        public int categoriaId { get; set; }
        public Categorias? categoriaFk { get; set; }


        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        public string precio { get; set; }


        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        public string costo { get; set; }


        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        public string stockMinimo { get; set; }
        
        
        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        public bool activo { get; set; }
        
        
        [DataType(DataType.DateTime)]
        public DateTime creadoEn { get; set; }
        
        
        [DataType(DataType.DateTime)]
        public DateTime actualizadoEn { get; set; }
    }
}
