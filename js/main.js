window.addEventListener("load", function() {
    Main.init()
})

function dispatchVideoEvent() {
    const videoElementArr = document.querySelectorAll('.landing__item__video')

    if (videoElementArr && videoElementArr.length > 0) {
        videoElementArr.forEach(videoElement => videoElement.addEventListener('loaddeddata',(event) => { handleLoadedData() }))
    }
}

function handleLoadedData() {
    windwow.dispatchEvent(new Event('resize'))
}

const Main = {
    initialValue: {
        blurMinPoint: 0,
        blurMaxPoint: 10,  
    },
    init: function() {
        this.initSwiper()
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 0)
    },
    initSwiper: function() {
        this.initSlide()
        this.initScroll()
    },
    initSlide: function() {
        const slideElementArr = document.querySelectorAll('.landing__item')
        const slideLength = slideElementArr.length
    
        if (slideElementArr && slideLength > 0) {
            slideElementArr.forEach((element, index) => {
                element.style.zIndex = slideLength - index + 2

                if (index === 1) {
                    element.style.opacity = 1
                    element.style.filter = `blur(${this.initialValue.blurMaxPoint}px)`
                }
            })
        }
    },
    initScroll: function() {        
        const slideElementArr = document.querySelectorAll('.landing__item')    
        const blurMaxPoint = 10

        let lastScrollTop = 0
        
        window.addEventListener('scroll', throttle(function(event) {
            const direction = window.scrollY - lastScrollTop > 0 ? 'down' : 'up'
            const currentIndex = parseInt((window.scrollY + window.innerHeight / 2) / (window.innerHeight), 10)

            if (direction === 'down') {
                slideElementArr[currentIndex - 1]?.querySelector('video').pause()
            } else {
                slideElementArr[currentIndex + 1]?.querySelector('video').pause()
            }
            slideElementArr[currentIndex]?.querySelector('video').play()
            
            lastScrollTop = window.scrollY
        }, 300), { passive: true })
    }
}
