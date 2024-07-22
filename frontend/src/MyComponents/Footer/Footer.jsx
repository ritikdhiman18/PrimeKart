import { FaFacebookSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { Separator } from "@/components/ui/separator"
import AccordionFooter from "./AccordianFooter";
import { MdAttachEmail } from 'react-icons/md';

const Footer = () => {
    return (
        <>
            <footer className='bg-white text-black_100 mt-2 shadow-lg'>
                <div className="footer-middle flex flex-col md:flex-row lg:flex-row p-2 my-4 md:p-4 lg:p-4 md:gap-4 justify-evenly items-center">
                    <div className="bg-black_100 p-4 rounded-md w-full md:w-auto flex flex-col md:flex-col lg:flex-col justify-evenly items-center">
                        <div className="footer-logo w-[200px]">
                            <img src="/myLogoDark.png" alt="#" />
                        </div>
                        <div className="footer-social-links">
                            <ul className='flex text-3xl gap-4'>
                                <li className='text-gray-100 hover:text-blue-400'><FaFacebookSquare /></li>
                                <li className='text-gray-100 hover:text-pink-600'><GrInstagram /></li>
                                <li className='text-gray-100 hover:text-black'><FaXTwitter /></li>
                                <li className='text-gray-100 hover:text-red-500'><IoLogoYoutube /></li>
                            </ul>
                        </div>
                    </div>
                    <div className="hidden md:flex lg:flex lg:flex-row w-full justify-evenly">
                        <ul className='text-black_100 '>
                            <h1 className='text-2xl lg:text-2xl mb-2 font-bold hover:underline cursor-pointer'>QUICK LINKS</h1>
                            <li className='font-semibold hover:underline cursor-pointer'>Women’s Jeans</li>
                            <li className='font-semibold hover:underline cursor-pointer'>Men’s T-shirts</li>
                            <li className='font-semibold hover:underline cursor-pointer'>Women’s Tops</li>
                            <li className='font-semibold hover:underline cursor-pointer'>Footwear</li>
                            <li className='font-semibold hover:underline cursor-pointer'>Men’s Jackets</li>
                        </ul>
                        <ul className='text-black_100'>
                            <h1 className='text-2xl mb-2 font-bold hover:underline cursor-pointer'>ABOUT</h1>
                            <li className='font-semibold hover:underline cursor-pointer'>Blogs & Stories</li>
                            <li className='font-semibold hover:underline cursor-pointer'>PrimeKart Foundation</li>
                            <li className='font-semibold hover:underline cursor-pointer'>News</li>
                            <li className='font-semibold hover:underline cursor-pointer'>Community</li>
                            <li className='font-semibold hover:underline cursor-pointer'>Jobs & Careers</li>
                        </ul>
                        <ul className='text-black_100'>
                            <h1 className='text-2xl mb-2 font-bold hover:underline cursor-pointer'>CONTACT DETAILS</h1>
                            <li className='my-2'>
                                <h1 className='font-semibold '>For Customer care</h1>
                                <div className='flex gap-2 items-center'>
                                    <span><MdAttachEmail /></span>
                                    <span className='font-semibold hover:underline cursor-pointer'>customercare@PrimeKart.in</span>
                                </div>
                            </li>
                            <li className='my-2'>
                                <h1 className='font-semibold'>For Store Queries</h1>
                                <div className='flex gap-2 items-center'>
                                    <span><IoCall /></span>
                                    <span className='font-semibold hover:underline cursor-pointer'>1800-1020-501</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="block md:hidden lg:hidden w-full">
                        <AccordionFooter />
                    </div>
                </div>
                <Separator />
                <div className="footer-lower bg-white text-black_100 flex justify-center">
                    <div className="footer-copyright">
                        <small className="copyright__content a">© 2013-2024
                            <a href="/" title="">PrimeKart India</a> all rights reserved.
                        </small>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;