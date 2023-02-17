import './App.css'
import {Redirect, Route, Switch} from 'react-router-dom'
import SignupForm from './components/SignupForm'
import LoginPage from './components/LoginPage'
import MoneyManager from './components/MoneyManager'
import NotFound from './components/NotFound'

// Replace your code here
const App = () => {
  const details = localStorage.getItem('user_details')
  if (details === null) {
    const detailsList = []
    localStorage.setItem('user_details', JSON.stringify(detailsList))
  }
  return (
    <Switch>
      <Route exact path="/sign-up" component={SignupForm} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/" component={MoneyManager} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  )
}
export default App
