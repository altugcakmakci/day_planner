let todayDate;

// Initializes the calander day
function init(){
    todayDate = moment();
    populateToday();
}

function populateToday() {
    $("#currentDay").text(todayDate.format("MMMM Do, YYYY"));
    addTImeblocks();
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

// Add timeblocks
function addTImeblocks(){
    let container = $(".container");
    for(let i = 9;i<18;i++){
        let thisHour = moment(i,"H");
        console.log(thisHour);
        let newBlock = $('<div>');
        newBlock.addClass("input-group mb-0");

        let newLine = $('<div>');
        newLine.addClass("input-group-prepend m-0");
        let newLineSpan = $('<span>');
        newLineSpan.addClass("input-group-text border-left-0 hourName");
        newLineSpan.text(thisHour.format("h a"));
        newLine.append(newLineSpan);
        newBlock.append(newLine);
        let newInput = $('<input>');
        newInput.attr("type","text");
        newInput.addClass("form-control");
        newBlock.append(newInput);
        let newButton = $('<button>');
        newButton.addClass("btn btn-outline-secondary");
        newButton.attr("type","button");
        newButton.text("Check");
        newBlock.append(newButton);

        container.append(newBlock);
    }
}

init();


