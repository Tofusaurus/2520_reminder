const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");

app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const passport = require("./middleware/passport");
app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);
app.use(passport.initialize()); // using passport
app.use(passport.session()); // using session

app.set("view engine", "ejs");

// Routes start here
app.get("/auth/login", (req, res) => res.render("auth/login"));

app.post(
  "/auth/login",
  passport.authenticate("local", { //look in the passport.js file for local strategy
    successRedirect: "/reminders",
    failureRedirect: "/auth/login",
  })
);

app.get("/auth/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

// user goes to localhost:3001/reminder -> show a list of reminders
app.get("/reminders", reminderController.list);

// user goes to localhost:3001/reminder -> show a CREATE REMINDER PAGE
app.get("/reminder/new", reminderController.new);

app.get("/reminder/:id", reminderController.listOne);

app.get("/reminder/:id/edit", reminderController.edit);

// user SENDS NEW REMINDER DATA TO US (creating a reminder)
app.post("/reminder/", reminderController.create);

// Implement this yourself
app.post("/reminder/update/:id", reminderController.update);

// Implement this yourself
app.post("/reminder/delete/:id", reminderController.delete);

// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.
app.get("/register", authController.register);
app.get("/login", authController.login);
app.post("/register", authController.registerSubmit);
app.post("/login", authController.loginSubmit);

app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});
