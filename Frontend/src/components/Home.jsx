import '../styles/Home.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

function Home() {

  const token = localStorage.getItem('token')
  const [tokenDecodificado, setTokenDecodificado] = useState(null)

  const [veiculos, setVeiculos] = useState([])
  const [idVeiculoSelecionado, setIdVeiculoSelecionado] = useState()
  const [menu, setMenu] = useState('no-modal')

  const [modelo, setModelo] = useState()
  const [placa, setPlaca] = useState()
  const [cor, setCor] = useState()

  const [userData, setUserData] = useState([]) // ...

  function logout() {
    localStorage.removeItem('token')
    setTokenDecodificado(null)
  }

  useEffect(() => {
    if (token) {
      tokenRefresh()
      fetchData()
    }
  }, [])

  async function registrarEntrada(idVeiculo) {
    try {
      const response = await axios.post(`https://estacionamento-senai.onrender.com/acesso/entrada/${idVeiculo}`, {}, {
        headers: {
          Authorization: token
        }
      })
      fetchData()
      alert('Entrada registrada!')
    } catch (err) {
      alert(err.response.data.mensagem)
      console.log(err)
    }
  }

  async function registrarSaida(idVeiculo) {
    try {
      const response = await axios.post(`https://estacionamento-senai.onrender.com/acesso/saida/${idVeiculo}`, {}, {
        headers: {
          Authorization: token
        }
      })
      fetchData()
      alert('Saída registrada!')
    } catch (err) {
      alert(err.response.data.mensagem)
      console.log(err)
    }
  }

  async function postarVeiculo() {
    try {
      const response = await axios.post('https://estacionamento-senai.onrender.com/cadastro-veiculos', {
        placa, cor, modelo
      }, {
        headers: {
          Authorization: token
        }
      })
      setMenu('modal')
      alert('Veículo registrado!')
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  async function alterarVeiculo() {
    try {
      const response = await axios.put(`https://estacionamento-senai.onrender.com/veiculos/${idVeiculoSelecionado}`, {
        placa, cor, modelo
      }, {
        headers: {
          Authorization: token
        }
      })
      alert('Veículo alterado!')
      fetchData()
      setMenu('no-modal')
    } catch (err) {
      console.log(err)
    }
  }

  function tokenRefresh() {
    localStorage.getItem('token')
    const tokenDecode = jwtDecode(token)
    setTokenDecodificado(tokenDecode)
  }

  async function fetchData() {
    try {
      const response = await axios.get('https://estacionamento-senai.onrender.com/veiculos/', {
        headers: {
          Authorization: token
        }
      })
      const userInfo = await axios.get('https://estacionamento-senai.onrender.com/usuario/', {
        headers: {
          Authorization: token
        }
      })
      setVeiculos(response.data.veiculos)
      setUserData(userInfo)
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
      alert('Veículo apagado!')
      setMenu('no-modal')
      fetchData()
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
            <h1>Adicionar Veículo:</h1>
            <input type="text" onInput={(e) => setModelo(e.target.value)} placeholder='Modelo' />
            <input type="text" onInput={(e) => setCor(e.target.value)} placeholder='Cor' />
            <input type="text" onInput={(e) => setPlaca(e.target.value)} placeholder='Placa' />
            <div className='div-botoes-modals'>
              <button className='botoes-modals' onClick={() => postarVeiculo()}>Adicionar</button>
              <button className='botoes-modals' onClick={() => setMenu('no-modal')} >Voltar</button>
            </div>
          </div>
          <div id='div-alterar-veiculo' className='modals' style={menu == 'modal-alterar-veiculo' ? { display: 'flex', opacity: '1', transition: '650ms' } : { pointerEvents: 'none', display: 'flex', opacity: '0', transition: '400ms' }}>
            <h1>Alterar Veículo:</h1>
            <input type="text" onInput={(e) => setModelo(e.target.value)} placeholder='Modelo' />
            <input type="text" onInput={(e) => setCor(e.target.value)} placeholder='Cor' />
            <input type="text" onInput={(e) => setPlaca(e.target.value)} placeholder='Placa' />
            <div className='div-botoes-modals'>
              <button className='botoes-modals' onClick={() => alterarVeiculo()}>Alterar</button>
              <button className='botoes-modals' onClick={() => setMenu('no-modal')} >Voltar</button>
            </div>
          </div>
          <div id='div-apagar-veiculo' className='modals' style={menu == 'modal-confirmar-exclusao' ? { display: 'flex', opacity: '1', transition: '650ms' } : { pointerEvents: 'none', display: 'flex', opacity: '0', transition: '400ms' }}>
            <h1 style={{ fontSize: '30pt' }}>Tem certeza de que deseja apagar o veículo selecionado?</h1>
            <div className='div-botoes-modals'>
              <button className='botoes-modals' id='botao-fechar-modal' onClick={() => apagarVeiculo()}>Apagar</button>
              <button className='botoes-modals' onClick={() => setMenu('no-modal')} >Cancelar</button>
            </div>
          </div>
        </div>
      </div>
      <header>
        <h1>Sistema de Estacionamento</h1>
      </header>
      <div id='sub-header-selector'>
        {token ?
          <>
            <Link className='link-header' id='perfil-link' to="/perfil">Perfil</Link>
            {tokenDecodificado && (tokenDecodificado.tipo == "admin" && <Link className='link-header' id='perfil-link' to="/admin">Painel Administrativo</Link>)}
            <Link className='link-header' id='sair-link' onClick={() => {
              logout()
            }}>Sair</Link>
          </>
          :
          <>
            <Link className='link-header' id='registro-link' to="/registro">Registro</Link>
            <Link className='link-header' id='login-link' to="/login">Login</Link>
          </>}
        <a id='inv-puller'>▼</a>
      </div>
      {token ? (veiculos.length > 0 ?
        <div>
          <h3 id='texto-boas-vindas'>Boas-vindas, {userData.data.nome}!</h3>
          {veiculos.map((i, index) => {
            return <>
              <div className='div-cont-info'>
                <h3>{i.modelo} {i.cor}</h3>
                <p>Modelo: {i.modelo}</p>
                <p>Cor: {i.cor}</p>
                <p>Placa: {i.placa}</p>
                <div id='div-botoes-modificacao'>
                  <button onClick={() => {
                    setIdVeiculoSelecionado(i.id_veiculo)
                    setMenu('modal-alterar-veiculo')
                  }}>✎</button>
                  {i.status_vaga ? <button onClick={() => {
                    registrarSaida(i.id_veiculo)
                  }} className='botoes-acesso'>
                    Registrar Saída
                  </button> : <button onClick={() => {
                    registrarEntrada(i.id_veiculo)
                  }
                  } className='botoes-acesso'>Registrar Entrada</button>}
                  <button className='botao-fechar' onClick={() => {
                    setIdVeiculoSelecionado(i.id_veiculo)
                    setMenu('modal-confirmar-exclusao')
                  }}><span style={{ fontWeight: 900 }}>X</span></button>
                </div>
              </div>
            </>
          })}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button style={{ fontSize: '35pt', padding: '2%' }} onClick={() => setMenu('modal-novo-veiculo')}><span className='texto-botoes'>+</span></button>
          </div>
        </div> :
        <div className='div-geral-body'>
          <p className='texto-misc'>Você não tem veículos registrados.</p>
          <br />
          <button style={{ fontSize: '35pt', padding: '1.5rem' }} onClick={() => setMenu('modal-novo-veiculo')}><span className='texto-botoes'>+</span></button>
        </div>) : (<div className='div-geral-body'>
          <p className='texto-misc'>Faça <Link id='login-link' className='link-below-header' to="/login">login</Link> para ver seus veículos registrados ou<br /><Link className='link-below-header' id='registro-link' to="/registro">registre-se</Link> se não possuir conta.
          </p>
        </div>)}
    </>
  )
}

export default Home
