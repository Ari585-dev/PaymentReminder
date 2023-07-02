# PaymentReminder
This app is an API that chekcs a university's database, to establish a serie of emails that will send to all their students in the following order.
- Notify the students that the payment is open (day 1)
- Notify each student that havent paid during certain days that he haven't pay yet (days between start and end date)
- Notify a student when his payment has been recieved succesfully

## Tech Stack
**Client:** React Native, (email,whatsapp)

**Server:** Node, Express, MySQL

## Mobile App
- Allow users to log in
- Check the payment dates
- Check if he has paid or not

## How it works
The API will check the date of beginning and end of the payments, with that it will stablish at least 5 days in between these 2 datechs, to be able to notify the students that havent paid with frequency,
checking in the database all the students that have the payment field in negative, it will execute a function that will send those emails to each student through twillio, 
(execute a trigger that when a student has paid, notify the api to notify the student). 
