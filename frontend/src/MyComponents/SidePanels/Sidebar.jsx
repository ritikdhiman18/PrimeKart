import { Button } from "@/components/ui/button"
import { HiMenuAlt1 } from "react-icons/hi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../Slices/apiSlice';
import { RxAvatar } from "react-icons/rx";
import { toast } from 'react-hot-toast';
import { setIsLoginOpen } from '../../Slices/Reducers/features';
import { SheetDescription } from "../../components/ui/sheet";
import { logout } from "../../Slices/Reducers/authSlice";

export function Sidebar() {
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();
    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/');
            toast.success("LOGOUT SUCCESSFULL.")
        } catch (err) {
            toast.error(err);
        }
    };
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant='mobileNav'><HiMenuAlt1 size={30} /></Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-4" aria-describedby="alert-description">
                {userInfo ? (<>
                    <SheetHeader>
                        <SheetClose asChild>
                            <Link to="/profile">
                                <div className="border-black border-2 flex items-center justify-center py-2 gap-2 rounded-md">
                                    <Avatar>
                                        <AvatarImage src="/login.svg" />
                                        <AvatarFallback>PK</AvatarFallback>
                                    </Avatar>
                                    <SheetTitle className="text-black">{userInfo.name}</SheetTitle>
                                </div>
                            </Link>
                        </SheetClose>
                    </SheetHeader>
                </>) : (
                    <SheetHeader>
                        <div className="profile-container flex justify-center border-black border rounded-md py-2" onClick={() => dispatch(setIsLoginOpen(true))}>
                            <div className="profile-avatar">
                                <RxAvatar size={50} />
                            </div>
                        </div>
                    </SheetHeader>
                )}
                <div className="nav">
                    <ul className='nav-links gap-4 flex flex-col w-full text-black_100'>
                        <li className='relative font-bold after:bg-black after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer flex justify-between'>MENS<MdDoubleArrow /></li>
                        <li className='relative font-bold after:bg-black after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer flex justify-between'>WOMENS<MdDoubleArrow /></li>
                        <li className='relative font-bold after:bg-black after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer flex justify-between'>NEW-ARRIVALS<MdDoubleArrow /></li>
                        <li className='relative font-bold after:bg-black after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer flex justify-between'>ACCESSOROES<MdDoubleArrow /></li>
                        <li className='relative font-bold after:bg-black after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer flex justify-between'>SALE<MdDoubleArrow /></li>
                    </ul>
                </div>
                {userInfo ? (
                    <SheetFooter >
                        <Button type="submit" variant="ecom" onClick={logoutHandler} className="w-full text-white">
                            <SheetClose asChild><Link to="/">LOGOUT</Link></SheetClose>
                        </Button>
                    </SheetFooter>) : (<></>)}
                <VisuallyHidden id="alert-description">
                    <SheetTitle />
                    <SheetDescription />
                </VisuallyHidden>

            </SheetContent>
        </Sheet>
    )
}
