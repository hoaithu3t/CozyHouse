const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const setCardSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  avatar: String,
  date_create: Date,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  empty: Boolean,
  publish: Boolean,
  finish: Boolean,
  folder: [{}],
  description: String,
  detail: [
    {
      card_id: {
        type: String,
        require: true,
      },
      card_title: {
        type: String,
        require: true,
      },
      card_desc: {
        type: String,
        require: true,
      },
      card_completed: {
        type: String,
        require: true,
      },
    },
  ],
  contentFilePath: String,
  slug: {
    type: String,
    required: true,
  },
});

setCardSchema.methods.generateSlug = function () {
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

const SetCard = mongoose.model("Question", setCardSchema);
module.exports = { SetCard, setCardSchema };
