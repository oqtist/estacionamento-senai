import { useEffect, useState } from 'react'
import '../styles/Perfil.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

function Perfil() {

  const token = localStorage.getItem('token')
  const [tokenDecodificado, setTokenDecodificado] = useState(null)

  if (token && !tokenDecodificado) {
    const tokenDecode = jwtDecode(token)
    setTokenDecodificado(tokenDecode)
  }

  let navigate = useNavigate()

  const [usuarioInfo, setUsuarioInfo] = useState([])
  const [nome, setNome] = useState()
  const [email, setEmail] = useState()
  const [senha, setSenha] = useState()
  const [senhaOld, setSenhaOld] = useState()

  const [menu, setMenu] = useState('no-modal')

  async function fetchInfo() {
    try {
      const response = await axios.get('https://estacionamento-senai.onrender.com/usuario/', {
        headers: {
          Authorization: token
        }
      })
      setUsuarioInfo(response.data)
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchInfo()
  }, [])

  async function alterarUsuario() {
    try {
      const response = await axios.put(`https://estacionamento-senai.onrender.com/usuario/${tokenDecodificado.idUsuario}`, {
        nome, email, senha, senhaOld
      }, {
        headers: {
          Authorization: token
        }
      })
      alert('Dados alterados!')
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }
  
  async function apagarConta() {
    try {
      const response = await axios.delete(`https://estacionamento-senai.onrender.com/usuario/${tokenDecodificado.idUsuario}`, {
        headers: {
          Authorization: token
        }
      })

      alert('Usuário Apagado.')
      localStorage.removeItem('token')
      setTokenDecodificado(null)
      navigate(-1)
    }
    catch (err) {
      alert('Algo deu errado. Tente mais tarde.')
      console.log(err)
    }
  }

  return (
    <>
      <div id="div-blur" style={menu != 'no-modal' ? { opacity: '1', transition: '650ms' } : { pointerEvents: 'none', display: 'flex', opacity: '0', backdropFilter: 'blur(0px)', transition: '400ms' }}>
        <div>
          <div id='div-alterar-usuario' className='modals' style={menu == 'modal-alterar-usuario' ? { display: 'flex', opacity: '1', transition: '650ms' } : { pointerEvents: 'none', display: 'flex', opacity: '0', transition: '400ms' }}>
            <h1>Alterar Dados:</h1>
            <input type="text" onInput={(e) => setNome(e.target.value)} placeholder='Nome' />
            <input type="email" onInput={(e) => setEmail(e.target.value)} placeholder='E-mail' />
            <input type="password" onInput={(e) => setSenha(e.target.value)} placeholder='Senha' />
            <input type="password" onInput={(e) => setSenhaOld(e.target.value)} placeholder='Senha Anterior' />
            <div className='div-botoes-modals'>
              <button className='botoes-modals' onClick={() => alterarUsuario()}>Alterar</button>
              <button className='botoes-modals' onClick={() => setMenu('no-modal')} >Voltar</button>
            </div>
          </div>
          <div id='div-apagar-usuario' className='modals' style={menu == 'modal-confirmar-exclusao' ? { display: 'flex', opacity: '1', transition: '650ms' } : { pointerEvents: 'none', display: 'flex', opacity: '0', transition: '400ms' }}>
            <h1 style={{ fontSize: '30pt' }}>Deseja apagar sua conta?</h1>
            <div className='div-botoes-modals'>
              <button className='botoes-modals' id='botao-fechar-modal' onClick={() => setMenu('modal-confirmar-exclusao-2')}>Apagar</button>
              <button className='botoes-modals' onClick={() => setMenu('no-modal')} >Cancelar</button>
            </div>
          </div>
          <div id='div-super-exclusao' className='modals'  style={menu == 'modal-confirmar-exclusao-2' ? { display: 'flex', opacity: '1', transition: '650ms' } : { pointerEvents: 'none', display: 'flex', opacity: '0', transition: '400ms' }}>
            <h1 style={{ fontSize: '30pt' }}>Tem certeza? Esse processo é irreversível.</h1>
            <div className='div-botoes-modals'>
              <button className='botoes-modals' id='botao-fechar-modal' onClick={() => apagarConta()}>Apagar</button>
              <button className='botoes-modals' onClick={() => setMenu('no-modal')} >Cancelar</button>
            </div>
          </div>
        </div>
      </div>
      <header>
        <h1>Perfil de Usuário</h1>
      </header>
      <div id='sub-header-selector'>
        <>
          <Link className='link-header' id='home-link' to="/">Início</Link>
          <Link className='link-header' id='home-link' to="/admin">Painel Administrativo</Link>
          <Link className='link-header' id='sair-link' onClick={() => {
            localStorage.removeItem('token')
            navigate(-1)
          }}>Sair</Link>
        </>
        <a id='inv-puller'>▼</a>
      </div>
      <div className='div-cont-info'>
        <h3 id='perfil-nome'>{usuarioInfo.nome}</h3>
        <p>Usuário: <span style={{ textTransform: 'capitalize' }}>{usuarioInfo.nome}</span></p>
        <p>Tipo de Usuário: <span style={{ textTransform: 'capitalize' }}>{usuarioInfo.tipo}</span></p>
        <p>E-mail: <span>{usuarioInfo.email}</span></p>
        <div id='div-botoes-modificacao'>
          <button onClick={() => {
            setMenu('modal-alterar-usuario')
          }}>✎</button>
          <button className='botao-fechar' onClick={() => 
            setMenu('modal-confirmar-exclusao')
          }><span style={{ fontWeight: 900 }}>X</span></button>
        </div>
      </div>
    </>
  )
}

export default Perfil
