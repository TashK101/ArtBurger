let partsTablesCount = [18, 6, 15];
let currentPart = 1;
let tabelNumber = 1;
let tableType = 1;
let parts = document.querySelectorAll(`.seating_chooser_part`);


for (let partNumber = 0; partNumber < parts.length; partNumber++) {
    let rows = parts[partNumber].querySelectorAll(`.reservation_seating_chooser_row`);
    if (partNumber === 1) {
        tableType = 4;
    }
    for (let row of rows) {
        for (let i = 0; i < partsTablesCount[partNumber] / rows.length; i++) {
            row.innerHTML += `
            <div class="reservation_seating_chooser_seat">
                <input type="radio" name="radioSeatingChooser" value="${tabelNumber}" id="reservation_seating_seat_${tabelNumber}">
                <label class="reservation_seating_lable table_type_${tableType}" for="reservation_seating_seat_${tabelNumber}"></label>
                <img src="../../images/tables_preview/table_type_${tableType}.png" alt="Table in restaraunt preview" class="reservation_seating_table_preview_img type${tableType}">
            </div>
            `;
            tabelNumber++;
            if (partNumber === 0) {
                tableType = tableType % 3 + 1;
            }
        }
        if (partNumber != 0) {
            tableType++;
        }
    }
}