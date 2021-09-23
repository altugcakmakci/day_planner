let todayDate;
let planner = {
    day: "",
    tasks: []
};

// Initializes the calander day
function init(){
    todayDate = moment();
    readToday()
    populateToday();
}

function readToday() {
    // TODO
    planner.day = todayDate.format("YYYYMMDD");
    planner.tasks = JSON.parse(localStorage.getItem("planner"+planner.day) || "[]");
    console.log(planner.tasks);
}

function saveToday() {
    console.log("saveToday");
    for(let i = 9;i<18;i++){
        planner.tasks[i-9] = document.getElementById("newId"+i).value;
        console.log(document.getElementById('newId'+i).value);
    }
    localStorage.setItem("planner"+planner.day, JSON.stringify(planner.tasks));
}

function populateToday() {
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
    console.log(currentHour);
    let container = $(".container");
    for(let i = 9;i<18;i++){
        let thisHour = moment(i,"H");
        console.log(thisHour);
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
        if (currentHour<i){
            newInput.addClass("form-control futureHour");
        } else if (currentHour===i){
            newInput.addClass("form-control currentHour");
        } else {
            newInput.addClass("form-control pastHour");
        }
        newInput.attr("id","newId"+i);
        newBlock.append(newInput);
        let newButton = $('<button>');
        newButton.addClass("btn btn-outline-secondary calanderButton");
        newButton.attr("type","button");
        newButton.text("Check");
        newButton.on("click", function(){saveToday();});
        newBlock.append(newButton);

        container.append(newBlock);
    }
}

init();


