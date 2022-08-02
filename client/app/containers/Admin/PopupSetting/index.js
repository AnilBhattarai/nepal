import Table from 'components/Table/Table';
import { push } from 'connected-react-router';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import DeleteDialog from '../../../components/DeleteDialog';
import Loading from '../../../components/Loading';
import PageContent from '../../../components/PageContent/PageContent';
import PageHeader from '../../../components/PageHeader/PageHeader';
import injectReducer from '../../../utils/injectReducer';
import injectSaga from '../../../utils/injectSaga';
import { DATE_FORMAT } from '../../App/constants';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectAll,
  makeSelectLoading,
  makeSelectQuery,
  makeSelectChosenPopup,
} from './selectors';

/* eslint-disable react/prefer-stateless-function */
const PopupSetting = props => {
  const {
    loadAllRequest,
    query,
    location: { search },
    setQueryObj,
    classes,
    all: { data, page, size, totalData },
    loading,
    clearOne,
    push,
    setQueryValue,
    chosen_popup,
    addChosenPopup,
    addAllChosenPopup,
    deleteMultiplePopupRequest,
    activeAllPopupRequest,
    clearChosenPopup,
  } = props;

  // const [state, setState] = useState({
  //   open: false,
  //   display: '',
  //   deleteId: '',
  // });

  const [open, setOpen] = useState(false);
  const [openMultiple, setMultipleOpen] = useState(false);
  const [deletedId, setDeletedId] = useState('');
  const [accessList, setAccessList] = useState([]);

  const [selectAll, setSelectedAll] = useState(false);

  const [isAd, setIsAd] = useState(false);

  useEffect(() => {
    if (isAd) {
      const tempQuery = { ...query, is_advertisement: true };
      loadAllRequest(tempQuery);
    } else {
      loadAllRequest(query);
    }
  }, [query.sort, query.size, query.page, isAd]);

  useEffect(() => {
    clearChosenPopup();
  }, []);

  useEffect(() => {
    if (window.location.pathname.includes('advertisement')) {
      setIsAd(true);
    }
  }, [window.location.pathname]);

  const handleAdd = () => {
    clearOne();
    if (isAd) {
      push('/admin/advertisement/add');
    } else {
      push('/admin/popup-setting/add');
    }
  };

  const handleEdit = id => {
    clearOne();
    if (isAd) {
      push(`/admin/advertisement/edit/${id}`);
    } else {
      push(`/admin/popup-setting/edit/${id}`);
    }
  };

  const handleQueryChange = name => e => {
    e.persist();
    setQueryValue({ key: name, value: e.target.value });
  };

  const handleSearch = e => {
    e.preventDefault();
    loadAllRequest(query);
  };

  const handlePagination = ({ page, size }) => {
    setQueryValue({ key: 'page', value: page });
    setQueryValue({ key: 'size', value: size });
  };

  const handleOpen = id => {
    // setState({ open: true, deleteId: id });
    setOpen(true);
    setDeletedId(id);
  };

  const handleOpenForMultiple = id => {
    setMultipleOpen(true);
    setDeletedId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = id => {
    deleteOneRequest(id);
    setOpen(false);
  };

  const handleCloseForMultiple = () => {
    setMultipleOpen(false);
  };

  const handleDeleteForMultiple = id => {
    deleteMultiplePopupRequest(id);
    setMultipleOpen(false);
  };

  const handleKeySearch = e => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  // const { display } = state;

  const tablePagination = { page, size, totalData };

  const allData = data.map(item => item._id);

  const tableData = data.map(
    ({
      title,
      key,
      images,
      added_at,
      _id,
      is_active,
      template,
      is_removal,
    }) => [
        title,
        key,
        template,
        moment(added_at).format(DATE_FORMAT),
        is_active ? 'Active' : 'Not Active',
        <>
          <div className="flex">
            <button
              type="button"
              aria-label="Edit"
              className="w-6 inline-flex justify-center items-center leading-none cursor-pointer relative"
              onClick={() => handleEdit(_id)}
            >
              <i className="material-icons text-base text-indigo-500 hover:text-indigo-700">
                edit
              </i>
            </button>

            {is_removal && (
              <button
                type="button"
                className="w-6 inline-flex justify-center items-center leading-none cursor-pointer relative"
                onClick={() => handleOpen(_id)}
              >
                <i className="material-icons text-base text-red-400 hover:text-red-600">
                  delete
                </i>
              </button>
            )}
          </div>
        </>,
      ],
  );

  return (
    <>
      <DeleteDialog
        open={open}
        doClose={handleClose}
        doDelete={() => handleDelete(deletedId)}
      />
      <DeleteDialog
        open={openMultiple}
        doClose={handleCloseForMultiple}
        doDelete={() => handleDeleteForMultiple(chosen_popup)}
      />
      <Helmet>
        <title>{isAd ? 'Advertisements' : 'PopUp Setting'}</title>
      </Helmet>
      <div className="flex justify-between mt-3 mb-3">
        {loading && loading == true ? <Loading /> : <></>}
        <PageHeader>{isAd ? 'Advertisements' : 'PopUp Setting'}</PageHeader>
        <div className="flex items-center">
          <button className="btn btn-waft" onClick={handleAdd}>
            <div className="flex items-center">
              <span className="pl-2"> Add New</span>
            </div>
          </button>
        </div>
      </div>

      <PageContent loading={loading}>
        <div className="bg-white p-2 border border-b-0">
          <div className="flex justify-between">
            <div>
              {chosen_popup.length > 0 ? (
                <>
                  <div className="flex items-center">
                    <button
                      className="btn btn-waft btn-red mr-2"
                      onClick={() => handleOpenForMultiple(chosen_popup)}
                    >
                      <div className="flex items-center">
                        <span className="pl-2"> Delete</span>
                      </div>
                    </button>

                    <button
                      className="btn btn-waft btn-blue"
                      onClick={() => handleActiveAll(chosen_popup)}
                    >
                      <div className="flex items-center">
                        <span className="pl-2"> Change Status</span>
                      </div>
                    </button>
                  </div>
                </>
              ) : null}
            </div>
            <div className="flex relative mr-2">
              <input
                type="text"
                name="find_slider_name"
                id="slider-name"
                placeholder={`Search ${isAd ? 'Advertisement' : 'Popup'}`}
                className="m-auto inputbox"
                value={query.find_slider_name}
                onKeyPress={handleKeySearch}
                onChange={handleQueryChange('find_title')}
              />
              <span
                className="bg-primary inline-flex absolute right-0 top-0 h-full px-2 items-center cursor-pointer text-white hover:bg-secondary"
                onClick={handleSearch}
              >
                Search
              </span>
            </div>
          </div>
        </div>

        <Table
          tableHead={[
            'Title',
            'Key',
            `${isAd ? 'Advertisement' : 'Popup'}  Templates`,
            'Published On',
            'Status',
            'Actions',
          ]}
          tableData={tableData}
          pagination={tablePagination}
          emptyDataMsg="No Data Found"
          loading={loading}
          handlePagination={handlePagination}
          ispublic
        />
      </PageContent>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  query: makeSelectQuery(),
  loading: makeSelectLoading(),
  chosen_popup: makeSelectChosenPopup(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withReducer = injectReducer({ key: 'popUpSettings', reducer });
const withSaga = injectSaga({ key: 'popUpSettings', saga });

export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(PopupSetting);
