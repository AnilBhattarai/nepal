import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import HeartIcon from '../../../assets/img/heart.svg';
import ShareIcon from '../../../assets/img/share.svg';

import agent from '../../../images/agent.png';
import { IMAGE_BASE } from '../../App/constants';
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const Loading = () => (
  <div className="w-3/4 px-2">
    <div className="flex">
      <div className="w-3/4">
        <h2 className="text-2xl font-bold flex">
          <Skeleton width={250} height={20} />
          <img className="ml-4" src={HeartIcon} alt="icon" />
          <img className="ml-4" src={ShareIcon} alt="icon" />
        </h2>
        <Skeleton width={120} height={15} />
      </div>
      <div className="w-1/4 text-right">
        <p className="text-2xl text-primary font-bold">
          Rs.
          <Skeleton width={150} height={25} />
        </p>
        <span className="rounded-lg border border-gray rounded-bl-none text-xs px-2 text-gray">
          <Skeleton width={80} height={10} />
        </span>
      </div>
    </div>

    <div className="flex mt-4">
      <div className="p-3 rounded w-2/5">
        <div className="mb-4">
          <span className="uppercase text-xs block">Area Covered</span>
          <span className="font-bold">
            <Skeleton width={50} height={15} />
          </span>{' '}
        </div>
        <div className="mb-4">
          <span className="uppercase text-xs block">Build Year</span>
          <span className="font-bold">
            <Skeleton width={45} height={15} />
          </span>
        </div>
        <div className="mb-4">
          <span className="uppercase text-xs block">Road Access</span>
          <span className="font-bold">
            <Skeleton width={100} height={15} />
          </span>
        </div>
        <div className="mb-4">
          <span className="uppercase text-xs block">Amenities</span>
          <span className="font-bold">
            <Skeleton width={100} height={15} />
          </span>
        </div>
        <div className="flex flex-wrap">
          <div className="w-1/2 mb-4">
            <span className="uppercase text-xs block">Bedrooms</span>
            <span className="font-bold">
              <Skeleton width={20} height={15} />
            </span>
          </div>
          <div className="w-1/2 mb-4">
            <span className="uppercase text-xs block">Bathrooms</span>
            <span className="font-bold">
              <Skeleton width={20} height={15} />
            </span>
          </div>
          <div className="w-1/2 mb-4">
            <span className="uppercase text-xs block">Floors</span>
            <span className="font-bold">
              <Skeleton width={20} height={15} />
            </span>
          </div>
          <div className="w-1/2 mb-4">
            <span className="uppercase text-xs block">Parking</span>
            <span className="font-bold">
              <Skeleton width={20} height={15} />
            </span>
          </div>
        </div>
      </div>
      <div className="w-3/5">
        <div className="overflow-hidden" style={{ height: 300 }}>
          <Slider {...settings}>
            {[1, 2, 3, 4].map(each => (
              <div>
                <Skeleton width={500} height={500} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>

    <h2 className="font-bold text-sm mt-8 mb-2 text-2xl">Description</h2>
    <p className="text-sm opacity-5 mt-2">
      Posted on <Skeleton width={70} height={15} />
    </p>
    <p className="ckEditor mt-4">
      <Skeleton width={820} height={10} count={6} />
    </p>

    <h2 className="mt-8 mb-2 text-2xl font-bold">Seller Information</h2>
    <div className="flex my-4">
      <Skeleton width={48} height={48} circle />
      <div className="flex-1 pl-4">
        <p className="font-bold">
          <Skeleton width={150} height={15} />
        </p>
        <Link className="text-blue no-underline my-2" to="/">
          <Skeleton width={70} height={10} />
        </Link>
        <br />
        <button className="bg-blue px-2 py-1 rounded-full rounded-br-none text-white text-sm">
          Follow
        </button>
      </div>
    </div>
  </div>
);

export default Loading;
