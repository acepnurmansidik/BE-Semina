const Categories = require("../../../app/api/v1/categories/model");
const { BadRequestError, NotFoundError } = require("../../errors");

const getAllCategories = async () => {
  const result = await Categories.find().select("name").lean();

  return result;
};

const createCategories = async (req) => {
  const { name } = req.body;

  // search name category
  const check = await Categories.findOne({ name });

  // if exist return error bad request
  if (check)
    throw new BadRequestError("Category name exist, cannot be duplicate!");

  const result = await Categories.create({ name });

  return result;
};

const getOneCategories = async (req) => {
  const { id } = req.params;

  const result = await Categories.findOne({ _id: id }).select("name").lean();

  if (!result) throw new NotFoundError(`No category with id: ${id}`);

  return result;
};

const updateCategories = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  // cari categories dengan field name dan id selain dari yang dikirim dari params
  const check = await Categories.findOne({ _id: { $ne: id }, name });

  /// apa bila check true / data categories sudah ada maka kita tampilkan error bad request dengan message "Category name duplicate!"
  if (check) throw new BadRequestError("Category name duplicate!");

  const result = await Categories.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );

  // jika id result false / null maka akan menampilkan error No category with id:` yang dikirim client
  if (!result) throw new NotFoundError(`No category with id: ${id}`);

  return result;
};

const deleteCategories = async (req) => {
  const { id } = req.params;

  const result = await Categories.findOne({ _id: id });

  if (!result) throw new NotFoundError(`No Category with id: ${id}`);

  await result.remove();

  return result;
};

module.exports = {
  getAllCategories,
  createCategories,
  getOneCategories,
  deleteCategories,
  updateCategories,
};
