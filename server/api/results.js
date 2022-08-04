const router = require("express").Router();
const {
  models: { Event, User, results },
} = require("../db");
const Result = require("../db/models/Result");
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
    const results = await Result.findAll()
      include: {model: Event}
    ;
    res.json(results);
  } catch (err) {
    next(err);
  }
});

router.put("/update/:id", requireToken, async (req, res, next) => {
  try {
    if (req.user.dataValues.admin) {
      await Results.update(req.body, {
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
    const result = await Result.findByPk(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Add new car listing
router.post("/", requireToken, async (req, res, next) => {
  try {
    if (req.user.dataValues.admin) {
      res.status(201).send(await Result.create(req.body));
    } else {
      return res.status(403).send("You shall not pass!");
    }
  } catch (error) {
    next(error);
  }
});

// Update a car listing
router.put("/:id", requireToken, async (req, res, next) => {
  try {
    if (req.user.dataValues.admin) {
      const result = await Result.findByPk(req.params.id);
      res.send(await result.update(req.body));
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
      const resultToDelete = await Result.findByPk(req.params.id);
      await resultToDelete.destroy();
      res.send(resultToDelete);
    } else {
      return res.status(403).send("You shall not pass!");
    }
  } catch (error) {
    next(error);
  }
});
