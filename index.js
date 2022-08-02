const express = require("express");
const translate = require("google-translate-api-x");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(require("cors")());
app.listen(process.env.PORT || 5000, () => {
  console.log("Express Server Started");
});

//routes
app.get("/:word/:languageCode", (req, res) => {
  const { word, languageCode } = req.params;
  res.set("powered-by", "google-translate-api-x");
  res.set("created-by", "Aje Damilola github.com/ajedamilola");
  res.set("Cache-Control", "public, max-age=604800, immutable")

  translate(word, {
    to: languageCode,
    client: "gtx",
  })
    .then((translated) => res.send(translated.text))
    .catch((err) => {
      console.log(err)
      res.status(403).json({ error: err });
    });
});
