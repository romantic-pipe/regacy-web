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
        this.initIndicator()
        this.toggleSlideVideo()
        this.controlIndicator()
    },
    initSlide: function() {
        const slideElementArr = document.querySelectorAll('.landing__item')
        const slideLength = slideElementArr.length
    
        if (slideElementArr && slideLength > 0) {
            slideElementArr.forEach((element, index) => {
                element.style.zIndex = slideLength - index + 2
                if (index !== 0) {
                    element.querySelector('video').pause()
                }

                if (index === 1) {
                    element.style.filter = `blur(${this.initialValue.blurMaxPoint}px)`
                }
            })
        }
    },
    initIndicator: function() {
        const landingIndicatorEl = document.querySelector('.landing__indicator')
        const slideElementArr = document.querySelectorAll('.landing__item')
        const slideLength = slideElementArr.length
        
        for (let i = 0; i < slideLength; i++) {
            const dotEl = document.createElement('div')
            
            dotEl.dataset.index = i
            dotEl.classList.add('dot')
            if (i === 0) {
                dotEl.classList.add('active')
            }

            landingIndicatorEl.appendChild(dotEl)
        }
    },
    initScroll: function() {        
        const slideElementArr = document.querySelectorAll('.landing__item')    
        
        window.addEventListener('scroll', throttle(function(event) {
            const currentIndex = parseInt(window.scrollY / window.innerHeight, 10)
            const currentSlide = slideElementArr[currentIndex]
            const currentSlideY = currentSlide.getBoundingClientRect().bottom

            // Control Blur Filter Of Slide
            if (currentIndex === slideElementArr.length - 1) return

            const nextSlide = slideElementArr[currentIndex + 1]
            nextSlide.style.filter = `blur(${window.innerHeight / (window.innerHeight - currentSlideY) - 1}px)`
            nextSlide.style.opacity = (window.innerHeight - currentSlideY) / window.innerHeight
        }, 100), { passive: true })
    },
    toggleSlideVideo: function() {
        const slideElementArr = document.querySelectorAll('.landing__item') 
        
        let lastIndex = 0
        window.addEventListener('scroll', throttle(function(event) {
            const currentIndex = parseInt((window.scrollY + window.innerHeight * 0.5) / (window.innerHeight), 10)
            const currentSlide = slideElementArr[currentIndex]
            
            if (currentIndex !== lastIndex) {
                slideElementArr[lastIndex]?.querySelector('video').pause()
                currentSlide?.querySelector('video').play()
            }
            
            lastIndex = currentIndex
        }, 100), { passive: true })
    },
    controlIndicator: function() {
        const indicatorDotArr = document.querySelectorAll('.landing__indicator .dot')
        
        let lastIndex = 0
        window.addEventListener('scroll', throttle(function(event) {
            const currentIndex = parseInt((window.scrollY + window.innerHeight * 0.5) / (window.innerHeight), 10)
            if (lastIndex !== currentIndex) {
                indicatorDotArr[lastIndex].classList.remove('active')
                indicatorDotArr[currentIndex].classList.add('active')
            }   
            
            lastIndex = currentIndex
        }, 100), { passive: true })
    }
}
