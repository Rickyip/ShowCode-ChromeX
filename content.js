var currentElement = null;
var timer;
var tooltipMode = false;
var darkmode = true;
var isActivated = true;

(function () {
    makeTooltipElement();
})();


if(isActivated){
    document.addEventListener('mouseover', function (e) {
        var x = e.clientX, y = e.clientY;
        var elementMouseIsOver = document.elementFromPoint(x, y);
    
        timer = window.setTimeout(function () {
            showCode(elementMouseIsOver, x, y);
        }, 2000);
    });

    document.addEventListener('mouseout', function (e) {
        window.clearTimeout(timer);
        if(isActivated && tooltipMode){
            hideCode();
        }
    });
}

function makeTooltipElement() {
    var span = document.createElement('span');
    span.id = "display-span";
    span.style.display = "none";
    document.body.parentElement.insertBefore(span, document.body);
}

function showCode(dom, x, y) {
    console.log("Show");

    var displayDom = document.getElementById("display-span");
    displayDom.innerHTML = getBasicCSSText(dom);
    displayDom.style.display = "block";
    displayDom.style.overflow = "hidden";
    displayDom.style.backgroundColor = "#313235";
    displayDom.style.color = "white";
    displayDom.style.padding = "7px";
    displayDom.style.fontSize = "7px";
    displayDom.style.fontFamily = "Menlo, Consolas, DejaVu Sans Mono, monospace";
    displayDom.style.opacity = "1";
    displayDom.style.transition = "all 0.3s ease-in-out";
    displayDom.style.wordWrap = "break-word";
    displayDom.style.whiteSpace = "pre-wrap";
    displayDom.style.wordBreak = "normal";
    displayDom.style.zIndex = "9999";

    if(tooltipMode){
        displayDom.style.borderLeft = "6px solid ";
        displayDom.style.position = "fixed";
        displayDom.style.top = (y + 20) + 'px';
        displayDom.style.left = (x + 20) + 'px';
    } else {
        displayDom.style.top = '0px';
        displayDom.style.left = '0px';
    }
}

function getBasicCSSText(element) {
    var string = '';
    string += "Id:" + element.id;
    string += "\nClass:" + element.className;
    string += "\ndisplay:" + window.getComputedStyle(element).display;
    string += "\nposition:" + window.getComputedStyle(element).position;
    string += "\nbg-color:" + window.getComputedStyle(element).backgroundColor;
    string += "\nmargin:" + window.getComputedStyle(element).margin;
    string += "\npadding:" + window.getComputedStyle(element).padding;
    string += "\nheight:" + window.getComputedStyle(element).height;
    string += "\nwidth:" + window.getComputedStyle(element).width;
    var font = window.getComputedStyle(element).fontFamily;
    if(font.length > 35 ){
        font = font.substring(0,32)+"...";
    }
    string += "\nFont Family:" + font;
    string += "\nLine Height:" + window.getComputedStyle(element).lineHeight;
    string += "\nFont Size:" + window.getComputedStyle(element).fontSize;
    string += "\nFont Weight:" + window.getComputedStyle(element).fontWeight;
    string += "\nColor:" + window.getComputedStyle(element).color;
    string += "\nText Align:" + window.getComputedStyle(element).textAlign;
    string += "\nVertical Align:" + window.getComputedStyle(element).verticalAlign;
    string += "\nLine Height:" + window.getComputedStyle(element).lineHeight;
    string += "\nCssFloat:" + window.getComputedStyle(element).cssFloat;
    string += "\nZ-Index:" + window.getComputedStyle(element).zIndex;
    return string;
}

function lineFactory(title, value){
    return "<span class='showCodeXTitle' style:''>title</span>: <span class='showCodeXValue' style:''>value";
}

function hideCode() {
    console.log("Hide");
    var displayDom = document.getElementById("display-span");
    displayDom.innerText = '';
    displayDom.style.display = "none";
}

function whiteListProcess(){
    var currentDomain = {};
    currentDomain.domain = document.domain;
      // Get a value saved in a form.
    var theValue = textarea.value;
    // Check that there's some code there.
    if (!theValue) {
        message('Error: No value specified');
        return;
    }
    chrome.storage.local.get('whiteList', function (result) {
        var whiteList = result.whiteList;
        whiteList.push(currentDomain);
        // Save it using the Chrome extension storage API.
        chrome.storage.sync.set({'whiteList': whiteList}, function() {
            // Notify that we saved.
            message('Settings saved');
        });
    });
   
}

