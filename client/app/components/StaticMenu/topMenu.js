import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { compose } from 'redux';
import { makeSelectMenu } from '../../containers/App/selectors';
// import { loadMenuRequest } from '../../containers/App/actions';
import * as mapDispatchToProps from '../../containers/App/actions';

import './style.css';
/* eslint-disable react/prefer-stateless-function */
class topMenu extends React.Component {
  static propTypes = {
    menuKey: PropTypes.string.isRequired,
    loadMenuRequest: PropTypes.func.isRequired,
    menuObj: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { checked: '', pathName: '' };
    this.firstMount = true;
  }

  componentDidMount() {
    if (this.props.menuObj[this.props.menuKey]) {
      return;
    }
    this.props.loadMenuRequest(this.props.menuKey);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // TODO
    if (
      this.props.menuKey != 'main-menu' ||
      this.props.menuKey != 'top-menu' ||
      this.props.menuKey != 'footer-menu' ||
      this.props.menuKey != 'categories'
    )
      return true;
    if (this.firstMount) {
      this.firstMount = false;
      return true;
    }
    return nextProps.location.pathname !== this.props.location.pathname;
  }

  handleToggle = value => {
    // no use for this in this section
    // this.state.checked !== value
    //   ? this.setState({ checked: value })
    //   : this.setState({ checked: '' });
  };

  getChildElement = (parentObj, depth) => {
    const childContent = [];
    if (parentObj.child_menu.length) {
      parentObj.child_menu.map((childElement, index) => {
        childContent.push(
          <li key={index}>
            {childElement.is_internal ? (
              <>
                <Link
                  to={childElement.url}
                  // onClick={() => this.handleToggle(childElement._id)}
                >
                  {childElement.title}
                </Link>
                {childElement.child_menu && childElement.child_menu.length ? (
                  <ul className="absolute">
                    {this.getChildElement(childElement)}
                  </ul>
                ) : null}
              </>
            ) : (
              <a
                className="hidden md:block menu uppercase text-white text-center block no-underline py-2 hover:bg-primary md:text-black md:hover:bg-transparent md:hover:text-primary md:inline-block md:mr-5"
                href={childElement.url}
                target={childElement.target}
              >
                {childElement.title}
              </a>
            )}
          </li>,
        );
      });
      return childContent;
    }
  };

  render() {
    const {
      menuObj,
      push,
      location: { pathname },
    } = this.props;
    const data = menuObj[this.props.menuKey];
    if (!data) return null;
    return (
      <div className="block md:flex md:flex-wrap md:justify-end">
        {data.map((each, index) => {
          if (each.is_internal) {
            let navclass =
              'block w-full py-1 text-xs sm:text-sm relative my-auto md:py-0 md:w-auto topql md:ml-8 items-center hover:text-primary';
            if (index === 0)
              navclass =
                'block w-full text-xs sm:text-sm my-auto md:w-auto items-center hover:text-primary';
            if (index === data.length - 1)
              navclass =
                'block w-full text-xs sm:text-sm md:block relative topql my-auto md:w-auto md:ml-8 md:mr-8 items-center hover:text-primary';
            return (
              <NavLink key={index} to={each.url} className={navclass}>
                <span>{each.title}</span>
                {each.child_menu && each.child_menu.length > 0 && (
                  // each.child_menu[0]._id !== '' &&
                  <ul className="relative menu-child text-sm">
                    {this.getChildElement(each, 1)}
                  </ul>
                )}
              </NavLink>
            );
          }
          return (
            <div key={index}>
              <a
                className="text-xs sm:text-sm sm:block relative my-auto topql md:ml-8 items-center hover:text-primary"
                href={each.url}
                target={each.target}
              >
                {each.title}
              </a>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  menuObj: makeSelectMenu(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

export default compose(
  withConnect,
  withRouter,
)(topMenu);
