export const clearAllTimeOuts = () => {
    let id = window.setTimeout(function() {}, 0);
    while(id--) {
        clearTimeout(id);
    }
}

export const clearAllIntervals = () => {
    let id = window.setInterval(function() {}, 2);
    while(id--) {
        clearTimeout(id);
    }
}

