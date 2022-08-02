import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import TablePagination from '@material-ui/core/TablePagination';
import style from './table.css';
import Loader from '../../assets/img/loading_transparent.gif';

// core components

/* eslint-disable react/no-array-index-key */
function CustomTable({ ...props }) {
  const {
    classes,
    tableHead,
    tableData,
    tableHeaderColor,
    pagination,
    handlePagination,
    activeData,
    inactiveData,
    unverifiedData,
    verifiedData,
    publishedData,
    unPublishedData,
    loading,
    emptyDataMsg,
  } = props;
  return (
    <div>
      <table className="w-full text-left table table-auto">
        {tableHead !== undefined ? (
          <thead>
            <tr>
              {tableHead.map((prop, key) => (
                <th
                  className="p-2 font-bold text-sm text-gray-800 border-b border-gray-300"
                  key={key}
                >
                  {prop}
                </th>
              ))}
            </tr>
          </thead>
        ) : null}
        <tbody>
          {!loading && tableData.length > 0 &&
            tableData.map((prop, key) => (
              <tr
                key={key}
                className={`
              ${
                  inactiveData &&
                    inactiveData.length > 0 &&
                    inactiveData[key][0] === false
                    ? 'opacity-50'
                    : ''
                  }

              ${
                  unverifiedData &&
                    unverifiedData.length > 0 &&
                    unverifiedData[key][0] === true
                    ? 'bg-yellow-100'
                    : ''
                  }

                ${
                  verifiedData &&
                    verifiedData.length > 0 &&
                    verifiedData[key][0] === true
                    ? 'bg-green-100'
                    : ''
                  }

              `}
              >
                {prop.map((each, index) => (
                  <td
                    className="p-2 text-sm border-gray-300 text-gray-800"
                    key={index}
                  >
                    {each}
                  </td>
                ))}
              </tr>
            ))}

          {loading && (
            <>
              <tr>
                <td colSpan={tableHead.length} className="h-10 border-b text-white">.</td>
              </tr>
              <tr>
                <td colSpan={tableHead.length} className="h-10 border-b text-white">.</td>
              </tr>
              <tr>
                <td colSpan={tableHead.length} className="h-10 border-b text-white">.</td>
              </tr>
              <tr>
                <td colSpan={tableHead.length} className="h-10 border-b text-white">.</td>
              </tr>
              <tr>
                <td colSpan={tableHead.length} className="h-10 border-b text-white">.</td>
              </tr>
              <tr>
                <td colSpan={tableHead.length} className="h-10 border-b text-white">.</td>
              </tr>
              <tr>
                <td colSpan={tableHead.length} className="h-10 border-b text-white">.</td>
              </tr>
              <tr>
                <td colSpan={tableHead.length} className="h-10 border-b text-white">.</td>
              </tr>
              <tr>
                <td colSpan={tableHead.length} className="h-10 border-b text-white">.</td>
              </tr>
              <tr>
                <td colSpan={tableHead.length} className="h-10 border-b text-white">.</td>
              </tr>
            </>
          )}

          {tableData.length < 1 && loading === false && (
            <p className="px-2 py-1 text-sm border-gray-300 text-gray-800 ">
              {emptyDataMsg || 'No Data Found'}
            </p>
          )}
        </tbody>
      </table>
      <table className="w-full">
        <tbody>
          <tr>
            {pagination && handlePagination && (
              <TablePagination
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  width: '100%',
                }}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                colSpan={3}
                count={pagination.totaldata}
                rowsPerPage={pagination.size}
                page={pagination.page - 1}
                backIconButtonProps={{
                  'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next Page',
                }}
                onChangePage={(e, page) =>
                  handlePagination({ ...pagination, page: page + 1 })
                }
                onChangeRowsPerPage={e =>
                  handlePagination({ ...pagination, size: e.target.value })
                }
              />
            )}
          </tr>
        </tbody>
      </table>{' '}
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: 'gray',
  handlePagination: () =>
    console.log('todo: make handlePagination function!!!'),
};

CustomTable.propTypes = {
  classes: PropTypes.object,
  tableHeaderColor: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray',
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.node])),
  ),
  pagination: PropTypes.shape({
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    totaldata: PropTypes.number.isRequired,
  }),
  handlePagination: PropTypes.func,
};

export default CustomTable;
