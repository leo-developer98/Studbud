const musicPlayer = document.getElementById("musicPlayer");

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