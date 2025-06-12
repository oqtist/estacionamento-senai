import '../styles/Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import validator from 'validator'
import axios from 'axios'

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState()
  const [senha, setSenha] = useState()

  async function loginUsuario() {
    try {
      const response = await axios.post(`https://estacionamento-senai.onrender.com/login/`, {
        email, senha
      })
      console.log(response)
      localStorage.setItem('token', response.data.token)
      navigate(-1)

    } catch (err) {
      alert(err.response.data.mensagem)
      console.log(err)
    }
  }

  return (
    <>
      <header>
        <h1>Login</h1>
      </header>
      <div id='main-login-div'>
        <input type="email" onInput={(e) => setEmail(e.target.value)} placeholder='Email' />
        <input type="password" onInput={(e) => setSenha(e.target.value)} placeholder='Senha' />
        <button onClick={() => {
          if (validator.isEmail(email)) {
            loginUsuario()
          } else {
            alert('O email providenciado não é válido. Tente novamente.')
          }
        }}>Login</button>
        <Link id='link-login-voltar' to="/">Voltar</Link>
      </div>
    </>
  )
}

export default Login
