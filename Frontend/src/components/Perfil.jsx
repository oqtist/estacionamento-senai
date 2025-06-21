import '../styles/Perfil.css'
import { Link, useNavigate } from 'react-router-dom'

function Perfil() {

  let navigate = useNavigate()

  return (
    <>
      <header>
        <h1>Perfil de Usuário</h1>
      </header>
      <div id='sub-header-selector'>
        <>
          <Link className='link-header' id='home-link' to="/">Início</Link>
          <Link className='link-header' id='sair-link' onClick={() => {
            localStorage.removeItem('token')
            navigate(-1)
          }}>Sair</Link>
        </>
        <a id='inv-puller'>▼</a>
      </div>
      <div className='div-cont-info'>
        
      </div>
    </>
  )
}

export default Perfil
