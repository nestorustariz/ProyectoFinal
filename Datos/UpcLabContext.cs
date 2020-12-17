using System;
using Entity;
using Microsoft.EntityFrameworkCore;

namespace Datos
{
    public class UpcLabContext : DbContext
    {
        public UpcLabContext(DbContextOptions options) : base(options)
        {
            
        }
        public DbSet<Asignatura> Asignaturas { get; set; }
        public DbSet<Docente> Docentes { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Producto> Productos { get; set; }
        public DbSet<Solicitar> Solicitudes { get; set; }
        public DbSet<Monitor> Monitores { get; set; }
    }
}
