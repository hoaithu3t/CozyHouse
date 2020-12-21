const fs = require("fs");
const path = require("path");
const { SetCard } = require("../models/setCard");
const ERROR = require("../types/error");

const createSetCard = (user, setCard) => {
  // const user = {
  //   _id: "5ebd54d5034aef3d44d67220",
  //   username: "dvtam99",
  // };
  const newSetCard = new SetCard({
    title: setCard.title,
    avatar: setCard.avatar,
    date_create: new Date(),
    author: user._id,
    empty: setCard.empty,
    finish: setCard.finish,
    folder: setCard.folder,
    description: setCard.description,
    detail: setCard.detail,
  });
  newSetCard.generateSlug();
  const rootFolderPath = `${path.join(__dirname, "/..")}`;
  const postFolderPath = `/public/set_card/${user.username}`;

  fs.mkdirSync(rootFolderPath + postFolderPath, { recursive: true });
  fs.writeFileSync(
    rootFolderPath + postFolderPath + `/${newSetCard.slug}.md`,
    setCard.content
  );
  newSetCard.contentFilePath = postFolderPath + `/${newSetCard.slug}.md`;
  return newSetCard.save();
};

const searchSetCard = async (title) => {
  const setCard = await SetCard.aggregate()
    .limit(10)
    .match({ title: title })
    .sort({ createdAt: -1 })
    .lookup({
      from: "users",
      localField: "author",
      foreignField: "_id",
      as: "author",
    })
    .unwind("author")
    .exec();
  return setCard;
};

const getListSetCard = async (idUser) => {
  const setCard = await SetCard.aggregate()
    .limit(100)
    // .match({ author: idUser })
    .sort({ createdAt: -1 })
    .lookup({
      from: "users",
      localField: "author",
      foreignField: "_id",
      as: "author",
    })
    .unwind("author")
    .exec();
  return setCard;
};

const getSetCard = async (slug) => {
  const setCard = await SetCard.aggregate()
    .match({ slug: slug })
    .limit(1)
    .lookup({
      from: "users",
      localField: "author",
      foreignField: "_id",
      as: "author",
    })
    .unwind("author")
    .exec();
  return setCard[0];
};

const updateSetCard = async (id, setCard) => {
  const newSetCard = await SetCard.findOneAndUpdate({ _id: id }, setCard, {
    new: true,
  });
  return newSetCard;
};
const deleteSetCard = async (id) => {
  const newSetCard = await SetCard.findOne({
    _id: id,
  });
  if (!newSetCard) throw new Error(ERROR.SET_CARD_NOT_EXISTED);
  await SetCard.deleteOne({ _id: id });
  return true;
};

module.exports = {
  createSetCard,
  getListSetCard,
  getSetCard,
  deleteSetCard,
  updateSetCard,
  searchSetCard,
};
