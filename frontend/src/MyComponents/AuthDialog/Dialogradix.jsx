import { useSelector, useDispatch } from 'react-redux';
import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogPortal,
    AlertDialogCancel,
    AlertDialogContent,
} from "@/components/ui/alert-dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { setIsLoginOpen, setIsSignupOpen } from '@/Slices/Reducers/features';
import { AlertDialogDescription, AlertDialogTitle } from '@radix-ui/react-alert-dialog';
import RegisterScreen from './registerDialog/RegisterScreen';
import LoginScreen from './loginDialog/LoginScreen';
const DialogRadix = () => {
    const isLoginOpen = useSelector((state) => state.dialog.isLoginOpen);
    const isSignupOpen = useSelector((state) => state.dialog.isSignupOpen);
    const dispatch = useDispatch();
    return (
        <>
            <AlertDialog open={isLoginOpen} >
                <AlertDialogPortal>
                    <AlertDialogOverlay className="bg-black bg-opacity-50" />
                    <AlertDialogContent className="relative" aria-describedby="alert-description">
                        <LoginScreen />
                        <AlertDialogCancel asChild>
                            <button
                                className="absolute top-0 right-[20px]"
                                aria-label="Close" onClick={() => dispatch(setIsLoginOpen(false))}
                            >
                                x
                            </button>
                        </AlertDialogCancel>
                        <VisuallyHidden id="alert-description">
                            <AlertDialogTitle />
                            <AlertDialogDescription />
                        </VisuallyHidden>
                    </AlertDialogContent>
                </AlertDialogPortal>
            </AlertDialog>

            <AlertDialog open={isSignupOpen} >
                <AlertDialogPortal>
                    <AlertDialogOverlay className="bg-black bg-opacity-50" />
                    <AlertDialogContent className="relative" aria-describedby="alert-description">
                        <RegisterScreen />
                        <AlertDialogCancel asChild>
                            <button
                                className="absolute top-0 right-[20px]"
                                aria-label="Close" onClick={() => dispatch(setIsSignupOpen(false))}
                            >
                                x
                            </button>
                        </AlertDialogCancel>
                        <VisuallyHidden id="alert-description">
                            <AlertDialogTitle />
                            <AlertDialogDescription />
                        </VisuallyHidden>
                    </AlertDialogContent>
                </AlertDialogPortal>
            </AlertDialog>
        </>
    );
}

export default DialogRadix;
