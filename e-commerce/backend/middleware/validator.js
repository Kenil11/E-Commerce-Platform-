const validator = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      const error = new Error(
        result.error?.issues?.map((issues) => issues.message),
      );
      error.statusCode = 400;

      return next(error);
    }

    req.body = result.data.body;
    req.params = result.data.params;
    req.query = result.data.query;

    next();
  };
};

module.exports = validator;
