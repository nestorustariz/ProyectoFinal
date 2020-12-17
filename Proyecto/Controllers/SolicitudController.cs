using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Datos;
using Entity;
using Logica;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Proyecto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SolicitudController : ControllerBase
    {
        private readonly SolicitudesService _solicitudService;

        public SolicitudController(UpcLabContext context)
        {
            _solicitudService = new SolicitudesService(context);
        }

        [HttpPost]
        public ActionResult<Solicitar> Post(SolicitarRequest solicitar)
        {           
            var response = _solicitudService.Guardar(solicitar);
            if (response.Error)
            {   
                ModelState.AddModelError("Solicitud",response.Mensaje);
                
            }
            if (!ModelState.IsValid)
            {
                var problemDetails = new ValidationProblemDetails(ModelState){
                    Status = StatusCodes.Status400BadRequest,
                };
                return  BadRequest(problemDetails);
            }
            return  Ok(response.Solicitar);
        }

        [HttpGet]
        public  ActionResult<IEnumerable<SolicitarView>> Gets()
        {
            var response = _solicitudService.ConsultarTodas();
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
                return  BadRequest(problemDetails);
            }

            return Ok(response.Solicitudes);
        }

        [HttpGet("{identificacionM}")]
        public  ActionResult<IEnumerable<SolicitarView>> SolicitudesByIdMonitor(string identificacionM)
        {
            var response = _solicitudService.SolicitudesByIdMonitor(identificacionM);
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
                return  BadRequest(problemDetails);
            }

            return Ok(response.Solicitudes);
        }

        [HttpGet("SolicitudesById/{codigoSolicitud}")]
        public  ActionResult<SolicitarView> SolicitudesById(string codigoSolicitud)
        {
            var response = _solicitudService.SolicitudesById(Convert.ToInt32(codigoSolicitud));
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
                return  BadRequest(problemDetails);
            }

            return Ok(response.Solicitud);
        }

        [HttpPut]
        public ActionResult<SolicitarRequest> ModificarEstado(SolicitarRequest solicitudNueva)
        {
            var response = _solicitudService.ModificarEstadoSolicitud(solicitudNueva);
            if (response.Error)
            {
                ModelState.AddModelError("Mensaje", response.Mensaje);
            }
            if (!ModelState.IsValid)
            {
                var problemDetails = new ValidationProblemDetails(ModelState){
                    Status = StatusCodes.Status400BadRequest,
                };
                return  BadRequest(problemDetails);
            }
            return  Ok(response.Solicitar);
        }
    }
}
