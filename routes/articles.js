const articlesRouter = require("express").Router();
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require("../controllers/articles");
const { validateCreateArticle } = require("../middleware/validator");

articlesRouter.get("/", getArticles);
articlesRouter.post("/", validateCreateArticle, createArticle);
articlesRouter.delete("/:_id", deleteArticle);

module.exports = articlesRouter;
