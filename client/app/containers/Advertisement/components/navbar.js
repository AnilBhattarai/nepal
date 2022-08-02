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
    <div className="bg-blue-400">
      <div className="container mx-auto">
        <nav
          id="navbar"
        >
          <div className="w-full overflow-auto">
            <ul className="flex mx-0 py-1">
              <li className="px-4 py-2 text-white ease-in-out cursor-pointer whitespace-no-wrap">
                <Link
                  activeClass="active"
                  to="agent"
                  spy={true}
                  smooth={true}
                  offset={-50}
                  duration={500}
                >
                  Packages for Agents
      </Link>
              </li>
              <li className="px-4 py-2 text-white ease-in-out cursor-pointer whitespace-no-wrap">
                <Link
                  activeClass="active"
                  to="developer"
                  spy={true}
                  smooth={true}
                  offset={-50}
                  duration={500}
                >
                  Packages for Developers
      </Link>
              </li>
              <li className="px-4 py-2 text-white ease-in-out cursor-pointer whitespace-no-wrap">
                <Link
                  activeClass="active"
                  to="seller"
                  spy={true}
                  smooth={true}
                  offset={-50}
                  duration={500}
                >
                  Packages for Private Sellers
      </Link>
              </li>
              <li className="px-4 py-2 text-white ease-in-out cursor-pointer whitespace-no-wrap">
                <Link
                  activeClass="active"
                  to="banner"
                  spy={true}
                  smooth={true}
                  offset={-50}
                  duration={500}
                >
                  Banner Advertisement
      </Link>
              </li>
            </ul>
          </div>
        </nav>


        <ul>
          <li>

          </li>

        </ul>

      </div>


    </div>

  );
};

export default NavBar;
