const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

// Connect mongodb
mongoose.connect(keys.mongoURI);

const app = express();

// Use cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

// routes
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

// Ensure express behaves corrently on production
if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets like main.js or main.css
  app.use(express.static("client/build"));

  // Express will serve up index.html file if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Dynamic port binding
app.listen(process.env.PORT || 5000);
