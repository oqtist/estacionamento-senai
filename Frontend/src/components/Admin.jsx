import '../styles/Admin.css'
import { Link } from 'react-router-dom'

function Admin() {

  return (
    <>
      <header>
        <img style={{ objectFit: 'cover', display: 'flex', position: 'absolute', maxHeight: '7.78rem', width: '100%', opacity: '0.32' }} src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages-wixmp-ed30a86b8c4ca887773594c2.wixmp.com%2Ff%2F451b4b99-9bcd-4a9b-9066-7fe38006684c%2Fd671l1n-fddabdcc-744b-452e-a5ee-db881d2be857.png%2Fv1%2Ffill%2Fw_600%2Ch_450%2Cstrp%2Faero_glass_clipart_texture_by_diamond00744_d671l1n-fullview.png%3Ftoken%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDUwIiwicGF0aCI6IlwvZlwvNDUxYjRiOTktOWJjZC00YTliLTkwNjYtN2ZlMzgwMDY2ODRjXC9kNjcxbDFuLWZkZGFiZGNjLTc0NGItNDUyZS1hNWVlLWRiODgxZDJiZTg1Ny5wbmciLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.IyzfShVm9a-uQSfpC9_Tz92wVl0XEL1niPbUbQ5SA40&f=1&nofb=1&ipt=1707f12c680021ac09316d420fe3127eed8efde44cd590b12b48c75c53617293'></img>
        <h1>Painel Administrativo</h1>
      </header>
      <div id='sub-header-selector'>


        <Link className='link-header' id='perfil-link' to="/">Home</Link>
        <Link className='link-header' id='sair-link' onClick={() => {
          logout()
        }}>Sair</Link>
        <Link className='link-header' id='perfil-link' to="/admin">Painel Administrativo</Link>
        <a id='inv-puller'>▼</a>
      </div>
    </>
  )
}

export default Admin
