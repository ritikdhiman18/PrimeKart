import LoginScreen from '@/Screens/LoginScreen';
import RegisterScreen from '@/Screens/RegisterScreen';
import { useSelector, useDispatch } from 'react-redux';
import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogPortal,
    AlertDialogCancel,
    AlertDialogContent,
} from "@/components/ui/alert-dialog"
import { setIsLoginOpen, setIsSignupOpen } from '@/Slices/features';
const DialogRadix = () => {
    const isLoginOpen = useSelector((state) => state.dialog.isLoginOpen);
    const isSignupOpen = useSelector((state) => state.dialog.isSignupOpen);
    const dispatch = useDispatch();
    return (
        <>
            <AlertDialog open={isLoginOpen} >
                <AlertDialogPortal>
                    <AlertDialogOverlay className="bg-black bg-opacity-50" />
                    <AlertDialogContent className="relative">
                        <LoginScreen />
                        <AlertDialogCancel asChild>
                            <button
                                className="absolute top-0 right-[20px]"
                                aria-label="Close" onClick={() => dispatch(setIsLoginOpen(false))}
                            >
                                x
                            </button>
                        </AlertDialogCancel>
                    </AlertDialogContent>
                </AlertDialogPortal>
            </AlertDialog>

            <AlertDialog open={isSignupOpen} >
                <AlertDialogPortal>
                    <AlertDialogOverlay className="bg-black bg-opacity-50" />
                    <AlertDialogContent className="relative">
                        <RegisterScreen />
                        <AlertDialogCancel asChild>
                            <button
                                className="absolute top-0 right-[20px]"
                                aria-label="Close" onClick={() => dispatch(setIsSignupOpen(false))}
                            >
                                x
                            </button>
                        </AlertDialogCancel>
                    </AlertDialogContent>
                </AlertDialogPortal>
            </AlertDialog>
        </>
    );
}

export default DialogRadix;
