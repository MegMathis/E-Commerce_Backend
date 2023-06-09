const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  const tags = await Tag.findAll({
    // be sure to include its associated Product data
    include: [
      {
        model: Product,
        attributes: ["product_name", "price", "stock"],
      },
    ],
  });
  res.send(tags);
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  const tagId = req.params.id;
  const oneTag = await Tag.findByPk(tagId, {
    // be sure to include its associated Product data
    include: [
      {
        model: Product,
        attributes: ["product_name", "price", "stock"],
      },
    ],
  });
  res.send(oneTag);
});

router.post("/", async (req, res) => {
  // create a new tag
  const tagData = req.body;
  const newTag = await Tag.create(tagData);

  res.send(newTag);
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  const tag_id_update = req.body;
  const updateTag = await Tag.update(tag_id_update, {
    where: {
      id: req.params.id,
    },
  });
  res.send(updateTag);
});

// router.delete("/:id", async (req, res) => {
//   // delete on tag by its `id` value
//   const tagDelete = await Tag.destroy({
//     where: {
//       id: req.params.id,
//     },
//   });
//   res.status(tagDelete);
// });

router.delete("/:id", (req, res) => {
  // delete a tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((tagDelete) => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500).send({ error: "Did not delete tag " + err });
    });
});

module.exports = router;
