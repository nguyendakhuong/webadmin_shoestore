import { createBrowserRouter } from 'react-router-dom'
import Login from '../modules/auth/Login'
import LayoutWeb from '../modules/layout/LayoutWeb'
import ErrorPage from '../lib/errorpage/ErrorPage'
import User from '../modules/user/User'
import Product from '../modules/product/Product'
import Main from '../modules/Main'
import OrderManagement from '../modules/Ordermanagement/Ordermanagement.jsx'
import Statistical from '../modules/Statistical/Statistical.jsx'

const AppRoute = (isAuth, role) => {
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
            {
              path: 'order',
              element: <OrderManagement />,
            },
            {
              path: 'statistical',
              element: <Statistical />,
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
