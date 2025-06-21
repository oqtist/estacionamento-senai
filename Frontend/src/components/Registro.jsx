import '../styles/Registro.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import validator from 'validator'

function Registro() {

  const navigate = useNavigate()

  const [nome, setNome] = useState()
  const [tipo, setTipo] = useState()
  const [email, setEmail] = useState()
  const [senha, setSenha] = useState()

  async function cadastrarUsuario() {
    try {
      const response = await axios.post(`https://estacionamento-senai.onrender.com/cadastro-usuario/`, {
        nome, tipo, email, senha
      })
      alert('Usuário Cadastrado!')
      navigate({
        pathname: "/login"
      })
    } catch (err) {
      alert(err.response.data.mensagem)
      console.log(err)
    }
  }

  return (
    <div className='body-login-misc'>
      <header>
        <img style={{ objectFit: 'cover', display: 'flex', position: 'absolute', maxHeight: '7.78rem', width: '100%', opacity: '0.32' }} src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages-wixmp-ed30a86b8c4ca887773594c2.wixmp.com%2Ff%2F451b4b99-9bcd-4a9b-9066-7fe38006684c%2Fd671l1n-fddabdcc-744b-452e-a5ee-db881d2be857.png%2Fv1%2Ffill%2Fw_600%2Ch_450%2Cstrp%2Faero_glass_clipart_texture_by_diamond00744_d671l1n-fullview.png%3Ftoken%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDUwIiwicGF0aCI6IlwvZlwvNDUxYjRiOTktOWJjZC00YTliLTkwNjYtN2ZlMzgwMDY2ODRjXC9kNjcxbDFuLWZkZGFiZGNjLTc0NGItNDUyZS1hNWVlLWRiODgxZDJiZTg1Ny5wbmciLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.IyzfShVm9a-uQSfpC9_Tz92wVl0XEL1niPbUbQ5SA40&f=1&nofb=1&ipt=1707f12c680021ac09316d420fe3127eed8efde44cd590b12b48c75c53617293'></img>
        <h1>Registro</h1>
      </header>
      <div id='sub-header-selector'>
        <>
          <Link className='link-header' id='perfil-link' to="/">Início</Link>
          <Link className='link-header' id='sair-link' >Ajuda</Link>
        </>
        <a id='inv-puller'>▼</a>
      </div>
      <div id='main-login-div'>
        <input type="text" placeholder='Nome' onInput={(e) => setNome(e.target.value)} />
        <select name="select-tipo" onInput={(e) => setTipo(e.target.value)}>
          <option value="-">-</option>
          <option value="estudante">Estudante</option>
          <option value="funcionario">Funcionário</option>
          <option value="professor">Professor</option>
        </select>
        <input type="email" placeholder='Email' onInput={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='Senha' onInput={(e) => setSenha(e.target.value)} />
        <button onClick={() => {
          if (validator.isEmail(email)) {
            cadastrarUsuario()
          } else {
            alert('O email providenciado não é válido. Tente novamente.')
          }
        }}>Cadastrar</button>
        <Link id='link-login-voltar' to="/">Voltar</Link>
      </div>
    </div>
  )
}

export default Registro