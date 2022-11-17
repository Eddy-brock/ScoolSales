function openNav() {
    document.getElementById("SideNav").style.width = "70%";
}

function closeNav() {
    document.getElementById("SideNav").style.width = "0";
}

$(document).ready(function() {
	$('#pagepiling').pagepiling({
        menu: '#SideNav',
        anchors: ['Main', 'Banners', 'Brain', 'Cursos', 'Competencias','Academias', 'Portales'],
        navigation: {'bulletsColor':'rgba(255,255,255,0)'}
    });
});


//Get the input field
var input = document.getElementById("searchbox2");

function search() {
    let url = "/ui/lms-learner-search/search?pageNumber=1&query=" + input.value;
    window.location.href = url;
}


var ImageInject = function(){ 
    var src = document.querySelector("img[id*='_imgPhoto']").src;   // here is the src for image1
    var pic2 = document.getElementById("Image2"); 
    pic2.src = src;   // here is the src for image2
}
ImageInject();


//busqueda

function OnKeyDown(e) {
    if (e.keyCode == 13) {
        // give time for predictive to update the textbox
        globalSearchTimer = setTimeout(function () {
            OnSearchFixedSearching();
        }, 150);

        return false;
    }

    return true;
}

function OnSearchFixedSearching() {
    var query = document.getElementById('searchbox2').value;

    RedirectGlobalSearch(query);
}

var isSearching = false;
function RedirectGlobalSearch(query) {
    isSearching = true;

//alert (query);
    var src = '/ui/lms-learner-search/search?pageNumber=1&query=' + query;

    // for some reason, without the timeout sometimes the window doesn't redirect from certain pages in FF
 setTimeout(function () {
     window.location = src;
 }, 150);
}

function populatePSQuery(query) {
    query.index = '';
}