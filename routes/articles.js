const articlesRouter = require("express").Router();
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require("../controllers/articles");
const {
  validateCreateArticle,
  validateArticleId,
} = require("../middleware/validator");

articlesRouter.get("/", getArticles);
articlesRouter.post("/", validateCreateArticle, createArticle);
articlesRouter.delete("/:_id", validateArticleId, deleteArticle);

module.exports = articlesRouter;
