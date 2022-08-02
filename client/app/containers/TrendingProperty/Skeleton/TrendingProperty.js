import React from 'react';
import Skeleton from 'react-loading-skeleton';
import logo from '../../../assets/img/logo-outline.svg';

const Loading = () => (
  <div className="flex mt-4">
    {[1, 2, 3, 4, 5].map(each => (
      <div
        key={`hto-${each}`}
        className="w-1/5 rounded relative overflow-hidden mx-2"
      >
        <div className="relative block">
          <Skeleton height={200} width={220} />
          <img style={{ opacity: 0.2, position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }} src={logo} />
        </div>

        <h3 className="text-lg text-gray-900 font -bold proptitle">
          <Skeleton height={30} width={200} />
        </h3>
        <p className="text-darker pt-2 text-xs">
          <Skeleton height={10} width={150} />
        </p>
      </div>
    ))}
  </div>
);

export default Loading;
