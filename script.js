const $savebtnEl = $('.savebtn');
const $headerEl = $('#currentDay');
const $containerEl = $('#container');


$(function () {

  let date = dayjs()
  let now=date.format('dddd, MMMM Do YYYY');
  $headerEl.text(now); // add the current date to the header
 
  for (let i = 6; i < 19; i++) // standardish business hours 

  { // for each hour create a time block html 
    var $timeSectionEl = $('<div>', {"class": "col-2 col-md-1 hour text-center py-3"}); //left section, shows 
  
  if (i < 12) 
    {
      $timeSectionEl.text(`${i}AM`);
    }
    else if (i === 12)
    {
      $timeSectionEl.text(`12PM`);
    } 
    else
    {
      $timeSectionEl.text(`${i - 12}PM`);
    }

    var $textAreaEl = $('<textarea>', {"class": "col-8 col-md-10 description", "rows": "3"}); // middle section, takes user input
    var $saveEl = $('<button>', {"class": "btn saveBtn col-2 col-md-1", "aria-label": "save"}).append($("<i>", {"class": "fas fa-save"})); // save button
  
    var timeBlock = $('<div>', { "id": `hour-${i}`, "class": "row time-block", }).append([$timeSectionEl, $textAreaEl, $saveEl]);
    // container section append all the created subsections using an array
    //  add past                  
     if (i == date.format('HH'))
      {
        timeBlock.addClass('present');
      } 
     else if (i < date.format('HH')) 
      {
        timeBlock.addClass('past');
      }
    else
      {
        timeBlock.addClass('future');
      }
    $containerEl.append(timeBlock);
  };

  let currentDay = date.format('D');
 
  if (localStorage.getItem("Day of month") != currentDay)  // if current day and stored day are not the same then clear the schedule
  {
    localStorage.clear(); // this is a daily planner so it should be cleared if the day is changed
  };
  localStorage.setItem("Day of month",  currentDay); 




  for (let i = 0; i < 24; i++) { // get items from local storage AFTER the first for loop has finished so that all elemnets are loaded
  document.getElementById(`hour-${i}`).children[1].value = localStorage.getItem(`hour-${i}`);
}
  
});

 $containerEl.on('click', ".saveBtn", function (event) {  //save user input in corresponding hour to local storage
    localStorage.setItem(`${this.parentElement.id}`, this.previousElementSibling.value);
  });