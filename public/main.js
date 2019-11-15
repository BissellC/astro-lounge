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
  let i = 0
  document.querySelector('.ship-name').textContent = launchData[i].mission_name
  if (launchData[i].details === null) {
    document.querySelector('.launch-info').textContent =
      'No description available yet'
  } else {
    document.querySelector('.launch-info').textContent = launchData[i].details
  }
  document.querySelector('.timer').textContent = launchData[i].launch_date_utc
  document.querySelector('.location').textContent =
    launchData[i].launch_site.site_name_long
}

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
  document.querySelector('.timer').textContent = launchData[i].launch_date_utc
  document.querySelector('.location').textContent =
    launchData[i].launch_site.site_name_long
}
const prevLaunch = () => {
  i--
  document.querySelector('.ship-name').textContent = launchData[i].mission_name
  if (launchData[i].details === null) {
    document.querySelector('.launch-info').textContent =
      'No description available yet'
  } else {
    document.querySelector('.launch-info').textContent = launchData[i].details
  }
  document.querySelector('.timer').textContent = launchData[i].launch_date_utc
  document.querySelector('.location').textContent =
    launchData[i].launch_site.site_name_long
}

//launch details change automatically
const moveDetails = () => {
  nextLaunch()
}
setInterval(moveDetails, 10000)

document.addEventListener('DOMContentLoaded', main)
document.querySelector('.right-arrow').addEventListener('click', nextLaunch)
document.querySelector('.left-arrow').addEventListener('click', prevLaunch)
