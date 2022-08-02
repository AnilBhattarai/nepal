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
      className="bg-white border mt-4 z-50 shadow-lg hidden lg:block"
      style={{ position: 'sticky', top: 0 }}
      id="navbar"
    >
      <div className="nav-content">
        <ul className="flex mx-0 justify-around">
          <li className="py-px uppercase flex-1 font-bold ease-in-out cursor-pointer">
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
          <li className="py-px uppercase flex-1 font-bold hover:text-secondary ease-in-out cursor-pointer">
            <Link
              activeClass="active"
              to="description"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              Description
            </Link>
          </li>
          <li className="py-px uppercase flex-1 font-bold hover:text-secondary ease-in-out cursor-pointer">
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

          <li className="py-px uppercase flex-1 font-bold hover:text-secondary ease-in-out cursor-pointer">
            <Link
              activeClass="active"
              to="amenities"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              Amenities
            </Link>
          </li>
          <li className="py-px uppercase flex-1 font-bold hover:text-secondary ease-in-out cursor-pointer">
            <Link
              activeClass="active"
              to="comments"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              Comments
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
