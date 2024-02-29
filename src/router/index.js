import { createBrowserRouter } from 'react-router-dom'
import Login from '../modules/auth/Login'
import LayoutWeb from '../modules/layout/LayoutWeb'
import ErrorPage from '../lib/errorpage/ErrorPage'
import User from '../modules/user/User'
import Product from '../modules/product/Product'


const AppRoute = (isAuth, role) => {
  console.log('console.log is AppRoute isAuth', isAuth)
  console.log('console.log is AppRoute role', role)
  const route = [
    {
      path: '/',
      element: <Main />,
    },
    {
      path: '/login',
      element: <Login />,
    },

    isAuth && (role === 'admin' || role === 'superAdmin')
      ? {
        path: '/admin',
        element: <LayoutWeb />,
        children: [
          { index: true, element: <User /> },
          {
            path: 'users',
            element: <User />,
          },
          {
            path: 'product',
            element: <Product />,
          },

        ],
      }
      : {
        path: '*',
        element: <ErrorPage />,
      },
  ]
  return createBrowserRouter(route)
}
export default AppRoute
