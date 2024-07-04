import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"



const Navigation = () => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="relative after:bg-black_100 after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer px-2 font-bold">MENS</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                <li>home</li>
                                <li>home</li>
                                <li>home</li>
                                <li>home</li>
                                <li>home</li>
                            </ul>
                        </NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="relative after:bg-black_100 after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer px-2 font-bold">WOMENS</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                <li>home</li>
                                <li>home</li>
                                <li>home</li>
                                <li>home</li>
                                <li>home</li>
                            </ul>
                        </NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="relative after:bg-black_100 after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer px-2 font-bold">ACCESSOROES</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                <li>home</li>
                                <li>home</li>
                                <li>home</li>
                                <li>home</li>
                                <li>home</li>
                            </ul>
                        </NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className="text-red-700 font-bold">
                        SALE
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>

    )
}
export default Navigation;