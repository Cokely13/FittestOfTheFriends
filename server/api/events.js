const router = require("express").Router();
const {
  models: { Event, User },
} = require("../db");
module.exports = router;

const requireToken = async (req, res, next) => {
  try {
    const userData = await User.findByToken(req.headers.authorization);
    req.user = userData;
    next();
  } catch (error) {
    next(error);
  }
};

// Get all cars
router.get("/", async (req, res, next) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (err) {
    next(err);
  }
});

router.put("/update/:id", requireToken, async (req, res, next) => {
  try {
    if (req.user.dataValues.admin) {
      await Event.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.sendStatus(200);
    } else {
      return res.status(403).send("You shall not pass!");
    }
  } catch (error) {
    next(error);
  }
});

// Get single car
router.get("/:id", async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id);
    res.json(event);
  } catch (err) {
    next(err);
  }
});

// Add new car listing
router.post("/",async (req, res, next) => {
  try {
      res.status(201).send(await Event.create(req.body));

  } catch (error) {
    next(error);
  }
});

// Update a car listing
router.put("/:id", requireToken, async (req, res, next) => {
  try {
    if (req.user.dataValues.admin) {
      const event = await Event.findByPk(req.params.id);
      res.send(await event.update(req.body));
    } else {
      return res.status(403).send("You shall not pass!");
    }
  } catch (error) {
    next(error);
  }
});

// Delete a car listing
router.delete("/:id",requireToken, async (req, res, next) => {
  try {
    if (req.user.dataValues.admin) {
      const eventToDelete = await Event.findByPk(req.params.id);
      await eventToDelete.destroy();
      res.send(eventToDelete);
    } else {
      return res.status(403).send("You shall not pass!");
    }
  } catch (error) {
    next(error);
  }
});
