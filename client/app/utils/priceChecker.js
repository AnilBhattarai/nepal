const priceChecker = price => {
  if (price && price !== '' && typeof price === 'number') {
    let tempPrice = price.toString();
    let formatedPrice = price;
    let text = '';

    if (tempPrice.length > 5 && tempPrice.length <= 7) {
      formatedPrice = price / 100000;
      text = 'Lakh';
    }

    if (tempPrice.length > 7) {
      formatedPrice = price / 10000000;
      text = 'Cr.';
    }

    let formatedText = formatedPrice.toString();
    if (formatedText.split('.').length === 2) {
      formatedPrice = `${formatedText.split('.')[0]}.${formatedText
        .split('.')[1]
        .split('')
        .splice(0, 2)
        .join('')}`;
    }

    return { numeral: formatedPrice, text };
  } else {
    return {
      numeral: 0,
      text: '',
    };
  }
};

export default priceChecker;
