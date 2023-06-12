getMessagePaymentReminder = (student, path) => {
    fs.readFile(path, 'utf8', (error, data) => {
        if (error) {
        console.error(error);
        return;
        }
        //replace with the student's data
        htmlContent = data;

        console.log(htmlContent);
    })
    return string
}
    