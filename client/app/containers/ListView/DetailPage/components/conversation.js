import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import agent from '../../../../assets/img/agent.png';
import user from '../../../../assets/img/user.svg';


const Conversation = () => {
  return (
    <div className="border-b py-4">
      <p className="italic mb-2">Looks very good property but It is slight expensive, i suggest you to lower the price around 2-3 lakh.</p>
      <div className="flex">
        <img className="w-12 h-12 rounded-full" src={user} />
        <div className="flex-1 pl-4">
          <p className="font-bold">Kirataya Shakya</p>
          <p className="text-gray-700 text-sm"> Posted on  2:30 pm 24 April</p>
        </div>
      </div>


      <div className="border-l-2 border-black pl-4 ml-4 mt-4">
        <p className="italic mb-2">well we have adjusted the price, can you please have a look, now it non negotiable price.</p>
        <div className="flex">
          <img className="w-12 h-12 rounded-full" src={agent} />
          <div className="flex-1 pl-4">
            <p className="font-bold text-primary">Everest RealEstate</p>
            <p className="text-gray-700 text-sm"> Posted on  2:30 pm 24 April</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
