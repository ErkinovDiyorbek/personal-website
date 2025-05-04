document.addEventListener('DOMContentLoaded', function () {
	// Preloader
	const preloader = document.querySelector('.preloader')
	window.addEventListener('load', () => {
		preloader.classList.add('fade-out')
		setTimeout(() => {
			preloader.style.display = 'none'
		}, 500)
	})

	// Theme Toggle
	const themeBtn = document.getElementById('toggleTheme')
	const body = document.body
	const theme = localStorage.getItem('theme')

	if (theme) {
		body.setAttribute('data-theme', theme)
		themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙'
	}

	themeBtn.addEventListener('click', () => {
		if (body.getAttribute('data-theme') === 'dark') {
			body.setAttribute('data-theme', 'light')
			themeBtn.textContent = '🌙'
			localStorage.setItem('theme', 'light')
		} else {
			body.setAttribute('data-theme', 'dark')
			themeBtn.textContent = '☀️'
			localStorage.setItem('theme', 'dark')
		}
	})

	// Mobile Menu Toggle
	const menuToggle = document.getElementById('menuToggle')
	const navLinks = document.querySelector('.nav-links')

	menuToggle.addEventListener('click', () => {
		menuToggle.classList.toggle('active')
		navLinks.classList.toggle('active')
	})

	// Close mobile menu when clicking on a link
	document.querySelectorAll('.nav-link').forEach(link => {
		link.addEventListener('click', () => {
			menuToggle.classList.remove('active')
			navLinks.classList.remove('active')
		})
	})

	// Sticky Navbar
	const navbar = document.querySelector('.navbar')
	window.addEventListener('scroll', () => {
		if (window.scrollY > 100) {
			navbar.classList.add('scrolled')
		} else {
			navbar.classList.remove('scrolled')
		}
	})

	// Back to Top Button
	const backToTopBtn = document.getElementById('backToTop')
	window.addEventListener('scroll', () => {
		if (window.scrollY > 300) {
			backToTopBtn.classList.add('active')
		} else {
			backToTopBtn.classList.remove('active')
		}
	})

	backToTopBtn.addEventListener('click', e => {
		e.preventDefault()
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	})

	// Smooth Scrolling for Anchor Links
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault()

			const targetId = this.getAttribute('href')
			if (targetId === '#') return

			const targetElement = document.querySelector(targetId)
			if (targetElement) {
				window.scrollTo({
					top: targetElement.offsetTop - 80,
					behavior: 'smooth',
				})
			}
		})
	})

	// Active Link Highlighting
	const sections = document.querySelectorAll('section')
	const navItems = document.querySelectorAll('.nav-link')

	window.addEventListener('scroll', () => {
		let current = ''

		sections.forEach(section => {
			const sectionTop = section.offsetTop
			const sectionHeight = section.clientHeight

			if (pageYOffset >= sectionTop - 200) {
				current = section.getAttribute('id')
			}
		})

		navItems.forEach(item => {
			item.classList.remove('active')
			if (item.getAttribute('href') === `#${current}`) {
				item.classList.add('active')
			}
		})
	})

	// Projects Filter
	const filterBtns = document.querySelectorAll('.filter-btn')
	const projectCards = document.querySelectorAll('.project-card')

	filterBtns.forEach(btn => {
		btn.addEventListener('click', () => {
			// Remove active class from all buttons
			filterBtns.forEach(btn => btn.classList.remove('active'))
			// Add active class to clicked button
			btn.classList.add('active')

			const filterValue = btn.getAttribute('data-filter')

			projectCards.forEach(card => {
				if (
					filterValue === 'all' ||
					card.getAttribute('data-category') === filterValue
				) {
					card.style.display = 'block'
				} else {
					card.style.display = 'none'
				}
			})
		})
	})

	// Testimonials Slider
	const testimonialSwiper = new Swiper('.testimonials-slider', {
		loop: true,
		grabCursor: true,
		spaceBetween: 30,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		breakpoints: {
			768: {
				slidesPerView: 2,
			},
			993: {
				slidesPerView: 3,
			},
		},
	})

	// Particles Effect
	function createParticles() {
		const particlesContainer = document.getElementById('particles')
		const particleCount = 50

		for (let i = 0; i < particleCount; i++) {
			const particle = document.createElement('div')
			particle.classList.add('particle')

			// Random properties
			const size = Math.random() * 5 + 2
			const posX = Math.random() * 100
			const posY = Math.random() * 100
			const delay = Math.random() * 10
			const duration = Math.random() * 20 + 10
			const color = `hsl(${Math.random() * 60 + 180}, 70%, 60%)`

			particle.style.width = `${size}px`
			particle.style.height = `${size}px`
			particle.style.left = `${posX}%`
			particle.style.top = `${posY}%`
			particle.style.animationDelay = `${delay}s`
			particle.style.animationDuration = `${duration}s`
			particle.style.backgroundColor = color

			particlesContainer.appendChild(particle)
		}
	}

	createParticles()

	// GSAP Animations
	gsap.registerPlugin(ScrollTrigger)

	// Animate hero content
	gsap.from('.hero-title span', {
		duration: 1,
		y: 50,
		opacity: 0,
		stagger: 0.2,
		ease: 'power3.out',
	})

	gsap.from('.hero-text', {
		duration: 1,
		y: 30,
		opacity: 0,
		delay: 0.6,
		ease: 'power3.out',
	})

	gsap.from('.hero-actions', {
		duration: 1,
		y: 30,
		opacity: 0,
		delay: 0.9,
		ease: 'power3.out',
	})

	gsap.from('.image-wrapper', {
		duration: 1,
		scale: 0.8,
		opacity: 0,
		delay: 0.3,
		ease: 'back.out(1.7)',
	})

	gsap.from('.tech-icons .icon', {
		duration: 1,
		scale: 0,
		opacity: 0,
		stagger: 0.1,
		delay: 1,
		ease: 'back.out(1.7)',
	})

	// Animate section headings
	gsap.utils.toArray('.section-header').forEach(section => {
		gsap.from(section.children, {
			duration: 1,
			y: 50,
			opacity: 0,
			stagger: 0.2,
			scrollTrigger: {
				trigger: section,
				start: 'top 80%',
				toggleActions: 'play none none none',
			},
		})
	})

	// Animate about section
	gsap.from('.about-image', {
		duration: 1,
		x: -100,
		opacity: 0,
		scrollTrigger: {
			trigger: '.about',
			start: 'top 80%',
			toggleActions: 'play none none none',
		},
	})

	gsap.from('.about-text', {
		duration: 1,
		x: 100,
		opacity: 0,
		scrollTrigger: {
			trigger: '.about',
			start: 'top 80%',
			toggleActions: 'play none none none',
		},
	})

	// Animate project cards
	gsap.utils.toArray('.project-card').forEach((card, i) => {
		gsap.from(card, {
			duration: 0.8,
			y: 50,
			opacity: 0,
			delay: i * 0.1,
			scrollTrigger: {
				trigger: '.projects-grid',
				start: 'top 80%',
				toggleActions: 'play none none none',
			},
		})
	})

	// Animate contact form
	gsap.from('.contact-info', {
		duration: 1,
		x: -100,
		opacity: 0,
		scrollTrigger: {
			trigger: '.contact',
			start: 'top 80%',
			toggleActions: 'play none none none',
		},
	})

	gsap.from('.contact-form', {
		duration: 1,
		x: 100,
		opacity: 0,
		scrollTrigger: {
			trigger: '.contact',
			start: 'top 80%',
			toggleActions: 'play none none none',
		},
	})
})

// Theme toggle function
function toggleTheme() {
	const body = document.body
	const themeBtn = document.getElementById('toggleTheme')

	if (body.getAttribute('data-theme') === 'dark') {
		body.setAttribute('data-theme', 'light')
		themeBtn.textContent = '🌙'
		localStorage.setItem('theme', 'light')
	} else {
		body.setAttribute('data-theme', 'dark')
		themeBtn.textContent = '☀️'
		localStorage.setItem('theme', 'dark')
	}
	updateFooterColors()
}

function updateFooterColors() {
	const body = document.body
	const footer = document.querySelector('.footer')
	if (!footer) return // agar footer yo'q bo'lsa xatolik bo'lmasligi uchun

	if (body.getAttribute('data-theme') === 'dark') {
		footer.style.setProperty('--footer-text-color', '#fff')
		footer.style.setProperty('--footer-bg-color', '#111')
	} else {
		footer.style.setProperty('--footer-text-color', '#333')
		footer.style.setProperty('--footer-bg-color', '#f8f9fa')
	}
}

document
	.getElementById('telegramForm')
	.addEventListener('submit', function (e) {
		e.preventDefault()

		const token = '7439203721:AAGTr_em2n5rFFd6BQPi5epnB3fLNV3J5UQ'
		const chat_id = '945949292'

		const name = document.querySelector('[name="name"]').value
		const email = document.querySelector('[name="email"]').value
		const subject = document.querySelector('[name="subject"]').value
		const message = document.querySelector('[name="message"]').value

		const text = `
📥 Yangi xabar:
👤 Ismi: ${name}
📧 Email: ${email}
📌 Mavzu: ${subject}
💬 Xabar: ${message}
`

		fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				chat_id,
				text,
			}),
		})
			.then(response => response.json())
			.then(data => {
				alert('Xabaringiz muvaffaqiyatli yuborildi!')
				document.getElementById('telegramForm').reset()
			})
			.catch(error => {
				alert('Xabar yuborishda xatolik yuz berdi.')
				console.error(error)
			})
	})
