import './App.css';
import Nav from './components/nav/Nav.jsx';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function App() {

  const MySwal = withReactContent(Swal);  
  const Toast = MySwal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  }) 

  const message = (title, type) =>{
    type ?  Toast.fire({icon : "success",title}) : Toast.fire({icon : "error", title})
  }

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

  const Id_input = useRef(null);
  const Nombres_input = useRef(null);
  const Telefono_input = useRef(null);
  const Correo_input = useRef(null);
  const Ciudad_input = useRef(null);
  const limpiar_button = useRef(null);

  const [Actualizar, setActualizar] = useState(false);
  const [Users, setUsers] = useState([]);
  const URL = "http://appusersasp.somee.com/api/usuario";

  const eliminarUsuarios = async (e) => { 
    e.target.parentNode.display = "none";
    await axios.delete(URL + '/' + e.target.value)
      .then(res => res.data ? listarUsuarios() : new Error("Error al eliminar usuario, intente de nuevo"))
      .then(()=> message("Usuario eliminado correctamente", true))
      .catch(err => message(err.message, false));
  }

  const listarUsuarios = async ()=>{
    let Users_temp;
    await axios.get(URL).then(data => Users_temp = data.data).catch(err => message("Hubo un error, recargue la página", false));
    if(Users_temp.lenght < 1){
      message("No hay Usuarios en la base de datos", false)
    }
    else{
      setUsers(Users_temp);
    }
  }

  const registrarUsuarios = async (e)=>{
    e.preventDefault();
    let newUser = new User(Id_input.current.value,
      Nombres_input.current.value,
      Telefono_input.current.value,
      Correo_input.current.value,
      Ciudad_input.current.value,
    );
    await axios.post(URL, newUser)
      .then(res => res.data ? console.log(res.data): new Error("Ocurrió un error al registarr el usuario"))
      .then(()=> message("Usuario creado correctamente", true))
      .catch(err => message("Hubo un error al actualizar el usuario, intente más tarde", false));
    listarUsuarios();
    limpiar_campos();
  }

  const actuailizarUsuario = async (e) =>{
    let actUser = new User(Id_input.current.value,
      Nombres_input.current.value,
      Telefono_input.current.value,
      Correo_input.current.value,
      Ciudad_input.current.value,
    );
    await axios.put(URL + `/${Id_input.current.value}`, actUser)
      .then(data => data.data ? console.log(data) : new Error(data))
      .then(()=> message("Usuario actualizado correctamente", true))
      .catch(err => message("Hubo un error al actualizar el usuario, intente más tarde", false));
    listarUsuarios();
    limpiar_campos();
  }

  const catchUsuarios = (e) =>{
    e.preventDefault();
    Actualizar ? actuailizarUsuario(e) : registrarUsuarios(e)
  }

  const consUsuario = async (e) =>{
    await axios.get(URL + `/${e.target.value}`).then(data => {
      Id_input.current.value = data.data[0].ID_Usuario;
      Nombres_input.current.value = data.data[0].Nombres;
      Telefono_input.current.value = data.data[0].Telefono;
      Correo_input.current.value = data.data[0].Correo;
      Ciudad_input.current.value = data.data[0].Ciudad;
    }).catch(err => console.log(err));
    setActualizar(true);
  }

  const limpiar_campos = () =>{
    setActualizar(false);
    Id_input.current.value = "";
    Nombres_input.current.value = "";
    Telefono_input.current.value = "";
    Correo_input.current.value = "";
    Ciudad_input.current.value = "";
  }

  useEffect(()=>{
    Actualizar ? limpiar_button.current.disabled = false : limpiar_button.current.disabled = true
  }, [Actualizar])

  useEffect(()=>{
    listarUsuarios();
  });

  return (
    <>
      <Nav />
      <div className='content'>
        <div className='container mt-3'>
          <div className='table-responsive'>
            <table className='table table-sm table-hover table-light'>
              <thead className='thead-light'>
                <tr>
                  <th>Id del Usuario</th>
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
                    <td>{value.ID_Usuario}</td>
                    <td>{value.Nombres}</td>
                    <td>{value.Telefono}</td>
                    <td>{value.Correo}</td>
                    <td>{value.Ciudad}</td>
                    <td>{value.FechaIngreso}</td>
                    <td><button className='btn' onClick={consUsuario} value={value.ID_Usuario}>Editar</button></td>
                    <td><button className='btn btn-danger' onClick={eliminarUsuarios} value={value.ID_Usuario}>Eliminar</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='container'>
          <div className='w-25 m-auto'>
            <form onSubmit={catchUsuarios} method='POST' id="newUser" name='newUser'>
              <div className='form-group'>
                <label  htmlFor='ID_Usuario'>ID del usuario</label>
                <input ref={Id_input} type='number' className='form-control' name='ID_Usuario' id='ID_Usuario' placeholder='ID Numérico' />
              </div>
              <div className='form-group'>
                <label  htmlFor='Nombres'>Nombres</label>
                <input ref={Nombres_input} type='text' className='form-control' id='Nombres' name='Nombres' placeholder='Nombres y Apellidos' />
              </div>
              <div className='form-group'>
                <label  htmlFor='Telefono'>Telefono</label>
                <input ref={Telefono_input} type='number' className='form-control' id='Telefono' name='Telefono' placeholder='Telefono' />
              </div>
              <div className='form-group'>
                <label  htmlFor='Correo'>Correo</label>
                <input ref={Correo_input} type='email' className='form-control' id='Correo' name='Correo' placeholder='anyone@example.com' />
              </div>
              <div className='form-group'>
                <label  htmlFor='Ciudad'>Ciudad</label>
                <input ref={Ciudad_input} type='text' className='form-control' id='Ciudad' name='Ciudad' placeholder='' />
              </div>
              <button className="btn btn-block" type='submit'>{Actualizar ? "Actualizar" : "Registrar Nuevo"} Usuario</button>
              <button className="btn btn-block" onClick={limpiar_campos} ref={limpiar_button} type='button'>Limpiar Campos</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
