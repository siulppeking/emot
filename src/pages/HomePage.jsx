import { Link } from 'react-router-dom'
import svg from '../assets/emot_logo.png';
import emoji1 from '../assets/emojis/emoji_1.gif';
import emoji2 from '../assets/emojis/emoji_2.gif';
import emoji3 from '../assets/emojis/emoji_3.gif';
import emoji4 from '../assets/emojis/emoji_4.gif';
import emoji5 from '../assets/emojis/emoji_5.gif';
import emoji6 from '../assets/emojis/emoji_6.gif';

const HomePage = () => {
  return (
    <>
      <div className='container animate__animated animate__fadeIn'>

        {/* <!-- Hero Section --> */}
        <section className="hero">
          <div className="container">
            <h1 className="display-3 fw-bold"><img src={svg} alt="" style={{ width: '75px', marginTop: '0px' }} /> Bienvenidos a eMOT</h1>
            <p className="lead">Tu compañero en el viaje hacia una mejor salud mental</p>
            <Link to='/login' className="btn btn-primary btn-lg">Empieza ahora</Link>
          </div>
        </section>

        {/* <!-- About Section --> */}
        <section className="container my-5">
          <div className="row">
            <div className="col-lg-6">
              <img src={emoji1} className="img-fluid" alt="App screenshot" />
              <img src={emoji2} className="img-fluid" alt="App screenshot" />
              <img src={emoji3} className="img-fluid" alt="App screenshot" />
              <img src={emoji4} className="img-fluid" alt="App screenshot" />
              <img src={emoji5} className="img-fluid" alt="App screenshot" />
              <img src={emoji6} className="img-fluid" alt="App screenshot" />
            </div>
            <div className="col-lg-6 d-flex flex-column justify-content-center mt-3">
              <h2 className="fw-bold">¿Qué es eMOT?</h2>
              <p>eMOT es una aplicación diseñada para ayudarte a cuidar tu salud mental. Con nuestra app, puedes acceder a una variedad de herramientas y recursos que te ayudarán a manejar el estrés, la ansiedad y otros desafíos emocionales.</p>
              <p>Únete a nuestra comunidad y descubre cómo eMOT puede hacer una diferencia en tu vida.</p>
              <a href="#" className="btn btn-outline-primary btn-lg">Descubre más</a>
            </div>
          </div>
        </section>

        {/* <!-- Features Section --> */}
        <section className="features text-center">
          <div className="container">
            <h2 className="fw-bold">Características de eMOT</h2>
            <div className="row mt-4">
              <div className="col-md-4">
                <i className="feature-icon fas fa-brain"></i>
                <h3 className="mt-3">Herramientas de Meditación</h3>
                <p>Accede a una variedad de meditaciones guiadas para ayudarte a relajarte y enfocarte.</p>
              </div>
              <div className="col-md-4">
                <i className="feature-icon fas fa-comments"></i>
                <h3 className="mt-3">Sesiones de Terapia</h3>
                <p>Conéctate con terapeutas profesionales desde la comodidad de tu hogar.</p>
              </div>
              <div className="col-md-4">
                <i className="feature-icon fas fa-chart-line"></i>
                <h3 className="mt-3">Seguimiento del Progreso</h3>
                <p>Monitorea tu estado emocional y ve cómo mejoras con el tiempo.</p>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- Call to Action Section --> */}
        <section className="text-center py-5 bg-primary text-white mt-3">{/*  background-color: #007bff; color: white; */}
          <div className="container">
            <h2 className="fw-bold">Empieza tu viaje hacia una mejor salud mental hoy</h2>
            <p className="lead">Descarga eMOT y descubre cómo podemos ayudarte a vivir una vida más plena y saludable.</p>
            <a href="#" className="btn btn-light btn-lg">Descargar Ahora</a>
          </div>
        </section>

        {/* <!-- Footer --> */}
        <footer className="text-center py-4">
          <p>&copy; 2024 eMOT. Todos los derechos reservados.</p>
        </footer>
      </div>
    </>
  )
}

export default HomePage