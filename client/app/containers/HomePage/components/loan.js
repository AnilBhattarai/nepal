import React from 'react';
import PropTypes from 'prop-types';

const Loan = () => {
  return (
    <div className="pt-16">
      <h2 className="text-3xl text-center tracking-tight">
        Easy Loan Process
      </h2>
      <p className="text-center opacity-75">
        NepalHomes offers buyer to easy home loan processing.
      </p>
      <div className="max-w-5xl hidden mx-auto md:flex mt-10 justify-center items-center">
        <div className="h-2 bg-white flex-1" />
        <span className="w-8 h-8 rounded-full text-center bg-gray-300 inline-block leading-loose">
          1
        </span>
        <div className="h-2 bg-gray-300 flex-2" />
        <span className="w-8 h-8 rounded-full text-center bg-gray-300 inline-block leading-loose">
          2
        </span>
        <div className="h-2 bg-gray-300 flex-2" />
        <span className="w-8 h-8 rounded-full text-center bg-gray-300 inline-block leading-loose">
          3
        </span>
        <div className="h-2 bg-gray-300 flex-2" />
        <span className="w-8 h-8 rounded-full text-center bg-gray-300 inline-block leading-loose">
          4
        </span>
        <div className="h-2 bg-white flex-1" />
      </div>

      <div className="max-w-5xl mx-auto flex flex-wrap mt-5">
        <div className="w-full lg:w-1/4 px-4 mb-2">
          <div className="bg-white shadow-lg rounded text-center p-2 py-10">
            <i className="material-icons text-3xl text-secondary">
              monetization_on
            </i>
            <p className="text-gray-600">
              Get Informed on readily available home loan schemes
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/4 px-4 mb-2">
          <div className="bg-white shadow-lg rounded text-center p-2 py-10">
            <i className="material-icons text-3xl text-secondary">
              swap_vertical_circle
            </i>
            <p className="text-gray-600">
              Calculate and compare EMI using our tools
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/4 px-4 mb-2">
          <div className="bg-white shadow-lg rounded text-center p-2 py-10">
            <i className="material-icons text-3xl text-secondary">
              account_balance
            </i>
            <p className="text-gray-600">
              Choose the bank and fill the form
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/4 px-4 mb-2">
          <div className="bg-white shadow-lg rounded text-center p-2 py-10">
            <i className="material-icons text-3xl text-secondary">
              event_note
            </i>
            <p className="text-gray-600">
              Apply for Home Loan at the bank of your choice
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Loan;
