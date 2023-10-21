## Payment Reminder

This application will schedule a series of tasks that will be executed on specific dates specified by the database and calculated within the program. It will send a series of emails and WhatsApp messages while also offering an API to utilize its various functions, such as sending emails and WhatsApp messages based on the business rules. Additionally, a mobile application will be available to check the payment status and available dates based on the business model provided in this example.

For this example, we have the following key dates:
   - Opening date: The first day when the payment is open, and everyone should be notified to pay.
   - Closing date: The last day by which payment should be made.
   - Extraordinary date: The final opportunity to pay, during which the fee is higher than before, and it falls between the closing date and this date.

## How It Works

The application will check the payment date in the database, and once it's updated there, it will automatically create a job to be executed on the first day (opening date). When this day arrives, it will send messages to notify everyone that the payment is open. Afterward, it will calculate the number of days between the opening and closing dates, using them as reminder dates. The app will then execute another task to check in the database for individuals who haven't paid yet, and it will send them reminders about the pending payment and the approaching closing date. Once the closing date has passed, the same task will be executed, but with a third message, as it is the extraordinary date.

### Tech Stack

- Client: React Native, Mail, WhatsApp
- Server: Node, Express, MySQL
