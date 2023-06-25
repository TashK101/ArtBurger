let prevBtn = document.querySelector("#prevBtn");
let nextBtn = document.querySelector("#nextBtn");
prevBtn.addEventListener('click', () => { nextPrev(-1); });
nextBtn.addEventListener('click', () => { nextPrev(1); });

let currentTab = 0;
showTab(currentTab);

function showTab(n) {
    let tab = document.querySelectorAll(".reservation_tab");
    tab[n].style.display = "block";
    if (n == 0) {
        prevBtn.style.display = "none";
    } else {
        prevBtn.style.display = "inline";
    }
    changeNavigationSteps(n)
}

function nextPrev(n) {
    var tab = document.querySelectorAll(".reservation_tab");
    if (n == 1 && !validateForm()) return false;
    tab[currentTab].style.display = "none";
    currentTab = currentTab + n;
    if (currentTab >= tab.length) {
        // TODO FORM SUBMISSION         document.getElementById("regForm").submit();
        return false;
    }
    showTab(currentTab);
}

function validateForm() {
    if (currentTab === 0) {
        let dateChooser = document.querySelector(`input[name="radioDateNumber"]:checked`);
        let hourChooser = document.querySelector(`select[name="hour_chooser"]`);
        let minuteChooser = document.querySelector(`select[name="minute_chooser"]`);
       return !(dateChooser == null || hourChooser.value === "" || minuteChooser.value === "");
    }
    else if (currentTab === 1) {
        return true;
        let inputFieldsReq = document.querySelectorAll(`.reservation_contacts_input_fields input`);
        for (let field of inputFieldsReq) {
            if (field.value === "") return false;
        }
        return true;
    }

    return true;
}

function changeNavigationSteps(n) {
    let circles = document.querySelectorAll(".navigation_content_box_circle");
    for (let i = 0; i < circles.length; i++) {
        circles[i].style.opacity = 0.44;
    }
    for (let i = n; i >= 0; i--) {
        circles[i].style.opacity = 1;
    }
}