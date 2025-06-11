import '../styles/Home.css'
import { Link } from 'react-router-dom'
import axios from 'axios'


function Home() {

  const a = "b" //para eventual função login

  return (
    <>
      <header>
        <h1>Sistema de Estacionamento</h1>
      </header>
      <div id='sub-header-selector'>
        <Link className='link-header' id='registro-link' to="/registro">Registro</Link>
        <Link className='link-header' id='login-link' to="/login">Login</Link>
        {a == "a" && (<Link className='link-header' id='perfil-link' to="/perfil">Perfil</Link>)}
        <a id='puller-thingy'>▼</a>
      </div>
      {a == "a" ? (<></>) : (<>
        <p>Faça <Link id='login-link' className='link-below-header' to="/login">login</Link> para ver seus veículos registrados ou<br /><Link className='link-below-header' id='registro-link' to="/registro">registre-se</Link> se não possuir conta. 
        </p>
      </>)}
    </>
  )
}

export default Home
