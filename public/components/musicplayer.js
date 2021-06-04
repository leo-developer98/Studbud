const musicPlayer = document.getElementById("musicPlayer");

$("#myKanban").click(function(event) {
    if ($("#musicPlayer").hasClass('show')) {
        $('#musicPlayerButton').click();
        // $("#musicPlayer").removeClass('show');
    }
})