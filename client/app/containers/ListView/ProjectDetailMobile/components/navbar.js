import React from 'react';
import {
  Link,
  Element,
  Events,
  animateScroll,
  scroll,
  scrollSpy,
  scroller,
} from 'react-scroll';

const NavBar = () => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };
  return (
    <nav
      className="bg-white rounded border border-gray-200 my-4 z-50"
      style={{ position: 'sticky', top: 0 }}
      id="navbar"
    >
      <div className="nav-content">
        <ul className="flex mx-0 shadow-lg py-1">
          <li className="px-2 py-1 text-primary font-bold ease-in-out cursor-pointer">
            <Link
              activeClass="active"
              to="overview"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              Overview
            </Link>
          </li>
          <li className="px-2 py-1 text-primary font-bold hover:text-secondary ease-in-out cursor-pointer">
            <Link
              activeClass="active"
              to="features"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              Features
            </Link>
          </li>
          <li className="px-2 py-1 text-primary font-bold hover:text-secondary ease-in-out cursor-pointer">
            <Link
              activeClass="active"
              to="map"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              Map
            </Link>
          </li>
          <li className="px-2 py-1 text-primary font-bold hover:text-secondary ease-in-out cursor-pointer">
            <Link
              activeClass="active"
              to="types"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              Property Types
            </Link>
          </li>
          <li className="px-2 py-1 text-primary font-bold hover:text-secondary ease-in-out cursor-pointer">
            <Link
              activeClass="active"
              to="floor"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              Floor Plans
            </Link>
          </li>
          <li className="px-2 py-1 text-primary font-bold hover:text-secondary ease-in-out cursor-pointer">
            <Link
              activeClass="active"
              to="developer"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              Developer
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
