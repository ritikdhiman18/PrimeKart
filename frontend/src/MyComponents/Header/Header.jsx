import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import CIcon from '@coreui/icons-react';
import { cifIn } from "@coreui/icons";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Slices/Reducers/authSlice';
import { setSearchQuery } from '../../Slices/Reducers/features';
import { setIsLoginOpen } from '../../Slices/Reducers/features';
import BannerCarousel from '../Carousel/BannerCarousel';
import { IoMdSearch } from "react-icons/io";
import { Sidebar } from "../SidePanels/Sidebar"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { RxAvatar } from "react-icons/rx";
import toast from "react-hot-toast";
import Navigation from "./Navigation/navigation";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Cart from "../SidePanels/cart";
import { useLogoutMutation } from "@/Slices/customHooks/authHooks";

const Header = () => {
  let location = useLocation();
  let queryParams = new URLSearchParams(location.search);
  let searchValue = queryParams.get('search') || "";
  const [inputVal, setInputVal] = useState('');
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutateAsync: logoutApiCall } = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall();
      dispatch(logout());
      navigate('/');
      toast.success("LOGOUT SUCCESSFUL.")
    } catch (err) {
      toast.error(err.message || "An error occurred during logout.");
    }
  };

  const handleInputChange = (e) => {
    setInputVal(e.target.value)
  };

  const formSubmit = (e) => {
    e.preventDefault();
    navigate(`/products?search=${inputVal}`);
    dispatch(setSearchQuery(inputVal));
  }

  useEffect(() => {
    setInputVal(searchValue)
    dispatch(setSearchQuery(searchValue));
  }, [searchValue, dispatch]);

  return (
    <header className='font-chakra shadow mb-2'>
      <div className="banner-content flex w-full bg-black_100 text-white py-1">
        <div className="flex w-full justify-center py-2">
          <BannerCarousel />
        </div>
        <div className="country-profile flex items-center justify-end gap-2 mr-2 lg:mr-4">
          <div className="Profile hidden md:flex lg:flex">
            {userInfo ? (
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger className="font-bold">{userInfo.name}</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      <Link to="/profile">Profile</Link>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={logoutHandler}>Logout</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            ) : (
              <button className="text-white font-extrabold text-2xl" onClick={() => dispatch(setIsLoginOpen(true))}>
                <RxAvatar />
              </button>
            )}
          </div>
          <div className="country w-[25px]">
            <CIcon icon={cifIn} size="sm" />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center lg:gap-4 pl-2 pr-4 bg-white text-black_100 h-14">
        <div className="flex lg:hidden">
          <Sidebar />
        </div>
        <div className="nav-items flex items-center gap-2 lg:gap-6">
          <div className="logo w-[160px] lg:w-[200px]">
            <Link to="/">
              <img src="/myLogoLight.png" alt="Logo" />
            </Link>
          </div>
          <div className="hidden lg:flex">
            <Navigation />
          </div>
        </div>
        <div className="header-content flex gap-4">
          <div className="hidden lg:flex items-center">
            <form onSubmit={formSubmit} className="flex items-center border-black border-2 overflow-hidden rounded-sm">
              <input type="search" maxLength="40" placeholder="Search" className="bg-white text-black_100 px-2 h-8 focus:outline-none" value={inputVal} onChange={handleInputChange} />
              <button className="font-bold text-lg border-black_100 border-1 px-2 h-8 bg-black_100 text-white" type="submit">
                <IoMdSearch />
              </button>
            </form>
          </div>
          <div className="wishlist mt-2 text-black_100">
            <FaRegHeart size={20} />
          </div>
          <div className="cart text-black_100">
            <Cart />
          </div>
        </div>
      </div>
      <div className="block lg:hidden border-black border-2 rounded-md overflow-hidden mx-2">
        <form onSubmit={formSubmit} className="flex items-center">
          <input type="search" maxLength="40" placeholder="Search" className="w-full bg-white border-b-2 focus:outline-none border-b-gray-200 text-black px-2 h-8" value={inputVal} onChange={handleInputChange} />
          <button className="bg-black_100 text-white font-bold text-lg p-2" type="submit">
            <IoMdSearch />
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
