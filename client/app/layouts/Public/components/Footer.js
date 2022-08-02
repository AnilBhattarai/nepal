// import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import fb from '../../../assets/img/facebook.svg';
import instagram from '../../../assets/img/instagram.svg';
import logo from '../../../assets/img/logo-white.png';
import tw from '../../../assets/img/twitter.svg';
import StaticContentDiv from '../../../components/StaticContentDiv';
import FooterMenu from '../../../components/StaticMenu/footermenu';
import FooterMenuList from '../../../components/StaticMenu/footermenubig';

const styles = {};
class Footer extends React.Component {
  state = { email: '' };

  handleSave = e => {
    e.preventDefault();
    this.props.loadSubscribeRequest();
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { email } = this.state;

    return (
      <>
        <div className="bg-blue-50 py-20">
          <div className="container mx-auto">
            <FooterMenuList menuKey="locations" />
          </div>
        </div>
        <div className="text-white bg-secondary">
          <footer className="container mx-auto">
            <div className="md:grid grid-cols-2 lg:grid-cols-4 pt-10 gap-4">
              <div>
                <img className="h-6" src={logo} alt="NepalHomes.com" />
                <StaticContentDiv contentKey="footer-contact" />
              </div>
              <div className="col-span-2 pt-10">
                <FooterMenu menuKey="footer-menu" />
              </div>
              <div className="pt-10">
                <h3 className="font-bold text-white text-center lg:text-left">
                  Follow us:
                </h3>
                <br />
                <div className="flex flex-wrap items-center">
                  <a
                    className="w-1/3 lg:w-auto lg:block py-4 lg:py-0 text-right"
                    href="https://www.facebook.com/NepalhomesNP/"
                    target="_blank"
                  >
                    <img
                      className="inline-block rounded mx-2 h-6 opacity-50 hover:opacity-100"
                      src={fb}
                      alt="social"
                    />
                  </a>
                  <a
                    className="w-1/3 lg:w-auto lg:block py-4 lg:py-0 text-center"
                    href="https://www.instagram.com/nepalhomes/"
                    target="_blank"
                  >
                    <img
                      className="inline-block rounded mx-2 h-6 opacity-50 hover:opacity-100"
                      src={instagram}
                      alt="social"
                    />
                  </a>
                  <a
                    className="w-1/3 lg:w-auto lg:block py-4 lg:py-0"
                    href="https://twitter.com/nepalhomes"
                    target="_blank"
                  >
                    <img
                      className="inline-block rounded mx-2 h-6 opacity-50 hover:opacity-100"
                      src={tw}
                      alt="social"
                    />
                  </a>
                </div>
              </div>
            </div>

            <StaticContentDiv contentKey="footer-disclaimer" />
          </footer>
        </div>
      </>
    );
  }
}

Footer.propTypes = {};

const withStyle = withStyles(styles);

export default compose(
  withRouter,
  withStyle,
)(Footer);
