import { MdAttachEmail } from 'react-icons/md';
import { IoCall } from "react-icons/io5";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


const AccordionFooter = () => {
    return (
        <>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className="px-2">QUICK LINKS</AccordionTrigger>
                    <AccordionContent className="px-2">
                        <ul className='text-black'>
                            <li className=''>Women’s Jeans</li>
                            <li className=''>Men’s T-shirts</li>
                            <li className=''>Women’s Tops</li>
                            <li className=''>Footwear</li>
                            <li className=''>Men’s Jackets</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="px-2">ABOUT</AccordionTrigger>
                    <AccordionContent className="px-2">
                        <ul className='text-black'>
                            <li className=''>Blogs & Stories</li>
                            <li className=''>PrimeKart Foundation</li>
                            <li className=''>News</li>
                            <li className=''>Community</li>
                            <li className=''>Jobs & Careers</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="px-2">CONTACT DETAILS</AccordionTrigger>
                    <AccordionContent className="px-2">
                        <ul className='text-black'>
                            <li className='my-2'>
                                <h1>For Customer care</h1>
                                <div className='flex gap-2 items-center'>
                                    <span><MdAttachEmail /></span>
                                    <span>customercare@PrimeKart.in</span>
                                </div>
                            </li>
                            <li className='my-2'>
                                <h1>For Store Queries</h1>
                                <div className='flex gap-2 items-center'>
                                    <span><IoCall /></span>
                                    <span>1800-1020-501</span>
                                </div>
                            </li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </>
    )
}
export default AccordionFooter