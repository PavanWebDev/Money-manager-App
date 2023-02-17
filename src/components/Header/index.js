import './index.css'
import {withRouter} from 'react-router-dom'
import {ImExit} from 'react-icons/im'

const Header = props => {
  const onClickLogout = () => {
    const allUsers = JSON.parse(localStorage.getItem('user_details'))
    const currentUser = JSON.parse(localStorage.getItem('current_user'))
    const updatedUserDetails = allUsers.map(eachUser => {
      if (eachUser.username === currentUser.username) {
        return {...eachUser, transactionsList: currentUser.transactionsList}
      }
      return eachUser
    })
    localStorage.setItem('user_details', JSON.stringify(updatedUserDetails))
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav>
      <h1>MONEY MANAGER</h1>
      <button type="button" onClick={onClickLogout}>
        <ImExit size={30} />
      </button>
    </nav>
  )
}

export default withRouter(Header)
