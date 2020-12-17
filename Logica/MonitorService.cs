using System;
using System.Collections.Generic;
using System.Linq;
using Datos;
using Entity;

namespace Logica
{
    public class MonitorService
    {
        private readonly UpcLabContext _context;

        public MonitorService(UpcLabContext context)
        {
            _context = context;
        }

        public class GuardarMonitorResponse
        {
            public GuardarMonitorResponse(Monitor monitor)
            {
                Error = false;
                Monitor = monitor;
            }
            public GuardarMonitorResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }

            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public Monitor Monitor { get; set; }
        }

        public GuardarMonitorResponse GuardarMonitor(Monitor monitor)
        {
            try
            {
                var monitorBuscado = _context.Monitores.Find(monitor.Identificacion);
                if (monitorBuscado != null)
                {
                    return new GuardarMonitorResponse("Ya hay un monitor con la misma identificacion");
                }
                _context.Monitores.Add(monitor);
                _context.SaveChanges();
                return new GuardarMonitorResponse(monitor);
            }
            catch (Exception e)
            {
                return new GuardarMonitorResponse($"Error de la aplicacion: {e.Message}");
            }
        }

        public class ConsultarMonitorResponse
        {
            public ConsultarMonitorResponse(List<Monitor> monitores)
            {
                Error = false;
                Monitores = monitores;
            }
            public ConsultarMonitorResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }

            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public List<Monitor> Monitores { get; set; }
        }

        public ConsultarMonitorResponse ConsultarMonitores()
        {
            try
            {
                var monitores = _context.Monitores.ToList();

                if (monitores == null)
                {
                    return new ConsultarMonitorResponse("No hay elementos en la lista");
                }
                return new ConsultarMonitorResponse(monitores);
            }
            catch (Exception e)
            {
                return new ConsultarMonitorResponse($"Error de la aplicacion: {e.Message}");
            }
        }
    }
}
