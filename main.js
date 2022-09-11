"use strict"

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

function radians_to_degrees(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}

let joystickContainer = document.querySelector(".joystick__container")
let joystickContainerCoordinates = joystickContainer.getBoundingClientRect()
let joystickContainerMiddle = {
    x: joystickContainerCoordinates.x + joystickContainer.offsetWidth / 2,
    y: joystickContainerCoordinates.y + joystickContainer.offsetHeight / 2,
}
console.log(joystickContainerMiddle)


let joystick = document.querySelector(".joystick__main")
let joystickCoordinates = joystick.getBoundingClientRect()
console.log(joystickCoordinates)
let joystickWidth = joystick.offsetWidth
let joystickHeight = joystick.offsetHeight
console.log(joystickWidth, joystickHeight)

joystick.addEventListener("touchstart", (e) => {
    console.log(e.touches[0].clientX, e.touches[0].clientY)
    // joystick.style.left = "463px"
    // joystick.style.top = "214px"
})

joystick.addEventListener("touchmove", (e) => {
    // console.log(e.touches[0].clientX, e.touches[0].clientY)
    // console.log(e.touches[0].clientX - (joystickContainerCoordinates.x + joystickWidth) + "px", e.touches[0].clientY - 154 + "px")
    joystick.style.backgroundColor = "red"
    let h = Math.hypot(e.touches[0].clientX - joystickContainerMiddle.x, e.touches[0].clientY - joystickContainerMiddle.y)
    let autreCote = Math.abs(joystickCoordinates.x - e.touches[0].clientX)
    console.log(radians_to_degrees(Math.cos(autreCote / h)))
    if(Math.hypot(e.touches[0].clientX - joystickContainerMiddle.x, e.touches[0].clientY - joystickContainerMiddle.y) > joystickContainer.offsetHeight / 2) return
    console.log("meh")
    joystick.style.left = e.touches[0].clientX - (joystickContainerCoordinates.x + joystickWidth / 2) + "px"
    joystick.style.top = e.touches[0].clientY - (joystickContainerCoordinates.y + joystickHeight / 2) + "px"
})

joystick.addEventListener("touchend", (e) => {
    joystick.style.left = joystickContainerMiddle.x - (joystickContainerCoordinates.x + joystickWidth / 2) + "px"
    joystick.style.top = joystickContainerMiddle.y - (joystickContainerCoordinates.y + joystickHeight / 2) + "px"
    joystick.style.backgroundColor = "white"
})