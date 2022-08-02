/**
 *
 * Bank
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link, scroll } from 'react-scroll';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from '../actions';
import { makeSelectBankName } from '../selectors';
import reducer from '../reducer';
import saga from '../saga';
import messages from '../messages';


const key = 'homeLoanForm';

export const Bank = props => {
  debugger;
  const { setBankName, bank } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => { }, []);

  //   const handleChange = name => event => {
  //     event.persist();
  //     setOneValue({ key: name, value: event.target.value });
  //   };

  //   const handleSave = () => {
  //     addEditRequest();
  //   };

  return (
    <div className="container mx-auto text-center">
      <div
        className="flex bg-gray-200 py-2 px-6 items-center justify-between"
        style={{ position: 'sticky' }}
      >

        <div className="w-64">{' '}</div>
        <div className="w-64">Bank Name</div>
        <div className="w-48">Interest Rate</div>
        <div className="w-48">Tenure</div>
        <div className="flex-1">Fees & Charges</div>
        <div className="w-64" />
      </div>

      <div className="flex justify-between px-4 items-center py-2 border-b">
        <div className="w-64">
          {/* <img className="h-10 mx-auto" src={bank1} /> */}
          Himalyan Bank
        </div>
        <div className="w-48">
          <span className="text-xl font-bold">5.5%</span>
        </div>
        <div className="w-48">
          <span className="font-bold">5-20 yrs</span>
        </div>
        <div className="flex-1">
          <p>Unscheduled payment: 1.5% of payment amount (conditions apply).</p>
        </div>
        <div className="w-64">
          <button className="text-secondary underline pr-4">
            Calculate EMI
          </button>
          <Link
            activeClass="active"
            to="form"
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
            onClick={() => setBankName('Himalayan Bank')}
          >
            <button className="bg-secondary text-white py-1 px-4 rounded">
              Apply Loan
            </button>
          </Link>
        </div>
      </div>

      <div className="flex justify-between px-4 items-center py-2 border-b">
        <div className="w-64">
          {/* <img className="h-10 mx-auto" src={bank2} /> */}
          Nabil Bank
        </div>
        <div className="w-48">
          <span className="text-xl font-bold">6.5%</span>
        </div>
        <div className="w-48">
          <span className="font-bold">5-20 yrs</span>
        </div>
        <div className="flex-1">
          <p>Unscheduled payment: 1.5% of payment amount (conditions apply).</p>
        </div>
        <div className="w-64">
          <button className="text-secondary underline pr-4">
            Calculate EMI
          </button>
          <button className="bg-secondary text-white py-1 px-4 rounded">
            Apply Loan
          </button>
        </div>
      </div>

      <div className="flex justify-between px-4 items-center py-2 border-b">
        <div className="w-64">
          {/* <img className="h-10 mx-auto" src={bank3} /> */}
          RBB Bank
        </div>
        <div className="w-48">
          <span className="text-xl font-bold">7.5%</span>
        </div>
        <div className="w-48">
          <span className="font-bold">5-20 yrs</span>
        </div>
        <div className="flex-1">
          <p>Unscheduled payment: 1.5% of payment amount (conditions apply).</p>
        </div>
        <div className="w-64">
          <button className="text-secondary underline pr-4">
            Calculate EMI
          </button>
          <button className="bg-secondary text-white py-1 px-4 rounded">
            Apply Loan
          </button>
        </div>
      </div>
    </div>
  );
};

Bank.propTypes = {
  setBankName: PropTypes.func.isRequired,
  bank: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  bank: makeSelectBankName(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(Bank);
