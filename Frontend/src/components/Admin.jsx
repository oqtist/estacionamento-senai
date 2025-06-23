import { useState } from 'react'
import '../styles/Admin.css'
import { data, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'

function Admin() {

  const token = localStorage.getItem('token')

  const [menu, setMenu] = useState('no-modal')
  const [quantia, setQuantia] = useState()
  let navigate = useNavigate()

  const [userData, setUserData] = useState([])
  const [vehicleData, setVehicleData] = useState([])
  const [accessData, setAccessData] = useState([])
  const [vagasData, setVagasData] = useState([])

  useEffect(() => {
    fetchAcessos()
    fetchUsers()
    fetchVeiculos()
    fetchVagas()
  }, [])

  async function alterarQuantia() {
    try {
      const response = await axios.post('https://estacionamento-senai.onrender.com/acesso/admin/quantia-vagas/', {
        quantia: quantia
      }, {
        headers: {
          Authorization: token
        }
      })
      alert(`Quantia de vagas alterada para ${quantia}.`)
      setMenu('no-modal')
    } catch (err) {
      console.log(err)
    }
  }

  async function fetchVagas() {
    try {
      const response = await axios.get('https://estacionamento-senai.onrender.com/admin/vagas/', {
        headers: {
          Authorization: token
        }
      })
      setVagasData(response.data)
    }
    catch (err) {
      console.log(err)
    }
  }

  async function fetchUsers() {
    try {
      const response = await axios.get('https://estacionamento-senai.onrender.com/admin/usuarios/', {
        headers: {
          Authorization: token
        }
      })
      setUserData(response.data)
    }
    catch (err) {
      console.log(err)
    }
  }

  async function fetchAcessos() {
    try {
      const response = await axios.get('https://estacionamento-senai.onrender.com/admin/acessos/', {
        headers: {
          Authorization: token
        }
      })
      setAccessData(response.data)
      console.log(response)
    }
    catch (err) {
      alert(err.response.data.mensagem)
      console.log(err)
    }
  }

  async function fetchVeiculos() {
    try {
      const response = await axios.get('https://estacionamento-senai.onrender.com/admin/veiculos/', {
        headers: {
          Authorization: token
        }
      })
      setVehicleData(response.data)
    }
    catch (err) {
      alert(err.response.data.mensagem)
      console.log(err)
    }
  }

  const formatadorData = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <>
      <div id="div-blur" style={menu != 'no-modal' ? { opacity: '1', transition: '650ms' } : { pointerEvents: 'none', display: 'flex', opacity: '0', backdropFilter: 'blur(0px)', transition: '400ms' }}>
        <div>
          <div id='div-quantia-vagas' className='modals' style={menu == 'modal-quantia-vagas' ? { display: 'flex', opacity: '1', transition: '650ms' } : { pointerEvents: 'none', display: 'flex', opacity: '0', transition: '400ms' }}>
            <h1 style={{ fontSize: '30pt' }}>Especifique a quantia de vagas disponíveis:</h1>
            <input type="number" onInput={(e) => {
              setQuantia(Number(e.target.value))
            }} placeholder='' />
            <div className='div-botoes-modals'>
              <button className='botoes-modals' onClick={() => alterarQuantia()}>Modificar</button>
              <button className='botoes-modals' onClick={() => setMenu('no-modal')} >Voltar</button>
            </div>
          </div>
          <div id='div-listagem-acessos' className='modals' style={menu == 'modal-lista-acessos' ? { display: 'flex', opacity: '1', transition: '650ms' } : { pointerEvents: 'none', display: 'flex', opacity: '0', transition: '400ms' }}>
            <h3 className='listagem-admin-titulo'>
              Log de Acessos
            </h3>
            <div className='listagem-admin'>
              <table>
                <thead>
                  <tr>
                    <th>Veículo</th>
                    <th>Usuário</th>
                    <th>Data de Entrada</th>
                    <th>Data de Saída</th>
                  </tr>
                </thead>
                {accessData.listaAcessos?.map((i) => {
                  const dataEntradaUTC = new Date(i.data_entrada)
                  const dataSaidaUTC = new Date(i.data_saida)
                  const dataEntradaConvertida = formatadorData.format(dataEntradaUTC)
                  const dataSaidaConvertida = i.data_saida ? formatadorData.format(dataSaidaUTC) : null
                  return <>
                    <tbody>
                      <tr>
                        <td>{i.veiculo.modelo}</td>
                        <td>{i.usuario.nome}</td>
                        <td>{dataEntradaConvertida}</td>
                        <td>{dataSaidaConvertida ? dataSaidaConvertida : '-'}</td>
                      </tr>
                    </tbody>
                  </>
                })}
              </table>
            </div>
            <button onClick={() => setMenu('no-modal')} style={{ marginTop: '2rem' }} className='botoes-modals'>Voltar</button>
          </div>
          <div id='div-listagem-veiculos' className='modals' style={menu == 'modal-lista-veiculos' ? { display: 'flex', opacity: '1', transition: '650ms' } : { pointerEvents: 'none', display: 'flex', opacity: '0', transition: '400ms' }}>
            <h3 className='listagem-admin-titulo'>
              Registro de Veículos
            </h3>
            <div className='listagem-admin'>
              <table>
                <tr>
                  <th>Usuário</th>
                  <th>Placa</th>
                  <th>Modelo</th>
                  <th>Cor</th>
                </tr>
                {vehicleData?.map((i) => {
                  return <>
                    <tr>
                      <td>{i.usuario.nome}</td>
                      <td>{i.placa}</td>
                      <td>{i.modelo}</td>
                      <td>{i.cor}</td>
                    </tr>
                  </>
                })}
              </table>
            </div>
            <button onClick={() => setMenu('no-modal')} style={{ marginTop: '2rem' }} className='botoes-modals'>Voltar</button>
          </div>
          <div id='div-listagem-vagas' className='modals' style={menu == 'modal-lista-vagas' ? { display: 'flex', opacity: '1', transition: '650ms' } : { pointerEvents: 'none', display: 'flex', opacity: '0', transition: '400ms' }}>
            <h3 className='listagem-admin-titulo'>
              Vagas Atualmente Ocupadas
            </h3>
            <div className='listagem-admin'>
              <table>
                <tr>
                  <th>Usuário</th>
                  <th>Veículo</th>
                  <th>Data de Entrada</th>
                </tr>
                {vagasData?.acessos?.map((i) => {
                  const dataUTC = new Date(i.data_entrada)
                  return <>
                    <tr>
                      <td>{i.usuario.nome}</td>
                      <td>{i.veiculo.modelo} ({i.veiculo.cor})</td>
                      <td>{formatadorData.format(dataUTC)}</td>
                    </tr>
                  </>
                })}
              </table>
            </div>
            <button onClick={() => setMenu('no-modal')} style={{ marginTop: '2rem' }} className='botoes-modals'>Voltar</button>
          </div>
          <div id='div-listagem-usuarios' className='modals' style={menu == 'modal-lista-usuarios' ? { display: 'flex', opacity: '1', transition: '650ms' } : { pointerEvents: 'none', display: 'flex', opacity: '0', transition: '400ms' }}>
            <h3 className='listagem-admin-titulo'>
              Registro de Usuários
            </h3>
            <div className='listagem-admin'>
              <table>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Tipo</th>
                </tr>
                {userData.listaUsuarios?.map((i) => {
                  return <>
                    <tr>
                      <td>{i.nome}</td>
                      <td>{i.email}</td>
                      <td>{i.tipo}</td>
                    </tr>
                  </>
                })}
              </table>
            </div>
            <button onClick={() => setMenu('no-modal')} style={{ marginTop: '2rem' }} className='botoes-modals'>Voltar</button>
          </div>
        </div>
      </div>
      <header>
        <img style={{ objectFit: 'cover', display: 'flex', position: 'absolute', maxHeight: '7.78rem', width: '100%', opacity: '0.32' }} src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages-wixmp-ed30a86b8c4ca887773594c2.wixmp.com%2Ff%2F451b4b99-9bcd-4a9b-9066-7fe38006684c%2Fd671l1n-fddabdcc-744b-452e-a5ee-db881d2be857.png%2Fv1%2Ffill%2Fw_600%2Ch_450%2Cstrp%2Faero_glass_clipart_texture_by_diamond00744_d671l1n-fullview.png%3Ftoken%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDUwIiwicGF0aCI6IlwvZlwvNDUxYjRiOTktOWJjZC00YTliLTkwNjYtN2ZlMzgwMDY2ODRjXC9kNjcxbDFuLWZkZGFiZGNjLTc0NGItNDUyZS1hNWVlLWRiODgxZDJiZTg1Ny5wbmciLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.IyzfShVm9a-uQSfpC9_Tz92wVl0XEL1niPbUbQ5SA40&f=1&nofb=1&ipt=1707f12c680021ac09316d420fe3127eed8efde44cd590b12b48c75c53617293'></img>
        <h1>Painel Administrativo</h1>
      </header>
      <div id='sub-header-selector'>
        <Link className='link-header' id='perfil-link' to="/">Início</Link>
        <Link className='link-header' id='sair-link' onClick={() => {
          localStorage.removeItem('token')
          navigate(-1)
        }}>Sair</Link>
        <a id='inv-puller'>▼</a>
      </div>
      <div id='modal-admin-main' style={{ flexDirection: 'row' }}>
        <button onClick={() => setMenu('modal-quantia-vagas')} className='botoes-modals-admin'>Quantia de Vagas</button>
        <div style={{ flexDirection: 'column' }}>
          <h2>Listagens:</h2>
          <button onClick={() => { setMenu('modal-lista-acessos') }} className='botoes-modals-admin-2'>Acessos</button>
          <button onClick={() => { setMenu('modal-lista-usuarios') }} className='botoes-modals-admin-2'>Usuários</button>
          <button onClick={() => { setMenu('modal-lista-veiculos') }} className='botoes-modals-admin-2'>Veículos</button>
          <button onClick={() => { setMenu('modal-lista-vagas') }} className='botoes-modals-admin-2'>Vagas Ocupadas</button>
        </div>
      </div>
    </>
  )
}

export default Admin
