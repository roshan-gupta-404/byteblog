import { Header, Footer } from './components/index'
import { login, logout, anonymousLogin } from './store/authSlice'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth'
// import conf from './conf/conf';
import './App.css'
let x= 0;
function App() {
  const [loading, setLoading] = useState(true) // setting loading initialy true, we will set it false when useEffect complete its work.
  const dispatch = useDispatch()
  x = x+1
  console.log(x + ' outside useEffect in app');
  // console.log(x);
  useEffect(() => {
    console.log(x+ ' useEffect of app');
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          console.log(x + userData);
          if (userData.email === ''){
            dispatch(anonymousLogin(userData))
            console.log(x + ' already logged in annonymously');
          }
          else dispatch(login({ userData }))
        }
        else {
          dispatch(logout()) // if login fails then calling logout just to update the state. its a good practice.
        }
      })
      .catch((error) => {
        // console.log(error);
        // if current user not available then loging the user anonymously.
        authService.loginAnonymous().then((session) => {
          console.log(x + 'logged in annonymously');
          if (session) {
            authService.getCurrentUser()
              .then((userData) => {
                dispatch(anonymousLogin(userData))
                console.log(x + 'logged in annonymously data dispatched');
              })
              .catch((err)=>{
                console.log(err);
              })
          }
          else {
            dispatch(logout()) // if login fails then calling logout just to update the state. its a good practice.
          }
        })
      })
      .finally(() => { console.log(x + ' finally of app');setLoading(false)})
  }, [logout])

  return !loading ?
    (
      <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
        <div className='w-full block'>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    )
    : null
}

export default App
