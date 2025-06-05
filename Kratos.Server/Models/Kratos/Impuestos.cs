using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace kratos.Server.Models.Kratos
{
    public class Impuestos
    {
        public int id { get; set; }



        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [ForeignKey("ActividadEconomicas")]
        public int actividadId { get; set; }
        public ActividadEconomicas? impuestoactividadFk { get; set; }


        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [ForeignKey("RegimenesTributarios")]
        public int regimenId { get; set; }
        public RegimenesTributarios? impuestoregimenFk { get; set; }


        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [ForeignKey("TiposSociedades")]
        public int sociedadesId { get; set; }
        public TiposSociedades? impuestosociedadesFk { get; set; }


        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        public string nombre { get; set; }


        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        public string descripcion { get; set; }


        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        public string codigo { get; set; }


        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        public string porcentaje { get; set; }
    }
}
