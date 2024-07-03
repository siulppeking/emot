import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="display-1 fw-bold">404</h1>
      <p className="lead">Página No Encontrada</p>
      <Link to='/' className="btn btn-primary">Volver al Inicio</Link>
    </div>
  )
}

export default PageNotFound