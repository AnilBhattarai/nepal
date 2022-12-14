import React from 'react';
import PropTypes from 'prop-types';

export default class DateInput extends React.PureComponent {
  static propTypes = {
    birth_date: PropTypes.string,
    onDateChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    if (props.birth_date) {
      const date = props.birth_date.split('-');
      this.state = {
        year: +date[0],
        month: +date[1],
        day: +date[2],
      };
    } else {
      this.state = {
        year: '',
        month: '',
        day: '',
      };
    }
    // create array of dates from 1900 to this year for dateofbirth type case
    const now = new Date();
    const thisYear = now.getFullYear();
    const numberOfYearOptions = thisYear - 1899;
    this.dateOptions = Array(numberOfYearOptions)
      .fill(thisYear)
      .map((each, index) => ({
        value: `${each - index}`,
        text: `${each - index}`,
      }));

    const numberOfDayOptions = 31;
    this.dayOptions = Array(numberOfDayOptions)
      .fill(1)
      .map((each, index) => ({
        value: `${each + index}`,
        text: `${each + index}`,
      }));
  }

  static getDerivedStateFromProps(props, state) {
    if (`${state.year}-${state.month}-${state.day}` !== props.birth_date) {
      // console.log(
      //   `${state.year}-${state.month}-${state.day}`,
      //   props.birth_date,
      // );
      const [year, month, day] = props.birth_date.split('-');
      return {
        year,
        month,
        day,
      };
    }
    return null;
  }

  updateDate = date => {
    // set state date update from date;
  };

  handleChange = key => e => {
    e.persist();
    this.setState(state => {
      const oldState = state;
      oldState[key] = e.target.value;
      const { year, month, day } = oldState;
      if (year && month && day) {
        const date = new Date(`${year}-${month}-${day}`);
        const isValid = Boolean(+date) && String(date.getDate()) === day;
        if (isValid) {
          this.props.onDateChange(`${year}-${month}-${day}`);
        } else {
          const newYear = date.getFullYear();
          const newMonth = date.getMonth() + 1;
          const newDay = date.getDate();
          this.props.onDateChange(`${newYear}-${newMonth}-${newDay}`);
          return { year: newYear, month: newMonth, day: newDay };
        }
        return { [key]: e.target.value };
      }
      return null;
    });
  };

  render() {
    const { year, month, day } = this.state;
    return (
      <>
        <div className="flex">
          <select
            className="inputbox w-1/3 mr-2"
            value={year}
            onChange={this.handleChange('year')}
            onBlur={this.handleChange('year')}
          >
            <option disabled="" value="">
              Year
            </option>
            {this.dateOptions.map(each => (
              <option key={`year-${each.text}`} value={each.value}>
                {each.text}
              </option>
            ))}
          </select>
          <select
            className="inputbox w-1/3 mr-2"
            value={month}
            onChange={this.handleChange('month')}
            onBlur={this.handleChange('month')}
          >
            <option disabled="" value="">
              Month
            </option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <select
            className="inputbox w-1/3"
            value={day}
            onChange={this.handleChange('day')}
            onBlur={this.handleChange('day')}
          >
            <option disabled="" value="">
              Day
            </option>
            {this.dayOptions.map(each => (
              <option key={`day-${each.text}`} value={each.value}>
                {each.text}
              </option>
            ))}
          </select>

        </div>
      </>
    );
  }
}
