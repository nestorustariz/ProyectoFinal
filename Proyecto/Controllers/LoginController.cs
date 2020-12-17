using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Datos;
using Entity;
using Logica;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Proyecto.Config;
using Proyecto.Services;

namespace Proyecto.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]  
    public class LoginController : ControllerBase
    {
        UpcLabContext _upcLabContext;
        private readonly UsuarioService _usuarioService;
        JwtService _jwtService;

        public LoginController(UpcLabContext context, IOptions<AppSetting> appSetting)
        {
            _upcLabContext = context;
            _usuarioService = new UsuarioService(context);
            _jwtService = new JwtService(appSetting);
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody] Usuario userP)
        {
            var user = _usuarioService.Validate(userP.UserName,userP.Password);
            if (user == null)return BadRequest("Username or password is incorrect");
            var response = _jwtService.GenerateToken(user);
            return Ok(response);
        }
        
        
    }
}
