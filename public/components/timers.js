// MIT License

// Copyright (c) 2017 Thiago Santos

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// // Get the modal
// var timerModal = document.getElementById("timers");

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks on the button, open the modal 
// btn.onclick = function () {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function () {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

// $("radio").on('click', function() {
//   console.log($("radio:chekced").val() + "is checked!");
// });

const tabP = document.getElementById('tabP');
const tabS = document.getElementById('tabS');
const timerP = document.getElementById('timers_p');
const timerS = document.getElementById('timers_s');

// if (tabP.checked) {
//     console.log("pomodoro checked");
//     timerP.classList.add('active');
//     timerS.classList.remove('active');
// } else if (tabS.checked) {
//     console.log("stopwatch checked");
//     timerP.classList.remove('active');
//     timerS.classList.add('active');
// }

$(document).ready(function(){
    $('input[id="tabP"]').click(function(){
        timerP.classList.add("active");
        timerS.classList.remove('active');
    });
    $('input[id="tabS"]').click(function(){
        timerP.classList.remove("active");
        timerS.classList.add('active');
    });
});

// $('input:radio').on('change', function(e){
//     var name = e.currentTarget.name,
//     value = e.currentTarget.value;
              
//     $('.name').text(name);
//     $('.value').text(value);
// });