const articlesRouter = require("express").Router();
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require("../controllers/articles");

articlesRouter.get("/", getArticles);
articlesRouter.post("/", createArticle);
articlesRouter.delete("/:_id", deleteArticle);

module.exports = articlesRouter;
