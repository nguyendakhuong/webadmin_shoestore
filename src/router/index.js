import { createBrowserRouter } from 'react-router-dom'
import Login from '../modules/auth/Login'
import LayoutWeb from '../modules/layout/LayoutWeb'
import ErrorPage from '../lib/errorpage/ErrorPage'
import User from '../modules/user/User'
import Product from '../modules/product/Product'

const AppRoute = () => {
  const route = [
    {
      path: '/',
      element: <Login />,
    },
    // {
    //   path: '/admin',
    //   element: <LayoutWeb />,
    //   children: [
    //     {
    //       index: true,
    //       element: <User />,
    //     },
    //     {
    //       path: '/product',
    //       element: <Product />,
    //     },
    //   ],
    // },
    {
      path: '*',
      element: <ErrorPage />,
    },
  ]
  return createBrowserRouter(route)
}
export default AppRoute
