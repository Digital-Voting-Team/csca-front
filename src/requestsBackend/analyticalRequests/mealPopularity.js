function GetDataDict(orderItemList, mealList) {
  let dict = {};
  for (let i = 0; i < orderItemList.length; i++){
    let id = orderItemList[i].meal_id
    if (id <= 0){
      continue;
    }
    let key = GetMealNameById(mealList, id);
    if (!(key in dict)){
      dict[key] = 0;
    }
    dict[key]++;
  }
  return dict;
}

function GetMealNameById(mealList, id) {
  for (let i = 0; i < mealList.length; i++) {
    if (mealList[i].id === id) {
      return mealList[i].meal_name;
    }
  }
  return "";
}

export default GetDataDict
