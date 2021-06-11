// MIT License
import { event } from "jquery";

// Copyright (c) 2020 Jarrett Retz

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

const searchBtn = document.getElementById("dicSearchBtn");
const searchInput = document.getElementById("searchBox");

// search the word and style them in the document
function wordSearch(word) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://wordsapiv1.p.rapidapi.com/words/${word}`,
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "1a22e3887bmshe53e197fd1cbcacp187fc3jsnce0fb7bfef1a",
            "x-rapidapi-host": "wordsapiv1.p.rapidapi.com"
        }
    };

    // when result is found
    $.ajax(settings).done(function (response) {
        console.log(response);
        let resultLength = response.results.length;
        $("#word").html(response.word);
        $("#pronunciation").html(response.pronunciation.all);
        let synonyms = [];
        $("#definitions").empty();
        for (let i = 0; i < resultLength; i++) {
            let result = response.results[i];
            let allResults = $("<div class='results'></div>")
            let box = $("<div class='eachDefinition'></div>");
            let def = $("<p class='definition'></p>").text(result.definition);
            let mode = $("<p class='partOfSpeech'></p>").text(result.partOfSpeech);

            box.append(mode);
            box.append(def);
            allResults.append(box);
            let synonyms = $('<div class="synonyms"></div>');
            if (result.hasOwnProperty('synonyms')) {
                // create a seeMore button if a definition has more than 4 synonyms
                if (result.synonyms.length > 4) {
                    let seeMore = $("<button class='btn btn-outline-primary btn-sm seeMoreBtn'>SEE MORE</button>");
                    synonyms.append(seeMore);

                    seeMore.click(function() {
                        synonyms.css('max-height', 'none');
                        seeMore.css("display", "none");
                        seeLess.css("display", "flex");
                    })

                    let seeLess = $("<button class='btn btn-outline-primary btn-sm seeLessBtn'>SEE LESS</button>");
                    seeLess.css("display", "none");
                    synonyms.append(seeLess);

                    seeLess.click(function() {
                        synonyms.css('max-height', '65px');
                        seeLess.css("display", "none");
                        seeMore.css("display", "flex");
                    })
                }

                for (let i = 0; i < result.synonyms.length; i++) {
                    let synonymBox = $("<button class='synonym btn btn-outline-primary btn-sm'></button>").text(result.synonyms[i]);
                    synonyms.append(synonymBox);

                    // re-search the synonym when clicked
                    synonymBox.click(function () {
                        let word = synonymBox.text();
                        // console.log(word);
                        searchInput.value = word;
                        searchBtn.click();
                    });
                }
            }
            allResults.append(synonyms);
            $("#definitions").append(allResults);
        }
    });
    
    // when no result is found
    $.ajax(settings).fail(function () {
        console.log("No word found");
        $('#word').html("No result found");
    })
}


searchBtn.addEventListener("click", function () {
    let word = searchInput.value;
    wordSearch(word);
    // var request = new XMLHttpRequest();

    // request.open('GET', `https://api.dictionaryapi.dev/api/v2/entries/en_UK/${word}`);

    // request.onload = function() {
    //     console.log(this.response);
    // }
})


// search a word in Dictionary by hitting "Enter" on keyboard
$("#searchBox").keypress(function(e) {
    if (e.which == 13) {
        e.preventDefault();
        $("#dicSearchBtn").click();
    }
  })
