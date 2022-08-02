const size_default = 10;

const assignPage = (queryPage) => {
  if (queryPage && !isNaN(queryPage) && queryPage != 0) {
    return (page = Math.abs(queryPage));
  } else {
    return (page = 1);
  }
};
const assignSize = (querySize) => {
  if (querySize && !isNaN(querySize) && querySize != 0) {
    return (size = Math.abs(querySize));
  } else {
    return (size = size_default);
  }
};

const assignQuerySort = (querySort) => {
  if (querySort) {
    let sortfield = querySort.slice(1);
    let sortby = querySort.charAt(0);
    if (sortby == 1 && !isNaN(sortby) && sortfield) {
      //one is ascending
      return (sortQuery = sortfield);
    } else if (sortby == 0 && !isNaN(sortby) && sortfield) {
      //zero is descending
      return (sortQuery = '-' + sortfield);
    } else {
      return (sortQuery = '');
    }
  }
};

module.exports = { assignPage, assignSize, assignQuerySort };
