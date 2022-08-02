const getRestFromDaam = totalDaam => {
  let ropani = 0;
  let anna = 0;
  let paisa = 0;
  let daam = 0;

  if (totalDaam < 4) {
    daam = totalDaam;
  } else {
    daam = totalDaam % 4;
    paisa = totalDaam / 4;
    if (paisa >= 4) {
      anna = paisa / 4;
      paisa %= 4;
      if (anna >= 16) {
        ropani = anna / 16;
        anna %= 16;
      }
    }
  }
  return [ropani, anna, paisa, daam];
};

const getRestFromDhur = totalDhur => {
  let bigha = 0;
  let katha = 0;
  let dhur = 0;

  if (totalDhur < 20) {
    dhur = totalDhur;
  } else {
    dhur = totalDhur % 20;
    katha = totalDhur / 20;
    if (katha >= 20) {
      bigha = katha / 20;
      katha %= 20;
    }
  }
  return [bigha, katha, dhur];
};

export const sqFeetToRopaniSet = sqFt => {
  const daamValue = sqFt / 21.39; // 1 Daam (दाम) = 1.99 m² = 21.39 sq. ft.
  return getRestFromDaam(daamValue);
};
export const sqFeetToBighaSet = sqFt => {
  const dhurValue = sqFt / 182.25; // 1 Dhur (धुर) = 16.93 m² = 182.25 sq.ft.
  return getRestFromDhur(dhurValue);
};
