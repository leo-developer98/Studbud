// MIT License

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



// // Specifies a function to execute when the DOM is fully loaded.
// $(document).ready(function(){
//     // adds a submit listened to our <form> element
//     $("form").submit(async (event) => {
//         // prevents the page from reloading on subject
//         event.preventDefault();
//         // adds the text 'Loading...' to our word 
//         // data container for UX purposes
//         $('#word-info').html('Loading...');
//         // collects the value in the input form element
//         // by the id on the element
//         const word = $("#word-input").val();
//         // creates a variable that represents our
//         // word info container
//         let wordInfoList = document.querySelector('#word-info');
//         try {
//             // asynchronously calls our custome function
//             const data = await (await fetch(`http://localhost:9000/.netlify/functions/getWord?word=${word}`, { mode: 'cors'})).json();
//             // logs no results if word data is not found
//             if (data.length < 1) {
//                 return wordInfoList.appendChild(document.createTextNode('No results matched.'));
//             }
//             // clears the word container if it had
//             // previous data
//             $('#word-info').empty();
//             data.map(val => {
//                 // creates parent li element
//                 const li = document.createElement('li');
//                 li.classList.add('my-4', 'p-4', 'list-item');
//                 // loops over the values for each definition
//                 val.map(property => {
//                     if (property.label === 'definition') {
//                         // creates new heading-3 element
//                         const def = document.createElement('h3');
//                         // adds text to the element
//                         def.innerText = property.value;
//                         // appends class value for styling
//                         def.classList.add(['definition']);
//                         // adds the element to our list item
//                         li.appendChild(def);
//                     } else if (property.isString) {
//                         const partOfSpeech = document.createElement('small');
//                         partOfSpeech.innerText = property.value;
//                         partOfSpeech.classList.add('lead','font-italic');
//                         li.appendChild(partOfSpeech);
//                     } else {
//                         const characteristic = document.createElement('dl');
//                         characteristic.className = 'row';
//                         const label = document.createElement('dt');
//                         label.innerText = property.label;
//                         label.className = 'col-sm-3';
//                         const value = document.createElement('dd');
//                         value.innerText = property.value.join(', ');
//                         value.className = 'col-sm-9';
//                         characteristic.appendChild(label);
//                         characteristic.appendChild(value);
//                         li.appendChild(characteristic);
//                     }
//                 })
//                 // appends the list item fully formed to
//                 // the word data container
//                 wordInfoList.appendChild(li);
//             })
//         } catch (e) {
//             // logs the error if one exists
//             console.log(e);
//             // displays message to user if there is an error
//             $('#word-info').html('There was an error fetching the word data');
//         }
//     });
// });

// const settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://wordsapiv1.p.rapidapi.com/words/example",
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "1a22e3887bmshe53e197fd1cbcacp187fc3jsnce0fb7bfef1a",
// 		"x-rapidapi-host": "wordsapiv1.p.rapidapi.com"
// 	}
// };

// $.ajax(settings).done(function (response) {
// 	console.log(response);
// });

const searchBtn = document.getElementById("dicSearchBtn");
const searchInput = document.getElementById("searchBox");

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
                // for (let i=0;i<result.synonyms.length;i++) {
                //     synonyms.push(result.synonyms[i]);

                // }

                if (result.synonyms.length > 4) {
                    let seeMore = $("<button class='btn btn-outline-primary btn-sm seeMoreBtn'>SEE MORE</button>");
                    synonyms.append(seeMore);

                    seeMore.click(function() {
                        synonyms.css('max-height', 'none');
                        seeMore.css("display", "none");
                        seeLess.css("display", "flex");
                        // synonyms.css('background-color', 'black');
                    })

                    let seeLess = $("<button class='btn btn-outline-primary btn-sm seeLessBtn'>SEE LESS</button>");
                    seeLess.css("display", "none");
                    synonyms.append(seeLess);

                    seeLess.click(function() {
                        synonyms.css('max-height', '65px');
                        // synonyms.css('background-color', 'black');
                        seeLess.css("display", "none");
                        seeMore.css("display", "flex");
                    })
                }

                for (let i = 0; i < result.synonyms.length; i++) {
                    let synonymBox = $("<button class='synonym btn btn-outline-primary btn-sm'></button>").text(result.synonyms[i]);
                    synonyms.append(synonymBox);

                    synonymBox.click(function () {
                        let word = synonymBox.text();
                        console.log(word);
                        searchInput.value = word;
                        searchBtn.click();
                        // wordSearch()
                    });
                }

                // seeMore.click(function() {
                //     synonyms.css('max-height', '');
                // })
            }
            allResults.append(synonyms);
            $("#definitions").append(allResults);
        }
        // // console.log(synonyms);
        // $('#synonyms').empty();
        // for (let i=0;i<synonyms.length; i++) {
        //     let synonymBox = $("<button class='synonym btn btn-outline-primary'></button>").text(synonyms[i]);
        //     $('#synonyms').append(synonymBox);

        //     synonymBox.click(function() {
        //         let word = synonymBox.text();
        //         console.log(word);
        //         searchInput.value = word;
        //         searchBtn.click();
        //         // wordSearch()
        //     });
        // }
    });

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
