
import { Toaster } from 'react-hot-toast';
import Header from '../Header/Header';
import DialogRadix from '../AuthDialog/Dialogradix';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { useSelector } from 'react-redux';
const Layout = () => {
    const isLoading = useSelector((state) => state.loading.isLoading)
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
            <Loader isVisible={isLoading} />
            <Footer />
        </>
    )
}

export default Layout