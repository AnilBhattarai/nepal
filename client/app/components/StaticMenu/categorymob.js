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
import { IMAGE_BASE } from '../../containers/App/constants';
import tempImage from '../../assets/img/No_Image_Available.jpg';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import './style.css';
import useWindowDimensions from '../../utils/windowDimensions';
/* eslint-disable react/prefer-stateless-function */
class CategoryMob extends React.Component {
  static propTypes = {
    menuKey: PropTypes.string.isRequired,
    loadMenuRequest: PropTypes.func.isRequired,
    menuObj: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: '',
      pathName: '',
      show: false,
      showMenu: {},
      innerMenu: {},
    };
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
    this.setState({ show: true });
    const tempMenu = this.getChildElement(value);
    this.setState({ showMenu: tempMenu });
    const tempInner = this.getInnerElement(tempMenu[0]);
    this.setState({ innerMenu: tempInner });
  };

  getChildElement = (parentObj, depth) => {
    const childContent = [];
    if (parentObj.child_menu.length) {
      parentObj.child_menu.map((childElement, index) => {
        childContent.push(childElement);
      });
      return childContent;
    }
  };

  handleInnerToggle = value => {
    const tempMenu = this.getChildElement(value);
    this.setState({ innerMenu: tempMenu });
  };

  getInnerElement = (parentObj, depth) => {
    const childContent = [];
    if (parentObj.child_menu.length) {
      parentObj.child_menu.map((childElement, index) => {
        childContent.push(childElement);
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
    // const { width } = useWindowDimensions();

    if (!data) return null;
    return (
      <div className="w-full flex flex-wrap">
        <div className="w-full">
          <div className="flex flex-wrap">
            {!this.state.show &&
              data[0].child_menu.map((each, index) => {
                if (each.is_internal) {
                  return (
                    <div
                      key={index}
                      className={`${
                        pathname == each.url
                          ? 'active'
                          : 'w-1/3 md:w-1/4 lg:w-1/5 mb-2 md:mb-4 cursor-pointer'
                      } `}
                      onClick={
                        each.child_menu && each.child_menu.length > 0
                          ? () => this.handleToggle(each)
                          : () => push(each.url)
                      }
                    >
                      <div className="flex flex-col text-center m-1">
                        <img
                          className="m-auto w-16 h-16 object-contain"
                          src={
                            each.image
                              ? `${IMAGE_BASE}${each.image.path}`
                              : tempImage
                          }
                        />{' '}
                        <span className="text-xs sm:text-sm">{each.title}</span>
                      </div>

                      {/* {each.child_menu &&
                      each.child_menu.length > 0 &&
                      this.show && (
                        // each.child_menu[0]._id !== '' &&
                        <div className="">{this.getChildElement(each, 1)}</div>
                      )} */}
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
        </div>
        <div>
        {this.state.show && (
            <button
              className="inline-block"
              onClick={() => this.setState({ show: false, innerMenu: {} })}
            >
                <ArrowBackIcon/>
            </button>
          )}
          <div className="flex">
        <div className="w-24 sm:w-36 md:w-40 mr-2 sm:mr-4 bg-gray-100">
          {this.state.show &&
            this.state.showMenu !== undefined &&
            this.state.showMenu.length > 0 &&
            this.state.showMenu.map((each, index) => {
              if (each.is_internal) {
                return (
                  <div
                    key={index}
                    className={`${pathname == each.url ? 'active' : 'py-1 px-2'} `}
                    onClick={
                      each.child_menu && each.child_menu.length > 0
                        ? () => this.handleInnerToggle(each)
                        : () => push(each.url)
                    }
                  >
                    <span>{each.title}</span>

                    {/* {each.child_menu &&
                      each.child_menu.length > 0 &&
                      this.show && (
                        // each.child_menu[0]._id !== '' &&
                        <div className="">{this.getChildElement(each, 1)}</div>
                      )} */}
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
        <div className="flex-1 flex flex-wrap">
          {this.state.show &&
            this.state.innerMenu !== undefined &&
            this.state.innerMenu.length > 0 &&
            this.state.innerMenu.map((each, index) => {
              if (each.is_internal) {
                return (
                  <div
                    key={index}
                    className={`${pathname == each.url ? 'active' : 'w-1/2 md:w-1/3 lg:w-1/5 mb-2 md:mb-4 cursor-pointer'} `}
                    onClick={
                      each.child_menu && each.child_menu.length > 0
                        ? () => this.handleInnerToggle(each)
                        : () => push(each.url)
                    }
                  >
                    <span>{each.title}</span>

                    {/* {each.child_menu &&
                      each.child_menu.length > 0 &&
                      this.show && (
                        // each.child_menu[0]._id !== '' &&
                        <div className="">{this.getChildElement(each, 1)}</div>
                      )} */}
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
      </div>
      </div>
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
)(CategoryMob);
