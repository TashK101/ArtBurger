function updateUI() {
    const tableNumberLabel = document.getElementById('table_number_label')
    const tableNumberInput = document.createElement("input")
    tableNumberInput.setAttribute("class", "input")
    tableNumberInput.setAttribute("type", "number")
    tableNumberInput.setAttribute("placeholder", "Номер столика")
    tableNumberInput.setAttribute("max", `${getMaxTableNumber()}`)
    tableNumberLabel.append(tableNumberInput)

    const bookingDateLabel = document.getElementById('booking_date_label')
    const bookingDateInput = document.createElement("input")
    bookingDateInput.setAttribute("class", "input")
    bookingDateInput.setAttribute("type", "date")
    bookingDateInput.setAttribute("value", getCurrentDate())
    bookingDateInput.setAttribute("min", getCurrentDate())
    bookingDateLabel.append(bookingDateInput)
}

function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

function getMaxTableNumber() {
    return 20;
}

document.addEventListener('DOMContentLoaded', () => {
    updateUI()
})
