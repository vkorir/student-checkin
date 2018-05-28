const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");
const { users } = require("../config/constants").collections;

const User = mongoose.model(users);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }
      
      const numUsers = User.count({}, async (err, count) => {
        const user = await new User({
            code: generateCode(count),
            googleId: profile.id,
            sid: "",
            name: profile.displayName,
            email: profile.emails[0].value
          }).save();
          // Email the user
          done(null, user);
      });
    }
  )
);

function generateCode(count) {
  const i = j = k = 0;
  k = count % 26;
  count -= k;
  while (count >= 26) {
      count -= 26;
      j += 1;
      if (j == 26) {
          j = 0;
          k++;
      }
  }
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  return alphabet[i] + alphabet[j] + alphabet[k]
}
