﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AppAPI.Models
{
    public class Usuario
    {
        #region Propiedades y Entidades
        public string ID_Usuario { get; set; }
        public string Nombres { get; set; }
        public string Telefono { get; set; }
        public string Correo { get ; set ; }
        public string Ciudad { get; set ; }
        public DateTime FechaIngreso { get ; set ; }
        #endregion
    }
}