import { createBrowserRouter } from 'react-router-dom'
import Login from '../modules/auth/Login'
import LayoutWeb from '../modules/layout/LayoutWeb'
import ErrorPage from '../lib/errorpage/ErrorPage'
import User from '../modules/user/User'
import Product from '../modules/product/Product'
import Main from '../modules/Main'
import OrderManagement from '../modules/ordermanagement/Ordermanagement.jsx'
import Statistical from '../modules/statistical/Statistical.jsx'
import SignUp from '../modules/auth/SignUp.jsx'
import UpdateProduct from '../modules/product/update-prodcut/UpdateProduct.jsx'
import Discountcode from '../modules/discountcode/discountcode.jsx'

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
            path: 'signup',
            element: <SignUp />,
          },
          {
            path: 'product',
            element: <Product />,
          },
          {
            path: 'update-product',
            element: <UpdateProduct />,
          },
          {
            path: 'order',
            element: <OrderManagement />,
          },
          {
            path: 'statistical',
            element: <Statistical />,
          },
          {
            path: 'discountcode',
            element: <Discountcode />
          }
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
