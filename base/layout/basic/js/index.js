window.addEventListener("load", function() {
    BaseModule.init()
})

const BaseModule = {
    init: function() {
        this.controlHeaderActivation()
    },
    controlHeaderActivation: function() {
        const headerElement = document.querySelector('header')
        const headerHeight = headerElement.getBoundingClientRect().height
        const togglePoint = window.innerHeight * 0.3
        
        window.addEventListener('scroll', function() {
            let scrollTop = window.scrollY

            headerElement.style.transform = scrollTop > togglePoint ? `translateY(-${headerHeight}px)` : "translateY(0px)"
        })
    },
}