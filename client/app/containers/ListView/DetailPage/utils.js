export const formatAmount = value => {
  const amount = +value;
  return `Rs. ${Intl.NumberFormat('en-IN', {
    // maximumSignificantDigits: 3,
  }).format(amount)}`;
};

export const trimDecimal = value => Math.floor(value * 100) / 100;

export const MONTH = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const MONTH_OPTIONS = [
  { value: '0', text: 'January' },
  { value: '1', text: 'February' },
  { value: '2', text: 'March' },
  { value: '3', text: 'April' },
  { value: '4', text: 'May' },
  { value: '5', text: 'June' },
  { value: '6', text: 'July' },
  { value: '7', text: 'August' },
  { value: '8', text: 'September' },
  { value: '9', text: 'October' },
  { value: '10', text: 'November' },
  { value: '11', text: 'December' },
];

const thisYear = new Date().getFullYear();
const thisYearToNext10Years = Array(20)
  .fill(null)
  .map((_, index) => thisYear - 1 + index);

export const YEAR_OPTIONS = thisYearToNext10Years.map(each => ({
  value: `${each}`,
  text: `${each} AD`,
}));
