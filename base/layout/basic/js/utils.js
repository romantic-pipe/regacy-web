function debounce(callback, limit = 100) {
    let timeout
    return function(...args) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            callback.apply(this, args)
        }, limit)
    }
}

function throttle(callback, limit = 100) {
    let waiting = false
    return function() {
        if(!waiting) {
            callback.apply(this, arguments)
            waiting = true
            setTimeout(() => {
                waiting = false
            }, limit)
        }
    }
}

function toFit(cb) {
    let tick = false
  
    return function trigger() {
        if (tick) {
            return
        }
  
        tick = true
        return requestAnimationFrame(function task() {
            tick = false
            return cb()
        })
    }
}
