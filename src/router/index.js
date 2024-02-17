import { createBrowserRouter } from 'react-router-dom'
import Login from '../modules/auth/Login'

const AppRoute = () => {
  const route = [
    {
      path: '/',
      element: <Login />,
      //   children: [{ index: true, element: <LayoutWeb /> }],
    },
  ]
  return createBrowserRouter(route)
}
export default AppRoute
