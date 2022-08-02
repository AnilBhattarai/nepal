import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import logo from '../../assets/img/logo-outline.svg';

const Loading = () => (
  <div className="flex flex-wrap lg:flex-no-wrap">
    {[1, 2, 3, 4].map(each => (
      <div
        key={`hto-${each}`}
        className="rounded overflow-hidden m-2 bg-white shadow w-full lg:w-1/4"
      >
        <div className="relative">
          <SkeletonTheme color="#0291DD" highlightColor="#0291DD"><Skeleton
            height={180} width={300} />
          </SkeletonTheme>
          <img style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }} src={logo} /></div>
        <div className="p-4">
          <SkeletonTheme color="#ddd" highlightColor="#ddd">
            <Skeleton height={10} width={150} /><br />
            <Skeleton height={10} width={100} />
          </SkeletonTheme>
        </div>
      </div>
    ))}
  </div>
);

export default Loading;
