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
        this.initMediaControlButton()
        this.initSlideScrollEffect()
        this.initIndicator()
        this.toggleSlideVideo()
        this.controlIndicatorEffect()
        this.controlIndicatorPosition()
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
    initMediaControlButton: function() {
        const videoElementArr = document.querySelectorAll('main video')
        const speakerOnButton = document.querySelector('.speaker-on__button')
        const speakerOffButton = document.querySelector('.speaker-off__button')

        speakerOnButton.addEventListener('click', () => {
            videoElementArr.forEach((video) => {
                video.muted = false
            })
        })
        
        speakerOffButton.addEventListener('click', () => {
            videoElementArr.forEach((video) => {
                video.muted = true
            })
        })
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
    initSlideScrollEffect: function() { 
        const headerHeight = document.querySelector('header').getBoundingClientRect().height
        const slideElementArr = document.querySelectorAll('.landing__item')    
        
        window.addEventListener('scroll', throttle(function(event) {
            const currentIndex = parseInt((window.scrollY + headerHeight) / window.innerHeight, 10)
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
    controlIndicatorEffect: function() {
        const headerHeight = document.querySelector('header').getBoundingClientRect().height
        const indicatorDotArr = document.querySelectorAll('.landing__indicator .dot')
        
        let lastIndex = 0
        window.addEventListener('scroll', throttle(function(event) {
            const currentIndex = parseInt((window.scrollY + headerHeight) / window.innerHeight, 10)
            if (lastIndex !== currentIndex) {
                indicatorDotArr[lastIndex].classList.remove('active')
                indicatorDotArr[currentIndex].classList.add('active')
            }
            
            lastIndex = currentIndex
        }, 100), { passive: true })
    },
    controlIndicatorPosition: function() {
        const landingContainerEl = document.querySelector('.landing__container')
        const slideElementArr = landingContainerEl.querySelectorAll('.landing__item')
        const indicatorEl = document.querySelector('.landing__indicator')
        const mediaControllerEl = document.querySelector('.landing__media-controller')
        const headerHeight = document.querySelector('header').getBoundingClientRect().height

        const point = (headerHeight + landingContainerEl.getBoundingClientRect().height) * ((slideElementArr.length - 1) / slideElementArr.length) + 20

        window.addEventListener('scroll', throttle(function(event) {
            const endOfLandingContainer = window.scrollY > point

            indicatorEl.style.position = endOfLandingContainer ? 'absolute' : 'fixed'
            indicatorEl.style.bottom = endOfLandingContainer ? `${window.innerHeight / 2}px` : '50%'

            mediaControllerEl.style.position = endOfLandingContainer ? 'absolute' : 'fixed'
        }, 100), { passive: true })
    }
}
