const { z } = require("zod");
const { userTypesConstants } = require("./constants");
const {
  objectId,
  password,
  emptyObject,
} = require("../../service/zod.service");

const getAllUsers = {
  params: emptyObject,
  query: emptyObject,
  body: emptyObject,
};

const createUserSchema = z.object({
  params: emptyObject,
  query: emptyObject,
  body: z.object({
    fullName: z
      .string()
      .min(3, "The FullName should at least be of 3 characters")
      .max(100, "FullName Should not exceed 100 character"),
    email: z.email("Email is required"),
    password: password,
    age: z.number().min(18, "You are not eligible to use this app"),
    userType: z.enum(userTypesConstants),
  }),
});

const getOneUserSchema = z.object({
  params: z.object({
    id: objectId,
  }),
  query: emptyObject,
  body: emptyObject,
});

const updateUserSchema = z.object({
  params: z.object({
    id: objectId,
  }),
  query: emptyObject,
  body: z.object({
    fullName: z
      .string()
      .min(3, "The FullName should at least be of 3 characters")
      .max(100, "FullName Should not exceed 100 character")
      .optional(),
    email: z.email("Email is required").optional(),
    password: password.optional(),
    age: z.number().min(18, "You are not eligible to use this app").optional(),
    userType: z.enum(userTypesConstants).optional(),
  }),
});

const deleteUser = z.object({
  params: z.object({
    id: objectId,
  }),
  query: emptyObject,
  body: emptyObject,
});

module.exports = {
  createUserSchema,
  getOneUserSchema,
  updateUserSchema,
  deleteUser,
  getAllUsers,
};
