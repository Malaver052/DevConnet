// modal.js — lógica del modal de registro

const iniciarModal = () => {
  const btnRegistro = document.querySelector('#btn-registro')
  const btnCerrar = document.querySelector('#btn-cerrar')
  const btnConfirmar = document.querySelector('#btn-confirmar')
  const modalRegistro = document.querySelector('#modal-registro')
  const inputNombre = document.querySelector('#input-nombre')
  const inputEmail = document.querySelector('#input-email')

  const abrir = () => modalRegistro.classList.add('activo')
  const cerrar = () => modalRegistro.classList.remove('activo')

  const validar = () => {
    const nombre = inputNombre.value.trim()
    const email = inputEmail.value.trim()

    if (nombre === '') {
      alert('Por favor escribe tu nombre')
      return false
    }
    if (email === '' || !email.includes('@')) {
      alert('Por favor escribe un email válido')
      return false
    }
    return true
  }

  btnRegistro.addEventListener('click', abrir)
  btnCerrar.addEventListener('click', cerrar)

  modalRegistro.addEventListener('click', (e) => {
    if (e.target === modalRegistro) cerrar()
  })

  btnConfirmar.addEventListener('click', () => {
    if (!validar()) return
    const nombre = inputNombre.value.trim()
    cerrar()
    alert(`¡Bienvenido a DevConnect, ${nombre}! 🚀`)
    inputNombre.value = ''
    inputEmail.value = ''
  })
}

export default iniciarModal
