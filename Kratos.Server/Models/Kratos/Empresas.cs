using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace kratos.Server.Models.Kratos
{

    [Table("Empresas")] // Especifica el nombre de la tabla en MySQL
    public class Empresas
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        [Required(ErrorMessage = "El campo Contraseña es obligatorio")]
        [MaxLength(100, ErrorMessage = "La contraseña no puede exceder 100 caracteres")]
        [DataType(DataType.Password)]
        [Column("contrasena", TypeName = "varchar(100)")]
        public string contrasena { get; set; }


        [Required(ErrorMessage = "El campo Confirmar Contraseña es obligatorio")]
        [MaxLength(100, ErrorMessage = "La confirmación no puede exceder 100 caracteres")]
        [DataType(DataType.Password)]
        [Compare("contrasena", ErrorMessage = "Las contraseñas no coinciden")]
        public string confirmarContrasena { get; set; }

        [Required(ErrorMessage = "El campo Tipo Sociedad es obligatorio")]
        [Column("tiposociedadId")]
        [ForeignKey("empresasociedadFk")]
        public int tiposociedadId { get; set; }

    
        public virtual TiposSociedades? empresasociedadFk { get; set; }

        [Required(ErrorMessage = "El campo Actividad Económica es obligatorio")]
        [Column("actividadId")]
        [ForeignKey("empresaactividadFk")]
        public int actividadId { get; set; }

      
        public virtual ActividadEconomicas? empresaactividadFk { get; set; }

        [Required(ErrorMessage = "El campo Régimen Tributario es obligatorio")]
        [Column("regimenId")]
        [ForeignKey("empresaregimenFk")]
        public int regimenId { get; set; }

        public virtual RegimenesTributarios? empresaregimenFk { get; set; }

        [Required(ErrorMessage = "El campo Token es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo Token debe tener máximo 100 caracteres")]
        [Column("token", TypeName = "varchar(100)")]
        public string token { get; set; }

        [Required(ErrorMessage = "El campo Razón Social es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo Razón Social debe tener máximo 100 caracteres")]
        [Column("razonSocial", TypeName = "varchar(100)")]
        public string razonSocial { get; set; }

        [Required(ErrorMessage = "El campo Nombre Comercial es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo Nombre Comercial debe tener máximo 100 caracteres")]
        [Column("nombreComercial", TypeName = "varchar(100)")]
        public string nombreComercial { get; set; }

        [Required(ErrorMessage = "El campo NIT es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo NIT debe tener máximo 100 caracteres")]
        [Column("nit", TypeName = "varchar(100)")]
        public string nit { get; set; }

        [MaxLength(100, ErrorMessage = "El campo DV debe tener máximo 100 caracteres")]
        [Column("dv", TypeName = "varchar(100)")]
        public string dv { get; set; }

        [Required(ErrorMessage = "El campo Teléfono es obligatorio")]
        [DataType(DataType.PhoneNumber)]
        [Column("telefono", TypeName = "varchar(20)")]
        public string telefono { get; set; }

        [Required(ErrorMessage = "El campo Email es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo Email debe tener máximo 100 caracteres")]
        [DataType(DataType.EmailAddress)]
        [Column("email", TypeName = "varchar(100)")]
        public string email { get; set; }

        [Required(ErrorMessage = "El campo Representante Legal es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo Representante Legal debe tener máximo 100 caracteres")]
        [Column("representanteLegal", TypeName = "varchar(100)")]
        public string representanteLegal { get; set; }

        [Column("activo", TypeName = "tinyint(1)")]
        public bool activo { get; set; } = true; // Valor por defecto

        [DataType(DataType.Date)]
        [Column("creadoEn", TypeName = "date")]
        public DateTime creadoEn { get; set; } = DateTime.UtcNow; // Valor por defecto

        [DataType(DataType.Date)]
        [Column("actualizadoEn", TypeName = "date")]
        public DateTime actualizadoEn { get; set; } = DateTime.UtcNow; // Valor por defecto
    }
}