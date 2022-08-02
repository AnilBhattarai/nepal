import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// import bgLoan from '../../../../assets/img/bg-loan.jpg';
import './style.css';
import { ResponsivePie } from '@nivo/pie';

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
  const [showChart, setShowChart] = useState(false);

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

  const handleStartDate = date => {
    if (date === null) {
      date = '';
    }
    setStartDate(date);
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
      setShowChart(true);
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

  const lineData = [
    {
      id: 'Principal',
      label: 'Principal amount',
      value: principal,
      color: '#A3DFF8',
    },
    {
      id: 'Interest',
      label: 'Interest amount',
      value: totalInterest,
      color: '#6EF2F0',
    },
  ];

  const margin = { top: 30, right: 200, bottom: 30, left: 200 };

  const styles = {
    root: {
      fontFamily: 'consolas, sans-serif',
      textAlign: 'center',
      position: 'relative',
      height: 400,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      right: margin.right,
      bottom: 0,
      // left: margin.left,
      left: '123px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFFFFF',
      // background: "#FFFFFF33",
      textAlign: 'center',
      // This is important to preserve the chart interactivity
      pointerEvents: 'none',
      width: 200,
    },
    totalLabel: {
      fontSize: 24,
    },
    dot1: {
      height: '25px',
      width: '25px',
      color: 'hsl(287, 70%, 50%)',
      borderradius: '50%',
      display: 'inline-block',
    },
  };

  return (
    <>
      <div class="container mx-auto">
        <div className="bg-primary py-16 px-4 lg:px-12 my-8">
          <div className="lg:flex">
            <div className="lg:w-3/5 lg:pr-20">
              <h3 className="text-2xl md:text-4xl text-white">
                Home Loan Calculator
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
                <input
                  id="loanamount"
                  className="p-4 bg-opacity-40 bg-white text-white"
                  type="text"
                  placeholder="Loan Amount (Rs.)"
                  value={principal}
                  onChange={e => setPrincipal(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <input
                  id="loanyears"
                  placeholder="Term (Years)"
                  className="p-4 bg-opacity-40 bg-white text-white"
                  type="text"
                  value={years}
                  onChange={e => setYears(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <input
                  id="loanrate"
                  className="p-4 bg-opacity-40 bg-white text-white"
                  placeholder="Interest(%)"
                  type="text"
                  value={rate}
                  onChange={e => setRate(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <DatePicker
                  className="p-4 bg-opacity-40 bg-white text-white w-full"
                  placeholderText="Start from ( Select year/month)"
                  selected={
                    startDate !== '' && startDate !== null
                      ? new Date(startDate)
                      : ''
                  }
                  onChange={handleStartDate}
                />
              </div>
              <div className="flex items-center mt-6">
                <button
                  onClick={calculateLoan}
                  type="button"
                  className="bg-secondary px-10 py-4 rounded text-white font-black"
                >
                  Calculate EMI
                </button>
                {showChart && (
                  <p className="text-white text-lg flex-1 pl-6">
                    Installment Rate :{' '}
                    <span className="text-cyan-500">{formatAmount(emi)}</span>
                    <span className="text-cyan-500 text-sm">per month</span>
                  </p>
                )}
              </div>
            </div>

            {/* <select
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
                  */}
            {showChart && (
              <div className="lg:w-2/5">
                <div style={styles.root}>
                  <ResponsivePie
                    data={lineData}
                    margin={{ top: 0, right: 40, bottom: 40, left: 40 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={0}
                    borderWidth={1}
                    colors={datum => datum.color}
                    enableRadialLabels={false}
                    enableSliceLabels={false}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                    legends={[]}
                    isInteractive
                  />
                  <div style={styles.overlay}>
                    <span className="block text-xl font-bold">
                      {formatAmount(emi)}
                    </span>
                    <span className="block">per month</span>
                  </div>
                </div>
                <div className="flex items-center mt-5">
                  <span className="w-8 h-8 bg-teal-100 rounded-full" />
                  <p className="flex-1 text-white">Principal Amount</p>
                  <span className="font-bold text-white text-xl">
                    {formatAmount(principal)}
                  </span>
                </div>

                <div className="flex items-center mt-5">
                  <span className="w-8 h-8 bg-teal-100 rounded-full" />
                  <p className="flex-1 text-white">Total Interest</p>
                  <span className="font-bold text-white text-xl">
                    {formatAmount(totalInterest)}
                  </span>
                </div>
                <div className="text-right">
                  <button
                    className="underline text-sm text-white"
                    onClick={showLoanForm}
                  >
                    Monthly Breakdown
                  </button>
                </div>
              </div>
            )}

            <Dialog
              maxWidth="md"
              fullWidth
              open={loanForm}
              onClose={handleLoanModal}
            >
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
                  <span className="border-b pb-1 block mb-1">
                    Total Interest
                  </span>
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
        </div>
      </div>
    </>
  );
};

export default HomeLoan;
