using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Entity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Proyecto.Config;

namespace Proyecto.Services
{
    public class JwtService
    {
        private readonly AppSetting _appSetting;
        public JwtService(IOptions<AppSetting> appSeting)
        {
            _appSetting = appSeting.Value;
        }

        public Usuario GenerateToken(Usuario userLogin){

            if(userLogin == null)return null;
            var userResponse = new Usuario(){ Nombre = userLogin.Nombre, Apellido = userLogin.Apellido,Identificacion = userLogin.Identificacion,UserName = userLogin.UserName, Tipo = userLogin.Tipo};

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSetting.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor{
                Subject = new ClaimsIdentity(new Claim[] {
                    new Claim(ClaimTypes.Name, userLogin.UserName.ToString()),
                    new Claim(ClaimTypes.Email,userLogin.Correo.ToString()),
                    new Claim(ClaimTypes.Role, "Rol1"),
                    new Claim(ClaimTypes.Role, "Rol2"),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            userResponse.Token = tokenHandler.WriteToken(token);
            return userResponse;
        }
    }
}
