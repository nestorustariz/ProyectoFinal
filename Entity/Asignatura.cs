using System;
using System.ComponentModel.DataAnnotations;

namespace Entity
{
    public class Asignatura
    {
        [Key]
        public string CodAsignatura { get; set; }
        public string NombreAsignatura { get; set; }
        public  virtual Docente Docente { get; set; }
        public DateTime FechaReg { get; set; }
    }
}