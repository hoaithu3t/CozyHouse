const router = require("express").Router();
const { query } = require("express");
const {
  getCustomers,
  getCustomer,
  getAllCustomers,
  updateCustomer,
  approveCustomer,
  rejectCustomer,
  deleteCustomer
} = require("../services/customer");
const {
  register,
}= require("../services/auth");
const ERROR = require("../types/error");

router.get("/", (req, res) => {
  getAllCustomers().then((customers) => {
    res.json(customers);
  });
});

router.get("/find", (req, res) => {
    getCustomers(req.query).then((result) => {
    res.json(result);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  getCustomer(id).then((customer) => {
    res.json(customer);
  });
});

router.post("/", (req, res) => {
  register(req.body).then((customer) => res.json(customer));
});

router.put("/:id", (req, res) => {
  updateCustomer(req.params.id, req.body).then((newCustomer) => {
    res.json(newCustomer);
  });
});

router.post("/:id/approve", (req, res) => {
  approveCustomer(req.params.id).then((newCustomer) => {
    res.json(newCustomer);
  });
});

router.post("/:id/reject", (req, res) => {
  rejectCustomer(req.params.id, req.body.reason).then((newCustomer) => {
    res.json(newCustomer);
  });
});


router.delete("/:id", (req, res) => {
  const { id } = req.params;
  deleteCustomer(id)
    .then((customer) => res.json({ success: true }))
    .catch((err) => res.json({ success: false, err: err.message }));
});


module.exports = router;
