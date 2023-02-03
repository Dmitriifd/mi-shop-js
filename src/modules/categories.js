// получение категорий:
import { getData } from './api'

export const categoriesFunc = () => {
  const container = document.getElementById('categories-container')
  const catalogSearch = document.querySelector('.catalog-search')

  const render = (data) => {
    container.innerHTML = ''
    
    data.forEach((category) => {
      container.insertAdjacentHTML(
        'beforeend',
        `
					<div class="col col-12 col-md-6 col-lg-4 mb-3">
						<a href="/catalog.html?id=${category.id}" class="card-link">
								<div class="card">
									<img src="${category.preview}" class="card-img-top" alt="phones">
									<div class="card-body">
										<h5 class="card-title">${category.name}</h5>
									</div>
								</div>
							</a>
					</div>
        `
      )
    })
  }

  catalogSearch.addEventListener('input', (e) => {
    const target = e.target

    getData(`/categories?q=${target.value}`)
      .then((data) => {
        render(data)
      })
      .catch((error) => {
        console.error(error.message)
      })
  })

  getData('/categories')
    .then((data) => {
      render(data)
    })
    .catch((error) => {
      console.error(error.message)
    })
}
