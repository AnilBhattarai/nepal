import React from 'react';
import PropTypes from 'prop-types';
import agent from '../../../images/agent.png';
import { Link } from 'react-router-dom';
import tempImg3 from '../../../images/default.jpg';
import bed from '../../../assets/img/bed.svg';
import shower from '../../../assets/img/shower.svg';
import tape from '../../../assets/img/tape.svg';
import ladder from '../../../assets/img/ladder.svg';
import road from '../../../assets/img/road.svg';

const ListView = () => {
  return (
    <div className="border rounded-lg p-1 hover:shadow hover:pointer mb-4">
      <div className="flex">
        <div className="w-1/4 px-2">
          <div className="rounded overflow-hidden">
            <img style={{ height: 182, maxWidth: 'none' }} src={tempImg3} alt="image title" />
          </div>
        </div>
        <div className="w-3/4 px-2">
          <div className="flex">
            <div className="w-3/4">
              <h3>House Sale Baluwatar</h3>
              <p className="text-sm opacity-75">Baluwatar, Kathmandu</p>
            </div>
            <div className="w-1/4 text-right">
              <p className="text-lg text-blue font-bold mb-2">Rs.2.3 Cr</p>
              <span className="rounded-lg border border-gray rounded-bl-none text-xs px-2 text-gray">negotiable</span>
            </div>
          </div>
          <div className="flex my-4">
            <img className="h-8" src={agent} alt="agent name" />
            <div className="pl-2">
              <Link className="text-xs text-blue no-underline" to="agent-profile">Number One Agency</Link>
              <p className="opacity-50 text-xs">posted on 23 April</p>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/5 p-1 flex flex-col justify-between items-center">
              <img src={bed} />
              <p className="text-sm py-2">6 Rooms</p></div>
            <div className="w-1/5 p-1 flex flex-col justify-between items-center">
              <img src={shower} />
              <p className="text-sm py-2">6 Bathrooms</p></div>
            <div className="w-1/5 p-1 flex flex-col justify-between items-center">
              <img src={tape} />
              <p className="text-sm py-2">9 Aana Area</p></div>
            <div className="w-1/5 p-1 flex flex-col justify-between items-center">
              <img src={ladder} />
              <p className="text-sm py-2">3 Floors</p></div>
            <div className="w-1/5 p-1 flex flex-col justify-between items-center">
              <img src={road} />
              <p className="text-sm py-2">22 Feet</p></div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ListView;
