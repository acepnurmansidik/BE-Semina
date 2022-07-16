const Categories = require("./model");

const create = async (req, res, next) => {
  try {
    const { name } = req.body;

    const result = await Categories.create({ name });

    res.status(201).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await Categories.find().select("_id name");

    res.status(200).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const findDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Categories.findOne({ _id: id });

    if (!result) {
      res.status(404).json({ message: "Id category not found" });
    }

    res.status(200).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    let result = await Categories.findOne({ _id: id });
    if (!result) {
      res.status(404).json({ message: "Id category not found" });
    }

    result = await Categories.findOneAndUpdate(
      { _id: id },
      { name },
      { new: true, runValidators: true }
    );

    res.status(200).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Categories.findOneAndDelete({ _id: id });

    res.status(200).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  index,
  findDetail,
  update,
  destroy,
};
