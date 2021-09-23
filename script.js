let todayDate;
let planner = {
    day: "",
    tasks: []
};

// Initializes the calander day
function init(){
    todayDate = moment();
    populateToday();
}

// Reads the current days data from local storage 
// If no data is stored the tasks are reset to null
function readToday() {
    planner.day = todayDate.format("YYYYMMDD");
    if (null!=localStorage.getItem("planner"+planner.day)){
        planner.tasks = JSON.parse(localStorage.getItem("planner"+planner.day) || "[]");
    } else {
        planner.tasks=["","","","","","","","",""];
    }
}

// Saves the curretn days data to the local storage
function saveToday() {
    for(let i = 9;i<18;i++){
        planner.tasks[i-9] = document.getElementById("newId"+i).value;
    }
    localStorage.setItem("planner"+planner.day, JSON.stringify(planner.tasks));
}

// Populates the current days data and displays on the list
function populateToday() {
    readToday();
    $(".container").empty();
    $("#currentDay").text(todayDate.format("MMMM Do, YYYY"));
    addTImeblocks();
    for(let i = 9;i<18;i++){
        document.getElementById("newId"+i).value = planner.tasks[i-9];
    }
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
    let currentHour = moment().format("H");
    let currentDate = moment().format("YYYYMMDD");

    let container = $(".container");
    for(let i = 9;i<18;i++){
        let thisHour = moment(i,"H");
        let newBlock = $('<div>');
        newBlock.addClass("input-group mb-0 calanderLine");

        let newLine = $('<div>');
        newLine.addClass("input-group-prepend m-0");
        let newLineSpan = $('<span>');
        newLineSpan.addClass("input-group-text border-left-0 hourName");
        newLineSpan.text(thisHour.format("h a"));
        newLine.append(newLineSpan);
        newBlock.append(newLine);
        let newInput = $('<input>');
        newInput.attr("type","text");
        if ((currentDate<todayDate.format("YYYYMMDD")) || ((currentDate===todayDate.format("YYYYMMDD")) && currentHour<i)){
            newInput.addClass("form-control future");
        } else if ((currentDate===todayDate.format("YYYYMMDD")) && currentHour==i){
            newInput.addClass("form-control present");
        } else {
            newInput.addClass("form-control past");
        }
        newInput.attr("id","newId"+i);
        newBlock.append(newInput);
        let newButton = $('<button>');
        newButton.addClass("btn btn-outline-secondary saveBtn");
        newButton.attr("type","button");
        newButton.text("√");
        newButton.on("click", function(){saveToday();});
        newBlock.append(newButton);

        container.append(newBlock);
    }
}

init();


