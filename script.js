let todayDate;

// Initializes the calander day
function init(){
    todayDate = moment();
    populateToday();
}

function populateToday() {
    $("#currentDay").text(todayDate.format("MMMM Do, YYYY"));
}

// Jump to previous day
$('#prevDay').on('click', function () {
    todayDate = todayDate.add(-1,'days');
    populateToday();
});

// Jump to next day
$('#nextDay').on('click', function () {
    todayDate = todayDate.add(1,'days');
    populateToday();
});

init();