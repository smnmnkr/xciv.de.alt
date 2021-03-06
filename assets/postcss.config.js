// postcss.config.js
module.exports = {
  plugins: [
    require("tailwindcss")("./assets/tailwind.config.js"),
    require("autoprefixer")({ path: "./" }),
    ...(process.env.HUGO_ENVIRONMENT === "production"
      ? [
          require("@fullhuman/postcss-purgecss")({
            content: ["./**/*.html"],
            defaultExtractor: (content) => {
              // Capture as liberally as possible, including things like `h-(screen-1.5)`
              const broadMatches =
                content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];

              // Capture classes within other delimiters like .block(class="w-1/2") in Pug
              const innerMatches =
                content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];

              return broadMatches.concat(innerMatches);
            },
          }),
        ]
      : []),
  ],
};
