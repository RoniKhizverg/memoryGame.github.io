//config file
const names_data = {
    "first": "",
    "second": ""
}
const form = document.getElementById("form");

form.addEventListener("submit", function(e) {

    e.preventDefault();

    var data = new FormData(form);
    for (const [name, value] of data) {
        names_data[name] = value;
    }
    var selectedValue = localStorage.getItem('selecetedValue');
    if (selectedValue == JSON.stringify("board4X4")) {

        location.href = `board4X4.html?first=${names_data.first}&second=${names_data.second}`;
    } else {

        location.href = `board5X5.html?first=${names_data.first}&second=${names_data.second}`;


    }
});