const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model.js");

//GET "/celebrities/create" => crea una nueva celebrity
router.get("/create", async (req, res, next) => {
  try {
    res.render("celebrities/new-celebrity.hbs");
  } catch (err) {
    next(err);
  }
});

//POST "/celebrities/create" => conectamos con la DB añadimos los datos y redireccionamos a la lista de celebrities
router.post("/create", async (req, res, next) => {
  try {
    await Celebrity.create({
      name: req.body.name,
      occupation: req.body.occupation,
      catchPhrase: req.body.catchPhrase,
    });
    res.redirect("/celebrities");
  } catch (err) {
    next(err);
  }
});

//GET "/celebrities" => conect to the DB and list all the celebrities
router.get("/", async (req, res, next) => {
  try {
    const allCelebrities = await Celebrity.find().select({ name: 1 });
    res.render("celebrities/celebrities.hbs", { allCelebrities });
  } catch (err) {
    next(err);
  }
});

//POST "/celebrities/:id/delete" => buscar la pelicula en DB por id y borrarla
router.post("/:id/delete", async (req, res, next) => {
  try {
    await Celebrity.findByIdAndDelete(req.params.id);
    res.redirect("/celebrities");
  } catch (err) {
    next(err);
  }
});

//GET "/celebrities/:id/edit" => mostrar el formulario para editar la pelicula
router.get("/:id/edit", async (req, res, next) => {
  try {
    const findCelebrity = await Celebrity.findById(req.params.id);
    res.render("celebrities/edit-celebrity.hbs", { findCelebrity });
  } catch (err) {
    next(err);
  }
});

//POST "/celebrities/:id/edit" => mandar los cambios a la DB
router.post("/:id/edit", async (req, res, next) => {
  try {
    await Celebrity.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      occupation: req.body.occupation,
      catchPhrase: req.body.catchPhrase,
    });
    res.redirect(`/celebrities`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
