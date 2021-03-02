const Note = require("../models/note");
const NotFoundError = require("../helpers/not-found-error");
const ForbiddenError = require("../helpers/forbidden-error");
const { errMessages } = require("../data/messages");

module.exports.showAllNotes = (req, res, next) => {
  Note.find({ owner: req.user._id })
    .then((notes) => res.status(200).send({ data: notes }))
    .catch(next);
};

module.exports.saveNote = (req, res, next) => {
  const { language, letter, section, title, link, description } = req.body;

  return Note.create({
    language,
    letter,
    section,
    title,
    link,
    description,
    owner: req.user._id,
  })
    .then((note) => {
      res.status(201).send({
        data: {
          _id: note._id,
          language: note.language,
          letter: note.letter,
          section: note.section,
          title: note.title,
          link: note.link,
          description: note.description,
        },
      });
    })
    .catch(next);
};

module.exports.deleteNote = (req, res, next) => {
  Note.findById(req.params.noteId)
    .select("+owner")
    .orFail(() => {
      throw new NotFoundError(errMessages.card);
    })
    .then((note) => {
      if (!(String(note.owner) === req.user._id)) {
        throw new ForbiddenError(errMessages.access);
      }
      note.remove();
      return res.send({
        data: {
          _id: note._id,
          language: note.language,
          letter: note.letter,
          section: note.section,
          title: note.title,
          link: note.link,
          description: note.description,
        },
      });
    })
    .catch(next);
};
