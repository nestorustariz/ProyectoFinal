using Datos;
using Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Logica
{
    public class DocenteService
    {
        private readonly UpcLabContext _context;

        public DocenteService(UpcLabContext context)
        {
            _context = context;
        }

        public GuardarDocenteResponse GuardarDocente(Docente docente)
        {
            try
            {
                var docenteBuscado = _context.Docentes.Find(docente.Identificacion);
                if (docenteBuscado != null)
                {
                    return new GuardarDocenteResponse("Ya hay un docente con la misma identificacion");
                }
                _context.Docentes.Add(docente);
                _context.SaveChanges();
                return new GuardarDocenteResponse(docente);
            }
            catch (Exception e)
            {
                return new GuardarDocenteResponse($"Error de la aplicacion: {e.Message}");
            }
        }

        public ConsultarDocenteResponse ConsultarDocentes()
        {
            try
            {
                var docentes = _context.Docentes.ToList();

                if (docentes == null)
                {
                    return new ConsultarDocenteResponse("No hay elementos en la lista");
                }
                return new ConsultarDocenteResponse(docentes);
            }
            catch (Exception e)
            {
                return new ConsultarDocenteResponse($"Error de la aplicacion: {e.Message}");
            }
        }

        public class GuardarDocenteResponse
        {
            public GuardarDocenteResponse(Docente docente)
            {
                Error = false;
                Docente = docente;
            }
            public GuardarDocenteResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }

            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public Docente Docente { get; set; }
        }

        public class ConsultarDocenteResponse
        {
            public ConsultarDocenteResponse(List<Docente> docentes)
            {
                Error = false;
                Docentes = docentes;
            }
            public ConsultarDocenteResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }

            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public List<Docente> Docentes { get; set; }
        }
    }
}
