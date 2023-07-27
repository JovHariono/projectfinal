import Link from 'next/link';
import * as React from 'react';
import { slide as Menu } from "react-burger-menu";

interface ISideBarProps {
}

const SideBar: React.FunctionComponent<ISideBarProps> = (props) => {
  return (
    <Menu>
          <Link
            id="home"
            className="menu-item"
            href=""
          >
            Home
          </Link>
          <Link id="about" className="menu-item" href="">
            About Us
          </Link>
        </Menu>
  );
};

export default SideBar;
