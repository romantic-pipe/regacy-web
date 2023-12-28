window.addEventListener("load", function() {
    Main.init()
})

function dispatchVideoEvent() {
    const videoElementArr = document.querySelectorAll('.landing__item__video')
    console.log(videoElementArr)

    if (videoElementArr && videoElementArr.length > 0) {
        videoElementArr.forEach(videoElement => videoElement.addEventListener('loaddeddata',(event) => { handleLoadedData() }))
    }
}

function handleLoadedData() {
    windwow.dispatchEvent(new Event('resize'))
}

const Main = {
    init: function() {
        this.initSwiper()
    },
    initSwiper: function() {
        this.initSlideZIndex()
        this.initScroll()
    },
    initSlideZIndex: function() {
        const slideElementArr = document.querySelectorAll('.landing__item')
        const slideLength = slideElementArr.length
    
        if (slideElementArr && slideLength > 0) {
            slideElementArr.forEach((element, index) => {
                element.style.zIndex = slideLength - index + 1
            })
        }
    },
    initScroll: function() {
        const slideElementArr = document.querySelectorAll('.landing__item')
        const slideLength = slideElementArr.length
    
        const viewportHeight = window.innerHeight
        const slideContainerFullHeight = (window.innerHeight - 74) * 4
        console.log(slideContainerFullHeight)
        
        let lastScrollTop = 0;
        
        console.log(viewportHeight)
        window.addEventListener('scroll', function() {
            let scrollTop = window.scrollY
            // console.log(scrollTop)
            // console.log(scrollTop / slideLength)

            if (scrollTop > lastScrollTop) {
            } else {
            }

            lastScrollTop = scrollTop;
        })
    }
}