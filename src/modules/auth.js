import { getData } from './api'
import { closeModal, openModal } from './modals'

export const authFunc = () => {
  const authBtn = document.getElementById('open-auth-btn')
  const modal = document.getElementById('auth-modal')
  const closeBtns = document.querySelectorAll('.close-btn')
  const loginBtn = document.querySelector('.login-btn')
  const openCartBtn = document.getElementById('open-cart-btn')
  const logoutBtn = document.getElementById('logout-btn')

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

  const checkAuth = async () => {
    const user = JSON.parse(localStorage.getItem('auth'))

    if (user) {
      const data = await getData('/profile')

      if (
        data.login &&
        data.login === user.login &&
        data.password &&
        data.password === user.password
      ) {
        login()
      }
    }
  }

  authBtn.addEventListener('click', () => openModal(modal))

  closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => closeModal(modal))
  })

  loginBtn.addEventListener('click', async () => {
    const loginInput = document.querySelector('#login-control')
    const passwordInput = document.querySelector('#password-control')

    const user = {
      login: loginInput.value,
      password: passwordInput.value,
    }

    const data = await getData('/profile')

    if (
      data.login &&
      data.login === user.login &&
      data.password &&
      data.password === user.password
    ) {
      localStorage.setItem('auth', JSON.stringify(data))
      login()
    } else {
      alert('Неправильный логин или пароль')
    }
  })

  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('auth')
    logout()
  })

  checkAuth()
}
