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
      navigate(-1)
    } catch (err) {
      alert(err.response.data.mensagem)
      console.log(err)
    }
  }

  return (
    <>
      <header>
        <h1>Registro</h1>
      </header>
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
          if(validator.isEmail(email)) {
            cadastrarUsuario()
          } else {
            alert('O email providenciado não é válido. Tente novamente.')
          }
        }}>Cadastrar</button>
        <Link id='link-login-voltar' to="/">Voltar</Link>
      </div>
    </>
  )
}

export default Registro