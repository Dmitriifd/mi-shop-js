import { deleteData, getData, postData } from '../api'

export const addCategory = () => {
  const nameInput = document.getElementById('category-name')
  const previewInput = document.getElementById('category-image')
  const saveBtn = document.getElementById('category-add-btn')

  const container = document.getElementById('category-container')
  const categoryList = document.getElementById('product-category')

  const categoryData = {
    name: '',
    preview: '',
  }

  const render = (data) => {
    container.innerHTML = ''

    data.forEach((item, index) => {
      container.insertAdjacentHTML(
        'beforeend',
        `
					<tr>
						<th scope="row">${index + 1}</th>
						<td>${item.name}</td>
						<td class="text-end">
							<button type="button" class="btn btn-outline-danger btn-sm" data-category="${
                item.id
              }"> Удалить </button>
						</td>
					</tr>
        `
      )

      categoryList.insertAdjacentHTML(
        'beforeend',
        `
           <option value="${item.id}">${item.name}</option>
        `
      )
    })
  }

  const checkValues = () => {
    if (nameInput.value === '' || previewInput === '') {
      saveBtn.disabled = true
    } else {
      saveBtn.disabled = false
    }
  }

  const updateTable = () => {
    getData('/categories').then((data) => {
      render(data)
    })
  }

  nameInput.addEventListener('input', () => {
    categoryData.name = nameInput.value
    checkValues()
  })

  previewInput.addEventListener('input', () => {
    const file = previewInput.files[0]
    if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        categoryData.preview = reader.result
      })

      reader.addEventListener('error', () => {
        categoryData.preview = ''
				previewInput.value = ''
      })

      reader.readAsDataURL(file)
    } else {
      previewInput.value = ''
    }
  })

  saveBtn.addEventListener('click', () => {
    postData('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      previewInput.value = ''
      nameInput.value = ''
      updateTable()
    })
  })

  container.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const id = e.target.dataset.category
      deleteData(`/categories/${id}`).then((data) => {
        updateTable()
      })
    }
  })

  updateTable()
  checkValues()
}
