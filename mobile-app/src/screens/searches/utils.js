export const formatToNepaliStyle = amt => {
  if (!amt) {
    return '0';
  }
  const amtStr = `${amt}`;
  const indexOfPeriod = amtStr.indexOf('.');
  let sliceIndex = indexOfPeriod - 1;
  if (indexOfPeriod === -1) {
    sliceIndex = amtStr.length - 1;
  }
  const part1 = amtStr.slice(0, sliceIndex);
  const part2 = amtStr.slice(sliceIndex);
  const withCommas = part1.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return `${withCommas}${part2}`;
};

export const formatAmount = value => {
  return `Rs. ${formatToNepaliStyle(value)}`;
};
