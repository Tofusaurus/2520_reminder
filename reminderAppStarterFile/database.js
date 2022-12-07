let Database = {
    cindy: {
        reminders: [{ id: 1, title: "abc", description: "abcabc", completed: false }]
    },
    jimmy: {
        reminders: [{ id: 1, title: "jimmy", description: "this is a test", completed: false }, { id: 2, title: "another reminder", description: "this is a test", completed: false }]
    },

    johny: {
        reminders: [{ id: 1, title: "johny", description: "this is a test", completed: false }, { id: 2, title: "another reminder", description: "this is a test", completed: false }]
    },
    alex: {
        reminders: []
    }
}

module.exports = Database;