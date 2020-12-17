using System;
using System.ComponentModel.DataAnnotations;
namespace Entity
{
    public class Usuario
    {
        [Key]
        public string Identificacion { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Correo { get; set; }
        public DateTime FechaReg { get; set; }
        public string Tipo { get; set; }
        public string Estado { get; set; }
        public string Token { get; set; }
    }
}