import '../styles/Perfil.css'
import { Link } from 'react-router-dom'

function Perfil() {

  return (
    <>
      <header>
        <h1>Perfil de Usuário</h1>
      </header>
      <div id='sub-header-selector'>
        <>
          <Link className='link-header' id='home-link' to="/">Início</Link>
          <Link className='link-header' id='sair-link' onClick={() => {
            logout()
          }}>Sair</Link>
        </>
        <a id='inv-puller'>▼</a>
      </div>
    </>
  )
}

export default Perfil
