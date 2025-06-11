import '../styles/Registro.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function Registro() {

  const [nome, setNome] = useState()
  const [tipo, setTipo] = useState()
  const [email, setEmail] = useState()
  const [senha, setSenha] = useState()

  async function cadastrarUsuario() {
    try {
      const response = await axios.post(`https://estacionamento-senai.onrender.com/cadastro-usuario`, {
        nome, tipo, email, senha
      })
    } catch (err) {
      alert('Erro ao Registrar. Tente Novamente.')
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
        <input type="text" placeholder='Email' onInput={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder='Senha' onInput={(e) => setSenha(e.target.value)} />
        <button onClick={() => cadastrarUsuario()}>Cadastrar</button>
        <Link id='link-login-voltar' to="/">Voltar</Link>
      </div>
    </>
  )
}

export default Registro