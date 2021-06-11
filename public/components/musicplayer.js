const musicPlayer = document.getElementById("musicPlayer");

// close the Music Player by clicking designated sections in the window
$("#myKanban").click(function(event) {
    // event.preventDefault();
    if ($("#musicPlayer").hasClass('show')) {
        $('.musicPlayerButton').click();
        // $("#musicPlayer").removeClass('show');
    }
})

$("#taskWrapper").click(function(event) {
    // event.preventDefault();
    if ($("#musicPlayer").hasClass('show')) {
        $('.musicPlayerButton').click();
        // $("#musicPlayer").removeClass('show');
    }
})