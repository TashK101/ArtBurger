const monthNames = {
    "Январь": "01",
    "Февраль": "02",
    "Март": "03",
    "Апрель": "04",
    "Май": "05",
    Июнь: "06",
    "Июль": "07",
    "Август": "08",
    "Сентябрь": "09",
    "Октябрь": "10",
    "Ноябрь": "11",
    "Декабрь": "12"
};

function showGuestValidationData() {
    const fields = document.querySelectorAll(`.reservation_validation_row p:last-child`);
    const date = document.querySelector(`*[name="radioDateNumber"]:checked`),
        month = document.querySelector(`.calendar-month-label`),
        year = document.querySelector(`.calendar-year-label`),
        visitHour = document.querySelector(`*[name="hour_chooser"]`),
        visitMinute = document.querySelector(`*[name="minute_chooser"]`),
        surname = document.querySelector(`*[name="surname"]`),
        guestName = document.querySelector(`*[name="name"]`),
        phone = document.querySelector(`*[name="phone"]`),
        email = document.querySelector(`*[name="email"]`),
        guestsCount = document.querySelector(`*[name="people_count"]`),
        table = document.querySelector(`*[name="radioSeatingChooser"]:checked`);
    const reservationData = {
        surname: surname.value,
        name: guestName.value,
        phone: phone.value,
        email: email.value,
        visitDate: `${date.value}.${monthNames[month.innerHTML]}.${year.innerHTML}`,
        guestsCount: guestsCount.value,
        visitTime: `${visitHour.value}:${visitMinute.value}`,
        table: table.value
    };

    let currentField = 0;
    for (let key in reservationData) {
        fields[currentField].innerHTML = `${reservationData[key]}`;
        currentField++;
    }
}

