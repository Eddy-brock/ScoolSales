// Academias Functions
console.log("academias");
let up, down, dropLinks, closeDrop, academias, drops, mobile, leftArrow, rightArrow;
let initialNumber = 0;
let mobilepos = 0;
let scrollPosition = 0;

leftArrow = document.querySelector('.arrowL');
rightArrow = document.querySelector('.arrowR');




function getPrimary() {
    academias = document.querySelectorAll(".button_escuelas");
    drops = document.querySelectorAll(".drop-content");
}
    let w = document.documentElement.clientWidth;
    let h = document.documentElement.clientHeight;
    (w <= 900) ? mobile = true : mobile = false;
    console.log(mobile)
getPrimary();

academias.forEach(function (academia) {
    academia.addEventListener("click", function (e) {
        mobile ? academia.classList.add('hide') : null;
        initialNumber = 0;
        drops.forEach(function (drop) {
            drop.classList.add("hide");
            cloneElement(drop);
        });
        getPrimary();
        const grupoAcademia = this.parentElement.childNodes;
        grupoAcademia.forEach(function (academia) {
            if (academia.nodeName === "DIV") {
                if (academia.classList.contains("drop-content")) {
                    academia.classList.remove("hide");
                    scrollList(academia);
                }
            }
        });
    });
});



const scrollList = (dropContent) => {
    // console.log(dropContent);
    
    dropContent.childNodes.forEach(function (element) {
        if (element.nodeName === "DIV") {
            // console.log(element)
            element.classList.contains("up-drop") ? (up = element) : "";
            element.classList.contains("down-drop") ? (down = element) : "";
            element.classList.contains("drop-links")
            ? (dropLinks = element)
            : "";
            element.classList.contains("close-drop")
            ? (closeDrop = element)
            : "";
        }
    });
    //  console.log(up, down, dropLinks);
    
    const linksA = dropLinks.querySelectorAll("a");
    
    changeArrow();
    closeDrop.addEventListener("click", function () {
        dropContent.classList.add("hide");
        // up.removeEventListener("click", upButton);
        // down.removeEventListener("click", downButton);
    });
    
    if(linksA.length <= 6) {
        for(let i = 0; i < linksA.length-1; i++) {
            linksA[i].classList.add("borderB");
        }
        return;
    }
    // console.log("aqui")
    
    linksA.forEach(function (link) {
        // console.log(link)
        link.classList.add("hide");
        link.classList.remove("borderB")
    });
    

    for (let i = initialNumber; i < initialNumber + 6; i++) {
        linksA[i].classList.remove("hide");
        // console.log(i);
        if (i + 1 !== initialNumber + 6) {
            linksA[i].classList.add("borderB");
        }
        // console.log(dropLinks[i]);
    }

    function upButton(e) {
        if (initialNumber > 0) {
            initialNumber = initialNumber - 1;
            scroll(linksA, initialNumber);
        }
        changeArrow();
    }
    
    function downButton(e) {
        if (initialNumber < linksA.length - 6) {
            initialNumber = initialNumber + 1;
            scroll(linksA, initialNumber);
        }
        changeArrow();
    }

    up.addEventListener("click", upButton, true);
    down.addEventListener("click", downButton, true);
    // console.log("close:".closeDrop)

    

    const scroll = (linksA, initialNumber) => {
        linksA.forEach(function (link) {
            // console.log(link)
            link.classList.add("hide");
            link.classList.remove("borderB");
        });
        for (let i = initialNumber; i < initialNumber + 6; i++) {
            // console.log(initialNumber);
            linksA[i].classList.remove("hide");
            if (i + 1 !== initialNumber + 6) {
                linksA[i].classList.add("borderB");
            }
            // console.log(dropLinks[i]);
        }

        // console.log(dropLinks.length);
    }
    function changeArrow(){

        if(initialNumber + 6 >= linksA.length){
            down.childNodes[0].src = "/content/grupobimbo/publications/10218/toupload/img/academia-arrow-down-disabled.png";
        }
        if(initialNumber + 6 < linksA.length){
            down.childNodes[0].src = "/content/grupobimbo/publications/10218/toupload/img/academia-arrow-down-enabled.png";
        }
        if(initialNumber > 0){
            up.childNodes[0].src = "/content/grupobimbo/publications/10218/toupload/img/academia-arrow-up-enabled.png";
        }
        if(initialNumber  === 0){
            up.childNodes[0].src = "/content/grupobimbo/publications/10218/toupload/img/academia-arrow-up-disabled.png";
        }
    }
};

function cloneElement(element) {
    const old_element = element;
    // console.log(old_element.parentNode)
    const new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
}

// resize window events
window.addEventListener("resize", ()=>{
    let w = document.documentElement.clientWidth;
    let h = document.documentElement.clientHeight;

    console.log(`width: ${w}, height: ${h}`)
    
})

window.addEventListener("load", ()=>{
    let w = document.documentElement.clientWidth;
    let h = document.documentElement.clientHeight;
    
    console.log(`width: ${w}, height: ${h}`)
})

// arrow events
rightArrow.addEventListener('click', lateralScrollR);
leftArrow.addEventListener('click', lateralScrollL);

function lateralScrollR(){
    const scroll = w;
    document.querySelector('.academias_sections').scroll({
        left: scrollPosition += scroll,
        behavior: 'smooth'
    });
    const maxWidthSlider = document.querySelector('.academias_sections').scrollWidth - document.querySelector('.academias_sections').clientWidth;
  if (maxWidthSlider + scroll <= scrollPosition) {
    document.querySelector('.academias_sections').scroll({
      left: 0,
      behavior: 'smooth'
    })
    scrollPosition = 0
  };
  mobilepos++;
    (mobilepos > 6) ? mobilepos = 0 : null;
    academias[mobilepos].click();
    // console.log(academias[mobilepos].previousElementSibling)
}
function lateralScrollL(){
    const scroll = w;
    document.querySelector('.academias_sections').scroll({
        left: scrollPosition -= scroll,
        behavior: 'smooth'
    });
    if (scrollPosition + scroll <= 0) {
      const maxWidthSlider = document.querySelector('.academias_sections').scrollWidth - document.querySelector('.academias_sections').clientWidth;
    document.querySelector('.academias_sections').scroll({
      left: maxWidthSlider,
      behavior: 'smooth'
    })
    scrollPosition = maxWidthSlider
  };
  mobilepos--;
    (mobilepos < 0) ? mobilepos = 6 : null;
    academias[mobilepos].click();
}

mobile ? academias[mobilepos].click() : null;
document.querySelector('.academias_sections').scroll({
    left: scrollPosition,
    behavior: 'smooth'
});
document.querySelectorAll('.close-drop').forEach(ele=>{
    mobile ? ele.classList.add('hide') : null;
})