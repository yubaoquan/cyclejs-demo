(function() {
    let leftEye = document.querySelector('.left-eye')
    let rightEye = document.querySelector('.right-eye')
    let nose = document.querySelector('.nose')
    let status = document.querySelector('#speed-status')

    nose.addEventListener('click', changeEyeSpeed)

    function changeEyeSpeed() {
        let speed = +leftEye.dataset.speed || 0
        speed++
        speed %= 11
        leftEye.dataset.speed = speed
        rightEye.dataset.speed = speed
        status.textContent = `${ 10 - speed }`
    }
}())
