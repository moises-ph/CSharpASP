import './App.css';
import Nav from './components/nav/Nav.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  class User {
    ID_Usuario
    Nombres
    Telefono
    Correo
    Ciudad
    constructor(ID_Usuario,Nombres,Telefono, Correo,Ciudad){
      this.ID_Usuario = ID_Usuario;
      this.Nombres = Nombres;
      this.Telefono = Telefono;
      this.Correo = Correo;
      this.Ciudad = Ciudad;
    }
  }

  const [Users, setUsers] = useState([]);
  const URL = "http://appusersasp.somee.com/api/usuario";

  const eliminarUsuarios = async (e) => {
    e.target.parentNode.display = "none";
    await axios.delete(URL + '/' + e.target.value)
      .then(res => res.data ? listarUsuarios() : new Error("Error al eliminar usuario, intente de nuevo"))
      .catch(err => console.log(err));
  }

  const listarUsuarios = async ()=>{
    let Users_temp;
    await axios.get(URL).then(data => Users_temp = data.data).catch(err => console.log(err));
    setUsers(Users_temp);
    console.log(Users_temp);
  }

  const registrarUsuarios = async (e)=>{
    e.preventDefault();
    let newUser = new User(e.target.elements.ID_Usuario.value,
      e.target.elements.Nombres.value,
      e.target.elements.Telefono.value,
      e.target.elements.Correo.value,
      e.target.elements.Ciudad.value
    );
    await axios.post(URL, newUser).then(res => res.data ? console.log(res.data): new Error("Ocurrió un error al registarr el usuario")).catch(err => console.log(err));
    listarUsuarios();
  }

  const consUsuario = async (e) =>{
    await axios.get(URL + `/${e.target.value}`).then().catch();
  }

  useEffect(()=>{
    listarUsuarios();
  }, []);

  return (
    <>
      <Nav />
      <div className='content'>
        <div className='table-responsive w-75'>
          <table className='table table-sm table-hover table-light'>
            <thead className='thead-light'>
              <tr className='table-dark'>
                <th>Nombres</th>
                <th>Telefono</th>
                <th>Correo</th>
                <th>Ciudad</th>
                <th>Fecha de Ingreso</th>
              </tr>
            </thead>
            <tbody>
              {Users.map((value) => (
                <tr key={value.ID_Usuario}>
                  <td>{value.Nombres}</td>
                  <td>{value.Telefono}</td>
                  <td>{value.Correo}</td>
                  <td>{value.Ciudad}</td>
                  <td>{value.FechaIngreso}</td>
                  <td><button className='btn btn-dark' onClick={consUsuario} value={value.ID_Usuario}>Editar</button></td>
                  <td><button className='btn btn-danger' onClick={eliminarUsuarios} value={value.ID_Usuario}>Eliminar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='w-25 m-auto'>
          <form onSubmit={registrarUsuarios} method='POST' id="newUser" name='newUser'>
            <div className='form-group'>
              <label  htmlFor='ID_Usuario'>ID del usuario</label>
              <input type='number' className='form-control' name='ID_Usuario' id='ID_Usuario' placeholder='ID Numérico' />
            </div>
            <div className='form-group'>
              <label  htmlFor='Nombres'>Nombres</label>
              <input type='text' className='form-control' id='Nombres' name='Nombres' placeholder='Nombres y Apellidos' />
            </div>
            <div className='form-group'>
              <label  htmlFor='Telefono'>Telefono</label>
              <input type='number' className='form-control' id='Telefono' name='Telefono' placeholder='Telefono' />
            </div>
            <div className='form-group'>
              <label  htmlFor='Correo'>Correo</label>
              <input type='email' className='form-control' id='Correo' name='Correo' placeholder='anyone@example.com' />
            </div>
            <div className='form-group'>
              <label  htmlFor='Ciudad'>Ciudad</label>
              <input type='text' className='form-control' id='Ciudad' name='Ciudad' placeholder='' />
            </div>
            <button type='submit'>Registrar Nuevo Usuario</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
