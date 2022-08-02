import React, { memo, useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import '../../components/slickSlider/index.css';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from '../HomeLoanForm/actions';
import {
  makeSelectBankName,
  makeSelectBanks,
  makeSelectLoadingMore,
} from '../HomeLoanForm/selectors';
import reducer from '../HomeLoanForm/reducer';
import saga from '../HomeLoanForm/saga';
import { IMAGE_BASE } from '../App/constants';

import { Link, scroll, Element } from 'react-scroll';
import {
  formatAmount,
  trimDecimal,
  MONTH,
  MONTH_OPTIONS,
  YEAR_OPTIONS,
} from './utils';

import Faq from '../FAQPage/index';
import CategoryElement from '../../components/CategoryElement/index';
import HomeLoanForm from '../HomeLoanForm/Loadable';
import Bank from '../HomeLoanForm/components/banks';
import LoanProcess from '../HomePage/components/loan';
import StaticContentDiv from '../../components/StaticContentDiv/StaticContentDiv';
import Table from '../../components/Table';

import HomeLoan from './components/homeloan';
import HomeLoan2 from './components/homeloan2';

const key = 'homeLoanForm';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={`${className} arrow-next`} onClick={onClick}>
      {' '}
      <i className="material-icons">keyboard_arrow_right</i>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={`${className} arrow-prev`} onClick={onClick}>
      {' '}
      <i className="material-icons">keyboard_arrow_left</i>
    </div>
  );
}

// EMI = (P * R/12) * [ (1+R/12)^N] / [ (1+R/12)^N-1]
// E = P×r×(1 + r)n/((1 + r)n - 1)
const HomeLoanPage = props => {
  const {
    setBankName,
    loadBankRequest,
    banks,
    loadMoreBankRequest,
    loading_more,
  } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [emi, setEmi] = useState('');
  const [totalInterest, setTotalInterest] = useState('');
  const [totalPayable, setTotalPayable] = useState('');
  const [isYearly, setIsYearly] = useState(true);
  const [loanMonthlyBreakdown, setLoanMonthlyBreakdown] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [isLoadMore, setIsLoadMore] = useState(false);

  useEffect(() => {
    loadBankRequest();
  }, []);

  const loanRef = useRef(null);
  const guideRef = useRef(null);
  useEffect(() => {
    if (!isLoadMore) {
      if (window.location.hash.includes('loan')) {
        window.scrollTo(0, loanRef.current.offsetTop);
      }
      if (window.location.hash.includes('guide')) {
        window.scrollTo(0, guideRef.current.offsetTop);
      }
    }
  }, []);

  useEffect(() => {
    console.log(window.location.hash);
    if (!isLoadMore) {
      if (window.location.hash.includes('loan')) {
        window.scrollTo(0, loanRef.current.offsetTop);
      }
      if (window.location.hash.includes('guide')) {
        window.scrollTo(0, guideRef.current.offsetTop - 20);
      }
      if (window.location.hash.length < 1) {
        window.scrollTo(0, 0);
      }
    }
  }, [banks]);

  const handleLoadMore = () => {
    const newPage = banks.page + 1;
    const size = banks.size;
    setIsLoadMore(true);
    loadMoreBankRequest({ page: newPage, size });
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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

  const bankTable =
    banks.data && banks.data.length > 0
      ? banks.data.map(each => [
          <div
            className="md:flex bg-white items-center p-2 text-center md:text-left"
            key={each._id}
          >
            <div className="w-24 h-10 flex items-center justify-center mx-auto md:mx-0">
              <img
                style={{ maxHeight: 40 }}
                src={each.Logo && `${IMAGE_BASE}${each.Logo.path}`}
                alt={each.Bank_Name}
              />
            </div>
            <h4 className="font-bold md:w-64 mt-4 md:mt-0 md:ml-10">
              {each.Bank_Name}
            </h4>
            <div className="px-5 opacity-70">
              <span>Interest Rate</span>
              <span className="text-xl font-bold pl-2">
                {each.Rate_Of_interest}
              </span>
            </div>
            {/* <div className="w-48">
            <p className="text-xl font-bold">
              {each.Min_Tenure}-{each.Max_Tenure} yrs
    </p>
          </div> */}
            <div className="flex-1 text-gray-600">
              <p>Fees: {each.Processing_Fees}</p>
            </div>
            <Link
              activeclassName="active"
              to="emi"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
              // onClick={() => setRate(each.Rate_Of_interest)}
            >
              <button
                type="button"
                className="bg-blue-100 text-primary py-2 text-sm px-4 rounded underline"
              >
                Calculate EMI
              </button>
            </Link>

            <Link
              activeclassName="active"
              to="form"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
              onClick={() => setBankName(each.Bank_Name)}
            >
              <button
                type="button"
                className="bg-primary text-white py-2 text-sm px-4 rounded ml-2"
              >
                Apply Loan
              </button>
            </Link>
          </div>,
        ])
      : [[]];

  return (
    <div>
      <Helmet>
        <title>Home Loan</title>
      </Helmet>
      <div className="">
        <StaticContentDiv contentKey="home-loan-top" />
        <div className="container mx-auto pt-10">
          <h2 className="text-3xl text-gray-700 mb-8">
            Explore &amp; Compare Home Loan Schemes
          </h2>
          {/* <StaticContentDiv contentKey="banks-heading" /> */}
          <Table tableData={bankTable} />
          <div className="text-center">
            {banks.data.length < banks.totaldata && (
              <button
                type="button"
                className="btn mx-auto border border-secondary bg-blue-100 mb-8 text-secondary mt-4"
                onClick={handleLoadMore}
              >
                {loading_more ? 'Loading' : 'Load More'}
              </button>
            )}
          </div>
        </div>
        <StaticContentDiv contentKey="loan-process" />
        <div className="container mx-auto pt-10 mt-20 px-2" ref={guideRef}>
          <Faq />
        </div>
      </div>
      <Element name="emi">
        <HomeLoan2 />
      </Element>

      <Element name="result">
        {emi ? (
          <div className="container mx-auto">
            <div className="max-w-sm mx-auto mt-8">
              <div className="text-center">
                <span>Monthly Payment</span>
                <span className="text-6xl font-bold leading-none text-primary block">
                  {formatAmount(emi)}
                </span>
                {/* <span className="text-6xl text-primary block">Rs.40,061.70</span> */}
              </div>
              <div className="flex">
                <div className="w-1/2 px-4">
                  <span className="border-b pb-2 block mb-2">
                    Total Interest
                  </span>
                  <span className="font-bold text-primary text-xl">
                    {formatAmount(totalInterest)}
                  </span>
                </div>
                <div className="w-1/2 px-4">
                  <span className="border-b pb-2 block mb-2">
                    Payable Amount{' '}
                  </span>
                  <span className="font-bold text-primary text-xl">
                    {formatAmount(totalPayable)}
                  </span>
                </div>
              </div>
            </div>
            <div>
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
                      <td className="">
                        {each.month}-{each.year}
                      </td>
                      <td className="text-right">
                        {formatAmount(trimDecimal(each.principal))}
                      </td>
                      <td className=" text-right">
                        {formatAmount(trimDecimal(each.interest))}
                      </td>
                      <td className=" text-right">
                        {formatAmount(trimDecimal(each.emi))}
                      </td>
                      <td className=" text-right">
                        {formatAmount(trimDecimal(each.balance))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </Element>

      <Element name="form">
        <div ref={loanRef}>
          <HomeLoanForm />
        </div>
      </Element>

      {/* <div className="container mx-auto layout-1 notitle py-16">
        <h3 className="text-3xl text-center font-bold mb-10">
          Home Loan Articles
        </h3>
        <CategoryElement
          cat_id="5d8776d06632a20550bc4916"
          size={9}
          slider={true}
        />
      </div> */}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  bank: makeSelectBankName(),
  banks: makeSelectBanks(),
  loading_more: makeSelectLoadingMore(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(HomeLoanPage);
