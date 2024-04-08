## Payment Reminder

This app schedules tasks based on dates from the database, sends emails and WhatsApp reminders for payment deadlines, and provides an API for automation. It includes a desktop app to set dates and a mobile app to check payment status.

![Diagrama](https://github.com/Ari585-dev/PaymentReminder/assets/40327956/495d1cf2-16b2-4d40-9adf-9a172a7de86c)

For this example, we have the following key dates:
   - Opening date: The first day when the payment is open, and everyone should be notified to pay.
   - Closing date: The last day by which payment should be made.
   - Extraordinary date: Extra deadline.

## How It Works

The app checks the payment date in the database. When it's updated, it schedules a job for the opening date to notify everyone that payments are open. Then, it calculates reminder dates based on the opening and closing dates. It sends reminders to those who haven't paid yet, leading up to the closing date. After the closing date passes, it sends a final reminder about the extraordinary date.

### Tech Stack

- Client: Angular, React Native, Mail, WhatsApp
- Server: Node, Express, MySQL, Twillio, Mailgun
