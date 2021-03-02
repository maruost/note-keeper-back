const notesRouter = require("express").Router();
const { showAllNotes, saveNote, deleteNote } = require("../controllers/notes");
const { celebrate, Joi } = require("celebrate");

notesRouter.get("/", showAllNotes);

notesRouter.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      language: Joi.string().required(),
      letter: Joi.string().required(),
      section: Joi.string().required(),
      title: Joi.string().required(),
      link: Joi.string(),
      description: Joi.string().required(),
    }),
  }),
  saveNote
);

notesRouter.delete(
  "/:noteId",
  celebrate({
    params: Joi.object().keys({
      articleId: Joi.string().hex().length(24),
    }),
  }),
  deleteNote
);

module.exports = notesRouter;
