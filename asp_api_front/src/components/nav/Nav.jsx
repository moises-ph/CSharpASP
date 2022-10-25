import React from 'react'
import './Nav.css';

export default function Nav() {
    return (
    <>
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <h1>Usuarios API</h1>
                </a>
                <small className='navbar-text'>Api de aprendizaje hecha en ASP.NET y C#</small>
            </div>
        </nav>
    </>
    );
}
