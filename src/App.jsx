import { useEffect, useState } from 'react'
import './App.css'
import conf from './conf/conf';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components/index'
import { Outlet } from 'react-router-dom';
function App() {
  const [loading, setLoading] = useState(true) // setting loading initialy true, we will set it false when useEffect complete its work.
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('getting user');
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          console.log('dispatching userdata');
          dispatch(login({ userData }))
        }
        else {
          dispatch(logout()) // if login fails then calling logout just to update the state. its a good practice.
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ?
    (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet/>
        </main>
        <Footer />
      </div>
    </div>
    )
    : null
}

export default App
