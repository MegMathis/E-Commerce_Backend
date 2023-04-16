const router = require("express").Router();
const { Category, Product } = require("../../models");
const { update } = require("../../models/Product");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  const categories = await Category.findAll({
    // be sure to include its associated Products
    include: [
      {
        model: Product,
        attributes: ["product_name", "price", "stock"],
      },
    ],
  });

  res.send(categories);
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  const categoryId = req.params.id;
  const oneCategory = await Category.findByPk(categoryId, {
    // be sure to include its associated Products
    include: [
      {
        model: Product,
        attributes: ["product_name", "price", "stock"],
      },
    ],
  });
  res.send(oneCategory);
});

router.post("/", async (req, res) => {
  // create a new category
  const categoryData = req.body;
  const newCategory = await Category.create(categoryData);

  res.send(newCategory);
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  const category_id_update = req.body;
  const updateCategory = await Category.update(category_id_update, {
    where: {
      id: req.params.id,
    },
  });

  res.send(updateCategory);
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  const categoryDelete = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.send(categoryDelete);
});

module.exports = router;
