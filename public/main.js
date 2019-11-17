const main = () => {
  getPotdData()
  getLaunchData()
}

let potdData
let i = 0
let launchData

//retrieve pic of the day data
const getPotdData = async () => {
  const resp = await fetch('https://sdg-astro-api.herokuapp.com/api/Nasa/apod')
  console.log(resp)
  potdData = await resp.json()
  console.log(potdData)
  displayPotd(potdData)
  displayCredentials(potdData)
}

//display Picture of the day
const displayPotd = potdData => {
  document.querySelector('.main-image').style.backgroundImage =
    'url(' + potdData.hdUrl + ')'
}
//display copyright and title
const displayCredentials = potdData => {
  if (potdData.copyright === null) {
    document.querySelector('.copyright').textContent = 'copyright: no copyright'
  } else
    document.querySelector('.copyright').textContent =
      'copyright: ' + potdData.copyright
  document.querySelector('.title').textContent = 'title: ' + potdData.title
}
//retrieve launch data
const getLaunchData = async () => {
  const resp = await fetch(
    'https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming'
  )
  console.log(resp)
  launchData = await resp.json()
  console.log(launchData)
  displayLaunchData(launchData)
}

//display launch data

const displayLaunchData = launchData => {
  document.querySelector('.ship-name').textContent = launchData[i].mission_name
  if (launchData[i].details === null) {
    document.querySelector('.launch-info').textContent =
      'No description available yet'
  } else {
    document.querySelector('.launch-info').textContent = launchData[i].details
  }
  document.querySelector('.location').textContent =
    launchData[i].launch_site.site_name_long
  startCountdown()
}
//countdown
const startCountdown = () => {
  const launchTime = launchData[i].launch_date_unix * 1000
  console.log(launchTime)
  const currentTime = new Date().getTime()
  console.log(currentTime)
  const timeBetween = launchTime - currentTime

  const days = Math.floor(timeBetween / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (timeBetween % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
  const minutes = Math.floor((timeBetween % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeBetween % (1000 * 60)) / 1000)
  console.log(seconds)

  document.querySelector('.days').textContent = days + ' days, '
  document.querySelector('.hours').textContent = hours + ' hours, '
  document.querySelector('.minutes').textContent = minutes + ' mins, '
  document.querySelector('.seconds').textContent = seconds + ' seconds'

  if (timeBetween < 0) {
    document.querySelector('.days').textContent = 'Launched!'
    document.querySelector('.hours').textContent = ''
    document.querySelector('.minutes').textContent = ''
    document.querySelector('.seconds').textContent = ''
  }
}
setInterval(startCountdown, 1000)

const nextLaunch = () => {
  if (i <= launchData.length) {
    i++
  } else {
    i = 0
  }
  document.querySelector('.ship-name').textContent = launchData[i].mission_name
  if (launchData[i].details === null) {
    document.querySelector('.launch-info').textContent =
      'No description available yet'
  } else {
    document.querySelector('.launch-info').textContent = launchData[i].details
  }

  document.querySelector('.location').textContent =
    launchData[i].launch_site.site_name_long
  startCountdown()
}
const prevLaunch = () => {
  if (i >= 1) {
    i--
  } else {
    i = 0
  }
  document.querySelector('.ship-name').textContent = launchData[i].mission_name
  if (launchData[i].details === null) {
    document.querySelector('.launch-info').textContent =
      'No description available yet'
  } else {
    document.querySelector('.launch-info').textContent = launchData[i].details
  }

  document.querySelector('.location').textContent =
    launchData[i].launch_site.site_name_long
  startCountdown()
}

//launch details change automatically
const moveDetails = () => {
  nextLaunch()
  startCountdown()
}
setInterval(moveDetails, 10000)

document.addEventListener('DOMContentLoaded', main)
document.querySelector('.right-arrow').addEventListener('click', nextLaunch)
document.querySelector('.left-arrow').addEventListener('click', prevLaunch)
