const listItem = ({ onClick, title }) => {
  const element = document.createElement('div')

  element.className = 'list-item'
  element.textContent = title
  element.addEventListener('click', onClick)

  return element
}

module.exports = listItem