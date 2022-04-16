import { Menu } from "@headlessui/react";
import { useRouter } from "next/router";
import {
  CashIcon,
  CreditCardIcon,
  FilmIcon,
  FireIcon,
  GiftIcon,
  HomeIcon,
  LogoutIcon,
  MenuIcon,
  PlayIcon,
  StarIcon,
} from "@heroicons/react/solid";
import { signOut } from "next-auth/react";

function MobileMenu({ session }) {
  const router = useRouter();

  const { image, name } = session.user;
  return (
    <div className="flex justify-between items-center sticky top-0 h-10 z-10 w-full bg-[#36a2eb] lg:hidden">
      <div className="ml-4 flex items-center">
        <img
          src={image}
          alt="profile pic"
          className="rounded-full h-7 cursor-pointer"
          onClick={() => router.push("/")}
        />
        <h1 className="ml-3">{name}</h1>
      </div>
      <Menu as="div" className="mr-4">
        <Menu.Button className="menuButton" name="menu button">
          <MenuIcon className="h-7 lg:hidden hover:text-pink-500" />
        </Menu.Button>

        <Menu.Items className="menuItemsContainer">
          <div className="rounded-md">
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`mobileMenuLink ${
                    active && "mobileMenuLinkActive rounded-t-md"
                  }`}
                  onClick={() => router.push("/")}
                >
                  <HomeIcon className="menuIcon" />
                  HOME
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`mobileMenuLink ${
                    active && "mobileMenuLinkActive"
                  }`}
                  onClick={() => router.push("/income")}
                >
                  <CashIcon className="menuIcon" />
                  INCOME
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`mobileMenuLink ${
                    active && "mobileMenuLinkActive"
                  }`}
                  onClick={() => router.push("/expense")}
                >
                  <CreditCardIcon className="menuIcon" />
                  EXPENSE
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`mobileMenuLink ${
                    active && "mobileMenuLinkActive"
                  }`}
                  onClick={() => router.push("/goals")}
                >
                  <GiftIcon className="menuIcon" />
                  GOALS
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`mobileMenuLink ${
                    active && "mobileMenuLinkActive"
                  }`}
                  onClick={signOut}
                >
                  <LogoutIcon className="menuIcon" />
                  SIGNOUT
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
}

export default MobileMenu;
