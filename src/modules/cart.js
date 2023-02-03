// отрисовка  корзины:
import { getData, patchData } from './api'
import { openModal, closeModal } from './modals'

export const cartFunc = () => {
  const cartModal = document.getElementById('cart-modal')
  const openCartBtn = document.getElementById('open-cart-btn')
  const closeBtns = cartModal.querySelectorAll('.close-btn')
  const container = document.getElementById('cart-container')
  const totalPrice = document.getElementById('cart-totlal-price')

  const render = (data) => {
    container.innerHTML = ''

    data.forEach((cartProduct) => {
      console.log(cartProduct)
      container.insertAdjacentHTML(
        'beforeend',
        `
					<div class="row border-bottom pb-3 pt-3">
						<div class="col col-12 col-md-6 mb-3 mb-md-0 fs-4">${cartProduct.name}</div>
						<div class="col col-12 col-md-6 fs-4 d-flex align-items-center justify-content-end flex-wrap">
							<h4 class="me-3 d-flex align-itemns-center">${cartProduct.price} ₽</h4>
							<button type="button" class="btn btn-outline-dark btn-sm cart-item-controls" id="control-dec" data-id="${cartProduct.id}" data-count="${cartProduct.count}">-</button>
							<h6 class="cart-item-count me-3 ms-3">${cartProduct.count}</h6>
							<button type="button" class="btn btn-outline-dark btn-sm cart-item-controls" id="control-inc"
              data-id="${cartProduct.id}" data-count="${cartProduct.count}">+</button>
						</div>
					</div>
        `
      )
    })
  }

  const updateCart = () => {
    getData('/cart')
      .then((data) => {
        render(data)
        updateTotalPrice(data)
      })
      .catch((error) => {
        console.error(error.message)
      })
  }

  const updateTotalPrice = (data) => {
    let total = 0

    data.forEach((item) => {
      total += Number(item.price) * Number(item.count)
    })

    totalPrice.textContent = total + ' ₽'
  }

  openCartBtn.addEventListener('click', () => {
    updateCart()
    openModal(cartModal)
  })

  closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      closeModal(cartModal)
    })
  })

  container.addEventListener('click', (e) => {
    const target = e.target

    if (target.closest('button')) {
      if (target.id && target.id === 'control-inc') {
        const id = target.dataset.id
        const count = Number(target.dataset.count)

        const item = {
          count: count + 1,
        }

        patchData(`/cart/${id}`, item).then(() => {
          updateCart()
        })
      } else if (target.id && target.id === 'control-dec') {
        const id = target.dataset.id
        const count = Number(target.dataset.count)

        if (count > 0) {
          const item = {
            count: count - 1,
          }

          patchData(`/cart/${id}`, item).then(() => {
            updateCart()
          })
        }
      }
    }
  })
}
