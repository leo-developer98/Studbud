import '../libraries/easytimer.js/dist/easytimer.min.js';

// MIT License

// Copyright (c) 2018 Albert González

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

const tabP = document.getElementById('tabP');
const tabS = document.getElementById('tabS');
const timerP = document.getElementById('timers_p');
const timerS = document.getElementById('timers_s');

const pomoStartBtn = document.getElementById("pomo-startBtn");
const pomoPauseBtn = document.getElementById("pomo-pauseBtn");
const pomoStopBtn = document.getElementById("pomo-stopBtn");
const pomoResetBtn = document.getElementById("pomo-resetBtn");

const swStartBtn = document.getElementById("sw-startBtn");
const swPauseBtn = document.getElementById("sw-pauseBtn");
const swStopBtn = document.getElementById("sw-stopBtn");
const swResetBtn = document.getElementById("sw-resetBtn");
const swLapBtn = document.getElementById("sw-lapBtn");

const lapList = document.getElementById("lapTimeList");

const pomodoroDisplay = document.getElementById("pomodoroTime");
const stopwatchDisplay = document.getElementById("stopwatchTime");


var { Timer } = require('../libraries/easytimer.js/dist/easytimer');

// Stopwatch
var stopWatch = new Timer();

$('#sw-startBtn').click(function () {
    stopWatch.start({precision: 'seconds'});
    swResetBtn.classList.remove("running");
    swLapBtn.classList.add("running");
    swStartBtn.classList.remove("running");
    swPauseBtn.classList.add("running");
});

$('#sw-pauseBtn').click(function () {
    stopWatch.pause();
    swResetBtn.classList.add("running");
    swLapBtn.classList.remove("running");
    swPauseBtn.classList.remove("running");
    swStartBtn.classList.add("running");
});

$('#sw-stopBtn').click(function () {
    stopWatch.stop();
    swResetBtn.classList.add("running");
    swLapBtn.classList.remove("running");
    swPauseBtn.classList.remove("running");
    swStartBtn.classList.add("running");
});

$('#sw-resetBtn').click(function () {
    stopWatch.reset();
    stopWatch.pause();
    swResetBtn.classList.add("running");
    swLapBtn.classList.remove("running");
    lapList.innerHTML = "";
    lapNum = 1;
});

var lapNum = 1;
$('#sw-lapBtn').click(function () {
    let time = stopWatch.getTimeValues().toString(['minutes', 'seconds']);
    let lap = document.createElement('li');
    lap.innerHTML = "Lap " + lapNum + " " +time;
    lapList.appendChild(lap);
    lapNum = lapNum + 1;
});

stopWatch.addEventListener('secondsUpdated', function (e) {
    $('#stopwatchTime').html(stopWatch.getTimeValues().toString(['minutes', 'seconds']));
});

stopWatch.addEventListener('started', function (e) {
    $('#stopwatchTime').html(stopWatch.getTimeValues().toString(['minutes', 'seconds']));
});

stopWatch.addEventListener('reset', function (e) {
    $('#stopwatchTime').html(stopWatch.getTimeValues().toString(['minutes', 'seconds']));
});


// var study = 25;
var study = 10;
var shortBreak = 5;
var longBreak = 15;
var loop = 1;
var pomodoroLoop = 4;
var isBreak = false;
// study: mode 0, short break: mode 1, long break: mode 2

// Pomodoro
var pomodoro = new Timer();


$('#pomo-startBtn').click(function () {
    pomodoro.start({countdown: true, startValues: {seconds: study}, target: {minutes: 0}});
    pomoStartBtn.classList.remove("running");
    pomoPauseBtn.classList.add("running");
});

$('#pomo-pauseBtn').click(function () {
    pomodoro.pause();
    pomoPauseBtn.classList.remove("running");
    pomoStartBtn.classList.add("running");
});

$('#pomo-resetBtn').click(function () {
    loop = 1;
    isBreak = false;
    pomodoro.reset();
    pomodoro.pause();
    pomoPauseBtn.classList.remove("running");
    pomoStartBtn.classList.add("running");
});

$('#pomo-stopBtn').click(function () {
    pomodoro.stop();
    pomoPauseBtn.classList.remove("running");
    pomoStartBtn.classList.add("running");
});


pomodoro.addEventListener('secondsUpdated', function (e) {
    $('#pomodoroTime .minutes').html(pomodoro.getTimeValues().minutes);
    $('#pomodoroTime .seconds').html(pomodoro.getTimeValues().seconds);
    $('#pomodoroLoop').html(loop);
});

pomodoro.addEventListener('started', function (e) {
    $('#pomodoroTime .minutes').html(pomodoro.getTimeValues().minutes);
    $('#pomodoroTime .seconds').html(pomodoro.getTimeValues().seconds);
    $('#pomodoroLoop').html(loop);
});

pomodoro.addEventListener('reset', function (e) {
    $('#pomodoroTime .minutes').html(pomodoro.getTimeValues().minutes);
    $('#pomodoroTime .seconds').html(pomodoro.getTimeValues().seconds);
    $('#pomodoroLoop').html(loop);
});

pomodoro.addEventListener('targetAchieved', function (e) {
    if (isBreak) {
        loop = loop + 1;
        pomodoro.start({countdown: true, startValues: {seconds: study}, target: {minutes: 0}});
        isBreak = false;
    } else {
        if (loop % pomodoroLoop === 0) {
            pomodoro.start({countdown: true, startValues: {seconds: longBreak}, target: {minutes: 0}});
            isBreak = true;
        } else {
            pomodoro.start({countdown: true, startValues: {seconds: shortBreak}, target: {minutes: 0}});
            isBreak = true;
        }
    } 
});



// var minutes;
// var seconds;

// // pomoStartBtn.addEventListener("click",  function (event) {
// //     event.preventDefault();
// //     minutes = 25;
// //     seconds = 0;

// //     var interval = setInterval(
// //         function() {
// //             var el = document.getElementById("pomodoroTime");

// //             if (seconds == 0 && minutes == 0) {
// //                 clearInterval(interval);
// //                 el.innerHTML = "00:00"
// //             } else if (seconds === 0) {
// //                 minutes = minutes - 1;
// //                 seconds = 59;
// //                 el.innerHTML = minutes + ":" + seconds;
// //             } else if (seconds > 0) {
// //                 seconds = seconds - 1;
// //                 el.innerHTML = minutes + ":" + seconds;
// //             }
// //         },
// //         1000
// //     )
// // });

// pomoStartBtn.addEventListener("click", function(event) {
//     event.preventDefault();
//     if (!pomoStartBtn.classList.contains("active")) {
//         this.classList.add('active');
//         startPomodoro(0.1);
//     }
// });

// pomoResetBtn.addEventListener("click", function(event) {
//     event.preventDefault();
//     resetPomodoro(0);
// })

// function resetPomodoro(minutes) {
//     seconds = minutes * 60;
//     timeDisplay.innerHTML = time + ":" + seconds;
// }

// // https://css-tricks.com/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript/

// function startPomodoro(minutes) {
//     seconds = minutes * 60;
//     let timePassed = 0;
    
//     var interval = setInterval(
//         function() {
//             timePassed = timePassed + 1;
//             seconds = seconds - 1;
//             timeDisplay.innerHTML = formatTime(seconds);

//             if (seconds == 0) {
//                 clearInterval(interval);
//                 pomoStartBtn.classList.remove('active');
//               }
//         },
//         1000
//     );
// }

// function formatTime(time) {
//     const minutes = Math.floor(time / 60);
    
//     let seconds = time % 60;
    
//     if (seconds < 10) {
//       seconds = `0${seconds}`;
//     }
  
//     return `${minutes}:${seconds}`;
// }


// const swStartBtn = document.getElementById("sw-startBtn");
// const swStopBtn = document.getElementById("sw-stopBtn");
// const swResetBtn = document.getElementById("sw-resetBtn");


// var watch = document.getElementById("stopwatchTime");
// var stopWatch = new Stopwatch(watch, {delay: 10});

// swStartBtn.addEventListener("click", function(event) {
//     event.preventDefault();
//     stopWatch.start();
// })


// var Stopwatch = function(elem, options) {

// var timer       = createTimer(),
//     startButton = createButton("start", start),
//     stopButton  = createButton("stop", stop),
//     resetButton = createButton("reset", reset),
//     offset,
//     clock,
//     interval;

// // default options
// options = options || {};
// options.delay = options.delay || 1;

// // append elements     
// elem.appendChild(timer);
// elem.appendChild(startButton);
// elem.appendChild(stopButton);
// elem.appendChild(resetButton);

// // initialize
// reset();

// // private functions
// function createTimer() {
//     return document.createElement("span");
// }

// function createButton(action, handler) {
//     var a = document.createElement("a");
//     a.href = "#" + action;
//     a.innerHTML = action;
//     a.addEventListener("click", function(event) {
//     handler();
//     event.preventDefault();
//     });
//     return a;
// }

// function start() {
//     if (!interval) {
//     offset   = Date.now();
//     interval = setInterval(update, options.delay);
//     }
// }

// function stop() {
//     if (interval) {
//     clearInterval(interval);
//     interval = null;
//     }
// }

// function reset() {
//     clock = 0;
//     render();
// }

// function update() {
//     clock += delta();
//     render();
// }

// function render() {
//     timer.innerHTML = clock/1000; 
// }

// function delta() {
//     var now = Date.now(),
//         d   = now - offset;

//     offset = now;
//     return d;
// }

// // public API
// this.start  = start;
// this.stop   = stop;
// this.reset  = reset;
// };
