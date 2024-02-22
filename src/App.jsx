import { RouterProvider } from 'react-router-dom'
import AppRoute from './router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext, useEffect, useState } from 'react'
import UserContext from './context/use.context'
import APP_LOCAL from './lib/localStorage'
import { KEY_CONTEXT_USER } from './context/use.reducer'

function App() {
  const [{ role }, dispatch] = useContext(UserContext)
  const [isAuth, setIsAuth] = useState(APP_LOCAL.getTokenStorage)
  useEffect(() => {
    const getUser = async () => {
      const token = APP_LOCAL.getTokenStorage();
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        fetch(`http://localhost:3001/account/admin/:token`, requestOptions)
          .then(res => {
            return res.json()
          }).then(data => {
            dispatch({
              type: KEY_CONTEXT_USER.SET_TOKEN,
              payload: data.data.token
            })
            dispatch({
              type: KEY_CONTEXT_USER.SET_ROLE,
              payload: data.data.role
            })
            setIsAuth(true)
          }).catch(e => {
            console.log(e)
          })
      } catch (error) {

      }
    }
    getUser()
  }, [])

  return (
    <div>
      <RouterProvider router={AppRoute(isAuth, role)} />
      <ToastContainer />
    </div>
  )
}

export default App
