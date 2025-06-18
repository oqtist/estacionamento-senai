import '../styles/Home.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

function Home() {

  const token = localStorage.getItem('token')
  const [veiculos, setVeiculos] = useState([])
  const [idVeiculoSelecionado, setIdVeiculoSelecionado] = useState()
  const [menu, setMenu] = useState('no-modal')
  const [modelo, setModelo] = useState()
  const [placa, setPlaca] = useState()
  const [cor, setCor] = useState()

  function logout() {
    localStorage.removeItem('token')
    window.location.reload()
  }

  useEffect(() => {
    if (token) {
      fetchVeiculos()
    }
    // setMenu('no-modal')
  }, [])

  const tokenDecodificado = jwtDecode(token)
  console.log(tokenDecodificado)

  async function postarVeiculo() {
    try {
      const response = await axios.post('https://estacionamento-senai.onrender.com/cadastro-veiculos', {
        placa, cor, modelo
      }, {
        headers: {
          Authorization: token
        }
      })
      window.location.reload
    } catch (err) {
      console.log(err)
    }
  }

  async function fetchVeiculos() {
    try {
      const response = await axios.get('https://estacionamento-senai.onrender.com/veiculos/', {
        headers: {
          Authorization: token
        }
      })
      setVeiculos(response.data.veiculos)
    } catch (err) {
      alert(err)
      console.log(err)
    }
  }

  async function apagarVeiculo() {
    try {
      const response = await axios.delete(`https://estacionamento-senai.onrender.com/veiculos/${idVeiculoSelecionado}`, {
        headers: {
          Authorization: token
        }
      })
      window.location.reload()
    }
    catch (err) {
      alert("Algo deu errado. Tente novamente.")
      console.log(err)
    }
  }

  return (
    <>
      <div id="div-blur" style={menu != 'no-modal' ? { opacity: '1', transition: '650ms' } : { pointerEvents: 'none', display: 'flex', opacity: '0', backdropFilter: 'blur(0px)', transition: '400ms' }}>
        <div>
          <div id='div-novo-veiculo' className='modals' style={menu == 'modal-novo-veiculo' ? { display: 'flex', opacity: '1', transition: '650ms' } : { pointerEvents: 'none', display: 'flex', opacity: '0', transition: '400ms' }}>
            <h1>Adicionar Tarefa:</h1>
            <input type="text" onInput={(e) => setModelo(e.target.value)} placeholder='Modelo' />
            <input type="text" onInput={(e) => setCor(e.target.value)} placeholder='Cor' />
            <input type="text" onInput={(e) => setPlaca(e.target.value)} placeholder='Placa' />
            <button onClick={() => postarVeiculo()} id='botao-add-veiculo'>Adicionar</button>
            <button onClick={() => setMenu('no-modal')} style={{ marginTop: '2%' }}>Voltar</button>
          </div>
        </div>
      </div>
      <header>
        <img style={{ objectFit: 'cover', display: 'flex', position: 'absolute', maxHeight: '7.78rem', width: '100%', opacity: '0.32' }} src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages-wixmp-ed30a86b8c4ca887773594c2.wixmp.com%2Ff%2F451b4b99-9bcd-4a9b-9066-7fe38006684c%2Fd671l1n-fddabdcc-744b-452e-a5ee-db881d2be857.png%2Fv1%2Ffill%2Fw_600%2Ch_450%2Cstrp%2Faero_glass_clipart_texture_by_diamond00744_d671l1n-fullview.png%3Ftoken%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDUwIiwicGF0aCI6IlwvZlwvNDUxYjRiOTktOWJjZC00YTliLTkwNjYtN2ZlMzgwMDY2ODRjXC9kNjcxbDFuLWZkZGFiZGNjLTc0NGItNDUyZS1hNWVlLWRiODgxZDJiZTg1Ny5wbmciLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.IyzfShVm9a-uQSfpC9_Tz92wVl0XEL1niPbUbQ5SA40&f=1&nofb=1&ipt=1707f12c680021ac09316d420fe3127eed8efde44cd590b12b48c75c53617293'></img>
        <h1>Sistema de Estacionamento</h1>
      </header>
      <div id='sub-header-selector'>
        {token ?
          <>
            <Link className='link-header' id='perfil-link' to="/perfil">Perfil</Link>
            <Link className='link-header' id='sair-link' onClick={() => {
              logout()
            }}>Sair</Link>
            {token.tipo == "ADMIN" && <><Link className='link-header' id='admin-link' to="/admin"></Link></>}
          </>
          :
          <>
            <Link className='link-header' id='registro-link' to="/registro">Registro</Link>
            <Link className='link-header' id='login-link' to="/login">Login</Link>
          </>}
        <a id='inv-puller'>▼</a>
      </div>
      {token ? (veiculos.length > 0 ?
        <>
          {veiculos.map((i) => {
            return <>
              <p>{i.modelo}</p>
              <p>Cor: {i.cor}</p>
              <p>Placa: {i.placa}</p>
              <div>
                <button onClick={() => {
                  setIdVeiculoSelecionado(i.id_veiculo)
                  setMenu('modal-alterar-veiculo')
                }}>✎</button>
                <button onClick={() => {
                  setIdVeiculoSelecionado(i.id_veiculo)
                  setMenu('modal-confirmar-exclusao')
                }}>X</button>
              </div>
            </>
          })}
        </> :
        <>
          <p>Você não tem veículos registrados.</p>
          <br />
          <button onClick={() => setMenu('modal-novo-veiculo')}>+</button>
        </>) : (<>
          <p>Faça <Link id='login-link' className='link-below-header' to="/login">login</Link> para ver seus veículos registrados ou<br /><Link className='link-below-header' id='registro-link' to="/registro">registre-se</Link> se não possuir conta.
          </p>
        </>)}
    </>
  )
}

export default Home
