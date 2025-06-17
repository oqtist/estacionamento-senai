import '../styles/Home.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'


function Home() {

  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchVeiculos()
  }, [])

  async function fetchVeiculos() {
    try {
        const response = await axios.get('https://desenvolvimento-de-sistema-25-01.onrender.com/veiculos', {
            headers: {
                Authorization: token
            }
        })
        setVeiculos(response.data.veiculos)
    } catch (err) {
        logout()
        console.log(err)
    }
  }

  return (
    <>
      <header>
        <h1>Sistema de Estacionamento</h1>
      </header>
      <div id='sub-header-selector'>
        {token ?
          <>
            (<Link className='link-header' id='perfil-link' to="/perfil">Perfil</Link>)
            (<Link className='link-header' id='perfil-link' onClick={() => {
              localStorage.removeItem('token')
              window.location.reload()
            }}>Sair</Link>)
          </>
          :
          <>
            <Link className='link-header' id='registro-link' to="/registro">Registro</Link>
            <Link className='link-header' id='login-link' to="/login">Login</Link>
          </>}
        <a id='inv-puller'>▼</a>
      </div>
      {token ? (<>
        <p>Você não tem veículos registrados.</p>
        <br />
        <Link id='vc-link' className='link-below-header' to="/cadastro-veiculo">Cadastre um aqui.</Link>
      </>) : (<>
        <p>Faça <Link id='login-link' className='link-below-header' to="/login">login</Link> para ver seus veículos registrados ou<br /><Link className='link-below-header' id='registro-link' to="/registro">registre-se</Link> se não possuir conta.
        </p>
      </>)}
    </>
  )
}

export default Home
