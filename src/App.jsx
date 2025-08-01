import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Products from './components/product/Products'
import Cart from './components/cart/Cart'
import Login from './components/login/Login'
import Sidebar from './components/sidebar/Sidebar'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { CssBaseline } from '@mui/material'

function App() {

  return (
    <>
    <CssBaseline />
      <Router>
        <Sidebar/>
        <Routes>
           <Route path='' element={<Products/>}/>
            {/* <Route path='/products/:id' element={<SingleProduct/>}/> */}
           <Route path='/Cart' element={<Cart/>}/>
           <Route path='/Login' element={<Login/>}/>
        </Routes>
      </Router>
    
    </>
  )
}

export default App
