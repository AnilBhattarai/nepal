import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  makeSelectContent,
  // makeSelectContentLoading,
  makeSelectUserIsAdmin,
} from '../../containers/App/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from '../../containers/App/reducer';
import saga from '../../containers/App/saga';
import { loadContentRequest } from '../../containers/App/actions';
// import Loading from '../Loading';
import { IMAGE_BASE } from '../../containers/App/constants';
import './style.css';

/* eslint-disable react/no-danger */
class StaticContent extends React.PureComponent {
  static propTypes = {
    contentKey: PropTypes.string.isRequired,
    loadContent: PropTypes.func.isRequired,
    contentObj: PropTypes.object.isRequired,
    // loading: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    if (this.props.contentObj[this.props.contentKey]) {
      return;
    }
    this.props.loadContent(this.props.contentKey);
    window.scrollTo(0, 0);
  }

  shouldComponentUpdate(props) {
    return true;
  }

  componentDidUpdate(props, state) {
    if (props.contentKey != this.props.contentKey) {
      this.props.loadContent(this.props.contentKey);
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { contentObj, is_Admin } = this.props;

    const key = this.props.contentKey;

    const camelCaseKey =
      key[0].toUpperCase() +
      key
        .slice(1)
        .split('-')
        .join(' ');

    const isPage =
      contentObj &&
      contentObj.isPage &&
      contentObj.isPage[this.props.contentKey];

    if (!contentObj[this.props.contentKey]) return null; // maybe add a loader here
    return (
      <div className="relative">
        {/* should be super admin */}
        {is_Admin &&
          contentObj &&
          contentObj.ids &&
          contentObj.ids[this.props.contentKey] &&
          (contentObj &&
          contentObj.isPage &&
          contentObj.isPage[this.props.contentKey] === false ? (
            <Link
              className="absolute ml-1 mt-1 bg-white shadow rounded-sm w-6 h-6 inline-flex items-center justify-center text-black cursor-pointer"
              to={`/admin/content-manage/edit/${
                contentObj.ids[this.props.contentKey]
              }`}
              target="_blank"
            >
              <button>
                <i className="material-icons text-xl hover:text-indigo-700">edit</i>
              </button>
            </Link>
          ) : (
            <Link
              className="absolute ml-1 mt-1 bg-white shadow rounded-sm w-6 h-6 inline-flex items-center justify-center text-black cursor-pointer"
              to={`/admin/page-manage/edit/${
                contentObj.ids[this.props.contentKey]
              }`}
              target="_blank"
            >
              <button>
                {' '}
                <i className="material-icons text-xl hover:text-indigo-700">edit</i>
              </button>
            </Link>
          ))}
        {contentObj &&
          contentObj.image &&
          contentObj.image[this.props.contentKey] &&
          contentObj.image[this.props.contentKey].path && (
            <div className="relative featuredimg mb-4 md:mb-8 lg:mb-16">
              <img
                src={`${IMAGE_BASE}${
                  contentObj.image[this.props.contentKey].path
                }`}
              />
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl innertitle text-white container mx-auto absolute">
                {camelCaseKey}
              </h2>
            </div>
          )}

        <div
          // className="ckEditor"
          // className={`staticCont ${isPage ? 'lg:w-3/4 lg:pr-16' : 'w-full'}`}
          dangerouslySetInnerHTML={{
            __html: contentObj[this.props.contentKey],
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  contentObj: makeSelectContent(),
  // loading: makeSelectContentLoading(),
  is_Admin: makeSelectUserIsAdmin(),
});

const mapDispatchToProps = dispatch => ({
  loadContent: payload => dispatch(loadContentRequest(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'global', reducer });
const withSaga = injectSaga({ key: 'global', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
)(StaticContent);
