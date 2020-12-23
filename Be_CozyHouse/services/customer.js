const fs = require("fs");
const path = require("path");
const { User } = require("../models/user");
const ERROR = require("../types/error");
const {
  Role,
  Gender,
  StatusCustomer
} = require("../public/customer");

const getAllCustomers = async () => {
  const customer = await User.aggregate()
    .limit(100)
    .exec();
  return customer;
};

const getCustomers = async (filter) => {
  const { filterName, filterEmail, skipCount, maxResultCount, filterStatus } = filter;
  const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
  const searchRgxUserName = rgx(filterName);
  const searchRgxEmail = rgx(filterEmail);
  var totalCount;
  await User.find().exec(function (err, results) {    
    totalCount = results.length
  });
  var customer = await User
    .find({
    $or: [
      { username: { $regex: searchRgxUserName, $options: "i" } },
      { email: { $regex: searchRgxEmail, $options: "i" } },
      ]
    })
    .skip(Number(skipCount))
    .limit(Number(maxResultCount))
    .exec();
  if (filterStatus !== undefined) {
   customer = customer.filter(cus => cus.status === Number(filterStatus))
  }
  return {totalCount, customer };
};

const getCustomer = async (id) => {
  const customer = await User.findOne({
    _id: id,
  });
  return customer
};

const updateCustomer = async (id, customer) => {
  const newCustomer = await User.findOneAndUpdate({ _id: id }, { ...customer, status: 0 }, {
    new: true,
  });
  return newCustomer;
};

const approveCustomer = async (id) => {
  const newCustomer = await User.findOneAndUpdate({ _id: id }, {status: 1}, {
    new: true,
  });
  return newCustomer;
};

const rejectCustomer = async (id, reason) => {
  const newCustomer = await User.findOneAndUpdate({ _id: id }, {status: 2, reasonReject: reason}, {
    new: true,
  });
  return newCustomer;
};

const deleteCustomer = async (id) => {
 
  const newCustomer = await User.findOne({
    _id: id,
  });
  if (!newCustomer) throw new Error(ERROR.SET_CARD_NOT_EXISTED);
  await User.deleteOne({ _id: id });
  const newCustomer2 = await User.findOne({
    _id: id,
  });
  return true;
};

module.exports = {
  getCustomer,
  getCustomers,
  getAllCustomers,
  updateCustomer,
  approveCustomer,
  rejectCustomer,
  deleteCustomer
};
