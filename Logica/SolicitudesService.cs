using System;
using System.Collections.Generic;
using System.Linq;
using Datos;
using Entity;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Logica
{
    public class SolicitudesService
    {
        private readonly UpcLabContext _context;

        public SolicitudesService(UpcLabContext context)
        {
            _context = context;
        }
        public class GuardarSolicitudResponse
        {
            public GuardarSolicitudResponse(Solicitar solicitar)
            {
                Error = false;
                Solicitar = solicitar;
            }
            public GuardarSolicitudResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }

            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public Solicitar Solicitar { get; set; }
        }

        public class ConsultarSolicitudesResponse
        {
            public ConsultarSolicitudesResponse(List<SolicitarView> solicitudes)
            {
                Error = false;
                Solicitudes = solicitudes;
            }
            public ConsultarSolicitudesResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }

            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public List<SolicitarView> Solicitudes { get; set; }
        }

        public class ConsultarSolicitudResponse
        {
            public ConsultarSolicitudResponse(SolicitarView solicitud)
            {
                Error = false;
                Solicitud = solicitud;
            }
            public ConsultarSolicitudResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }

            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public SolicitarView Solicitud { get; set; }
        }

        public GuardarSolicitudResponse Guardar(SolicitarRequest solicitar)
        {
            try
            {
                var solictudConsultada = _context.Solicitudes.Find(solicitar.CodigoSolicitud);
                if (solictudConsultada != null)
                {
                    return new GuardarSolicitudResponse("La solicitud ya se encuentra registrada");
                }
                var asignatura = _context.Asignaturas.Find(solicitar.CodAsignatura);
                if (asignatura == null)
                {
                    return new GuardarSolicitudResponse("La asignatura no existe, no se encontro");
                }  
                var monitor = _context.Monitores.Find(solicitar.IdentificacionM);
                if (monitor == null)
                {
                    return new GuardarSolicitudResponse("El monitor no existe, no se encontro");
                }   
                 Solicitar solicitudM = MapearSolicitud(solicitar,asignatura,monitor);          
                _context.Solicitudes.Add(solicitudM);
                _context.SaveChanges();
                return new GuardarSolicitudResponse(solicitudM);
            }
            catch (Exception e)
            {
                return new GuardarSolicitudResponse($"Error de la aplicacion: {e.Message}");
            }
        }

        private Solicitar MapearSolicitud(SolicitarRequest solicitud,Asignatura asignatura,Monitor monitor)
        {
            var _solicitud = new Solicitar
            {
                Asignatura = asignatura,
                JsonProductos = solicitud.JsonProductos,
                FechaEntrega = solicitud.FechaEntrega,
                FechaPedido = solicitud.FechaPedido,
                Monitor = monitor,
                Estado = "En Proceso"
            };
            return _solicitud;
        }

        public ConsultarSolicitudesResponse ConsultarTodas()
        {
            try
            {
                var solicitudes = _context.Solicitudes.Include(c => c.Asignatura).Include(t => t.Monitor).Select(p => new SolicitarView
                {
                    CodAsignatura = p.Asignatura.CodAsignatura,
                    CodigoSolicitud = p.CodigoSolicitud,
                    FechaPedido = p.FechaPedido,
                    FechaEntrega = Convert.ToDateTime(p.FechaEntrega.ToShortDateString()),
                    IdentificacionD = p.Asignatura.Docente.Identificacion,
                    IdentificacionM = p.Monitor.Identificacion,
                    NombreM = p.Monitor.Nombre,
                    NombreAsignatura = p.Asignatura.NombreAsignatura,
                    NombreD = p.Asignatura.Docente.Nombre,
                    JsonProductos = p.JsonProductos,
                    Estado = p.Estado
                }).ToList();
                if (solicitudes == null)
                {
                    return new ConsultarSolicitudesResponse("No hay elementos en la lista");
                }
                return new ConsultarSolicitudesResponse(solicitudes);
            }
            catch (Exception e)
            {
                return new ConsultarSolicitudesResponse($"Error de la aplicacion: {e.Message}");
            }
        }

        public ConsultarSolicitudesResponse SolicitudesByIdMonitor(string identificacion)
        {
            try
            {
                var _solicitudes = _context.Solicitudes.Where(s => s.Monitor.Identificacion.Trim() == identificacion)
                .Include(c => c.Monitor).Include(t => t.Asignatura).Select(p => new SolicitarView {
                    Estado = p.Estado,
                    FechaEntrega = p.FechaEntrega,
                    FechaPedido = p.FechaPedido,
                    IdentificacionM = p.Monitor.Identificacion,
                    CodigoSolicitud = p.CodigoSolicitud,
                    NombreAsignatura = p.Asignatura.NombreAsignatura,
                    NombreD = p.Asignatura.Docente.Nombre,
                    NombreM = p.Monitor.Nombre
                }).ToList();
                if (_solicitudes == null)
                {
                    return new ConsultarSolicitudesResponse("No hay elementos en la lista");
                }
                return new ConsultarSolicitudesResponse(_solicitudes);
            }
            catch (Exception e)
            {
                return new ConsultarSolicitudesResponse($"Error de la aplicacion: {e.Message}");
            }
        }

        public ConsultarSolicitudResponse SolicitudesById(int codigoSolicitud)
        {
            try
            {
                var _solicitud = _context.Solicitudes.Where(s => s.CodigoSolicitud == codigoSolicitud)
                .Include(c => c.Monitor).Include(t => t.Asignatura).Select(p => new SolicitarView {
                    Estado = p.Estado,
                    FechaEntrega = p.FechaEntrega,
                    FechaPedido = Convert.ToDateTime(p.FechaPedido.ToShortDateString()),
                    IdentificacionM = p.Monitor.Identificacion,
                    CodigoSolicitud = p.CodigoSolicitud,
                    NombreAsignatura = p.Asignatura.NombreAsignatura,
                    NombreD = p.Asignatura.Docente.Nombre,
                    NombreM = p.Monitor.Nombre,
                    IdentificacionD = p.Asignatura.Docente.Identificacion,
                    JsonProductos = p.JsonProductos
                }).FirstOrDefault();
                if (_solicitud == null)
                {
                    return new ConsultarSolicitudResponse("No hay elementos en la lista");
                }
                return new ConsultarSolicitudResponse(_solicitud);
            }
            catch (Exception e)
            {
                return new ConsultarSolicitudResponse($"Error de la aplicacion: {e.Message}");
            }
        }

        public GuardarSolicitudResponse ModificarEstadoSolicitud(SolicitarRequest solicitudNueva)
        {
            try
            {
                var solicitudVieja = _context.Solicitudes.Find(solicitudNueva.CodigoSolicitud);
                if (solicitudVieja != null)
                {
                    solicitudVieja.Estado = solicitudNueva.Estado;
                    _context.Solicitudes.Update(solicitudVieja);
                    _context.SaveChanges();
                    return new GuardarSolicitudResponse(solicitudVieja);
                }
                else
                {
                    return new GuardarSolicitudResponse ($"La solicitud con codigo {solicitudNueva.CodigoSolicitud} no se encontro");
                }
            }
            catch (Exception e)
            {
                return new GuardarSolicitudResponse ($"Error de la aplicacion: {e.Message}");
            }
        }
    }
}
