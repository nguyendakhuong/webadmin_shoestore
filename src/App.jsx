import { RouterProvider } from 'react-router-dom'
import AppRoute from './router'

function App() {
  return (
    <div>
      <RouterProvider router={AppRoute()} />
    </div>
  )
}

export default App
