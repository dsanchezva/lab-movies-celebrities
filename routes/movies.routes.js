const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model.js");
const Movie = require("../models/Movie.model.js");

//GET "/movies/create" => renderizar el formulatio para crear una pelicula
router.get("/create", async (req, res, next) => {
  try {
    const allCelebrities = await Celebrity.find().select({ name: 1 });
    res.render("movies/new-movie.hbs", { allCelebrities });
  } catch (err) {
    next(err);
  }
});
//POST "/movies/create" => mandar los datos de la pelicula a la DB
router.post("/create", async (req, res, next) => {
  try {
    await Movie.create({
      title: req.body.title,
      genre: req.body.genre,
      plot: req.body.plot,
      cast: req.body.cast,
    });
    res.redirect("/movies");
  } catch (err) {
    next(err);
  }
});

//GET "/movies" => renderiza la lista de peliculas y conectamos con la DB para buscar solo los titulos
router.get("/", async (req, res, next) => {
  try {
    const allMovies = await Movie.find().select({ title: 1 });
    res.render("movies/movies.hbs", { allMovies });
  } catch (err) {
    next(err);
  }
});

//GET "/movies/:id" => renderiza
router.get("/:id", async (req, res, next) => {
  try {
    const oneMovie = await Movie.findById(req.params.id).populate("cast");
    console.log(oneMovie);
    res.render("movies/movie-details.hbs", { oneMovie });
  } catch (err) {
    next(err);
  }
});

//POST "/movies/:id/delete" => buscar la pelicula en DB por id y borrarla
router.post("/:id/delete", async (req, res, next) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect("/movies");
  } catch (err) {
    next(err);
  }
});

//GET "/movies/:id/edit" => mostrar el formulario para editar la pelicula
router.get("/:id/edit", async (req, res, next) => {
  try {
    const findMovie = await Movie.findById(req.params.id);
    const allCelebrities = await Celebrity.find();
    res.render("movies/edit-movie.hbs", {
      findMovie,
      allCelebrities,
    });
  } catch (err) {
    next(err);
  }
});

//POST "/movies/:id/edit" => mandar los cambios a la DB
router.post("/:id/edit", async (req, res, next) => {
  try {
    await Movie.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      genre: req.body.genre,
      plot: req.body.plot,
      cast: req.body.cast,
    });
    res.redirect(`/movies/${req.params.id}`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
