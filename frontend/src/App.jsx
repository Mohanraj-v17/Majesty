import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';




function App() {

const { mode } = useSelector((state) => state.theme);

useEffect(() => {
  document.documentElement.setAttribute("data-theme", mode);
}, [mode]);
  return (
    <>
    <Header/>
    <ToastContainer />
    <div className='min-h-screen'>
      <div className=" mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Outlet/>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default App
