using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Datos.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Docentes",
                columns: table => new
                {
                    Identificacion = table.Column<string>(nullable: false),
                    Nombre = table.Column<string>(nullable: false),
                    Apellido = table.Column<string>(nullable: false),
                    Programa = table.Column<string>(nullable: false),
                    FechaReg = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Docentes", x => x.Identificacion);
                });

            migrationBuilder.CreateTable(
                name: "Monitores",
                columns: table => new
                {
                    Identificacion = table.Column<string>(nullable: false),
                    Nombre = table.Column<string>(nullable: false),
                    Apellido = table.Column<string>(nullable: false),
                    Programa = table.Column<string>(nullable: false),
                    Celular = table.Column<string>(maxLength: 10, nullable: true),
                    FechaReg = table.Column<DateTime>(nullable: false),
                    Sexo = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Monitores", x => x.Identificacion);
                });

            migrationBuilder.CreateTable(
                name: "Productos",
                columns: table => new
                {
                    CodProducto = table.Column<string>(nullable: false),
                    Descripcion = table.Column<string>(nullable: true),
                    Marca = table.Column<string>(nullable: true),
                    Cantidad = table.Column<int>(nullable: false),
                    FechaRegistro = table.Column<DateTime>(nullable: false),
                    Categoria = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Productos", x => x.CodProducto);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    Identificacion = table.Column<string>(nullable: false),
                    Nombre = table.Column<string>(nullable: true),
                    Apellido = table.Column<string>(nullable: true),
                    UserName = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    Correo = table.Column<string>(nullable: true),
                    FechaReg = table.Column<DateTime>(nullable: false),
                    Tipo = table.Column<string>(nullable: true),
                    Estado = table.Column<string>(nullable: true),
                    Token = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.Identificacion);
                });

            migrationBuilder.CreateTable(
                name: "Asignaturas",
                columns: table => new
                {
                    CodAsignatura = table.Column<string>(nullable: false),
                    NombreAsignatura = table.Column<string>(nullable: true),
                    DocenteIdentificacion = table.Column<string>(nullable: true),
                    FechaReg = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Asignaturas", x => x.CodAsignatura);
                    table.ForeignKey(
                        name: "FK_Asignaturas_Docentes_DocenteIdentificacion",
                        column: x => x.DocenteIdentificacion,
                        principalTable: "Docentes",
                        principalColumn: "Identificacion",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Solicitudes",
                columns: table => new
                {
                    CodigoSolicitud = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AsignaturaCodAsignatura = table.Column<string>(nullable: true),
                    JsonProductos = table.Column<string>(nullable: true),
                    FechaPedido = table.Column<DateTime>(nullable: false),
                    MonitorIdentificacion = table.Column<string>(nullable: true),
                    FechaEntrega = table.Column<DateTime>(nullable: false),
                    Estado = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Solicitudes", x => x.CodigoSolicitud);
                    table.ForeignKey(
                        name: "FK_Solicitudes_Asignaturas_AsignaturaCodAsignatura",
                        column: x => x.AsignaturaCodAsignatura,
                        principalTable: "Asignaturas",
                        principalColumn: "CodAsignatura",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Solicitudes_Monitores_MonitorIdentificacion",
                        column: x => x.MonitorIdentificacion,
                        principalTable: "Monitores",
                        principalColumn: "Identificacion",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Asignaturas_DocenteIdentificacion",
                table: "Asignaturas",
                column: "DocenteIdentificacion");

            migrationBuilder.CreateIndex(
                name: "IX_Solicitudes_AsignaturaCodAsignatura",
                table: "Solicitudes",
                column: "AsignaturaCodAsignatura");

            migrationBuilder.CreateIndex(
                name: "IX_Solicitudes_MonitorIdentificacion",
                table: "Solicitudes",
                column: "MonitorIdentificacion");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Productos");

            migrationBuilder.DropTable(
                name: "Solicitudes");

            migrationBuilder.DropTable(
                name: "Usuarios");

            migrationBuilder.DropTable(
                name: "Asignaturas");

            migrationBuilder.DropTable(
                name: "Monitores");

            migrationBuilder.DropTable(
                name: "Docentes");
        }
    }
}
