var ali = document.querySelector('figure img'), i = 2, intervalHolder;
var srcs = ['/img/ali-blackwell-0.jpeg', '/img/ali-blackwell-1.jpeg', '/img/ali-blackwell.jpeg']

function loopAnimateImage() {
    intervalHolder = setInterval(function () {
        ali.setAttribute('src', srcs[i])
        i = i === 0 ? 1 : i === 1 ? 2 : 0;
    }, 350)
}

function singleAnimateImage() {

    setTimeout(function () {
        ali.setAttribute('src', srcs[1])
    }, 350)
    setTimeout(function () {
        ali.setAttribute('src', srcs[2])
    }, 700)
}

function stopAnimateImage() {
    clearInterval(intervalHolder)
}

var mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

mediaQuery.addEventListener('change', function () {
    stopAnimateImage()
});

!mediaQuery.matches && ali.addEventListener('mouseover', loopAnimateImage)
!mediaQuery.matches && singleAnimateImage()
ali.addEventListener('mouseout', stopAnimateImage)

