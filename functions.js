function checkCashRegister(price, cash, cid) {
  
  let currencyValue = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
  let totalCash = 0;
  let j = 0;
  let test = 0;
  let du = cash-price;
  let change = {
    status : '',
    change : []
  };
  for (let i = 0; i<cid.length; i++) {
    totalCash += (cid[i][1]);
    totalCash = Math.round(totalCash * 100)/100;
  }

  if (totalCash < du) {
    change.status = "INSUFFICIENT_FUNDS";
  } else if (totalCash == du) {
    change.status = "CLOSED";
    change.change = cid;
  } else {
    change.status = "OPEN";
    for (let i = cid.length - 1; i >= 0; i--) {
      if (currencyValue[i] <= du) {
        while ((currencyValue[i]  <= du) && (cid[i][1] > 0)) {
          j += currencyValue[i];
          du -= currencyValue[i];
          du = Math.round(du*100)/100
          cid[i][1] -= currencyValue[i];
        }
        change.change.push(cid[i]);
        change.change[change.change.length -1][1] = j;
        cid[i] -= j;
        j = 0;
      }
    }
    for (let i = 0; i<change.change.length; i++) {
      test += change.change[i][1];
    }
    if (test < du) {
      change.status = "INSUFFICIENT_FUNDS";
      change.change = [];
    }
    
  }
  return change;
}
