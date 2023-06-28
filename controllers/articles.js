const Article = require("../models/article");
const BadRequestError = require("../errors/bad-request-error");
const ForbiddenError = require("../errors/forbidden-error");
const NotFoundError = require("../errors/not-found-error");
const { STATUS_CODES, ERROR_MESSAGES } = require("../utils/constants");

const getArticles = (req, res, next) => {
  const owner = req.user._id;

  Article.find({ owner })
    .then((articles) => res.status(STATUS_CODES.ok).send({ data: articles }))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text: description,
    date: publishedAt,
    source,
    link: url,
    image: urlToImage,
    owner,
  } = req.body;

  Article.create({
    keyword,
    title,
    description,
    publishedAt,
    source,
    url,
    urlToImage,
    owner,
  })
    .then((article) => res.status(STATUS_CODES.created).send({ data: article }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(ERROR_MESSAGES.articlebadRequest));
      } else {
        next(err);
      }
    });
};

const deleteArticle = (req, res, next) => {
  const articleId = req.params._id;
  const userId = req.user._id;

  Article.findById(articleId)
    .orFail(new NotFoundError(ERROR_MESSAGES.articleNotFound))
    .select("+owner")
    .then((article) => {
      const { owner } = article;
      if (userId === owner) {
        return article
          .deleteOne()
          .then(() => res.send({ message: "Card Deleted" }));
      }
      return next(new ForbiddenError(ERROR_MESSAGES.deleteArticle));
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
