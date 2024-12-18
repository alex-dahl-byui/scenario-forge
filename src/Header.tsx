import "./Header.css";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu.tsx";
import { Separator } from "@/components/ui/separator.tsx";

export const Header = () => {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              href="/scenarios"
            >
              Scenarios
            </NavigationMenuLink>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              href="/npcs"
            >
              NPCs
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <Separator className="mb-4" />
    </>
  );
};
