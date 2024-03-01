import { RouterProvider } from 'react-router-dom'
import AppRoute from './router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext, useEffect, useState } from 'react'
import UserContext from './context/use.context'
import APP_LOCAL from './lib/localStorage'
import { KEY_CONTEXT_USER } from './context/use.reducer'
import ToastApp from './lib/notification/Toast'
import Modal from './modules/components/modal'

function App() {
  const [{ role, isOpenModal }, dispatch] = useContext(UserContext)
  const [isAuth, setIsAuth] = useState(APP_LOCAL.getTokenStorage)
  console.log(role)
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
            if (res.status === 200) {
              return res.json()
            } else {
              ToastApp.error('Lỗi: ' + res.message)
            }
          }).then(data => {
            console.log(data)
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
        console.log(error)
      }
    }
    getUser()
  }, [dispatch])

  return (
    <div>
      <RouterProvider router={AppRoute(isAuth, role)} />
      <ToastContainer />
      {isOpenModal && <Modal />}
    </div>
  )
}

export default App
