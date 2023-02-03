// отрисовка  списка карточек:
import { getData, postData } from './api'

export const prodocutsFunc = () => {
  const container = document.getElementById('products-container')
  container.innerHTML = ''

  const renderProducts = (data) => {
    data.forEach((product) => {
      container.insertAdjacentHTML(
        'beforeend',
        `
					<div class="col col-12 col-sm-6 col-lg-4 col-xl-3 mb-3">
						<a href="#" class="card-link">
							<div class="card">
								<img src="${product.preview}" class="card-img-top" alt="phone-1">
								<div class="card-body">
									<span class="mb-2 d-block text-secondary">${product.categoryName}</span>
									<h6 class="card-title mb-3">${product.name}</h6>

									<div class="row">
										<div class="col d-flex align-itemns-center justify-content-between">
										<h4>${product.price} ₽</h4>
										<button type="button" class="btn btn-outline-dark" data-product="${product.id}">
											<img src="/images/icon/shopping-cart-big.svg" alt="login">
										</button>
										</div>
									</div>
								</div>
							</div>
						</a>
					</div>
        `
      )
    })
  }

  container.addEventListener('click', (e) => {
    const target = e.target

    if (target.closest('button')) {
      const id = target.closest('button').dataset.product

      getData(`/products/${id}`)
        .then((product) => {
          postData('/cart', {
            name: product.name,
            price: product.price,
            count: 1,
          }).then(() => {
            console.log('Добавлено')
          })
        })
        .catch((error) => {
          console.error(error.message)
        })
    }
  })

  const init = () => {
    const params = window.location.search
    const urlSearchParams = new URLSearchParams(params)
    const id = urlSearchParams.get('id')
    const url = id ? `/products?category=${id}` : `/products`

    getData(url)
      .then((data) => {
        renderProducts(data)
      })
      .catch((error) => {
        console.error(error.message)
      })
  }

  init()
}
