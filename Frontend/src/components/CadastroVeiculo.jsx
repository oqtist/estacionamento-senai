import '../styles/CadastroVeiculo.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import validator from 'validator'

function CadastroVeiculo() {

  const token = localStorage.getItem('token')

  const navigate = useNavigate()

  const [placa, setPlaca] = useState()
  const [modelo, setModelo] = useState()
  const [cor, setCor] = useState()

  async function cadastrarVeiculo() {
    try {
      const response = await axios.post(`https://estacionamento-senai.onrender.com/cadastro-veiculos/`, {
        placa, modelo, cor, imagem: null
      }, {
        headers: {
          Authorization: token
        }
      })
      alert('Veículo Cadastrado!')
      navigate(-1)
    } catch (err) {
      alert(err.response.data.mensagem)
      console.log(err)
    }
  }

  return (
    <>
      <header>
        <h1>Cadastro de Veículos</h1>
      </header>
      <div id='main-login-div'>
        <input type="text" placeholder='Placa' onInput={(e) => setPlaca(e.target.value)} />
        <input type="text" placeholder='Modelo' onInput={(e) => setModelo(e.target.value)} />
        <input type="text" placeholder='Cor' onInput={(e) => setCor(e.target.value)} />
        <button onClick={() => {
          cadastrarVeiculo()
        }}>Cadastrar</button>
        <Link id='link-login-voltar' to="/">Voltar</Link>
      </div>
    </>
  )
}

export default CadastroVeiculo