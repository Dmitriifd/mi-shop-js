import { deleteData, getData, postData } from '../api'

export const addProduct = () => {
  const titleInput = document.getElementById('product-title')
  const nameInput = document.getElementById('product-name')
  const priceInput = document.getElementById('product-price')
  const previewInput = document.getElementById('product-image')

  const saveBtn = document.getElementById('product-add-btn')
  const container = document.getElementById('product-table')
  const select = document.getElementById('product-category')

  const productData = {
    name: '',
    preview: '',
    price: 0,
    title: '',
    category: 0,
  }

  const render = (data) => {
    container.innerHTML = ''
    data.forEach((item, index) => {
      container.insertAdjacentHTML(
        'beforeend',
        `
					<tr>
						<th scope="row">${index + 1}</th>
						<td>${item.title || item.categoryName}</td>
						<td>${item.name}</td>
						<td>${item.price} ₽</td>
						<td class="text-end">
							<button type="button" class="btn btn-outline-danger btn-sm" data-product="${
                item.id
              }"> Удалить </button>
						</td>
					</tr>
        `
      )
    })
  }

  const checkValues = () => {
    if (
      nameInput.value === '' ||
      previewInput === '' ||
      titleInput === '' ||
      Number(priceInput.value) === 0 ||
      select.value === 'default'
    ) {
      saveBtn.disabled = true
    } else {
      saveBtn.disabled = false
    }
  }

  select.addEventListener('change', () => {
    productData.category = select.value
    const url = select.value !== 'default' ? `/products?category=${select.value}` : `/products`

    getData(url).then((data) => {
      render(data)
    })

    checkValues()
  })

  nameInput.addEventListener('input', () => {
    productData.name = nameInput.value
    checkValues()
  })

  titleInput.addEventListener('input', () => {
    productData.title = titleInput.value
    checkValues()
  })

  priceInput.addEventListener('input', () => {
    productData.price = Number(priceInput.value)
    checkValues()
  })

  previewInput.addEventListener('input', () => {
    const file = previewInput.files[0]
    if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        productData.preview = reader.result
      })

      reader.addEventListener('error', () => {
        productData.preview = ''
      })

      reader.readAsDataURL(file)
    } else {
      previewInput.value = ''
    }
  })

  const updateTable = () => {
    getData('/products').then((data) => {
      render(data)
    })
  }

  saveBtn.addEventListener('click', () => {
    postData('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      nameInput.value = ''
      previewInput.value = ''
      priceInput.value = ''
      titleInput.value = ''

      updateTable()
    })
  })

  container.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const id = e.target.dataset.product
      deleteData(`/products/${id}`).then(() => {
        updateTable()
      })
    }
  })
  
  updateTable()
  checkValues()
}
