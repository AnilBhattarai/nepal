import React from 'react';
import Skeleton from 'react-loading-skeleton';

const Loading = () => (
  <>
    {[1, 2, 3, 4, 5].map(each => (
      <div
        key={`hto-${each}`}
        className="NHProjects w-1/5 rounded relative overflow-hidden -ml-4 -mr-4 inline-block cursor-pointer bg-gray-100"
      >
        <div className="NHproplist relative block">
          <Skeleton height={200} width={240} />
        </div>

        <div className="p-5 w-full">
          <h3 className="text-lg text-gray-900 font-bold proptitle">
            <Skeleton height={30} width={200} />
          </h3>
          <p className="text-darker pt-2 text-xs">
            <Skeleton height={10} width={150} />
          </p>
        </div>
        {/* <span
          className="text-white absolute right-0 top-0 px-4 py-2 rounded-tr-lg text-sm"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.55)' }}
        >
          Rs. <Skeleton height={20} width={70} />
        </span> */}
      </div>
    ))}
  </>
);

export default Loading;
