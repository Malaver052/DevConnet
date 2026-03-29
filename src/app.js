// app.js — punto de entrada de DevConnect

import iniciarModal from './modules/modal.js'
import { cargarDevs } from './modules/github.js'

// Navbar scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar')
  navbar.style.boxShadow =
    window.scrollY > 50 ? '0 4px 24px rgba(0,0,0,0.3)' : 'none'
})

// Iniciar funcionalidades
iniciarModal()
cargarDevs()
