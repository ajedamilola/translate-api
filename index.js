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
  const { word,languageCode } = req.params;
  res.set("powered-by","google-translate-api-x");

  translate(word, {
    to: languageCode,
  })
    .then((translated) => res.send(translated.text))
    .catch((err) => res.status(403).json({ error: err }));
});
