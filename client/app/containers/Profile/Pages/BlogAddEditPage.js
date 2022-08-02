import React from 'react';
import SideMenu from '../Components/SideMenu';
import BlogAdd from '../Components/BlogPage/AddEditPage/Loadable';

const BlogAddPage = props => {
  console.log(
    props.match && props.match.params && props.match.params.slug_url,
    'slug_url',
  );
  return (
    <BlogAdd
      slug_url={
        props.match && props.match.params ? props.match.params.slug_url : null
      }
    />
  );
};

export default BlogAddPage;
