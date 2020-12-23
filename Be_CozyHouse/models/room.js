const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  img: [String],
  date_create: Date,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: {
    type: String
  },
  address: {
    type: String,
    require: true
  },
  nearbyPlace: String,
  typeOfRoom: Number,
  numberOfRoom: Number,
  price: Number,
  rentalTime: String,
  electricWaterPrice: Boolean,
  area: Number,
    bathroom: {
      type: Boolean,
      require: true,
    }, 
    electricWaterHeater: {
      type: Boolean,
      require: true
    },
      kitchen: {
        type: Number,
        require: true,
      },
      conditioner: {
        type: Boolean,
        require: true,
      },
      balcony: {
        type: Boolean,
        require: true,
      },
      otherUtility: {
        type: String,
        require: true,
      },
  inputTimeRemain: {//thời gian hiển thị (số)
        type: Number,
        require: true,
  },
  timeRemain: {//thời gian hiển thị (tuần/tháng/năm)
        type: Number,
        require: true,
  },
  status: { //duyệt bài đăng
        type: Number,
        require: true,
  },
  availability: { //sẵn sàng cho thuê
        type: Boolean,
        require: true,
  },
  expired: { //quá hạn bài đăng
        type: Boolean,
        require: true,
  },
  view: {
    type: Number
  },
  vote: {
    type: Number
  },
  report: {
    type: Boolean
  },
  reasonReject: {
    type: String
  },
  description: {
    type: String
  },
  slug: {
    type: String,
    required: true,
  },
});

roomSchema.methods.generateSlug = function () {
  let id = this._id + "";
  this.slug =
    this.title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a")
      .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e")
      .replace(/i|í|ì|ỉ|ĩ|ị/gi, "i")
      .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o")
      .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u")
      .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y")
      .replace(/đ/gi, "d")
      .replace(
        /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
        ""
      )
      .replace(/\-\-/gi, "-")
      .replace(/\-\-\-/gi, "-")
      .replace(/\-\-\-\-/gi, "-")
      .replace(/\@\-|\-\@|\@/gi, "")
      .replace(/[^\w-]+/g, "") +
    "-" +
    id.slice(-6);
};

const Room = mongoose.model("Room", roomSchema);
module.exports = { Room, roomSchema };
