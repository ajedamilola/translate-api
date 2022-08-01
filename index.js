const express = require("express");
const translate = require("google-translate-api-x");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.listen(process.env.PORT || 5000, () => {
  console.log("Express Server Started");
});

//routes
app.get("/:word", (req, res) => {
  const { word } = req.params;

  translate(word, {
    to: req.headers.language,
  })
    .then((translated) => res.json({ value: translated.text }))
    .catch((err) => res.status(403).json({ error: err }));
});
