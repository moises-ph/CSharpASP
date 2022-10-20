using AppAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

namespace AppAPI.Data
{
    public class UsuarioData
    {
        public static bool registrarUsuario(Usuario oUsuario)
        {
            ConexionBD objEst = new ConexionBD();
            string sentencia = $"EXECUTE usp_registrar '{oUsuario.ID_Usuario}', '{oUsuario.Nombres}', '{oUsuario.Telefono}', '{oUsuario.Correo}', '{oUsuario.Ciudad}'";
            if(!objEst.EjecutarSentencia(sentencia, false))
            {
                objEst = null;
                return false;
            }
            else
            {
                objEst = null;
                return true;
            }
        }
        public static bool actualizarUsuario(Usuario oUsuario)
        {
            ConexionBD objEst = new ConexionBD();
            string sentencia = $"EXECUTE usp_Actualizar '{oUsuario.ID_Usuario}', '{oUsuario.Nombres}', '{oUsuario.Telefono}', '{oUsuario.Correo}', '{oUsuario.Ciudad}'";
            if (!objEst.EjecutarSentencia(sentencia, false))
            {
                objEst = null;
                return false;
            }
            else
            {
                objEst = null;
                return true;
            }
        }

        public static bool eliminarUsuario(string id)
        {
            ConexionBD objEst = new ConexionBD();
            string sentencia = $"EXECUTE usp_Eliminar '{id}'";
            if (!objEst.EjecutarSentencia(sentencia, false))
            {
                objEst = null;
                return false;
            }
            else
            {
                objEst = null;
                return true;
            }
        }


        public static List<Usuario> consultarUsuario(string id)
        {
            ConexionBD objEst = new ConexionBD();
            List<Usuario> oListaUsuario = new List<Usuario>();
            string sentencia = $"EXECUTE usp_Consultar '{id}'";
            if (objEst.ConsultarValorUnico(sentencia, false))
            {
                SqlDataReader reader = objEst.Reader;
                reader.Read();
                oListaUsuario.Add(new Usuario()
                {
                    ID_Usuario = reader["ID_Usuario"].ToString(),
                    Nombres = reader["Nombres"].ToString(),
                    Telefono = reader["Telefono"].ToString(),
                    Correo = reader["Correo"].ToString(),
                    Ciudad = reader["Ciudad"].ToString(),
                    FechaIngreso = Convert.ToDateTime(reader["FechaIngreso"].ToString())
                });

                return oListaUsuario;
            }
            else
            {
                return oListaUsuario;
            }
        }

        public static List<Usuario> listarUsuario()
        {
            ConexionBD objEst = new ConexionBD();
            List<Usuario> oListaUsuario = new List<Usuario>();
            string sentencia = $"EXECUTE usp_Listar";
            if (objEst.Consultar(sentencia, false))
            {
                SqlDataReader reader = objEst.Reader;
                while (reader.Read())
                {
                    oListaUsuario.Add(new Usuario()
                    {
                        ID_Usuario = reader["ID_Usuario"].ToString(),
                        Nombres = reader["Nombres"].ToString(),
                        Telefono = reader["Telefono"].ToString(),
                        Correo = reader["Correo"].ToString(),
                        Ciudad = reader["Ciudad"].ToString(),
                        FechaIngreso = Convert.ToDateTime(reader["FechaIngreso"].ToString())
                    });
                }
                return oListaUsuario;
            }
            else
            {
                return oListaUsuario;
            }
        }
    }
}