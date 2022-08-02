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
class FooterMenu extends React.Component {
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
        let footnavclass =
          'text-xs font-bold leading-loose inline-block hover:underline text-white';
        // if (index === 0) footnavclass = 'relative';
        childContent.push(
          <li className="w-full" key={index}>
            {childElement.is_internal ? (
              <>
                <Link
                  key={index}
                  className={footnavclass}
                  to={childElement.url}
                >
                  {childElement.title}
                </Link>
              </>
            ) : (
              <a
                className=""
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
      <div className="flex menu-footer">
        {data.map((each, index) => {
          if (each.is_internal) {
            return (
              <div
                className="flex-1 mb-6 pl-5 lg:pl-20"
                key={index}
                // onClick={() => push(each.url)}
              >
                {/* <h3 className="text-gray-200 pb-2 text-xl">
                  {each.title}
                </h3> */}
                {each.child_menu && each.child_menu.length > 0 && (
                  <ul className="flex flex-wrap">
                    {this.getChildElement(each, 1)}
                  </ul>
                )}
              </div>
            );
          }
          return (
            <div key={index}>
              <a className="" href={each.url} target={each.target}>
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
)(FooterMenu);
