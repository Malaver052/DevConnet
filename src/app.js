// --- Seleccionar elementos del DOM ---
const btnRegistro = document.querySelector('#btn-registro')
const btnCerrar = document.querySelector('#btn-cerrar')
const btnConfirmar = document.querySelector('#btn-confirmar')
const modalRegistro = document.querySelector('#modal-registro')
const inputNombre = document.querySelector('#input-nombre')
const inputEmail = document.querySelector('#input-email')

// --- Modal: Abrir ---
btnRegistro.addEventListener('click', () => {
  modalRegistro.classList.add('activo')
})

// --- Modal: Cerrar con botón ---
btnCerrar.addEventListener('click', () => {
  modalRegistro.classList.remove('activo')
})

// --- Modal: Cerrar al hacer clic afuera ---
modalRegistro.addEventListener('click', (evento) => {
  if (evento.target === modalRegistro) {
    modalRegistro.classList.remove('activo')
  }
})

// --- Validar formulario ---
const validarFormulario = () => {
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

// --- Confirmar registro ---
btnConfirmar.addEventListener('click', () => {
  if (!validarFormulario()) return

  const nombre = inputNombre.value.trim()
  modalRegistro.classList.remove('activo')
  alert(`¡Bienvenido a DevConnect, ${nombre}! 🚀`)
  inputNombre.value = ''
  inputEmail.value = ''
})

// --- Navbar al hacer scroll ---
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar')
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)'
  } else {
    navbar.style.boxShadow = 'none'
  }
})

// ============================================
// FETCH — GitHub API con ES6+
// ============================================

const devsDestacados = ['torvalds', 'gvanrossum', 'addyosmani', 'tj']

const obtenerPerfilGitHub = async (username) => {
  try {
    const respuesta = await fetch(`https://api.github.com/users/${username}`)
    if (!respuesta.ok) throw new Error(`Error con ${username}`)
    const perfil = await respuesta.json()
    return perfil
  } catch (error) {
    console.error(error)
    return null
  }
}

const crearTarjetaDev = (perfil) => {
  const { avatar_url, html_url, name, login, public_repos, bio } = perfil

  return `
    <div class="dev-card" onclick="window.open('${html_url}', '_blank')">
      <img src="${avatar_url}" alt="${login}" />
      <h4>${name ?? login}</h4>
      <p>${public_repos} repositorios</p>
      ${bio ? `<p style="margin-top:4px;font-size:0.75rem">${bio.slice(0, 50)}...</p>` : ''}
    </div>
  `
}

const cargarDevs = async () => {
  const grid = document.querySelector('#devs-grid')

  try {
    const perfiles = await Promise.all(
      devsDestacados.map((username) => obtenerPerfilGitHub(username))
    )

    const tarjetas = perfiles
      .filter((perfil) => perfil !== null)
      .map((perfil) => crearTarjetaDev(perfil))
      .join('')

    grid.innerHTML =
      tarjetas || '<p class="loading">No se pudieron cargar los perfiles</p>'
  } catch (error) {
    grid.innerHTML = '<p class="loading">Error al cargar desarrolladores</p>'
    console.error(error)
  }
}

cargarDevs()
