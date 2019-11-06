/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/
let sections = null
let navbar = null
let activeSection = null

const activeTag = 'your-active-class'
const activeNavTag = 'your-active-nav-class'
const navIdRootTag = 'nav'

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

function initializeGlobalVariables () {
  sections = document.getElementsByTagName('section')
  navbar = document.getElementById('navbar__list')
  activeSection = document.getElementsByClassName(activeTag)[0]
  console.log('initialized global variables')
}

function findFirstSectionActive () {
  for (let i = 0; i < sections.length; i++) {
    const sec = sections[i]
    const offset = sec.getClientRects()

    const yOffset = offset[0].y
    if (yOffset > 0) {
      return sec
    }
  }
}

function changeActiveSection (newActiveSec) {
  console.log(`new activeSection ${newActiveSec.id} old active Section ${activeSection.id}`)
  // Removing the class tag from the old active section
  activeSection.classList.remove(activeTag)
  // Turning off the navigation tag
  setActiveNavigationItem(activeSection, false)

  // Resetting the new activeSection global variable to prevent futur lookups
  activeSection = newActiveSec
  // Turning off the navigation tag
  setActiveNavigationItem(activeSection, true)

  // Adding the class tag to the new active section
  activeSection.classList.add(activeTag)
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// Waiting for DOM to be fully loaded before changing the navigation
document.addEventListener('DOMContentLoaded', function () {
  initializeGlobalVariables()
  addNavigationItems()
  setActiveNavigationItem(findFirstSectionActive(), true)
  document.addEventListener('scroll', userScrolled)
})

function setActiveNavigationItem (sec, turnOn) {
  const navElemt = document.getElementById(`${navIdRootTag}-${sec.id}`)

  if (turnOn) {
    navElemt.classList.add(activeNavTag)
  } else {
    navElemt.classList.remove(activeNavTag)
  }
}

function userScrolled () {
  const sec = findFirstSectionActive()

  navbar.style.display = 'flex'

  if (activeSection !== sec) {
    console.log(`Changing the active Section to ${sec.id}`)
    changeActiveSection(sec)
  }

  // Set a timer for 2s then remove the navigation
  setTimeout(function () {
    navbar.style.display = 'none'
  }, 3000)
}

// build the nav
function addNavigationItems () {
  for (let i = 0; i < sections.length; i++) {
    const sec = sections[i]
    // Using this for the text
    const value = sec.getAttribute('data-nav')
    // Using this for the click
    const id = sec.id
    const navId = `${navIdRootTag}-${id}`
    navbar.innerHTML += `<li id="${navId}" class='menu__link' jumpto='${id}'> ${value} </li>`
  }

  // Now that the navigation has been added we can add listeners to detect clicks
  // Doing it on the parent and then using delegation
  navbar.addEventListener('click', function (evt) {
    const id = evt.target.getAttribute('jumpto')
    window.location.hash = id
    // Makubg the new section the active one
    changeActiveSection(document.getElementById(id))
    // var elmnt = document.getElementById(id);
    // elmnt.scrollIntoView(true);
  })
}

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu

// Scroll to section on link click

// Set sections as active
