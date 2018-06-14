const Snap = window.Snap
const mina = window.mina

const centerPos = 400

const earOffsetX = 145
const earOffsetY = 340
const earRadius = 140

const eyeOffsetX = 80
const eyeOffsetY = 440
const eyeRadius = 20

const pupilOffset = 8
const pupilRadius = 7.5

const noseWidth = 60
const noseHeight = 100
const noseOffsetY = 0
const noseRaduis = 25

let s = Snap('#svg')

let face = s.circle(centerPos, centerPos, 180)
face.attr({ fill: 'red' })

let leftEar = s.circle(centerPos - earOffsetX, earOffsetY, earRadius)
leftEar.attr({ fill: 'red' })

let rightEar = s.circle(centerPos + earOffsetX, earOffsetY, earRadius)
rightEar.attr({ fill: 'red' })

let leftEye = s.circle(centerPos - eyeOffsetX, eyeOffsetY, eyeRadius)
leftEye.attr({ fill: 'white' })

let rightEye = s.circle(centerPos + eyeOffsetX, eyeOffsetY, eyeRadius)
rightEye.attr({ fill: 'white' })

let leftPupil = s.circle(
    centerPos - eyeOffsetX - pupilOffset,
    eyeOffsetY + pupilOffset,
    pupilRadius
)
leftPupil.attr({ fill: 'black' })

let rightPupil = s.circle(
    centerPos + eyeOffsetX + pupilOffset,
    eyeOffsetY - pupilOffset,
    pupilRadius
)
rightPupil.attr({ fill: 'black' })

let nose = s.rect(
    centerPos - noseWidth / 2,
    centerPos - noseOffsetY,
    noseWidth,
    noseHeight,
    noseRaduis,
    noseRaduis
)
nose.attr({ fill: 'black' })

let leftEyeGroup = s.g(leftEye, leftPupil)
let rightEyeGroup = s.g(rightEye, rightPupil)

function rotate(val = 0) {
    Snap.animate(0, 360, (val) => {
        leftEyeGroup.attr({ transform: `r${ val }, ${ centerPos - eyeOffsetX }, ${ eyeOffsetY }` })
        rightEyeGroup.attr({ transform: `r${ val }, ${ centerPos + eyeOffsetX }, ${ eyeOffsetY }` })
    }, 1000, mina.linear, rotate)
}

nose.click(() => {
    rotate(0)
})
