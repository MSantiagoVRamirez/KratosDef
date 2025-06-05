using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



namespace kratos.Server.Models.Kratos
{
    public class Categorias
    {
        public int id { get; set; }


        [ForeignKey("Categorias")]
        public int categoriapadreId { get; set; }
        public Categorias? categoriapadreFk { get; set; }
        

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        public string nombre { get; set; }
        
        
        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(500, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        public string descripcion { get; set; }
        
        
        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        public bool activo { get; set; }
        
        
        [DataType(DataType.DateTime)]
        public DateTime creadoEn { get; set; }
        
        
        [DataType(DataType.DateTime)]
        public DateTime actualizadoEn { get; set; }


    }
}
