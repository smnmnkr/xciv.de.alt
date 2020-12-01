// const purgecss = require("@fullhuman/postcss-purgecss");

// postcss.config.js
module.exports = {
  plugins: [
    require("tailwindcss")("./tailwind.config.js"),
    require("autoprefixer")({ path: "./" }),
    ...(process.env.HUGO_ENVIRONMENT === "production"
      ? [require("@fullhuman/postcss-purgecss")({ content: ["./**/*.html"] })]
      : []),
  ],
};
