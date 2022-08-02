import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

import agent from '../../../images/agent.png';
import tempImg3 from '../../../images/default.jpg';
import bed from '../../../assets/img/bed.svg';
import shower from '../../../assets/img/shower.svg';
import tape from '../../../assets/img/tape.svg';
import ladder from '../../../assets/img/ladder.svg';
import road from '../../../assets/img/road.svg';
import { IMAGE_BASE } from '../../App/constants';
const Loading = () => (
  <>
    <div className="h-16 border rounded bg-white" />
    {[1, 2, 3].map(each => (
      <div
        className="border rounded-lg p-1 shadow ease-in-out bg-white cursor-pointer mt-2"
        key={`list-${each}`}
      >
        <div className="flex">
          <div className="w-1/4 px-2">
            <div className="rounded overflow-hidden" style={{ height: 182 }}>
              <Skeleton width={211} height={182} />
            </div>
          </div>
          <div className="w-3/4 px-2">
            <div className="flex pt-10">
              <div className="w-3/4">
                <h3 className="text-lg font-bold">
                  <Skeleton width={250} height={20} />
                </h3>
                <p className="text-sm opacity-75">
                  <Skeleton width={120} height={10} />
                </p>
              </div>
              <div className="w-1/4 text-right">
                <p className="text-2xl text-primary font-bold mb-2">
                  <Skeleton width={170} height={20} />
                </p>
                <span className="rounded-lg rounded-bl-none text-xs px-2 text-gray">
                  <Skeleton width={100} height={10} />
                </span>
              </div>
            </div>
            <div className="flex mb-4">
              <Skeleton circle width={32} height={32} />
              <div className="pl-2">
                <Link
                  className="text-xs text-blue no-underline"
                  to="agent-profile"
                >
                  <Skeleton width={140} height={10} />
                </Link>
                <p className="opacity-50 text-xs">
                  <Skeleton width={80} height={10} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
);

export default Loading;
