import { createSelector } from 'reselect';

const selectNews = state => state.news;

export const selectData = createSelector(
  [selectNews],
  news => news.newsData,
);
export const selectLatestNews = createSelector(
  [selectNews],
  news => news.newsLatest,
);
export const selectLoading = createSelector(
  [selectNews],
  news => news.loading,
);
export const selectLoadMore = createSelector(
  [selectNews],
  news => news.isLoadMore,
);
export const selectLatestLoading = createSelector(
  [selectNews],
  news => news.latestNewsLoading,
);
export const selectBlogCategory = createSelector(
  [selectNews],
  news => news.blogCategory,
);
export const selectComment = createSelector(
  [selectNews],
  news => news.newsCommentPost,
);
export const selectCommentData = createSelector(
  [selectComment],
  news => news.title,
);
export const selectGetComment = createSelector(
  [selectNews],
  news => news.commentGet,
);
export const selectNewsDetails = createSelector(
  [selectNews],
  news => news.newsDetails,
);
export const selectOthersComment = createSelector(
  [selectNews],
  news => news.othersCommentGet,
);