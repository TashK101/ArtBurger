
function CalendarControl() {
    const calendar = new Date();
    const calendarControl = {
        localDate: new Date(),
        prevMonthLastDate: null,
        calWeekDays: ["П", "В", "С", "Ч", "П", "С", "В"],
        calMonthName: [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь"
        ],
        daysInMonth: function (month, year) {
            return new Date(year, month, 0).getDate();
        },
        firstDay: function () {
            return new Date(calendar.getFullYear(), calendar.getMonth(), 1);
        },
        lastDay: function () {
            return new Date(calendar.getFullYear(), calendar.getMonth() + 1, 0);
        },
        firstDayNumber: function () {
            return calendarControl.firstDay().getDay();
        },
        lastDayNumber: function () {
            return calendarControl.lastDay().getDay();
        },
        getPreviousMonthLastDate: function () {
            let lastDate = new Date(
                calendar.getFullYear(),
                calendar.getMonth(),
                0
            ).getDate();
            return lastDate;
        },
        bindEventListenerToRadioButtons: function () {
            let btns = document.querySelectorAll(".calendar input[type=radio]");
            for (let btn of btns) {
                btn.addEventListener('click', () => {
                    if (btn.checked) {
                        let number = Number(btn.value);
                        let hourChooserSelectTag = document.querySelector("#time_chooser__hour_select");
                        let minuteChooserSelectTag = document.querySelector("#time_chooser__minute_select");
                        let selectedNumberWeekDay = (calendarControl.firstDayNumber() + number - 2) % 7 + 1;
                        let hoursRange = [0, 0]; // Правый интервал исключается
                        let minutesRange = [0, 0]; // Правый интервал исключается

                        hourChooserSelectTag.innerHTML = ``;
                        minuteChooserSelectTag.innerHTML = ``;

                        if (selectedNumberWeekDay >= 2 && selectedNumberWeekDay <= 5 ) {
                            hoursRange = [18, 21];
                            minutesRange = [0, 60];
                        }
                        else if (selectedNumberWeekDay === 6 || selectedNumberWeekDay === 7) {
                            hoursRange = [12, 24];
                            minutesRange = [0, 60];
                        }

                        for (let i = hoursRange[0]; i < hoursRange[1]; i++) {
                            hourChooserSelectTag.innerHTML += `<option value="${i}">${i}</option>`;
                        }
                        for (let i = minutesRange[0]; i < minutesRange[1]; i += 10) {
                            minuteChooserSelectTag.innerHTML += `<option value="${String(i).padStart(2, '0')}">${String(i).padStart(2, '0')}</option>`;
                        }
                    }
                })
            }
        },
        navigateToPreviousMonth: function () {
            calendar.setMonth(calendar.getMonth() - 1);
            calendarControl.attachEventsOnNextPrev();
        },
        navigateToNextMonth: function () {
            calendar.setMonth(calendar.getMonth() + 1);
            calendarControl.attachEventsOnNextPrev();
        },
        navigateToCurrentMonth: function () {
            let currentMonth = calendarControl.localDate.getMonth();
            let currentYear = calendarControl.localDate.getFullYear();
            calendar.setMonth(currentMonth);
            calendar.setYear(currentYear);
            calendarControl.attachEventsOnNextPrev();
        },
        displayYear: function () {
            let yearLabel = document.querySelector(".calendar .calendar-year-label");
            yearLabel.innerHTML = calendar.getFullYear();
        },
        displayMonth: function () {
            let monthLabel = document.querySelector(
                ".calendar .calendar-month-label"
            );
            monthLabel.innerHTML = calendarControl.calMonthName[calendar.getMonth()];
        },
        plotSelectors: function () {
            document.querySelector(
                ".calendar"
            ).innerHTML += `<div class="calendar-inner"><div class="calendar-controls">
          <div class="calendar-prev"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M88.2 3.8L35.8 56.23 28 64l7.8 7.78 52.4 52.4 9.78-7.76L45.58 64l52.4-52.4z"/></svg></a></div>
          <div class="calendar-year-month">
          <p class="calendar-month-label"></p>
          <p>&ensp;</p>
          <p class="calendar-year-label"></p>
          </div>
          <div class="calendar-next"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M38.8 124.2l52.4-52.42L99 64l-7.77-7.78-52.4-52.4-9.8 7.77L81.44 64 29 116.42z"/></svg></a></div>
          </div>
          <div class="calendar-body"></div></div>`;
        },
        plotDayNames: function () {
            for (let i = 0; i < calendarControl.calWeekDays.length; i++) {
                document.querySelector(
                    ".calendar .calendar-body"
                ).innerHTML += `<div class="day_name">${calendarControl.calWeekDays[i]}</div>`;
            }
        },
        plotDates: function () {
            document.querySelector(".calendar .calendar-body").innerHTML = "";
            calendarControl.plotDayNames();
            calendarControl.displayMonth();
            calendarControl.displayYear();
            let count = 0;
            let prevDateCount = 0;

            calendarControl.prevMonthLastDate = calendarControl.getPreviousMonthLastDate();
            let prevMonthDatesArray = [];
            let calendarDays = calendarControl.daysInMonth(
                calendar.getMonth() + 1,
                calendar.getFullYear()
            );

            for (let i = 1; i <= calendarDays; i++) {
                if (i < calendarControl.firstDayNumber()) {
                    calendarDays++;
                    prevDateCount += 1;
                    document.querySelector(".calendar .calendar-body").innerHTML += `<div class="prev-dates"></div>`;
                    prevMonthDatesArray.push(calendarControl.prevMonthLastDate--);
                }

                else if (
                    calendar > calendarControl.localDate ||
                    calendar.getMonth() === calendarControl.localDate.getMonth() &&
                    calendar.getFullYear() === calendarControl.localDate.getFullYear() &&
                    count >= calendar.getDate()
                ) {
                    count++;
                    document.querySelector(".calendar .calendar-body").
                        innerHTML += `<div class="number-item" data-num=${count}>
                    <input type="radio" name="radioDateNumber" value="${count}" id="radioNumber${count}">
                    <label for="radioNumber${count}">${count}</label>
                    </div>`;
                }

                else {
                    count++;
                    document.querySelector(".calendar .calendar-body").
                        innerHTML += `<div class="prev-dates">${count}</div>`;
                }
            }
            calendarControl.plotPrevMonthDates(prevMonthDatesArray);
            calendarControl.plotNextMonthDates();
            calendarControl.bindEventListenerToRadioButtons();
        },
        attachEvents: function () {
            let prevBtn = document.querySelector(".calendar .calendar-prev a");
            let nextBtn = document.querySelector(".calendar .calendar-next a");
            prevBtn.addEventListener("click", calendarControl.navigateToPreviousMonth);
            nextBtn.addEventListener("click", calendarControl.navigateToNextMonth);
        },
        highlightToday: function () {
            let currentMonth = calendarControl.localDate.getMonth() + 1;
            let changedMonth = calendar.getMonth() + 1;
            let currentYear = calendarControl.localDate.getFullYear();
            let changedYear = calendar.getFullYear();
            if (
                currentYear === changedYear &&
                currentMonth === changedMonth &&
                document.querySelectorAll(".number-item")
            ) {
                document.querySelectorAll(".number-item")[calendar.getDate() - 1].classList.add("calendar-today");
            }
        },
        plotPrevMonthDates: function (dates) {
            dates.reverse();
            for (let i = 0; i < dates.length; i++) {
                if (document.querySelectorAll(".prev-dates")) {
                    document.querySelectorAll(".prev-dates")[i].textContent = dates[i];
                }
            }
        },
        plotNextMonthDates: function () {
            let childElemCount = document.querySelector('.calendar-body').childElementCount;

            if (childElemCount > 42) {
                let diff = 49 - childElemCount;
                calendarControl.loopThroughNextDays(diff);
            }


            if (childElemCount > 35 && childElemCount <= 42) {
                let diff = 42 - childElemCount;
                calendarControl.loopThroughNextDays(42 - childElemCount);
            }

        },
        loopThroughNextDays: function (count) {
            if (count > 0) {
                for (let i = 1; i <= count; i++) {
                    document.querySelector('.calendar-body').innerHTML += `<div class="next-dates">${i}</div>`;
                }
            }
        },
        attachEventsOnNextPrev: function () {
            calendarControl.plotDates();
            calendarControl.attachEvents();
        },
        init: function () {
            calendarControl.plotSelectors();
            calendarControl.plotDates();
            calendarControl.attachEvents();
        }
    };
    calendarControl.init();
}

const calendarControl = new CalendarControl();