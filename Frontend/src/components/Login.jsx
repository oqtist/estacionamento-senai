import '../styles/Login.css'
import { Link } from 'react-router-dom'

function Login() {

  return (
    <>
    <header>
      <h1>Login</h1>
    </header>
    <div id='main-login-div'>
      <input type="text" placeholder='Email'/>
      <input type="text" placeholder='Senha'/>
      <button>Login</button>
      <Link id='link-login-voltar' to="/">Voltar</Link>
    </div>
    </>
  )
}

export default Login
