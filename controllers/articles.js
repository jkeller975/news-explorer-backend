const Article = require("../models/article");
const BadRequestError = require("../errors/bad-request-error");
const ForbiddenError = require("../errors/forbidden-error");
const NotFoundError = require("../errors/not-found-error");

const getArticles = (req, res, next) => {
  const owner = req.user._id;

  Article.find({ owner })
    .then((articles) => res.status(200).send({ data: articles }))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    description,
    publishedAt,
    source,
    url,
    urlToImage,
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
    .then((article) => res.status(201).send({ data: article }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Bad Request"));
      } else {
        next(err);
      }
    });
};

const deleteArticle = (req, res, next) => {
  const articleId = req.params._id;
  const userId = req.user._id;

  Article.findById(articleId)
    .orFail(new NotFoundError("Not Found"))
    .select("+owner")
    .then((article) => {
      const { owner } = article;
      if (userId === owner) {
        return article
          .deleteOne()
          .then(() => res.send({ message: "Card Deleted" }));
      }
      return next(new ForbiddenError("This is not your article to delete!"));
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
