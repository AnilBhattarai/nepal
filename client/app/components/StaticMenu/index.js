/**
 *
 * StaticMenu
 *
 */

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
class StaticMenu extends React.Component {
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

  // shouldComponentUpdate(nextProps, nextState) {
  //   // TODO
  //   if (this.props.menuKey !== 'main-menu') return true;
  //   if (this.firstMount) {
  //     this.firstMount = false;
  //     return true;
  //   }
  //   return nextProps.location.pathname !== this.props.location.pathname;
  // }

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
      <div className="inline-flex menu-container">
        {data.map((each, index) => {
          if (each.is_internal) {
            return (
              <div
                key={index}
                className={`${pathname == each.url ? 'active' : ''} ${
                  each.child_menu && each.child_menu.length > 0
                    ? 'haschild'
                    : ''
                } text-sm uppercase px-6 py-2 font-bold text-secondary cursor-pointer`}
              >
                {each.child_menu && each.child_menu.length > 0 ? (
                  <Link className="inline-flex" to="#">
                    {each.title}
                    <i className="material-icons">arrow_drop_down</i>
                  </Link>
                ) : (
                  <Link className="inline-flex" to={each.url}>
                    {each.title}
                  </Link>
                )}

                {each.child_menu && each.child_menu.length > 0 && (
                  <ul className="relative menu-child text-sm">
                    {this.getChildElement(each, 1)}
                  </ul>
                )}
              </div>
            );
          }
          return (
            <div key={index}>
              <a
                className="text-sm uppercase px-6 py-1 font-bold text-secondary cursor-pointer"
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
)(StaticMenu);
