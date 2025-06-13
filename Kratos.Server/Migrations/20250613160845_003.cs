using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Kratos.Server.Migrations
{
    /// <inheritdoc />
    public partial class _003 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "contraseña",
                table: "Empresas",
                newName: "contrasena");

            migrationBuilder.RenameColumn(
                name: "confirmarContraseña",
                table: "Empresas",
                newName: "confirmarContrasena");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "contrasena",
                table: "Empresas",
                newName: "contraseña");

            migrationBuilder.RenameColumn(
                name: "confirmarContrasena",
                table: "Empresas",
                newName: "confirmarContraseña");
        }
    }
}
