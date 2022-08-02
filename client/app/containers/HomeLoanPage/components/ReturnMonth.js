import React, { useEffect, useState } from 'react';

const ReturnMonth = props => {
  const { month, type } = props;

  const [monthText, setMonthText] = useState('');

  useEffect(() => {
    if (type === 'BS') {
      switch (month) {
        case 1:
          setMonthText('Baisakh');
          break;
        case 2:
          setMonthText('Jestha');
          break;
        case 3:
          setMonthText('Asar');
          break;
        case 4:
          setMonthText('Shrawan');
          break;
        case 5:
          setMonthText('Bhadra');
          break;
        case 6:
          setMonthText('Asoj');
          break;
        case 7:
          setMonthText('Kartik');
          break;
        case 8:
          setMonthText('Mangsir');
          break;
        case 9:
          setMonthText('Paush');
          break;
        case 10:
          setMonthText('Magh');
          break;
        case 11:
          setMonthText('Falgun');
          break;
        case 12:
          setMonthText('Chaitra');
          break;
      }
    } else if (type === 'AD') {
      switch (month) {
        case 1:
          setMonthText('January');
          break;
        case 2:
          setMonthText('February');
          break;
        case 3:
          setMonthText('March');
          break;
        case 4:
          setMonthText('April');
          break;
        case 5:
          setMonthText('May');
          break;
        case 6:
          setMonthText('June');
          break;
        case 7:
          setMonthText('July');
          break;
        case 8:
          setMonthText('August');
          break;
        case 9:
          setMonthText('September');
          break;
        case 10:
          setMonthText('October');
          break;
        case 11:
          setMonthText('November');
          break;
        case 12:
          setMonthText('December');
          break;
      }
    }
  }, [month, type]);

  return <span>{monthText} </span>;
};

export default ReturnMonth;
