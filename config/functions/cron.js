'use strict';
const request = require('request');
/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK] [YEAR (optional)]
 */
const host = "http://localhost:1337"

function getDate(date) {
  var d = new Date(date)
  return d.toUTCString()
}


/**
 * @return Object containing email options for email service
 */
function buildEmail(obj) {
  var option = {}

  option.to = obj.customer.email
  option.subject = `Invoice ${obj.invoice.invoiceNumber} Details`
  option.text = `
  Invoice: ${obj.invoice.invoiceNumber}
  Date : ${obj.invoice.date}
  Amount  : ${obj.invoice.amount}
  Product description: ${obj.invoice.description}
  `
  option.html = `
  <h1> Hi, Mr. ${obj.customer.username}</h1>
  <p> We are reminding you about your recent invoice ${obj.invoice.invoiceNumber} </p>
  <table>
    <thead>
      <th>Invoice Number</th>
      <th>Date</th>
      <th>Amount</th>
    </thead>
    <tr>
      <td>${obj.invoice.invoiceNumber}</td>
      <td>${obj.invoice.date}</td>
      <td>${obj.invoice.amount}</td>
    </tr>
  </table>
  `
  console.log("buildEmail(): ", option)
  return option
}

module.exports.cron = {

  // run this every day at night 0:00
  "* * * * *": function () {
    // need to get all invoices to filter based on dates.
    
    Invoices.find({}).exec(function (err, body) {
      var emailsToSend = []
      body.forEach(item=>{
        var invoiceDate = new Date(item.date)
        var invoiceDay = invoiceDate.getDate() // 22?
        var currentDay = (new Date()).getDate() // 18
        console.log("currentDay: ", currentDay, "invoiceDay", invoiceDay);
        // provided in assignment email
        if(invoiceDay - 5 == currentDay){
            var option = buildEmail({
              customer : item.mapCustomer[0],
              invoice: {
                description : item.description | "",
                amount : item.amount,
                date  : getDate(item.date),
                invoiceNumber : item.invoiceNumber
              }
            })
            emailsToSend.push(option)
        }
      })
      // send if theres any recipent
      if(emailsToSend.length > 0){
        strapi.api.email.services.email.send(emailsToSend).then((success) => {
          console.log(success)
        }).catch(err=>{
          console.log(err)
        })
      }
    })
  }
};
