using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Kratos.Server.Migrations
{
    /// <inheritdoc />
    public partial class cambios001 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ActividadEconomicas",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    codigoCiiu = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    categoria = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActividadEconomicas", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Categorias",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    categoriapadreId = table.Column<int>(type: "int", nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    activo = table.Column<bool>(type: "bit", nullable: false),
                    creadoEn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    actualizadoEn = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categorias", x => x.id);
                    table.ForeignKey(
                        name: "FK_Categorias_Categorias_categoriapadreId",
                        column: x => x.categoriapadreId,
                        principalTable: "Categorias",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Modulos",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Modulos", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "RegimenesTributarios",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    codigo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    estado = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegimenesTributarios", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "TiposSociedades",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    codigo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TiposSociedades", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Empresas",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    contraseña = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    confirmarContraseña = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    tiposociedadId = table.Column<int>(type: "int", nullable: false),
                    actividadId = table.Column<int>(type: "int", nullable: false),
                    regimenId = table.Column<int>(type: "int", nullable: false),
                    token = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    razonSocial = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    nombreComercial = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    nit = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    dv = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    telefono = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    representanteLegal = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    activo = table.Column<bool>(type: "bit", nullable: false),
                    creadoEn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    actualizadoEn = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Empresas", x => x.id);
                    table.ForeignKey(
                        name: "FK_Empresas_ActividadEconomicas_actividadId",
                        column: x => x.actividadId,
                        principalTable: "ActividadEconomicas",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Empresas_RegimenesTributarios_regimenId",
                        column: x => x.regimenId,
                        principalTable: "RegimenesTributarios",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Empresas_TiposSociedades_tiposociedadId",
                        column: x => x.tiposociedadId,
                        principalTable: "TiposSociedades",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Impuestos",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    actividadId = table.Column<int>(type: "int", nullable: false),
                    regimenId = table.Column<int>(type: "int", nullable: false),
                    sociedadesId = table.Column<int>(type: "int", nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    codigo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    porcentaje = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Impuestos", x => x.id);
                    table.ForeignKey(
                        name: "FK_Impuestos_ActividadEconomicas_actividadId",
                        column: x => x.actividadId,
                        principalTable: "ActividadEconomicas",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Impuestos_RegimenesTributarios_regimenId",
                        column: x => x.regimenId,
                        principalTable: "RegimenesTributarios",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Impuestos_TiposSociedades_sociedadesId",
                        column: x => x.sociedadesId,
                        principalTable: "TiposSociedades",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    empresaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.id);
                    table.ForeignKey(
                        name: "FK_Roles_Empresas_empresaId",
                        column: x => x.empresaId,
                        principalTable: "Empresas",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TratamientosEmpresas",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    empresaId = table.Column<int>(type: "int", nullable: false),
                    tipoimpuestoId = table.Column<int>(type: "int", nullable: false),
                    porcentaje = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TratamientosEmpresas", x => x.id);
                    table.ForeignKey(
                        name: "FK_TratamientosEmpresas_Empresas_empresaId",
                        column: x => x.empresaId,
                        principalTable: "Empresas",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TratamientosEmpresas_Impuestos_tipoimpuestoId",
                        column: x => x.tipoimpuestoId,
                        principalTable: "Impuestos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Permisos",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    rolesId = table.Column<int>(type: "int", nullable: false),
                    modulosId = table.Column<int>(type: "int", nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    codigo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    consultar = table.Column<bool>(type: "bit", nullable: false),
                    leer = table.Column<bool>(type: "bit", nullable: false),
                    insertar = table.Column<bool>(type: "bit", nullable: false),
                    editar = table.Column<bool>(type: "bit", nullable: false),
                    eliminar = table.Column<bool>(type: "bit", nullable: false),
                    importar = table.Column<bool>(type: "bit", nullable: false),
                    exportar = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permisos", x => x.id);
                    table.ForeignKey(
                        name: "FK_Permisos_Modulos_modulosId",
                        column: x => x.modulosId,
                        principalTable: "Modulos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Permisos_Roles_rolesId",
                        column: x => x.rolesId,
                        principalTable: "Roles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    rolesId = table.Column<int>(type: "int", nullable: false),
                    contraseña = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    confirmarContraseña = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    token = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    nombres = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    apellidos = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    telefono = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    estado = table.Column<bool>(type: "bit", nullable: false),
                    creadoEn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    actualizadoEn = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.id);
                    table.ForeignKey(
                        name: "FK_Usuarios_Roles_rolesId",
                        column: x => x.rolesId,
                        principalTable: "Roles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Productos",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    codigo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    impuestoId = table.Column<int>(type: "int", nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    categoriaId = table.Column<int>(type: "int", nullable: false),
                    precio = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    costo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    stockMinimo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    activo = table.Column<bool>(type: "bit", nullable: false),
                    creadoEn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    actualizadoEn = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Productos", x => x.id);
                    table.ForeignKey(
                        name: "FK_Productos_Categorias_categoriaId",
                        column: x => x.categoriaId,
                        principalTable: "Categorias",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Productos_TratamientosEmpresas_impuestoId",
                        column: x => x.impuestoId,
                        principalTable: "TratamientosEmpresas",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PuntoVentas",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    direccion = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    telefono = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    responsableId = table.Column<int>(type: "int", nullable: false),
                    activo = table.Column<bool>(type: "bit", nullable: false),
                    creadoEn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    actualizadoEn = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PuntoVentas", x => x.id);
                    table.ForeignKey(
                        name: "FK_PuntoVentas_Usuarios_responsableId",
                        column: x => x.responsableId,
                        principalTable: "Usuarios",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Inventarios",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    productoId = table.Column<int>(type: "int", nullable: false),
                    puntoventaId = table.Column<int>(type: "int", nullable: false),
                    cantidad = table.Column<int>(type: "int", nullable: false),
                    creadoEn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    actualizadoEn = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inventarios", x => x.id);
                    table.ForeignKey(
                        name: "FK_Inventarios_Productos_productoId",
                        column: x => x.productoId,
                        principalTable: "Productos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Inventarios_PuntoVentas_puntoventaId",
                        column: x => x.puntoventaId,
                        principalTable: "PuntoVentas",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Categorias_categoriapadreId",
                table: "Categorias",
                column: "categoriapadreId");

            migrationBuilder.CreateIndex(
                name: "IX_Empresas_actividadId",
                table: "Empresas",
                column: "actividadId");

            migrationBuilder.CreateIndex(
                name: "IX_Empresas_regimenId",
                table: "Empresas",
                column: "regimenId");

            migrationBuilder.CreateIndex(
                name: "IX_Empresas_tiposociedadId",
                table: "Empresas",
                column: "tiposociedadId");

            migrationBuilder.CreateIndex(
                name: "IX_Impuestos_actividadId",
                table: "Impuestos",
                column: "actividadId");

            migrationBuilder.CreateIndex(
                name: "IX_Impuestos_regimenId",
                table: "Impuestos",
                column: "regimenId");

            migrationBuilder.CreateIndex(
                name: "IX_Impuestos_sociedadesId",
                table: "Impuestos",
                column: "sociedadesId");

            migrationBuilder.CreateIndex(
                name: "IX_Inventarios_productoId",
                table: "Inventarios",
                column: "productoId");

            migrationBuilder.CreateIndex(
                name: "IX_Inventarios_puntoventaId",
                table: "Inventarios",
                column: "puntoventaId");

            migrationBuilder.CreateIndex(
                name: "IX_Permisos_modulosId",
                table: "Permisos",
                column: "modulosId");

            migrationBuilder.CreateIndex(
                name: "IX_Permisos_rolesId",
                table: "Permisos",
                column: "rolesId");

            migrationBuilder.CreateIndex(
                name: "IX_Productos_categoriaId",
                table: "Productos",
                column: "categoriaId");

            migrationBuilder.CreateIndex(
                name: "IX_Productos_impuestoId",
                table: "Productos",
                column: "impuestoId");

            migrationBuilder.CreateIndex(
                name: "IX_PuntoVentas_responsableId",
                table: "PuntoVentas",
                column: "responsableId");

            migrationBuilder.CreateIndex(
                name: "IX_Roles_empresaId",
                table: "Roles",
                column: "empresaId");

            migrationBuilder.CreateIndex(
                name: "IX_TratamientosEmpresas_empresaId",
                table: "TratamientosEmpresas",
                column: "empresaId");

            migrationBuilder.CreateIndex(
                name: "IX_TratamientosEmpresas_tipoimpuestoId",
                table: "TratamientosEmpresas",
                column: "tipoimpuestoId");

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_rolesId",
                table: "Usuarios",
                column: "rolesId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Inventarios");

            migrationBuilder.DropTable(
                name: "Permisos");

            migrationBuilder.DropTable(
                name: "Productos");

            migrationBuilder.DropTable(
                name: "PuntoVentas");

            migrationBuilder.DropTable(
                name: "Modulos");

            migrationBuilder.DropTable(
                name: "Categorias");

            migrationBuilder.DropTable(
                name: "TratamientosEmpresas");

            migrationBuilder.DropTable(
                name: "Usuarios");

            migrationBuilder.DropTable(
                name: "Impuestos");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Empresas");

            migrationBuilder.DropTable(
                name: "ActividadEconomicas");

            migrationBuilder.DropTable(
                name: "RegimenesTributarios");

            migrationBuilder.DropTable(
                name: "TiposSociedades");
        }
    }
}
