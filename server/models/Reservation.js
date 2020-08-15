const mongoose = require("mongoose")

const Reservation = mongoose.model("reservations", {
    user: {
        type: Object,
        required: true
    },
    stylist: {
        type: Object,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

module.exports = Reservation;