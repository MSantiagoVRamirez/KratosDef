using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace kratos.Server.Models.Kratos;
[Table("Impuestos")] // Especifica el nombre de la tabla en MySQL
public class Impuestos
{
    [Key]
    [Column("id")]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int id { get; set; }

    [Required(ErrorMessage = "El campo Actividad Económica es obligatorio")]
    [Column("actividadId")]
    [ForeignKey("impuestoactividadFk")]
    public int actividadId { get; set; }


    public virtual ActividadEconomicas? impuestoactividadFk { get; set; }

    [Required(ErrorMessage = "El campo Régimen Tributario es obligatorio")]
    [Column("regimenId")]
    [ForeignKey("impuestoregimenFk")]
    public int regimenId { get; set; }


    public virtual RegimenesTributarios? impuestoregimenFk { get; set; }

    [Required(ErrorMessage = "El campo Tipo Sociedad es obligatorio")]
    [Column("sociedadesId")]
    [ForeignKey("impuestosociedadesFk")]
    public int sociedadesId { get; set; }


    public virtual TiposSociedades? impuestosociedadesFk { get; set; }

    [Required(ErrorMessage = "El campo Nombre es obligatorio")]
    [MaxLength(100, ErrorMessage = "El campo Nombre debe tener máximo 100 caracteres")]
    [Column("nombre", TypeName = "varchar(100)")]
    public string nombre { get; set; }

    [Required(ErrorMessage = "El campo Descripción es obligatorio")]
    [MaxLength(100, ErrorMessage = "El campo Descripción debe tener máximo 100 caracteres")]
    [Column("descripcion", TypeName = "varchar(100)")]
    public string descripcion { get; set; }

    [Required(ErrorMessage = "El campo Código es obligatorio")]
    [MaxLength(100, ErrorMessage = "El campo Código debe tener máximo 100 caracteres")]
    [Column("codigo", TypeName = "varchar(100)")]
    public string codigo { get; set; }

    [Required(ErrorMessage = "El campo Porcentaje es obligatorio")]
    [MaxLength(100, ErrorMessage = "El campo Porcentaje debe tener máximo 100 caracteres")]
    [Column("porcentaje", TypeName = "varchar(100)")]
    public string porcentaje { get; set; }
}