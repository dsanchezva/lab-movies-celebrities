const router = require("express").Router();
/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//rutas de lebrities
const celebritiesRouter = require("./celebrities.routes.js");
router.use("/celebrities", celebritiesRouter);

//rutas de movies
const moviesRouter = require("./movies.routes.js");
router.use("/movies", moviesRouter);

module.exports = router;
