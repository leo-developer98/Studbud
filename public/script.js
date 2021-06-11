// import all the js files for components
import Navigation from './components/navigation';
import './components/tasklist';
import './components/timers';
import './components/readinglist';
import './components/dictionary';
import './components/musicplayer';

// Navigation
const links = document.querySelectorAll('.top_nav > ul > li > a');
const pages = document.querySelectorAll('.page_container');

var nav = new Navigation(links, pages);
// nav.getLinks();

nav.links.forEach(function (link) {
  link.addEventListener('click', function () {
    let pageId = nav.getHash(link);
    nav.setPage(pageId);
  })
})

const subLinks = document.querySelectorAll('.sub_nav > ul > li > a');
const subPages = document.querySelectorAll('.sub_page_container');
var subNav = new Navigation(subLinks, subPages);
subNav.links.forEach((link) => {
  link.addEventListener('click', function () {
    let pageId = subNav.getHash(link);
    subNav.setPage(pageId);
  })
})

