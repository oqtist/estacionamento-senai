import { useEffect, useState } from 'react'
import '../styles/Perfil.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Perfil() {

  let navigate = useNavigate()
  const [usuarioInfo, setUsuarioInfo] = useState([])

  const [menu, setMenu] = useState('no-modal')

  async function fetchInfo() {
    try {
      const response = await axios.get('https://estacionamento-senai.onrender.com/usuario/', {
        headers: {
          Authorization: localStorage.getItem('token')
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

  return (
    <>
      <div id="div-blur" style={menu != 'no-modal' ? { opacity: '1', transition: '650ms' } : { pointerEvents: 'none', display: 'flex', opacity: '0', backdropFilter: 'blur(0px)', transition: '400ms' }}>
        <div>
          <div id='div-alterar-usuario' className='modals' style={menu == 'modal-alterar-usuario' ? { display: 'flex', opacity: '1', transition: '650ms' } : { pointerEvents: 'none', display: 'flex', opacity: '0', transition: '400ms' }}>
            <h1>Alterar Dados:</h1>
            <input type="text" onInput={(e) => setUsuario(e.target.value)} placeholder='Usuário' />
            <input type="text" onInput={(e) => setEmail(e.target.value)} placeholder='E-mail' />
            <input type="text" onInput={(e) => setSenha(e.target.value)} placeholder='Senha' />
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
        <p>E-mail: <span style={{ textTransform: 'capitalize' }}>{usuarioInfo.email}</span></p>
        <div id='div-botoes-modificacao'>
          <button onClick={() => {
            setMenu('modal-alterar-usuario')
          }}>✎</button>
          <button className='botao-fechar' onClick={() => {
            setIdUsuario(i.id_veiculo)
            setMenu('modal-confirmar-exclusao')
          }}><span style={{ fontWeight: 900 }}>X</span></button>
        </div>
      </div>
    </>
  )
}

export default Perfil
