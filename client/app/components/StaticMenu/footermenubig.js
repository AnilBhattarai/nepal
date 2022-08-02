/**
 *
 * StaticMenu
 *
 */

import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
// import { loadMenuRequest } from '../../containers/App/actions';
import * as mapDispatchToProps from '../../containers/App/actions';
import { makeSelectMenu } from '../../containers/App/selectors';
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
        childContent.push(
          <span className="inline-block" key={index}>
            {childElement.is_internal ? (
              <>
                <Link
                  key={index}
                  className="font-bold text-xs pr-5 mb-2 inline-block text-gray-500 hover:text-primary"
                  to={childElement.url}
                >
                  {childElement.title}
                </Link>
              </>
            ) : (
              <a
                className="font-bold text-xs pr-5 mb-2 inline-block text-gray-500 hover:text-primary"
                href={childElement.url}
                target={childElement.target}
              >
                {childElement.title}
              </a>
            )}
          </span>,
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
      <div>
        <h3 className="pb-2 text-2xl font-bold text-primary">Area Trending</h3>
        {data.map((each, index) => {
          if (each.is_internal) {
            return (
              <div
                className="inline-flex flex-wrap"
                key={index}
                // onClick={() => push(each.url)}
              >
                {each.child_menu && each.child_menu.length > 0 && (
                  <>{this.getChildElement(each, 1)}</>
                )}
              </div>
            );
          }
          return (
            <div key={index}>
              <a
                className="hover:text-secondary no-underline"
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
)(FooterMenu);
