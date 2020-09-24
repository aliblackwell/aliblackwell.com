
(function () {
    const tag = getParameterByName('tag')
    tag && filterProjects(tag)
    tag && changeNavByTag(tag)

    const tagButtons = document.querySelectorAll('.intro a')
    tagButtons && tagButtons.forEach(button => {
        button.addEventListener('click', e => {
            e.preventDefault()
            const tag = getTagFromHref(button)
            let newUrl = UpdateQueryString('tag', tag)
            changeUrl(tag, newUrl)
            updatePage(tag)
        })
    })





    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    function UpdateQueryString(key, value, url) {
        if (!url) url = window.location.href;
        var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
            hash;

        if (re.test(url)) {
            if (typeof value !== 'undefined' && value !== null) {
                return url.replace(re, '$1' + key + "=" + value + '$2$3');
            }
            else {
                hash = url.split('#');
                url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
                if (typeof hash[1] !== 'undefined' && hash[1] !== null) {
                    url += '#' + hash[1];
                }
                return url;
            }
        }
        else {
            if (typeof value !== 'undefined' && value !== null) {
                var separator = url.indexOf('?') !== -1 ? '&' : '?';
                hash = url.split('#');
                url = hash[0] + separator + key + '=' + value;
                if (typeof hash[1] !== 'undefined' && hash[1] !== null) {
                    url += '#' + hash[1];
                }
                return url;
            }
            else {
                return url;
            }
        }
    }


    window.addEventListener('popstate', (event) => {
        updatePage(event.state)
    });



    function getTagFromHref(a) {
        return a.getAttribute('href').split('=')[1]
    }

    function changeUrl(tag, url) {
        window.history.pushState(tag, 'Activities', url)
    }

    function updatePage(tag) {
        changeNavByTag(tag)   
        filterProjects(tag)


    }

    function changeNav(targetNav, tag) {
        document.querySelectorAll('#activities-nav li').forEach(li => {
            li.classList.remove('current_page_item')
            li.removeAttribute('aria-current')
        })

        targetNav.classList.add('current_page_item')
        let ariaCurrentValue = tag === 'all' ? 'page' : 'location'
        targetNav.setAttribute('aria-current', ariaCurrentValue)
        targetNav.querySelector('a').focus()
    }

    function changeNavByTag(tag) {
        document.querySelectorAll('.intro a').forEach(button => {
            button.classList.remove('selected')
            if (tag === getTagFromHref(button)) {
                button.classList.add('selected')
            }
        })
    }



    function filterProjects(tag) {
        document.querySelectorAll('.project').forEach(el => {
            if (tag === 'all') {
                showElement(el)
                showElements(document.querySelectorAll('.theme'))
            } else {
                hideElements(document.querySelectorAll('.theme'))
                if (el.classList.contains(tag)) {
                    showElement(el)
                } else {
                    hideElement(el)
                }
            }

        })


    }

    function showElement(el) {
        el.setAttribute('aria-hidden', false)
        el.classList.remove('hidden')
        el.classList.add('visible')
    }

    function showElements(els) {
        els.forEach(function (el) {
            showElement(el)
        })
    }

    function hideElement(el) {
        el.setAttribute('aria-hidden', true)
        el.classList.remove('visible')
        el.classList.add('hidden')
    }

    function hideElements(els) {
        els.forEach(function (el) {
            hideElement(el)
        })
    }

}());