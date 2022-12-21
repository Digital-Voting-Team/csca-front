function GetDataDict(staffList, orderList) {
  let dict = {};
  for (let i = 0; i < orderList.length; i++){
    let key = GetStaffNameById(staffList, orderList[i].staff_id);
    if (!(key in dict)){
      dict[key] = 0;
    }
    dict[key]++;
  }
  return dict;
}

function GetStaffNameById(staffList, id) {
  for (let i = 0; i < staffList.length; i++) {
    if (staffList[i].id === id) {
      return staffList[i].person.name;
    }
  }
  return "";
}

export default GetDataDict
