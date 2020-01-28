document.addEventListener('DOMContentLoaded', function () {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'

  const dogImages = document.getElementById('dog-image-container')
  let breeds
  let dogBreeds = document.getElementById('dog-breeds')
  let selector = document.getElementById('breed-dropdown')

  fetch(imgUrl)
    .then(function (response) {
      return response.json()
    })
    .then(function (json) {
      let images = json.message
      for (let i = 0; i < images.length; i++) {
        let image = document.createElement('img')
        image.setAttribute('src', images[i])
        dogImages.appendChild(image)
      }
    })

  fetch(breedUrl)
    .then(function (response) {
      return response.json()
    })
    .then(function (json) {
      breeds = json.message
      listBreeds()
    })

  selector.addEventListener('change', function (e) {
    let filter = e.target.value
    dogBreeds.innerHTML = ''
    listBreeds(filter)
  })

  function listBreeds(filter = "none") {
    for (var breed of Object.keys(breeds)) {
      let li = document.createElement('li')
      li.innerText = breed
      if (filter == "none" || !breed.startsWith(filter)) {
        dogBreeds.appendChild(li)
      }
      li.addEventListener('click', function () {
        li.style.color = "hotpink"
      })
    }
  }
})