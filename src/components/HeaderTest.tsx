import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import { Link } from "react-router-dom";
import instance from "@/config/axios";

const HeaderTest = () => {
  const { data } = useQuery({
    queryKey: ["CATEGORY_LIST"],
    queryFn: async () => {
      const { data } = await instance.get(
        `/categories`
      );
      return data;
    },
  });

  const [menuOpen, setMenuOpen] = React.useState(true);

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleCategorySelect = () => {
    setMenuOpen(false);
    setTimeout(() => {
      setMenuOpen(true);
    }, 500);
  };

  return (
    <>
      <NavigationMenu className="">
        <NavigationMenuList className="gap-[10px]">
          <NavigationMenuItem>
            <Link
              to="/"
              className={cn(
                navigationMenuTriggerStyle(),
                "font-semibold text-sm p-3 uppercase text-[15px]"
              )}
            >
              Trang Chủ
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className="font-semibold text-sm p-3 uppercase text-[15px]"
              onClick={handleMenuToggle}
            >
              Danh Mục
            </NavigationMenuTrigger>
            {menuOpen && (
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[300px]">
                  <ListItem
                    key={"all"}
                    title={"Tất cả sản phẩm"}
                    href="/shop"
                    onClick={handleCategorySelect}
                  />
                  {data?.map((category: any) => (
                    <ListItem
                      key={category._id}
                      title={category.name}
                      href={`/categories/${category._id}`}
                      onClick={handleCategorySelect}
                    />
                  ))}
                </ul>
              </NavigationMenuContent>
            )}
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              to="/info"
              className={cn(
                navigationMenuTriggerStyle(),
                "font-semibold text-sm p-3 uppercase text-[15px]"
              )}
            >
              Thông Tin
            </Link>
            <Link
              to="/warranty"
              className={cn(
                navigationMenuTriggerStyle(),
                "font-semibold text-sm p-3 uppercase text-[15px]"
              )}
            >
              Bảo Hành
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              to="/contact"
              className={cn(
                navigationMenuTriggerStyle(),
                "font-semibold text-sm p-3 uppercase text-[15px]"
              )}
            >
              Liên Hệ
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <Link
        ref={ref}
        to={props.href || "/"}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="text-xs font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
          {children}
        </p>
      </Link>
    </li>
  );
});

export default HeaderTest;
