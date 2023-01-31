import { closeModal, openModal } from "./modals"

export const authFunc = () => {
  const authBtn = document.getElementById('open-auth-btn')
  const modal = document.getElementById('auth-modal')
  const closeBtns = document.querySelectorAll('.close-btn')
  const loginBtn = document.querySelector('.login-btn')
  const openCartBtn = document.getElementById('open-cart-btn')
  const logoutBtn = document.getElementById('logout-btn')
	const cartModal = document.getElementById('cart-modal')


  const login = () => {
    authBtn.classList.add('d-none')
    openCartBtn.classList.remove('d-none')
    logoutBtn.classList.remove('d-none')
    closeModal(modal)
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

  authBtn.addEventListener('click', () => openModal(modal))

  closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => closeModal(modal))
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

	openCartBtn.addEventListener('click', () => {
		openModal(cartModal)
	})

  checkAuth()
}
