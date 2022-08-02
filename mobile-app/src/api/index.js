import axios from 'axios';

export const BASE_URL = 'https://www.nepalhomes.com/api/';
export const IMAGE_URL = 'https://www.nepalhomes.com/';

// export const BASE_URL = 'https://nh.wafttech.com/api/';
// export const IMAGE_URL = 'https://nh.wafttech.com/';

// export const BASE_URL = 'http://localhost:5200/api';
// export const IMAGE_URL = 'http://localhost:5200/';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});
export const loginPost = (data) => api.post('user/login', data);
export const logoutGet = () => api.get('user/logout');
export const registerPost = (data) => {
  // console.log(data);
  return api.post('user/register', data);
};
export const forgotPasswordPost = (data) =>
  api.post('user/forgotpassword', data);
export const changePasswordPost = (data) =>
  api.post('user/changepassword', data);
export const profileGet = () => api.get('user/profile');
export const userInfoPropertyGet = () => api.get('user/info/property');
export const profilePost = (data) => {
  return api.post('user/profile', data);
};
export const verifyEmail = (data) => {
  return api.post('user/verifymail', data);
};
export const resendVerifyEmail = (data) => {
  return api.post('user/verifymail/resend', data);
};
export const forgotPasswordChange = (data) => {
  return api.post('user/resetpassword', data);
};
export const uploadPhoto = (data) => {
  const formData = new FormData();
  formData.append('file', data);
  return api.post('user/upload/photo', formData, {
    headers: { 'content-type': 'multipart/form-data' },
  });
};

export const multiplePhoto = (data) => {
  const formData = new FormData();
  formData.append('file', data);
  return api.post('media/multiple/media', formData, {
    headers: { 'content-type': 'multipart/form-data' },
  });
};
export const newsGet = (page) => api.get(`blog/public?size=5&&page=${page}`);
export const newsDetailsGet = (id) => api.get(`/blog/htmlblog/${id}`);
export const newsLatestGet = () =>
  api.get('blog/latest/5d0a07f3f305de105c4fc674?&size=4');
export const highlightedNewsGet = () => api.get('blog/highlight');
export const optionsGet = (parameter) =>
  api.get(`blog/blogbycat/${parameter}?`);
export const blogCatGet = () => api.get('blog/category?is_active=true');
export const recentpropertyGet = () => api.get('property/public/data?size=5');
export const recentpropertyGetAll = (page) =>
  api.get(`property/public/data?size=6&&page=${page}`);
export const hotPropertyGet = () => api.get('property/type/hot_property');
export const hotPropertyGetAll = () =>
  api.get('property/public/data?&find_is_premium=true');
export const trendingPropertyGet = () =>
  api.get('property/type/featured_property');
export const trendingPropertyGetAll = () =>
  api.get('property/public/data?&find_is_featured=true');
export const searchProperty = (query) =>
  api.get(`property/public/data?size=8&&${query}`);
export const detailProperty = (parameter) =>
  api.get(`property/public/data/${parameter}`);
export const enums = () => api.get('enum');
export const propertyPost = (data) => api.post('property', data);
export const locationGet = () => api.get('static/nepal/all');
export const projectGet = () => api.get('property/public/project?size=5');
export const projectGetAll = () => api.get('property/public/project');
export const wantedPropertyGet = () => api.get('myrequest/public?size=5');
export const wantedPropertyGetAll = () => api.get('myrequest/public');
export const facebookLogin = (data) => {
  return api.post('user/login/facebook', data);
};

export const googleLogin = (data) => {
  return api.post('user/login/google', data);
};
export const favouriteData = (data) => {
  const newData = {
    ...data,
    is_favourite: !data.is_favourite,
  };
  return api.post('/favorite', newData);
};
export const favouriteDataGet = (parameter) => {
  return api.get(`favorite/${parameter}`);
};
export const favoriteGet = () => {
  return api.get('favorite/');
};
export const myPropertyGet = () => {
  return api.get('property?&find_is_project=');
};
export const commentGet = (id) =>
  api.get(`comment/comment/property/${id}/user`);
export const newsCommentGet = (id) =>
  api.get(`comment/comment/blog/${id}/user`);
export const otherCommentGet = (id) => api.get(`comment/comment/blog/${id}`);
export const commentPost = ({ id, comment }) => {
  return api.post(`comment/comment/property/${id}`, comment);
};
export const editCommentPost = ({ id, comment }) =>
  api.post(`comment/comment/property/${id}`, comment);

export const deleteComment = (id) => api.delete(`comment/${id}`);
export const offerPost = ({ id, offer }) => {
  return api.post(`property/offer/${id}`, offer);
};
export const newsCommentPost = ({ id, comment }) => {
  return api.post(`comment/comment/blog/${id}`, comment);
};
export const myrequest = (data) => {
  return api.post('myrequest/', data);
};
export const bankDetailsGet = (page) =>
  api.get(`bankDetailForLoan?page=${page}`);

export const applyLoanPost = (data) => api.post('form', data);

export const homeSliderGet = () => api.get('slider/key/home-slider');

export const agencyGet = (id) => api.get(`agency/public/${id}`);

export const propertyByAgent = (id) =>
  api.get(`property/public/data?size=5&&agency_id=${id}`);

export const propertyByAgentAll = (id) =>
  api.get(`property/public/data?agency_id=${id}`);
