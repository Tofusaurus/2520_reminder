let database = require("../database");

let remindersController = {
  list: (req, res) => {
    const currentUser = req.user;
    console.log(currentUser);
    console.log(database[currentUser.name])
    res.render("reminder/index", { reminders: database[currentUser.name].reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    const currentUser = req.user;
    console.log(currentUser);
    console.log(database[currentUser.name])
    let reminder = {
      id: database[currentUser.name].reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database[currentUser.name].reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    searchResult.title = req.body.title;
    searchResult.description = req.body.description;
    res.redirect("/reminder");
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    let index = database.cindy.reminders.indexOf(searchResult);
    database.cindy.reminders.splice(index, 1);
    res.redirect("/reminder");
  },
};

module.exports = remindersController;
