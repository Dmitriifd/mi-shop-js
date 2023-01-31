export const authFunc = () => {
  const authBtn = document.getElementById('open-auth-btn')
  const modal = document.getElementById('auth-modal')
  const closeBtns = document.querySelectorAll('.close-btn')
  const loginBtn = document.querySelector('.login-btn')
  const openCartBtn = document.getElementById('open-cart-btn')
  const logoutBtn = document.getElementById('logout-btn')

  const openModal = () => {
    modal.classList.add('d-block')

    setTimeout(() => {
      modal.classList.add('show')
    }, 100)
  }
  const closeModal = () => {
    modal.classList.remove('show')
    setTimeout(() => {
      modal.classList.remove('d-block')
    }, 500)
  }

  const login = () => {
    authBtn.classList.add('d-none')
    openCartBtn.classList.remove('d-none')
    logoutBtn.classList.remove('d-none')
    closeModal()
  }

  const logout = () => {
    authBtn.classList.remove('d-none')
    openCartBtn.classList.add('d-none')
    logoutBtn.classList.add('d-none')
  }

  const checkAuth = () => {
    if (JSON.parse(localStorage.getItem('auth'))) {
      login()
    }
  }

  authBtn.addEventListener('click', openModal)

  closeBtns.forEach((btn) => {
    btn.addEventListener('click', closeModal)
  })

  loginBtn.addEventListener('click', () => {
    const loginInput = document.querySelector('#login-control')
    const passwordInput = document.querySelector('#password-control')

    const user = {
      login: loginInput.value,
      password: passwordInput.value,
    }

    localStorage.setItem('auth', JSON.stringify(user))

    login()
  })

  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('auth')
    logout()
  })

  checkAuth()
}
