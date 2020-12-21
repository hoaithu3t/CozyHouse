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

// const getCustomer = async ({ filterName, filterEmail, sorting, skipCount, maxResultCount }) => {
const getCustomers = async () => {

  const customer = await User.aggregate()
    // .match({ username: filterName})
    // .find({text: {$search: filterName}})
    // .match({ username: filterName , email : filterEmail })
    // .skip(0)
    .limit(100)
    .exec();
  return customer;
};

const getCustomer = async (id) => {
  const customer = await User.findOne({
    _id: id,
  });
  return customer
};

const updateCustomer = async (id, customer) => {
  const newCustomer = await User.findOneAndUpdate({ _id: id }, { ...customer, status: StatusCustomer.NotApprove }, {
    new: true,
  });
  return newCustomer;
};

const approveCustomer = async (id) => {
  const newCustomer = await User.findOneAndUpdate({ _id: id }, {status: StatusCustomer.Approve}, {
    new: true,
  });
  return newCustomer;
};

const rejectCustomer = async (id, reason) => {
  const newCustomer = await User.findOneAndUpdate({ _id: id }, {status: StatusCustomer.Reject, reasonReject: reason}, {
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
  console.log(newCustomer2)
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
