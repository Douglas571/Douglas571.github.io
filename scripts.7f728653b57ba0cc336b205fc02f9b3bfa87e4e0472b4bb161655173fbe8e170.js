const mobilNavbar = document.querySelector('.mobil-navbar')
const menuOpenButton = document.querySelector('.open-mobil-navbar')
const menuCloseButton = document.querySelector('.mobil-navbar .close-button')

const firstSection = document.querySelector('.first-section')
const blogSection = document.querySelector('#blog-section')

function addVisibleClass(el) {
  console.log({el})
  let className = el.getAttribute('class').split(' ')

  if (!className.includes('visible')) {
    const newClassName = [...className, 'visible'].join(' ')
    console.log('set visible')
    console.log({newClassName})
    el.setAttribute('class', newClassName)  
  }
}

function removeVisibleClass(el) {
  const className = el.getAttribute('class').split(' ')    
  const newClassName = className.filter( c => c !== 'visible').join(' ')
  el.setAttribute('class', newClassName)  
}

menuOpenButton.addEventListener('click', evt => {
  console.log('open menu')
  addVisibleClass(mobilNavbar)
})

menuCloseButton.addEventListener('click', evt => {
  console.log('close menu')
  removeVisibleClass(mobilNavbar)
})