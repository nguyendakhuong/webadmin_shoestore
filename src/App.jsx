import { RouterProvider } from 'react-router-dom'
import AppRoute from './router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div>
      <RouterProvider router={AppRoute()} />
      <ToastContainer />
    </div>
  )
}

export default App
