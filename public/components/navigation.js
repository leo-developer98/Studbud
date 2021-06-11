class Navigation {
    constructor(links, pages) {
        this.links = links;
        this.pages = pages;
        this.currentPage = null;
    }

    getLinks() {
        console.log(this.links);
    }

    getHash(link) {
        return link.href.split("#")[1];
    }

    setPage(pageId) {
        this.currentPage = pageId;
        console.log(this.currentPage)

        this.links.forEach((link) => {
            link.classList.remove('active');
            if (this.getHash(link) === pageId) {
                link.classList.add('active');
            }
        })

        this.pages.forEach((page) => {
            page.style.display = 'none';
        })

        document.getElementById(pageId).style.display = "block";
    }
}


// open and close the mobile menus
let mobileMenuOpen = false;
$(".mobile_menu_btn").click(function(e) {
//   e.preventDefault();
  if (mobileMenuOpen === false) {
    $(".mobile_menu_btn").addClass("open");
    $("#mobileNavLinks").addClass("open");
    mobileMenuOpen = true;
  } else {
    $(".mobile_menu_btn").removeClass("open");
    $("#mobileNavLinks").removeClass("open");
    mobileMenuOpen = false;
  }
})

$("#mobileNavLinks > .nav_item > .nav_link").click(function(e) {
    // e.preventDefault();
    if (mobileMenuOpen === true) {
        $(".mobile_menu_btn").removeClass("open");
        $("#mobileNavLinks").removeClass("open");
        mobileMenuOpen = false;
      } 
})

export default Navigation;

