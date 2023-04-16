// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Make sure you set up foreign key relationships that match the column
// we created in the respective models

// Products belongsTo Category -> category can have multiple products
// but a product can only belong to one category
// onDelete null -> allows for the foreign key to be set NULL if
// the parent record is deleted.  Helps with consistency of DB
Product.belongsTo(Category, {
  foreignKey: "category_id",
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "category_id",
});

// Products belongToMany Tags (through ProductTag)
// Using the ProductTag through model, allow products to have
// multiple tags and tags to have many products
Product.belongsToMany(Tag, {
  through: ProductTag,
  as: "tags",
  foreignKey: "product_id",
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  as: "products",
  foreignKey: "tag_id",
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
