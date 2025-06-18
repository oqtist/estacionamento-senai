import '../styles/Home.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'


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
        <h1>Sistema de Estacionamento</h1>
      </header>
      <div id='sub-header-selector'>
        {token ?
          <>
            (<Link className='link-header' id='perfil-link' to="/perfil">Perfil</Link>)
            (<Link className='link-header' id='perfil-link' onClick={() => {
              logout()
            }}>Sair</Link>)
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
