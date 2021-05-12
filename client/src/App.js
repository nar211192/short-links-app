import React from "react"
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes.js'
import { useAuth } from "./hooks/auth.hook.js"
import { AuthContext } from "./context/AuthContext.js"
import { Navbar } from "./components/Navbar.js"
import "materialize-css"
import { Loader } from "./components/Loader.js"

function App() {
  const { token, login, logOut, userId, ready } = useAuth()
  
  let isAuthenticated = !!token
  let routes = useRoutes(isAuthenticated)
   console.log('zut tenalu hamar', ready)
  if (!ready) {
    return <Loader />
  }
  return (
    <AuthContext.Provider value={{
      token,
      login,
      logOut, 
      userId,
      isAuthenticated
    }}>
      <Router>
        {isAuthenticated && <Navbar />} 
        <div className="container">
          {routes}
        </div>
      </Router> 
    </AuthContext.Provider>  
  )
}

export default App;

