
import { Toaster } from 'react-hot-toast';
import Header from '../Header';
import DialogRadix from '../Dialogradix';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
const Layout = () => {
    return (
        <>
            <Header />
            <div className='font-chakra'>
                <Outlet />
            </div>
            <Toaster toastOptions={{
                style: {
                    background: '#393e45',
                    border: '1px solid black',
                    color: 'white'
                },
                duration: 1000
            }} />
            <DialogRadix />
            <Footer />
        </>
    )
}

export default Layout