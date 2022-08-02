import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { InlineShareButtons } from 'sharethis-reactjs';
import Dialog from '@material-ui/core/Dialog';
import LinkBoth from '../../../components/LinkBoth';
import { IMAGE_BASE, DATE_FORMAT, URL_BASE } from '../../App/constants';
import BlogDetailSkeleton from '../Skeleton/BlogDetail';
import BlogComments from '../../CommentsNepali';
import tempAuthor from '../../../assets/img/user.svg';
import RecentBlogs from './RecentBlogs';
import RelatedBlogs from './RelatedBlogs';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
  // FacebookShareCount,
} from 'react-share';
import { FacebookProvider, Comments, CommentsCount } from 'react-facebook';
import CategoryElement from '../../../components/CategoryElementSide';
import NotFoundPage from '../../NotFoundPage/Loadable';
import comment from '../../../assets/img/comment.svg';
import Skeleton from 'react-loading-skeleton';
import Search from '../../../components/Search/index';

import StaticContentDiv from '../../../components/StaticContentDiv';

// @material
// import DialogTitle from '@material-ui/core/DialogTitle';
const BlogDetail = props => {
  const { blog, loading, message, comments } = props;
  const url = window.location.href;
  // useEffect(() => {
  //   let a = 0;
  //   const fbcount = (
  //     <FacebookShareCount url="https://www.nepalhomes.com/">
  //       {shareCount => (a = shareCount)}
  //     </FacebookShareCount>
  //   );
  //   console.log(a, 'fbcount', fbcount);
  // }, []);
  return loading ? (
    <div>
      <Skeleton className="my-48" height={50} />
      {/* <span className="pb-5 block"> <Skeleton width={200} height={40} /></span> */}
      <span className="pr-5 inline-block border-r border-gray-300">
        {' '}
        <Skeleton className="pr-5" width={100} height={20} />
      </span>
      <span className="pl-5 inline-block mt-4">
        {' '}
        <Skeleton className="pl-10" width={100} height={20} />
      </span>
      <div className="lg:flex">
        <div className="lg:w-3/4">
          <BlogDetailSkeleton />
        </div>
        <div className="lg:w-1/4 lg:pl-10">
          <Skeleton className="" height={50} />
          <Skeleton className="mt-6" count={10} height={20} />
        </div>
      </div>
    </div>
  ) : (
      <>
        {message && message === 'no blog found' ? (
          <NotFoundPage />
        ) : (
            <>
              <div>
                {/* {blog && blog.category && blog.category.length > 0 && (
                  <div className="mt-0">
                    {blog.category.map(
                      (each, index) =>
                        each._id !== '5d0a07f3f305de105c4fc674' && (
                          <LinkBoth
                            className="text-secondary hover:underline leading-normal text-sm capitalize"
                            key={index}
                            to={`/news/category/${each.slug_url}`}
                          >
                            {`${index === 0 ? '' : ', '}${each.title}`}
                          </LinkBoth>
                        ),
                    )}
                  </div>
                )} */}

                <StaticContentDiv contentKey="news-detail-top" />

                <h1 className="text-4xl lg:text-6xl font-bold font-mukta text-gray-700 leading-tight">
                  {blog && blog.title}
                </h1>

                <div className="md:flex py-5 md:py-10 mb-5 md:mb-10 border-b border-gray-300">
                  {blog &&
                    blog.author &&
                    blog.author.map(each => (
                      <div className="inline-flex items-center">
                        <img
                          src={
                            each && each.image && each.image.path
                              ? `${IMAGE_BASE}${each.image.path}`
                              : tempAuthor
                          }
                          alt={`${each.name}`}
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 18,
                            marginRight: 8,
                            borderWidth: 2,
                            borderColor: '#E1E1E1',
                          }}
                        />
                        {each.name}
                        {/* <LinkBoth
                        className="text-secondary underline leading-normal text-sm capitalize"
                        to={`/blog/author/${blog.author._id}`}
                      >
                        author
                  </LinkBoth> */}
                      </div>
                    ))}
                  <div className="flex items-center md:ml-10">
                    <div className="h-10 w-10 bg-blue-100 inline-flex mr-3 rounded-full items-center justify-center">
                      <img className="h-5" src={comment} />
                    </div>
                    <div className="flex flex-wrap items-end">
                      <FacebookProvider appId="403635297248992">
                        <span
                          className="text-xl font-bold inline-block"
                          style={{ maxWidth: '1.5rem' }}
                        >
                          <CommentsCount href={`${URL_BASE}/news/${blog._id}`} />{' '}
                        </span>
                        <span className="pl-2">Comments</span>
                      </FacebookProvider>
                    </div>
                  </div>
                  <div className="py-5 md:py-0 items-center md:ml-10 flex relative z-50">
                    {/* <FacebookShareButton className="ml-2" url={url}>
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <LinkedinShareButton className="ml-2" url={url}>
                      <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                    <TwitterShareButton className="ml-2" url={url}>
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <EmailShareButton className="ml-2" url={url}>
                      <EmailIcon size={32} round />
                    </EmailShareButton>
                    <WhatsappShareButton className="ml-2" url={url}>
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton> */}
                    {/* <FacebookShareCount url="https://www.youtube.com/" /> */}
                    <InlineShareButtons
                      config={{
                        alignment: 'center', // alignment of buttons (left, center, right)
                        color: 'social', // set the color of buttons (social, white)
                        enabled: true, // show/hide buttons (true, false)
                        font_size: 16, // font size for the buttons
                        labels: null, // button labels (cta, counts, null)
                        language: 'en', // which language to use (see LANGUAGES)
                        networks: [
                          // which networks to include (see SHARING NETWORKS)
                          'facebook',
                          'messenger',
                          'whatsapp',
                          'twitter',
                          'linkedin',
                          'email',
                        ],
                        padding: 12, // padding within buttons (INTEGER)
                        radius: 4, // the corner radius on each button (INTEGER)
                        show_total: true, //share count
                        size: 32, // the size of each button (INTEGER)
                        // OPTIONAL PARAMETERS
                        url: url,
                      }}
                    />
                  </div>
                </div>
                <div className="lg:flex">
                  <div className="lg:w-3/4 lg:pr-10">
                    <div className="blog_img">
                      {blog && blog.image && blog.image.fieldname ? (
                        <img
                          style={{ width: '100%' }}
                          src={`${IMAGE_BASE}${blog.image.path}`}
                          alt={`${blog.title}`}
                        />
                      ) : null}
                    </div>
                    <div
                      className="ckEditor font-mukta md:px-20 mt-8"
                      dangerouslySetInnerHTML={{ __html: blog && blog.description }}
                    />

                    <p className="text-gray-700 mt-5 md:px-20">
                      प्रकाशित: {blog && moment(blog.published_on).fromNow()}
                    </p>

                    {blog && blog.tags && blog.tags.length > 0 && (
                      <div className="mb-5 md:px-20">
                        {blog.tags.map((each, index) => (
                          <LinkBoth
                            className="bg-gray-200 hover:bg-gray-300 leading-tighter text-base no-underline rounded px-4 py-2 mb-1 mr-1 inline-block"
                            key={index}
                            to={`/news/tag/${each}`}
                          >
                            {`${index === 0 ? '' : ''}${each}`}
                          </LinkBoth>
                        ))}
                      </div>
                    )}
                    {blog &&
                      blog.author &&
                      blog.author.length > 0 &&
                      blog.author.map(each => (
                        <div className="border-t border-b border-gray-200 py-6 md:py-12">
                          <div className="border-l-8 border-secondary md:flex px-6 md:px-12">
                            <div className="w-16 h-16 mb-6 overflow-hidden rounded-full">
                              <img
                                className="object-cover w-full h-full"
                                src={
                                  each && each.image && each.image.path
                                    ? `${IMAGE_BASE}${each.image.path}`
                                    : tempAuthor
                                }
                                alt={`${each.name}`}
                              />
                            </div>
                            <div className="flex-1 md:pl-8">
                              <h3 className="font-bold text-xl font-mukta mb-2">
                                {each.name}
                              </h3>
                              {each && each.author && each.author.bio && (
                                <p className="text-gray-700 mb-4 text-lg leading-normal">
                                  {each.author.bio}
                                </p>
                              )}
                              {each && each && each._id && (
                                <LinkBoth
                                  className="text-secondary"
                                  to={`/news/author/${each._id}`}
                                >
                                  Read more from author
                                </LinkBoth>
                              )}
                              <div className="flex mt-3">
                                {each &&
                                  each &&
                                  each.social_link &&
                                  each.social_link.fb &&
                                  each.social_link.fb !== '' && (
                                    <LinkBoth
                                      className="mr-2"
                                      to={each.social_link.fb}
                                      target="_blank"
                                    >
                                      <FacebookIcon size={32} round />
                                    </LinkBoth>
                                  )}
                                {each &&
                                  each &&
                                  each.social_link &&
                                  each.social_link.twitter &&
                                  each.social_link.twitter !== '' && (
                                    <LinkBoth
                                      className="mr-2"
                                      to={each.social_link.twitter}
                                      target="_blank"
                                    >
                                      <TwitterIcon size={32} round />
                                    </LinkBoth>
                                  )}
                                {each &&
                                  each &&
                                  each.social_link &&
                                  each.social_link.linkedIn &&
                                  each.social_link.linkedIn !== '' && (
                                    <LinkBoth
                                      className="mr-2"
                                      to={each.social_link.linkedIn}
                                      target="_blank"
                                    >
                                      <LinkedinIcon size={32} round />
                                    </LinkBoth>
                                  )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    {blog && (
                      <FacebookProvider appId="403635297248992">
                        <Comments
                          href={`${URL_BASE}/news/${blog._id}`}
                          width="100%"
                        />
                      </FacebookProvider>
                    )}
                  </div>
                  <div className="lg:w-1/4">
                    <StaticContentDiv
                      className="hidden lg:block"
                      contentKey="news-detail-right-top"
                    />
                    {/* <div className="hidden md:block mb-8 px-2">
                      <Search />
                    </div> */}
                    <RecentBlogs />
                    <CategoryElement cat_id="5e50eeb43a2d6e0439d7d307" size={4} />
                    <CategoryElement cat_id="5d8776d06632a20550bc4916" size={4} />
                    <RelatedBlogs />
                  </div>
                  <StaticContentDiv
                    className="hidden lg:block"
                    contentKey="news-detail-right-bottom"
                  />
                </div>
              </div>
            </>
          )}
      </>
    );
};
export default BlogDetail;
