function GetDataDict(deliveryList) {
  let dict = {};

  for (let i = 1; i <= 12; i++) {
    dict[i] = 0;
  }

  for (let i = 0; i < deliveryList.length; i++) {
    let key = Number(deliveryList[i].delivery_date[5] + deliveryList[i].delivery_date[6]);
    dict[key]++;
  }
  return dict;
}

export default GetDataDict
