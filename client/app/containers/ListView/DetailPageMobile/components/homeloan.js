import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import {
  formatAmount,
  trimDecimal,
  MONTH,
  MONTH_OPTIONS,
  YEAR_OPTIONS,
} from '../utils';

import free from '../../../../assets/img/free.png';
import calc from '../../../../assets/img/calc.png';
import './style.css';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;

const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} className="block text-black" />
    </Tooltip>
  );
};

const HomeLoan = props => {
  // for home loan calculations
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [emi, setEmi] = useState('');
  const [totalInterest, setTotalInterest] = useState('');
  const [totalPayable, setTotalPayable] = useState('');
  const [isYearly, setIsYearly] = useState(true);
  const [loanMonthlyBreakdown, setLoanMonthlyBreakdown] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  const [loanForm, setLoanForm] = useState(false);

  const showLoanForm = () => {
    // setActive(true);
    setLoanForm(true);
  };

  const handleLoanModal = () => {
    setLoanForm(false);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      calculateLoan();
    }
  };

  const calculateLoan = () => {
    const P = +principal;
    const Rate = +rate;
    const Years = +years;

    if (P > 0 && Rate > 0 && Years > 0) {
      const R = Rate / 1200;
      const N = isYearly ? Years * 12 : Years;
      const EMI = (P * R * (1 + R) ** N) / ((1 + R) ** N - 1);
      const totalPayableValue = EMI * N;
      const totalInterestValue = totalPayableValue - P;
      setEmi(`${trimDecimal(EMI)}`);
      setTotalPayable(`${trimDecimal(totalPayableValue)}`);
      setTotalInterest(`${trimDecimal(totalInterestValue)}`);
      let mi = '';
      let map = '';
      let lP = P;
      const tempDate = new Date(startDate);
      const loanMonthlyBreakdownValue = Array(N)
        .fill(null)
        .map(() => {
          const e = tempDate.getMonth() + 1;
          mi = lP * R;
          map = EMI - mi;
          lP -= map;
          const result = {
            month: MONTH[tempDate.getMonth()],
            year: tempDate.getFullYear(),
            principal: map,
            interest: mi,
            emi: EMI,
            balance: lP,
          };
          tempDate.setMonth(e);
          return result;
        });
      setLoanMonthlyBreakdown(loanMonthlyBreakdownValue);
    }
  };

  const wrapperStyle = { width: 400, margin: 50 };

  const handleSliderAmountChange = value => {
    setPrincipal(value);
  };
  const handleSliderYearsChange = value => {
    setYears(value);
  };
  const handleSliderRateChange = value => {
    setRate(value);
  };

  return (
    <>
      <div className="text-center py-10">
        <h3 className="text-2xl md:text-3xl text-black tracking-tight">
          Thinking about home loan?
            </h3>
        <p className="text-gray-600">
          Calculate home loans and get bigger picture of future
            </p>
      </div>
      <div className="md:flex">
        <div className="md:w-1/2 lg:bg-gray-200 lg:p-10">
          <div className="mb-2 px-1">
            <label htmlFor="loanamount" className="">
              Loan Amount (Rs.)
            </label>
            <input
              id="loanamount"
              className="inputbox min-w-auto"
              type="text"
              placeholder="Rs.0"
              value={principal}
              onChange={e => setPrincipal(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div className="priceRange py-2 mb-4">
              <Slider
                min={1000}
                max={100000000}
                defaultValue={1000}
                value={principal}
                onChange={handleSliderAmountChange}
              />
            </div>
          </div>
          <div className="mb-2  px-1">
            <label htmlFor="loanyears" className="">
              Term (Years)
            </label>

            <input
              id="loanyears"
              className="inputbox min-w-auto"
              type="text"
              value={years}
              onChange={e => setYears(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div className="priceRange py-2">
              <Slider
                min={1}
                max={30}
                defaultValue={1}
                value={years}
                onChange={handleSliderYearsChange}
              />
            </div>
          </div>
          <div className="mb-2  px-1">
            <label htmlFor="loanrate" className="">
              Interest (%)
            </label>

            <input
              id="loanrate"
              className="inputbox min-w-auto"
              type="text"
              value={rate}
              onChange={e => setRate(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div className="priceRange py-2">
              <Slider
                min={1}
                max={30}
                defaultValue={1}
                value={rate}
                onChange={handleSliderRateChange}
              />
            </div>
          </div>

          <div className="px-1">
            <label className=" text-gray-700">Starting From</label>
            <div className="flex -mx-1">
              <div className="relative w-1/2 mx-1">
                <select
                  className="inputbox appearance-none"
                  style={{ height: 33 }}
                  value={`${startDate.getMonth()}`}
                  onChange={e => {
                    const newMonth = +e.target.value;
                    const newDate = new Date(
                      startDate.getFullYear(),
                      newMonth,
                      1,
                    );
                    setStartDate(newDate);
                  }}
                  onBlur={e => {
                    const newMonth = +e.target.value;
                    const newDate = new Date(
                      startDate.getFullYear(),
                      newMonth,
                      1,
                    );
                    setStartDate(newDate);
                  }}
                >
                  <option disabled>Month</option>
                  {MONTH_OPTIONS.map(each => (
                    <option key={each.text} value={each.value}>
                      {each.text}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div className="relative w-1/2 mx-1">
                <select
                  className="inputbox appearance-none"
                  style={{ height: 33 }}
                  value={`${startDate.getFullYear()}`}
                  onChange={e => {
                    const newYear = +e.target.value;
                    const newDate = new Date(newYear, startDate.getMonth(), 1);
                    setStartDate(newDate);
                  }}
                  onBlur={e => {
                    const newYear = +e.target.value;
                    const newDate = new Date(newYear, startDate.getMonth(), 1);
                    setStartDate(newDate);
                  }}
                >
                  <option disabled>Year</option>
                  {YEAR_OPTIONS.map(each => (
                    <option key={each.text} value={each.value}>
                      {each.text}
                    </option>
                  ))}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-2 px-1 pt-1">
            <button
              onClick={calculateLoan}
              type="button"
              className="bg-secondary px-4 flex-1 py-2 rounded text-white  hover:bg-blue-500 mt-5 mb-px w-full font-bold"
            >
              Calculate
            </button>
            {/* <button
onClick={resetForm}
type="button"
className="px-2 py-2 uppercase "
>
Reset
</button> */}
          </div>
        </div>
        <div className="md:w-1/2 bg-primary text-white flex flex-col justify-between">
          <div className="text-base pb-8">
            <div className="max-w-sm mx-auto mt-8 text-center">
              <div className="text-center">
                <span>Monthly Payment</span>
                <span className="text-6xl font-bold leading-none text-white block">
                  {formatAmount(emi)}
                </span>
                {/* <span className="text-6xl text-white block">Rs.40,061.70</span> */}
              </div>
              <div className="flex mt-5">
                <div className="w-1/2 px-4 text-center">
                  <span className="border-b pb-1 block mb-1">Total Interest</span>
                  <span className="font-bold text-white text-xl">
                    {formatAmount(totalInterest)}
                  </span>
                </div>
                <div className="w-1/2 px-4 text-center">
                  <span className="border-b pb-1 block mb-1">
                    Payable Amount{' '}
                  </span>
                  <span className="font-bold text-white text-xl">
                    {formatAmount(totalPayable)}
                  </span>
                </div>
              </div>
              <button
                onClick={showLoanForm}
                className="rounded-full  px-4 py-1 mt-6 bg-secondary text-white"
              >
                View Monthly Breakdown
            </button>
            </div>

            <Dialog maxWidth="md" fullWidth open={loanForm} onClose={handleLoanModal}>
              <div className="flex justify-between py-6">
                <h2 className="text-2xl pl-6">Monthly Breakdown</h2>
                <div
                  className="rounded-full inline-flex items-center justify-center mr-4 mt-4 cursor-pointer absolute right-0 top-0 bg-red-500 text-white hover:bg-red-600 w-6 h-6"
                  onClick={handleLoanModal}
                >
                  <i className="material-icons"> close </i>
                </div>
              </div>
              <div className="flex mt-5">
                <div className="w-1/2 px-4 text-center">
                  <span className="border-b pb-1 block mb-1">Total Interest</span>
                  <span className="font-bold text-primary text-xl">
                    {formatAmount(totalInterest)}
                  </span>
                </div>
                <div className="w-1/2 px-4 text-center">
                  <span className="border-b pb-1 block mb-1">
                    Payable Amount{' '}
                  </span>
                  <span className="font-bold text-primary text-xl">
                    {formatAmount(totalPayable)}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <table className="table-border table-hover w-full emi">
                  <thead>
                    <tr>
                      <th className="mthy text-left">Month-Year</th>
                      <th className="pa text-right">Principal(A)</th>
                      <th className="int text-right">Interest(B)</th>
                      <th className="tp text-right">Total Payment(A + B)</th>
                      <th className="tbal text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loanMonthlyBreakdown.map(each => (
                      <tr key={`${each.month}-${each.year}`}>
                        <td className=" text-gray-800 ">
                          {each.month}-{each.year}
                        </td>
                        <td className=" text-gray-800 text-right">
                          {formatAmount(trimDecimal(each.principal))}
                        </td>
                        <td className=" text-gray-800  text-right">
                          {formatAmount(trimDecimal(each.interest))}
                        </td>
                        <td className=" text-gray-800  text-right">
                          {formatAmount(trimDecimal(each.emi))}
                        </td>
                        <td className=" text-gray-800  text-right">
                          {formatAmount(trimDecimal(each.balance))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Dialog>
          </div>
          <div className="p-10 opacity-75" style={{ background: "rgba(0, 0, 0, 0.3)" }}>
            <h2 className="text-xl md:text-2xl text-white tracking-tight font-light text-center">
              Explore Our Tools
                </h2>
            <div className="flex flex-wrap justify-center">
              <Link
                className="text-white cursor-pointer p-4 w-1/2 md:w-1/4 text-center"
                to="/home-loan#loan"
                target="_blank"
              >
                <span className="block text-center"><i className="material-icons" style={{ fontSize: 32 }}>home</i></span>
                Home Loan
                  </Link>
              <Link
                className="text-white cursor-pointer p-4 w-1/2 md:w-1/4 text-center"
                to="/unit-converter"
              >
                <span className="block text-center"><i className="material-icons" style={{ fontSize: 32 }}>straighten</i></span>

                Convert
                  </Link>
              <Link
                className="text-white cursor-pointer p-4 w-1/2 md:w-1/4 text-center"
                to="/news"
                target="_blank"
              >
                <span className="block text-center"><i className="material-icons" style={{ fontSize: 32 }}>chrome_reader_mode</i></span>

                Property News
                  </Link>
              <Link
                className="text-white cursor-pointer p-4 w-1/2 md:w-1/4 text-center"
                to="/home-loan#guide"
                target="_blank"
              >
                <span className="block text-center"><i className="material-icons" style={{ fontSize: 32 }}>import_contacts</i></span>

                Buyers Guide
                  </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeLoan;
