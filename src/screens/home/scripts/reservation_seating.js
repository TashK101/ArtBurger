let partsTablesCount = [18, 6, 15];
let currentPart = 1;
let tabelNumber = 1;
let parts = document.querySelectorAll(`.seating_chooser_part`);


for (let partNumer = 0; partNumer < parts.length;partNumer++) {
    let rows = parts[partNumer].querySelectorAll(`.reservation_seating_chooser_row`);
    for (let row of rows) {
        for (let i = 0; i < partsTablesCount[partNumer] / rows.length; i++) {
            row.innerHTML += `
            <div class="reservation_seating_chooser_seat">
                <input type="radio" name="radioSeatingChooser" id="reservation_seatting_seat_${tabelNumber}">
                <label for="reservation_seatting_seat_${tabelNumber}"></label>
            </div>
            `;
            tabelNumber++;
        }
    }
}