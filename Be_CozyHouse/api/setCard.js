const authMdw = require("../middleware/auth");
const {
  createSetCard,
  getSetCard,
  updateSetCard,
  deleteSetCard,
  getListSetCard,
  searchSetCard,
} = require("../services/setCard");

const router = require("express").Router();

router.post("/", authMdw(), (req, res) => {
  createSetCard(req.user, req.body).then((setCard) => res.json(setCard));
});

router.get("/", authMdw({ optional: true }), (req, res) => {
  console.log(req.body);
  getListSetCard(req.body).then((setCards) => {
    res.json(setCards);
  });
});

router.post("/search", authMdw({ optional: true }), (req, res) => {
  searchSetCard(req.body.title).then((setCards) => res.json(setCards));
});

router.get("/:slug", (req, res) => {
  const { slug } = req.params;
  getSetCard(slug).then((setCard) => res.json(setCard));
});

router.put("/", authMdw(), (req, res) => {
  updateSetCard(req.body._id, req.body).then((newSetCard) => {
    res.json(newSetCard);
  });
});
router.delete("/", (req, res) => {
  const id = req.body._id;
  deleteSetCard(id)
    .then((setCard) => res.json({ success: true }))
    .catch((err) => res.json({ success: false, err: err.message }));
});
module.exports = router;
