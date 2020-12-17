using System;
using System.Collections.Generic;
using System.Linq;
using Datos;
using Entity;
using Microsoft.EntityFrameworkCore;

namespace Logica
{
    public class AsignaturaService
    {
        private readonly UpcLabContext _context;

        public AsignaturaService(UpcLabContext context)
        {
            _context = context;
        }

        public class GuardarAsignaturaResponse
        {
            public GuardarAsignaturaResponse(Asignatura asignatura)
            {
                Error = false;
                Asignatura = asignatura;
            }
            public GuardarAsignaturaResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }

            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public Asignatura Asignatura { get; set; }
        }

        public GuardarAsignaturaResponse Guardar(AsignaturaRequest asignatura)
        {
            try
            {
                var asignaturaConsultada = _context.Asignaturas.Find(asignatura.CodAsignatura);
                if (asignaturaConsultada != null)
                {
                    return new GuardarAsignaturaResponse("La asignatura ya se encuentra registrada");
                }
                var docenteBuscado = _context.Docentes.Find(asignatura.IdentificacionD);
                if (docenteBuscado == null)
                {
                    return new GuardarAsignaturaResponse("El docente no existe, no se encontro");
                }
                Asignatura asognaturaMapeada = MapearAsignatura(asignatura,docenteBuscado);
                _context.Asignaturas.Add(asognaturaMapeada);
                _context.SaveChanges();
                return new GuardarAsignaturaResponse(asognaturaMapeada);
            }
            catch (Exception e)
            {
                return new GuardarAsignaturaResponse($"Error de la aplicacion: {e.Message}");
            }
        }

        private Asignatura MapearAsignatura(AsignaturaRequest asignatura,Docente docente)
        {
           var _asignatura = new Asignatura{
               CodAsignatura = asignatura.CodAsignatura,
               NombreAsignatura = asignatura.NombreAsignatura,
               FechaReg = DateTime.Now,
               Docente = docente
           };
           return _asignatura;
        }

        public ConsultarAsignaturaResponse ConsultarTodas()
        {
            try
            {
                var asignaturas = _context.Asignaturas.Include(c => c.Docente).Select(p => new AsignaturaView
                {
                    CodAsignatura = p.CodAsignatura,
                    NombreAsignatura = p.NombreAsignatura,
                    IdentificacionD = p.Docente.Identificacion,
                    NombreD = p.Docente.Nombre
                }).ToList();
                if (asignaturas == null)
                {
                    return new ConsultarAsignaturaResponse("No hay elementos en la lista");
                }
                return new ConsultarAsignaturaResponse(asignaturas);
            }
            catch (Exception e)
            {
                return new ConsultarAsignaturaResponse($"Error de la aplicacion: {e.Message}");
            }
        }

        public ConsultarAsignaturaResponse GetAsignaturasByIdDocente(string identificacionD)
        {
            try
            {
                var asignaturas = _context.Asignaturas.Where(t=>t.Docente.Identificacion.Trim() == identificacionD).Include(c => c.Docente).Select(p => new AsignaturaView
                {
                    CodAsignatura = p.CodAsignatura,
                    NombreAsignatura = p.NombreAsignatura,
                    IdentificacionD = p.Docente.Identificacion,
                    NombreD = p.Docente.Nombre
                }).ToList();
                if (asignaturas == null)
                {
                    return new ConsultarAsignaturaResponse("No hay elementos en la lista");
                }
                return new ConsultarAsignaturaResponse(asignaturas);
            }
            catch (Exception e)
            {
                return new ConsultarAsignaturaResponse($"Error de la aplicacion: {e.Message}");
            }
        }

        public class ConsultarAsignaturaResponse
        {
            public ConsultarAsignaturaResponse(List<AsignaturaView> asignaturas)
            {
                Error = false;
                Asignaturas = asignaturas;
            }
            public ConsultarAsignaturaResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }

            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public List<AsignaturaView> Asignaturas { get; set; }
        }
    }
}
