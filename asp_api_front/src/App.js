import './App.css';
import Nav from './components/nav/Nav.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [Users, setUsers] = useState([]);
  const URL = "http://www.appusersasp.somee.com/api/usuario";

  const eliminarUsuarios = async (e) => {
    e.target.parentNode.display = "none";
    await axios.delete(URL + '/' + e.target.value)
      .then(res => res ? listarUsuarios() : console.log("Error al eliminar usuario, intente de nuevo"))
      .catch(err => console.log(err));
  }

  const listarUsuarios = async ()=>{
    let Users_temp;
    await axios.get(URL).then(data => Users_temp = data.data).catch(err => console.log(err));
    setUsers(Users_temp);
  }

  useEffect(()=>{
    listarUsuarios();
  }, []);

  return (
    <>
      <Nav />
      <div className='UsersList'>
        <table>
          <thead>
            <tr>
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
                <td><button value={value.ID_Usuario}>Editar</button></td>
                <td><button onClick={eliminarUsuarios} value={value.ID_Usuario}>Eliminar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
