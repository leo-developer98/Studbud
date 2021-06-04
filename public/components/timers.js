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

const tabP = document.getElementById('tabP');
const tabS = document.getElementById('tabS');
const timerP = document.getElementById('timers_p');
const timerS = document.getElementById('timers_s');

const pomoStartBtn = document.getElementById("pomo-startBtn");
const pomoPauseBtn = document.getElementById("pomo-pauseBtn");
const pomoStopBtn = document.getElementById("pomo-stopBtn");
const pomoResetBtn = document.getElementById("pomo-resetBtn");
const pomodoroDisplay = document.getElementById("pomodoroTime");
const stopwatchDisplay = document.getElementById("stopwatchTime");
const studyTimeInput = document.getElementById("studyTimeInput");
const sbTimeInput = document.getElementById("sbTimeInput");
const lbTimeInput = document.getElementById("lbTimeInput");
const timerModalWhole = document.getElementById("timersModalWhole");

const swStartBtn = document.getElementById("sw-startBtn");
const swPauseBtn = document.getElementById("sw-pauseBtn");
const swStopBtn = document.getElementById("sw-stopBtn");
const swResetBtn = document.getElementById("sw-resetBtn");
const swLapBtn = document.getElementById("sw-lapBtn");
const lapList = document.getElementById("lapTimeList");


$(document).ready(function () {
    $('input[id="tabP"]').click(function () {
        timerP.classList.add("active");
        timerS.classList.remove('active');
    });
    $('input[id="tabS"]').click(function () {
        timerP.classList.remove("active");
        timerS.classList.add('active');
    });
    $('#pomodoroTime .seconds').html(study);
});

var { Timer } = require('../libraries/easytimer.js/dist/easytimer');

var study = 25;
var shortBreak = 5;
var longBreak = 30;
var loop = 1;
var pomodoroLoop = 4;
var isBreak = false;
var progressIndex = 1;

// Setting study time from Input
studyTimeInput.addEventListener("input", () => {
    study = parseInt(studyTimeInput.value);
    $('#pomodoroTime .seconds').html(study);
    let all = (4 * study) + (3 * shortBreak) + longBreak;
    let pForMinute = 100 / all;
    let studyWidth = pForMinute * study;
    let sbWidth = pForMinute * shortBreak;
    let lbWidth = pForMinute * longBreak;
    $('.study-progress').html(study);
    $('.study-progress').css("width", studyWidth + "%");
    $('.sb-progress').css("width", sbWidth + "%");
    $('.lb-progress').css("width", lbWidth + "%");
    $('#studySliderValue').html(study);
})

// Setting short break time from Input
sbTimeInput.addEventListener("input", () => {
    shortBreak = parseInt(sbTimeInput.value);
    let all = (4 * study) + (3 * shortBreak) + longBreak;
    let pForMinute = 100 / all;
    let studyWidth = pForMinute * study;
    let sbWidth = pForMinute * shortBreak;
    let lbWidth = pForMinute * longBreak;
    $('.sb-progress').html(shortBreak);
    $('.study-progress').css("width", studyWidth + "%");
    $('.sb-progress').css("width", sbWidth + "%");
    $('.lb-progress').css("width", lbWidth + "%");
    $('#sbSliderValue').html(shortBreak);
})

// Setting long break time from Input
lbTimeInput.addEventListener("input", () => {
    longBreak = parseInt(lbTimeInput.value);
    let all = (4 * study) + (3 * shortBreak) + longBreak;
    let pForMinute = 100 / all;
    let studyWidth = pForMinute * study;
    let sbWidth = pForMinute * shortBreak;
    let lbWidth = pForMinute * longBreak;
    $('.lb-progress').html(longBreak);
    $('.study-progress').css("width", studyWidth + "%");
    $('.sb-progress').css("width", sbWidth + "%");
    $('.lb-progress').css("width", lbWidth + "%");
    $('#lbSliderValue').html(longBreak);
})

// Pomodoro Timer
var pomodoro = new Timer();

$('#pomo-startBtn').click(function () {
    // console.log(study);
    pomodoro.start({ countdown: true, startValues: { seconds: study }, target: { minutes: 0 } });
    pomoStartBtn.classList.remove("running");
    pomoPauseBtn.classList.add("running");
    studyTimeInput.setAttribute("disabled", "true");
    sbTimeInput.setAttribute("disabled", "true");
    lbTimeInput.setAttribute("disabled", "true");
});

$('#pomo-pauseBtn').click(function () {
    pomodoro.pause();
    pomoPauseBtn.classList.remove("running");
    pomoStartBtn.classList.add("running");
});

$('#pomo-resetBtn').click(function () {
    pomodoro.reset();
    pomodoro.start();
    pomodoro.pause();
    pomoPauseBtn.classList.remove("running");
    pomoStartBtn.classList.add("running");
});

$('#pomo-stopBtn').click(function () {
    isBreak = false;
    progressIndex = 1;
    loop = 1;
    pomodoro.stop();
    $('#pomodoroLoop').html("0");
    $('#pomodoroTime .seconds').html(study);
    pomoPauseBtn.classList.remove("running");
    pomoStartBtn.classList.add("running");
    studyTimeInput.removeAttribute("disabled");
    sbTimeInput.removeAttribute("disabled");
    lbTimeInput.removeAttribute("disabled");
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
    $("#progress" + (progressIndex % 8).toString()).addClass("progress-bar-striped progress-bar-animated");
});

pomodoro.addEventListener('reset', function (e) {
    $('#pomodoroTime .minutes').html(pomodoro.getTimeValues().minutes);
    $('#pomodoroTime .seconds').html(pomodoro.getTimeValues().seconds);
    $("#progress" + progressIndex.toString()).removeClass("progress-bar-animated");
    study = parseInt(studyTimeInput.value);
    shortBreak = parseInt(sbTimeInput.value);
    longBreak = parseInt(lbTimeInput.value);
});

pomodoro.addEventListener('paused', function (e) {
    $("#progress" + (progressIndex % 8).toString()).removeClass("progress-bar-animated");

});

pomodoro.addEventListener('stopped', function (e) {
    $(".progress-bar").removeClass("progress-bar-striped progress-bar-animated");
});

pomodoro.addEventListener('targetAchieved', function (e) {
    progressIndex = progressIndex + 1;
    if (isBreak) {
        // Executing Study (minutes)
        loop = loop + 1;
        pomodoro.start({ countdown: true, startValues: { seconds: study }, target: { minutes: 0 } });
        isBreak = false;
        $("#progress" + (progressIndex % 8).toString()).addClass("progress-bar-striped progress-bar-animated");
    } else {
        if (loop % pomodoroLoop === 0) {
            // Executing Long Break (minutes)
            pomodoro.start({ countdown: true, startValues: { seconds: longBreak }, target: { minutes: 0 } });
            isBreak = true;
            $("#progress" + (progressIndex % 8).toString()).addClass("progress-bar-striped progress-bar-animated");
        } else {
            // Executing Short Break (minutes)
            pomodoro.start({ countdown: true, startValues: { seconds: shortBreak }, target: { minutes: 0 } });
            isBreak = true;
            $("#progress" + (progressIndex % 8).toString()).addClass("progress-bar-striped progress-bar-animated");
        }
    }
});

// Stopwatch Timer
var stopWatch = new Timer();

$('#sw-startBtn').click(function () {
    stopWatch.start({ precision: 'seconds' });
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
    if (confirm("Current lap times will be deleted")) {
        stopWatch.reset();
        stopWatch.pause();
        swResetBtn.classList.add("running");
        swLapBtn.classList.remove("running");
        lapList.innerHTML = "";
        lapNum = 1;
    }
});

// Adding Lapped times when lap button is clicked
var lapNum = 1;
$('#sw-lapBtn').click(function () {
    let time = stopWatch.getTimeValues().toString(['minutes', 'seconds']);
    let lap = document.createElement('li');
    lap.classList.add('lapTimeItems');
    lap.innerHTML = "Lap " + lapNum;
    let lappedTime = document.createElement('span');
    lappedTime.classList.add("lappedTimes");
    lappedTime.innerHTML = time;
    lap.appendChild(lappedTime);
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
