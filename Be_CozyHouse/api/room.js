const authMdw = require("../middleware/auth");
const {
  createRoom,
  getRoom,
  updateRoom,
  deleteRoom,
  getListRoom,
  getDetailRoom,
  approveRoom,
  rejectRoom,
  changeAvailabilityRoom,
  reportRoom,
  getRoomManyView,
  searchRoom,
  findRoom,
} = require("../services/room");

const router = require("express").Router();

router.post("/", authMdw(), (req, res) => {
  createRoom(req.user, req.body).then((room) => res.json(room));
});

router.get("/", authMdw({ optional: false }), (req, res) => {
  getListRoom(req.user).then((rooms) => {
    res.json(rooms);
  });
});

router.get("/roomManyView", (req, res) => {
  getRoomManyView().then((rooms) => {
    res.json(rooms);
  });
});

router.post("/find",authMdw(), (req, res) => {
    findRoom(req.user, req.body).then((result) => {
    res.json(result);
  });
});

router.get("/search", (req, res) => {
    searchRoom(req.query).then((result) => {
    res.json(result);
  });
});
router.get("/:id",authMdw({ optional: true }), (req, res) => {
  const { id } = req.params;
  getRoom(id).then((room) => res.json(room));
});

router.get("detail/:id",authMdw({ optional: false }), (req, res) => {
  const { id } = req.params;
  getDetailRoom(id).then((room) => res.json(room));
});

router.put("/:id", authMdw(), (req, res) => {
    const { id } = req.params;
  updateRoom(id, req.body).then((newRoom) => {
    res.json(newRoom);
  });
});

router.post("/:id/approve", (req, res) => {
  approveRoom(req.params.id).then((newRoom) => {
    res.json(newRoom);
  });
});

router.post("/:id/reject", (req, res) => {
  rejectRoom(req.params.id, req.body.reason).then((newRoom) => {
    res.json(newRoom);
  });
});

router.post("/:id/changeAvailability", (req, res) => {
  changeAvailabilityRoom(req.params.id).then((newRoom) => {
    res.json(newRoom);
  });
});

router.post("/:id/report", (req, res) => {
  reportRoom(req.params.id).then((newRoom) => {
    res.json(newRoom);
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  deleteRoom(id)
    .then((room) => res.json({ success: true }))
    .catch((err) => res.json({ success: false, err: err.message }));
});
module.exports = router;
