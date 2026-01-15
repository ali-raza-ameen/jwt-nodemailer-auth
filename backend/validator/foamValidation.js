const yup = require("yup");

const userSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must be less than 100 characters long")
    .trim(),

  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .trim(),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password must be less than 100 characters long")
    .trim(),
});

const userValidator = async (req, res, next) => {
  try {
    await userSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      errors: error.errors, // all validation errors
    });
  }
};

module.exports = { userValidator };
