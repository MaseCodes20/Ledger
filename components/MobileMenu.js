"use client"

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { CreditCardIcon, CurrencyDollarIcon, GiftIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { Bars3Icon } from "@heroicons/react/24/outline"

function MobileMenu({ session }) {
  const router = useRouter();

  const { image, name } = session.user;
  return (
    <div className="flex justify-between items-center sticky top-0 h-10 z-10 w-full bg-[#151426] lg:hidden">
      <div className="ml-4 flex justify-between items-center w-full">
        <div>
          <h1 className="text-xl">LedgerMe</h1>
        </div>

        <div className="flex items-center mr-4">
          <img
            src={image}
            alt="profile pic"
            className="rounded-full h-7 cursor-pointer"
            onClick={() => router.push("/")}
          />
          <h1 className="ml-3">{name}</h1>
        </div>
      </div>
      <Menu as="div" className="mr-4">
        <MenuButton
          className="menuButton"
          name="menu button"
          aria-label="menu button"
        >
          <Bars3Icon className="h-7 lg:hidden hover:text-pink-500" />
        </MenuButton>

        <MenuItems className="menuItemsContainer">
          <div className="rounded-md">
            <MenuItem>
              {({ active }) => (
                <a
                  className={`mobileMenuLink menuItemsBorder ${
                    active && "mobileMenuLinkActive rounded-t-md"
                  }`}
                  onClick={() => router.push("/")}
                >
                  <HomeIcon className="menuIcon" />
                  HOME
                </a>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <a
                  className={`mobileMenuLink menuItemsBorder ${
                    active && "mobileMenuLinkActive"
                  }`}
                  onClick={() => router.push("/income")}
                >
                  <CurrencyDollarIcon className="menuIcon" />
                  INCOME
                </a>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <a
                  className={`mobileMenuLink menuItemsBorder ${
                    active && "mobileMenuLinkActive"
                  }`}
                  onClick={() => router.push("/expense")}
                >
                  <CreditCardIcon className="menuIcon" />
                  EXPENSE
                </a>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <a
                  className={`mobileMenuLink menuItemsBorder ${
                    active && "mobileMenuLinkActive"
                  }`}
                  onClick={() => router.push("/investments")}
                >
                  <GiftIcon className="menuIcon" />
                  INVESTMENTS
                </a>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <a
                  className={`mobileMenuLink menuItemsBorder ${
                    active && "mobileMenuLinkActive"
                  }`}
                  onClick={() => router.push("/goals")}
                >
                  <GiftIcon className="menuIcon" />
                  GOALS
                </a>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <a
                  className={`mobileMenuLink ${
                    active && "mobileMenuLinkActive"
                  }`}
                  onClick={signOut}
                >
                  <LockClosedIcon className="menuIcon" />
                  SIGNOUT
                </a>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}

export default MobileMenu;
