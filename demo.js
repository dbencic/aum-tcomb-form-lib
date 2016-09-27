import React, {Component} from "react";
import ReactDOM from "react-dom";
import t from "tcomb-form";
import aumTcomb from "./index";

let Form = t.form.Form;

// let ReservationStatus = t.enums({
//     "reserved" : "Reserved",
//     "inquiry" : "Inquiry",
//     "cancelled" : "Cancelled"
// });

// let TotalPrice = t.struct({
//     price: t.Num,
//     currencySymbol: t.enums({"eur" : "Euro", "usd": "$"})
// });

let modelForBooking = t.struct({
    // name: t.Str,
    checkin: t.Dat,
    // checkout: t.Dat,
    // status: ReservationStatus,
    // totalPrice: TotalPrice,
    // comment: t.maybe(t.Str)
});

let options = {
    fields: {
        // name: {
        //     label: "Guest name *",
        //     error: "molim unesite ime"
        // },
        checkin: {
            factory: aumTcomb.form.DateComponent,
            label: "Check In *",
            type: "date"
        },
        // checkout: {
        //     factory: aumTcomb.form.DateComponent,
        //     label: "Check Out *",
        //     type: "date"
        // },
        // status: {
        //     label: "Reservation status *"
        // },
        // totalPriceEur: {
        //     label: "Total price",
        //     error: "Price ust be numeric value greater than 0"
        // },
        // comment: {
        //     label: "Note",
        //     type: "textarea"
        // },
    }
};

var bookingForm = <Form type={modelForBooking} ref="form" value={undefined} options={options} />;
console.log(bookingForm);
// ReactDOM.render(bookingForm, document.getElementById("app-container"));

