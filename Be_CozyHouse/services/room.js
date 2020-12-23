const fs = require("fs");
const path = require("path");
const { Room } = require("../models/room");
const ERROR = require("../types/error");

const createRoom = (user, room) => {
  const newRoom = new Room({
    title: room.title,
    img: room.avatar,
    date_create: new Date(),
    author: user._id,
    username: user.username,
    address: room.address,
    nearbyPlace: room.nearbyPlace,
    typeOfRoom: room.typeOfRoom,
    numberOfRoom: room.numberOfRoom,
    price: room.price,
    rentalTime: room.rentalTime,
    area: room.area,
    electricWaterPrice: room.electricWaterPrice,
    equipment: room.equipment, //not oke
    inputtimeRemain: room.timeRemain,
    timeRemain: room.timeRemain,
    status: 0,
    availability: room.availability,
    expired: room.expired,
    description: room.description,
  });
  newRoom.generateSlug();
  const rootFolderPath = `${path.join(__dirname, "/..")}`;
  const postFolderPath = `/public/room/${user.username}`;

  fs.mkdirSync(rootFolderPath + postFolderPath, { recursive: true });
  fs.writeFileSync(
    rootFolderPath + postFolderPath + `/${newRoom.slug}.md`,
    "insert oke"
  );
  newRoom.contentFilePath = postFolderPath + `/${newRoom.slug}.md`;
  return newRoom.save();
};

const findRoom = async (user, filter) => {
  const { filterTitle, skipCount, maxResultCount, filterRoomStatus } = filter.querys;

  var totalCount;
  await Room.aggregate().match({ author: user._id }).exec(function (err, results) {    
    totalCount = results.length
  });
  var room = await Room
    .find({
       $and: [
      { title: {$regex: new RegExp(`.*${filterTitle}.*`), $options: "i"}},
      { author: user._id },
      ]
    })  
    .skip(Number(skipCount))
    .limit(Number(maxResultCount))
    .exec();
  if (filterRoomStatus !== undefined) {
   room = room.filter(r => r.status === Number(filterRoomStatus))
  }
  return {totalCount, room };
};

const getListRoom = async (user) => {
  const room = await Room.aggregate()
    .limit(100)
    .match({ author: user._id })
    .exec();
  return room;
};

const searchRoom = async (filter) => {
  const { filterTitle, skipCount, maxResultCount } = filter;
   var totalCount;
  await Room.find().exec(function (err, results) {    
    totalCount = results.length
  });
  const room = await Room
    .find({
       $and: [
        { title: { $regex: new RegExp(`.*${filterTitle}.*`), $options: "i" } },
        //  { expired: false }
         // chưa chỉnh hạn đăng bai
      ]
    })  
    .skip(Number(skipCount))
    .limit(Number(maxResultCount))
    .exec();
  return { totalCount, room };
};


const getRoom = async (id) => {
  const room = await Room.findOne({
    _id: id,
  });
  return room;
};

const updateRoom = async (id, room) => {
  const newRoom = await Room.findOneAndUpdate({ _id: id }, room, {
    new: true,
  });
  return newRoom;
};

const approveRoom = async (id) => {
  const newRoom = await Room.findOneAndUpdate({ _id: id }, {status: 1}, {
    new: true,
  });
  return newRoom;
};

const getDetailRoom = async (id) => {
  const rooms = await Room.find({ _id: id, expired: false }).exec();
  return rooms
}

const rejectRoom = async (id, reason) => {
  const newRoom = await Room.findOneAndUpdate({ _id: id }, {status: 2, reasonReject: reason}, {
    new: true,
  });
  return newRoom;
};

const changeAvailabilityRoom = async (id) => {
  const newRoom = await Room.findOneAndUpdate({ _id: id }, {availability: !availability}, {
    new: true,
  });
  return newRoom;
};

const reportRoom = async (id) => {
  const newRoom = await Room.findOneAndUpdate({ _id: id }, {report: true}, {
    new: true,
  });
  return newRoom;
};

const deleteRoom = async (id) => {
  const newRoom = await Room.findOne({
    _id: id,
  });
  if (!newRoom) throw new Error(ERROR.SET_CARD_NOT_EXISTED);
  await Room.deleteOne({ _id: id });
  return true;
};

module.exports = {
  createRoom,
  getListRoom,
  getRoom,
  deleteRoom,
  updateRoom,
  approveRoom,
  rejectRoom,
  getDetailRoom,
  changeAvailabilityRoom,
  reportRoom,
  searchRoom,
  findRoom
};
