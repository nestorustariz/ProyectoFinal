using System;
using System.Collections.Generic;
using Datos;
using Entity;
using Logica;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Proyecto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MonitorController : ControllerBase
    {
        private readonly MonitorService _monitorService;

        public MonitorController(UpcLabContext context)
        {
            _monitorService = new MonitorService(context);
        }

        private Monitor MapearMonitor(Monitor monitor)
        {
            var _monitor = new Monitor
            {
                Identificacion = monitor.Identificacion,
                Nombre = monitor.Nombre,
                Apellido = monitor.Apellido,
                Programa = monitor.Programa,
                Celular = monitor.Celular,
                Sexo = monitor.Sexo,
                FechaReg = DateTime.Now
            };
            return _monitor;
        }

        [HttpPost]
        public  ActionResult<Monitor> PostMonitor(Monitor monitor)
        {
            Monitor monitorMapeado = MapearMonitor(monitor);
            var response = _monitorService.GuardarMonitor(monitorMapeado);
            if (response.Error)
            {
                ModelState.AddModelError("Mensaje", response.Mensaje);

            }
            if (!ModelState.IsValid)
            {
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
            }
            return Ok(response.Monitor);
        }

        [HttpGet]
        public ActionResult<IEnumerable<Monitor>> Docentes()
        {
            var response = _monitorService.ConsultarMonitores();
            if (response.Error)
            {
                ModelState.AddModelError("Mensaje", response.Mensaje);
            }
            if (!ModelState.IsValid)
            {
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
            }

            return Ok(response.Monitores);
        }
    }
}
