const mongoose = require("mongoose");
const moment = require("moment");

let isEmptyObject = function (body) {
  if (!body) return true;
  if (Object.keys(body).length == 0) return true;
  return false;
};

let isEmptyVar = function (value) {
  if (!value) return true;
  if (typeof value === "undefined" || value === null) return true;
  if (value.trim().length === 0) return true;
  return false;
};


let isEmpty = function (value) {
  if (typeof value === 'undefined' || value === null) return true;
  if (typeof value === 'string' && value.trim().length === 0) return true;
  return false;
}

let isValidRequestBody = function (body) {
  if (Object.keys(body).length === 0) return false;
  return true;
}

const isValidTitle = function (title) {
  return ["SuperAdmin","Admin","User"].indexOf(title) !== -1
}

const isValid = function (value) {
  if (typeof value === 'undefined' || value === null) {
      return false
  }
  //value given by user should not be undefined and null
  if (typeof value === 'string' && value.trim().length == 0) {
      return false
  }
  //value given by user should  be string and not with only space 
  return true

}

const isValidObjectId = function (objectId) {
  return mongoose.Types.ObjectId.isValid(objectId)
}

// let isValidEmail = function (email) {
//   let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   return emailRegex.test(email);
// };

// let isValidPassword = function (password) {
//   let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
//   return passwordRegex.test(password);
// };

// let isValidDateFormat = function (date) {
//   let dateFormatRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
//   return dateFormatRegex.test(date);
// };

let isValidDate = function (date) {
  return moment(date).isValid();
};

// let isValidObjectId = function (ObjectId) {
//   return mongoose.isValidObjectId(ObjectId);
// };

let isValidJSONstr = (json) => {
  try {
    return JSON.parse(json);
  } catch (_) {
    return false;
  }
};

let checkArrContent = (array, ...isContentArray) => {
  let count = 0;
  array.forEach((e) => {
    if (!isContentArray.includes(e)) count++;
  });
  return count == 0 ? true : false;
};

module.exports = {
  isEmptyObject,
  isEmptyVar,
  // isValidEmail,
  // isValidPassword,
  isValidObjectId,
  // isValidDateFormat,
  isValidDate,
  isValidJSONstr,
  checkArrContent,
  isEmpty,
  isValidRequestBody,
  isValidTitle,
  isValid

};
