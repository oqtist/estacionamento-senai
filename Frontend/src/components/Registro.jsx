import '../styles/Registro.css'
import { Link } from 'react-router-dom'

function Registro() {

  return (
    <>
      <header>
        <h1>Registro</h1>
      </header>
      <div id='main-login-div'>
        <input type="text" placeholder='Nome' />
        <select name="select-tipo">
          <option value="-">-</option>
          <option value="estudante">Estudante</option>
          <option value="funcionario">Funcionário</option>
          <option value="professor">Professor</option>
        </select>
        <input type="text" placeholder='Email' />
        <input type="text" placeholder='Senha' />
        <button>Cadastrar</button>
        <Link id='link-login-voltar' to="/">Voltar</Link>
      </div>
    </>
  )
}

export default Registro