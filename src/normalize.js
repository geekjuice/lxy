module.exports = data =>
  data.reduce(
    (outer, { rows }) => ({
      ...outer,
      ...rows.reduce(
        (inner, { name, href }) => ({
          ...inner,
          [name]: href,
        }),
        {}
      ),
    }),
    {}
  );
