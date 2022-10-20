﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AppAPI.Data;
using AppAPI.Models;

namespace AppAPI.Controllers
{
    public class UsuarioController : ApiController
    {
        // GET api/<controller>
        public List<Usuario> Get()
        {
            return UsuarioData.listarUsuario();
        }

        // GET api/<controller>/5
        public List<Usuario> Get(string id)
        {
            return UsuarioData.consultarUsuario(id);
        }

        // POST api/<controller>
        public bool Post([FromBody] Usuario oUsuario)
        {
            return UsuarioData.registrarUsuario(oUsuario);
        }

        // PUT api/<controller>/5
        public bool Put([FromBody] Usuario oUsuario)
        {
            return UsuarioData.actualizarUsuario(oUsuario);
        }

        // DELETE api/<controller>/5
        public bool Delete(string id)
        {
            return UsuarioData.eliminarUsuario(id);
        }
    }
}