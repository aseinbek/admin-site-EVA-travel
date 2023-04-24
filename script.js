const $login = document.querySelector('.login')
const $password = document.querySelector('.password')
const $btn = document.querySelector('.btnOk')

$btn.addEventListener('click', () => {
  if ($login.value == 'admin') {
    if ($password.value == 'nimda') {
      window.open('/page.html', '_self')
    } else {
      alert('Не правильный пароль!')
    }
  } else {
    alert('Не правильный логин!')
  }
})