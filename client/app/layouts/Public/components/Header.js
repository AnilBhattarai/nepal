import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Button, Grid, Menu, MenuItem } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectToken,
  makeSelectUser,
  makeSelectLocation,
} from '../../../containers/App/selectors';
import { logoutRequest } from '../../../containers/App/actions';
import logo from '../../../assets/img/logo.svg';
import userimg from '../../../assets/img/user.svg';
import logowhite from '../../../assets/img/logo-white.svg';
import style from './header.css';
import StaticContentDiv from '../../../components/StaticContentDiv';
import StaticMenu from '../../../components/StaticMenu';
import Drawer from '@material-ui/core/Drawer';
import mobile from '../../../assets/img/mobile.png';
import arrowBlue from '../../../assets/img/arrow_down_blue.svg';
import arrowWhite from '../../../assets/img/arrow_down_white.svg';
import news from '../../../assets/img/news.png';
import CategoryList from '../../../containers/Blog/components/CategoryList';

const styles = theme => ({});

const headerStickyLocations = [
  '/home-loan',
  '/forum',
  '/advertise',
  '/contact',
  '/unit-converter',
];

const newsPage = 'news';

const notsticky = ['project', 'detail'];

const Header = props => {
  const {
    classes,
    token,
    user,
    logoutRequest: logout,
    location,
    match,
  } = props;
  const [checked, setChecked, ticked, setTicked] = useState('');

  const handleToggle = () => {
    checked === '' ? setChecked('checked') : setChecked('');
  };

  const handleDrawer = () => {
    checked === '' ? setTicked('checked') : setTicked('');
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    // handleToggle();
    setAnchorEl(null);
    // scrollToTop();
  };
  const handleLogout = () => {
    handleClose();
    logout();
  };

  const isHomepage = headerStickyLocations.includes(location.pathname);
  const isNewsPage = location.pathname.includes('/news');
  const isNotSticky = notsticky.includes(location.pathname.split('/')[1]);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const [state, setState] = React.useState({
    right: false,
    right2: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const toggleDrawerMain = (side, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  // const sideList = side => (
  //   <div
  //     role="presentation"
  //     onClick={toggleDrawer(side, false)}
  //     onKeyDown={toggleDrawer(side, false)}
  //   >
  //     Drawer
  //   </div>
  // );

  return (
    <header className="h-12 lg:h-24 border-b">
      <div
        className={`${
          isNewsPage ? 'justify-start' : 'justify-between'
        } container mx-auto flex items-center h-full flex-wrap relative`}
      >
        <div className="flex items-center h-full mr-4">
          <Link to="/" onClick={scrollToTop}>
            <img
              className="max-width-none h-6 lg:h-8"
              src={logo}
              alt="NepalHomes.com"
            />
          </Link>
        </div>

        {isNewsPage ? (
          <div className="flex h-full justify-between">
            <Link
              to="/news"
              className="border-l border-r border-gray-300 inline-flex items-center md:mr-6"
            >
              <img className="h-4 mx-4" src={news} />
            </Link>
            <div className="hidden md:block flex-1">
              <CategoryList />
            </div>
          </div>
        ) : (
          <>
            <div className="lg:hidden">
              <span
                onClick={toggleDrawerMain('right2', true)}
                className="absolute right-0 top-0 cursor-pointer inline-flex p-4"
              >
                <svg
                  className="hamburgerMain"
                  width="22px"
                  height="14px"
                  viewBox="0 0 22 14"
                >
                  <polygon
                    fill="#2c357d"
                    id="Line"
                    points="0.476190476 2 0.476190476 0 21.5238095 0 21.5238095 2"
                  />
                  <polygon
                    fill="#2c357d"
                    id="Line-Copy"
                    points="0.476190476 8 0.476190476 6 21.5238095 6 21.5238095 8"
                  />
                  <polygon
                    fill="#2c357d"
                    id="Line-Copy-2"
                    points="0.476190476 14 0.476190476 12 21.5238095 12 21.5238095 14"
                  />
                </svg>
              </span>
              <Drawer
                anchor="right"
                open={state.right2}
                onClose={toggleDrawerMain('right2', false)}
              >
                <div className="px-2 pt-20 relative bg-gray-100 h-full">
                  <span
                    className="absolute right-0 top-0 mr-5 mt-5 inline-block cursor-pointer"
                    onClick={toggleDrawerMain('right2', false)}
                  >
                    <i className="material-icons" style={{ fontSize: 32 }}>
                      close
                    </i>
                  </span>
                  <div className="mobile-view header-menu">
                    <StaticMenu menuKey="header" />
                  </div>
                  <NavLink
                    to="/user/property/add"
                    className="text-sm uppercase px-6 py-1 font-bold text-secondary cursor-pointer"
                    onClick={toggleDrawerMain('right2', false)}
                  >
                    Post Properties
                  </NavLink>
                </div>
              </Drawer>
            </div>

            <nav className="hidden lg:flex items-center">
              <StaticMenu menuKey="header" />
              <NavLink
                to="/user/property/add"
                className="bg-primary rounded p-2 inline-block text-white text-sm ml-10"
              >
                Post Properties
              </NavLink>

              {!token ? (
                <NavLink
                  to="/signup-user"
                  className="bg-secondary bg-opacity-20 rounded-full w-8 h-8 inline-flex items-center justify-center ml-10"
                >
                  <i className="material-icons text-secondary">
                    account_circle
                  </i>
                </NavLink>
              ) : (
                <>
                  <button
                    className="bg-secondary bg-opacity-20 rounded-full w-8 h-8 inline-flex items-center justify-center ml-10"
                    onClick={handleMenu}
                  >
                    <i className="material-icons text-secondary">
                      account_circle
                    </i>
                    {/* <span
                          style={{ maxWidth: '10rem' }}
                          className={`capitalize font-bold truncate ${isHomepage ? 'text-white' : 'text-primary'
                            }`}
                        >
                          {user.name}
                        </span> */}
                  </button>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    {user.isAdmin && (
                      <Link
                        className="w-64 flex items-center text-gray-700 text-sm block px-4 py-2 hover:bg-secondary hover:text-white"
                        to="/admin/dashboard"
                        onClick={handleClose}
                      >
                        <i className="material-icons mr-2 text-base">
                          dashboard
                        </i>
                        Admin Dashboard
                      </Link>
                    )}
                    <Link
                      className="w-64 flex items-center text-gray-700 text-sm block px-4 py-2 hover:bg-secondary hover:text-white"
                      to="/user/profile/dashboard"
                      onClick={handleClose}
                    >
                      <i className="material-icons mr-2 text-base">explore</i>
                      Dashboard
                    </Link>
                    <Link
                      className="w-64 flex items-center text-gray-700 text-sm block px-4 py-2 hover:bg-secondary hover:text-white"
                      to="/user/profile/information"
                      onClick={handleClose}
                    >
                      <i className="material-icons mr-2 text-base">tag_faces</i>
                      My Profile
                    </Link>

                    <Link
                      className="w-64 flex items-center text-gray-700 text-sm block px-4 py-2 border-t hover:bg-secondary hover:text-white"
                      to="/user/member/agent"
                      onClick={handleClose}
                    >
                      <i className="material-icons mr-2 text-base">
                        {' '}
                        person_pin
                      </i>
                      Agent
                    </Link>
                    <Link
                      className="w-64 flex items-center text-gray-700 text-sm block px-4 py-2 hover:bg-secondary hover:text-white flex items-center"
                      to="/user/member/developer"
                      onClick={handleClose}
                    >
                      <i className="material-icons mr-2 text-base">work</i>
                      Developer
                    </Link>

                    <Link
                      className="w-64 flex items-center text-gray-700 text-sm block px-4 py-2 border-t hover:bg-secondary hover:text-white"
                      to="/user/property"
                      onClick={handleClose}
                    >
                      <i className="material-icons mr-2 text-base">home</i>
                      My Properties
                    </Link>
                    <Link
                      className="w-64 flex items-center text-gray-700 text-sm block px-4 py-2 hover:bg-secondary hover:text-white"
                      to="/user/project"
                      onClick={handleClose}
                    >
                      <i className="material-icons mr-2 text-base">business</i>
                      My Projects
                    </Link>
                    <Link
                      className="w-64 flex items-center text-gray-700 text-sm block px-4 py-2 hover:bg-secondary hover:text-white"
                      to="/user/favorites"
                      onClick={handleClose}
                    >
                      <i className="material-icons mr-2 text-base">favorite</i>
                      My Favorites
                    </Link>
                    {/* <Link className="w-64 flex items-center text-gray-700 text-sm block px-4 py-2 hover:bg-secondary hover:text-white"
                      to="/user/request"
                      onClick={handleClose}
                    ><i className="material-icons mr-2 text-base">live_help</i>
                      What I Want?
        </Link> */}
                    <Link
                      className="w-64 flex items-center text-gray-700 text-sm block px-4 py-2 border-t hover:bg-secondary hover:text-white"
                      to="/user/profile/change-password"
                      onClick={handleClose}
                    >
                      <i className="material-icons mr-2 text-base">lock</i>
                      Change Password
                    </Link>
                    <span
                      className="w-64 flex items-center text-gray-700 text-sm block px-4 py-2 cursor-pointer hover:bg-red-600 hover:text-white"
                      onClick={handleLogout}
                    >
                      <i className="material-icons mr-2 text-base">
                        exit_to_app
                      </i>
                      Log Out
                    </span>
                  </Menu>
                </>
              )}
            </nav>
          </>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
  logoutRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  token: makeSelectToken(),
  user: makeSelectUser(),
  location: makeSelectLocation(),
});

const withConnect = connect(
  mapStateToProps,
  { push, logoutRequest },
);

const withStyle = withStyles(styles);

export default compose(
  withConnect,
  withStyle,
)(Header);
