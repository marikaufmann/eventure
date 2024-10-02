import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  // NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import React, { ForwardRefExoticComponent, useState } from "react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import { account, mainCategories, locations, organize } from "@/lib/config";
import { AvatarFallback, AvatarImage, Avatar } from "./ui/avatar";
import { useAppContext } from "@/hooks/use-app-context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "@/api-client";
import { toast } from "./ui/use-toast";
import CollapsedMenu from "./CollapsedNavbar";
import { IconComponent } from "@/types/index";
import {
  Command,
  CommandInput,
  // CommandEmpty,
  // CommandGroup,
  // CommandItem,
  // CommandList,
  // CommandSeparator,
  // CommandShortcut,
} from "@/components/ui/searchCommand";
import { Separator } from "./ui/separator";

const Navbar = () => {
  const { isLoggedIn, setIsLoginOpened } = useAppContext();
  const queryClient = useQueryClient();
  const { mutate: logOut } = useMutation({
    mutationFn: apiClient.logout,
    onError: (err: Error) => {
      toast({ description: err.message, variant: "destructive" });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["validateSession"] });
    },
  });
  const { data: user } = useQuery({
    queryKey: ["fetchCurrentUser"],
    queryFn: apiClient.fetchCurrentUser,
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
  const location = useLocation();
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const isHomePage = location.pathname === "/";
  const isOnlinePage = location.pathname === "/online";
  const isCategoryPage = location.pathname.match(/^\/categories\/[^/]+$/);
  const isLocationPage = location.pathname.match(/^\/locations\/[^/]+$/);

  const wrapStyles = isHomePage ? "" : "text-black lg:py-4 pb-3";
  const buttonStyles = isHomePage
    ? "bg-white/90 hover:bg-white text-black rounded-sm"
    : "text-white bg-black/90 hover:bg-black";
  const logoStyles = isHomePage
    ? "flex gap-4 items-center"
    : "flex gap-2 items-center";
  const textColor = isHomePage
    ? "text-white"
    : !isCategoryPage && !isLocationPage && !isOnlinePage
    ? "text-black border-black"
    : "text-white border-gray-400";
  const borderColor = isHomePage
    ? ""
    : !isCategoryPage && !isLocationPage && !isOnlinePage
    ? "border-b-2 border-black"
    : "border-b border-gray-400";

  return (
    <>
      {isMenuOpened ? (
        <CollapsedMenu setIsMenuOpened={setIsMenuOpened} />
      ) : (
        <div className={`${wrapStyles} ${borderColor}`}>
          <div
            className={`${textColor} flex justify-between max-w-[1700px] mx-auto font-bold items-center max-lg:pt-2 md:px-4 px-2 lg:px-6 xl:px-8 w-full `}
          >
            <div className="flex lg:gap-8 gap-2 items-center w-full">
              <div className={logoStyles}>
                <button
                  className="rounded-full w-10 h-10 bg-black/80 hover:bg-black/40   flex justify-center items-center md:hidden"
                  onClick={() => setIsMenuOpened(true)}
                >
                  <Icons.MenuIcon className="text-white" />
                </button>
                <Link to="/" className="text-xl text-primary font-bold">
                  EVENTURE
                </Link>
              </div>
              {location.pathname !== "/" && (
                // <div className="flex items-center justify-center w-full max-w-[600px]">
                //   <AutoComplete

                //     className="w-full flex-1 rounded-full"
                //     popupMatchSelectWidth={252}
                //     // options={options}
                //     // onSelect={onSelect}
                //     // onSearch={handleSearch}
                //     // size="small"
                //   >
                //     <Input.Search
                //       size="middle"
                //       placeholder="What's happening near you?"
                //       enterButton={<Search className="text-secondary" />}
                //       className="rounded-full"

                //     />
                //   </AutoComplete>
                // </div>
                <div className="lg:hidden px-2 flex w-full ">
                  <Command className=" rounded-sm outline-2 outline-primary outline  text-sm font-normal flex justify-center shadow-2xl  max-w-[500px] shadow-primary/45">
                    <CommandInput
                      className=""
                      placeholder="What's happening near you?"
                    />
                    {/* <CommandList className="">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                      <CommandItem>
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Calendar</span>
                      </CommandItem>
                      <CommandItem>
                        <Smile className="mr-2 h-4 w-4" />
                        <span>Search Emoji</span>
                      </CommandItem>
                      <CommandItem>
                        <Calculator className="mr-2 h-4 w-4" />
                        <span>Calculator</span>
                      </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Settings">
                      <CommandItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        <CommandShortcut>⌘P</CommandShortcut>
                      </CommandItem>
                      <CommandItem>
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                        <CommandShortcut>⌘B</CommandShortcut>
                      </CommandItem>
                      <CommandItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                        <CommandShortcut>⌘S</CommandShortcut>
                      </CommandItem>
                    </CommandGroup>
                  </CommandList> */}
                  </Command>
                </div>
              )}

              <div className="gap-4   hidden md:flex">
                <NavigationMenu className="">
                  <NavigationMenuList className="">
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="max-lg:px-4 text-lg">
                        Categories
                      </NavigationMenuTrigger>
                      <NavigationMenuContent
                        className={
                          !isHomePage
                            ? "lg:left-0 top-12  -right-40 shadow-2xl px-4"
                            : "left-0 shadow-2xl px-4"
                        }
                      >
                        <ul
                          className="grid laptop:w-[700px] xl:w-[1000px] w-[580px] gap-6 p-4   md:grid-cols-3  
                      "
                        >
                          {mainCategories.map((category) => {
                            const iconKey = category.icon as string;
                            const Icon: IconComponent = iconKey
                              ? (Icons[
                                  iconKey as keyof typeof Icons
                                ] as ForwardRefExoticComponent<Icons.LucideProps>)
                              : undefined;
                            return (
                              <ListItem
                                key={category.title}
                                href={category.href}
                                className={category.className}
                              >
                                <div
                                  className={`flex gap-4 items-center  ${
                                    category.title === "View all"
                                      ? "text-primary underline underline-offset-4"
                                      : "text-white/90 hover:text-white "
                                  }`}
                                >
                                  {Icon && <Icon className=" w-5 h-5 " />}
                                  <span className=" ">
                                    {category.title.toUpperCase()}
                                  </span>
                                </div>
                              </ListItem>
                            );
                          })}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="max-lg:px-0 pr-2 text-lg">
                        Locations
                      </NavigationMenuTrigger>
                      <NavigationMenuContent
                        className={
                          !isHomePage
                            ? "lg:left-0 top-12  right-0 shadow-2xl"
                            : "left-0 shadow-2xl"
                        }
                      >
                        <ul className="grid w-[220px] gap-5 p-4  ">
                          {locations.map((location) => {
                            const iconKey = location.icon as string;
                            const Icon: IconComponent = iconKey
                              ? (Icons[
                                  iconKey as keyof typeof Icons
                                ] as ForwardRefExoticComponent<Icons.LucideProps>)
                              : undefined;
                            return (
                              <ListItem
                                key={location.title} // Add key prop here
                                href={location.href}
                              >
                                <div className="flex gap-4 items-center text-white/90 hover:text-white">
                                  {Icon && <Icon className=" w-5 h-5" />}
                                  <span>{location.title.toUpperCase()}</span>
                                </div>
                              </ListItem>
                            );
                          })}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
              {location.pathname !== "/" && (
                // <div className="flex items-center justify-center w-full max-w-[600px]">
                //   <AutoComplete

                //     className="w-full flex-1 rounded-full"
                //     popupMatchSelectWidth={252}
                //     // options={options}
                //     // onSelect={onSelect}
                //     // onSearch={handleSearch}
                //     // size="small"
                //   >
                //     <Input.Search
                //       size="middle"
                //       placeholder="What's happening near you?"
                //       enterButton={<Search className="text-secondary" />}
                //       className="rounded-full"

                //     />
                //   </AutoComplete>
                // </div>
                <div className="lg:flex hidden w-full">
                  <Command className=" rounded-sm outline-2 outline-primary outline  text-sm font-normal flex justify-center shadow-2xl shadow-primary/45  max-w-[700px]">
                    <CommandInput
                      className=""
                      placeholder="What's happening near you?"
                    />
                    {/* <CommandList className="">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                      <CommandItem>
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Calendar</span>
                      </CommandItem>
                      <CommandItem>
                        <Smile className="mr-2 h-4 w-4" />
                        <span>Search Emoji</span>
                      </CommandItem>
                      <CommandItem>
                        <Calculator className="mr-2 h-4 w-4" />
                        <span>Calculator</span>
                      </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Settings">
                      <CommandItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        <CommandShortcut>⌘P</CommandShortcut>
                      </CommandItem>
                      <CommandItem>
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                        <CommandShortcut>⌘B</CommandShortcut>
                      </CommandItem>
                      <CommandItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                        <CommandShortcut>⌘S</CommandShortcut>
                      </CommandItem>
                    </CommandGroup>
                  </CommandList> */}
                  </Command>
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center ">
                <div className="hidden gap-6 items-center md:flex mr-2">
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="max-lg:pr-3 max-lg:pl-3 text-lg">
                          Organize
                        </NavigationMenuTrigger>
                        <NavigationMenuContent
                          className={` ${
                            !isHomePage && "top-12 "
                          } right-0 shadow-2xl`}
                        >
                          <ul className="grid w-[240px] gap-5 p-4   ">
                            {organize.map((category) => {
                              const iconKey = category.icon as string;
                              const Icon: IconComponent = iconKey
                              ? (Icons[
                                  iconKey as keyof typeof Icons
                                ] as ForwardRefExoticComponent<Icons.LucideProps>)
                              : undefined;
                              return (
                                <ListItem
                                  key={category.title}  
                                  href={category.href}
                                >
                                  <div className="flex gap-4 items-center text-white/90 hover:text-white">
                                    {Icon && <Icon className=" w-5 h-5" />}
                                    <span>{category.title.toUpperCase()}</span>
                                  </div>
                                </ListItem>
                              );
                            })}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>
                {isLoggedIn ? (
                  <div className="ml-2">
                    <NavigationMenu className="flex justify-end ">
                      <NavigationMenuList className="flex justify-end">
                        <NavigationMenuItem className="flex justify-end">
                          <NavigationMenuTrigger className="w-10 flex ">
                            <Avatar>
                              <AvatarImage src={user?.picture} />
                              <AvatarFallback>
                                <div className="rounded-full w-10 h-10 bg-black/80 flex  font-normal justify-center items-center hover:bg-black/50 text-white/90">
                                  <span className="text-xl ">
                                    {user?.firstName?.slice(0, 1).toUpperCase()}
                                  </span>
                                </div>
                              </AvatarFallback>
                            </Avatar>
                          </NavigationMenuTrigger>
                          <NavigationMenuContent
                            className={` ${
                              !isHomePage && "top-14 "
                            } right-0 shadow-2xl`}
                          >
                            <ul className="grid  w-[240px] gap-4 p-4 ">
                              {account.map((category) => {
                                const iconKey = category.icon as string;
                                const Icon: IconComponent = iconKey
                              ? (Icons[
                                  iconKey as keyof typeof Icons
                                ] as ForwardRefExoticComponent<Icons.LucideProps>)
                              : undefined;
                                return (
                                  <div key={category.title}>
                                    {category.title === "Log out" ? (
                                      <>
                                        <Separator />
                                        <ListItem
                                          key={category.title}
                                          href={category.href}
                                          className="mt-1"
                                        >
                                          <button
                                            className=""
                                            onClick={() => logOut()}
                                          >
                                            <div className="flex gap-4 items-center text-white/90 hover:text-white">
                                              {Icon && (
                                                <Icon className=" w-5 h-5 rotate-180" />
                                              )}
                                              <span>
                                                {category.title.toUpperCase()}
                                              </span>
                                            </div>
                                          </button>
                                        </ListItem>
                                      </>
                                    ) : (
                                      <ListItem
                                        key={category.title}
                                        href={category.href}
                                      >
                                        <div className="flex gap-4 items-center text-white/90 hover:text-white">
                                          {Icon && (
                                            <Icon className=" w-5 h-5" />
                                          )}
                                          <span>
                                            {category.title.toUpperCase()}
                                          </span>
                                        </div>
                                      </ListItem>
                                    )}
                                  </div>
                                );
                              })}
                            </ul>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>
                  </div>
                ) : (
                  <div className="">
                    <button
                      className={` px-4 ml-2 py-1   rounded-sm lg:flex hidden w-24 items-center justify-center text-lg ${buttonStyles}`}
                      onClick={() => setIsLoginOpened(true)}
                    >
                      Log in
                    </button>
                    <button
                      className="rounded-full w-9 h-9 bg-black/80 flex justify-center items-center lg:hidden hover:bg-black/50"
                      onClick={() => setIsLoginOpened(true)}
                    >
                      <Icons.User2 className="text-white" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }) => {
  return (
    <li className={className}>
      <NavigationMenuLink asChild>
        <Link
          to={href as string}
          className={cn(
            "block select-none space-y-1 rounded-sm py-2 pl-2 leading-none no-underline outline-none transition-colors hover:bg-primary/40 focus:bg-primary/40 focus:text-primary/40",
            className
          )}
          {...props}
        >
          <div className="font-medium leading-none">{title}</div>
          <p className="line-clamp-2 leading-snug text-black">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
export default Navbar;
