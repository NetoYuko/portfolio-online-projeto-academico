/**
 * Alternância de Tema (Dark/Light Mode) com LocalStorage
 */
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Verifica a preferência salva no localStorage ao carregar
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
}

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

/**
 *  Menu Hamburguer Responsivo
 */
const menuToggleBtn = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Abrir/Fechar menu no click do hamburguer
menuToggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Fechar menu mobile ao clicar em algum link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
});

/**
 * Highlight no menu durante o Scroll usando IntersectionObserver
 */
const sections = document.querySelectorAll('.section');

// a seção é considerada ativa quando 50% dela aparece
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Pega o ID da seção atual
            const currentId = entry.target.getAttribute('id');
            
            // Remove a classe 'active' de todos os links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Adiciona a classe 'active' no link correspondente
            const activeLink = document.querySelector(`.nav-link[href="#${currentId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, observerOptions);

// Inicia a observação de todas as seções
sections.forEach(section => {
    sectionObserver.observe(section);
});

/**
 * Validação do Formulário e Simulação de Envio
 */
const form = document.getElementById('contact-form');
const inputNome = document.getElementById('nome');
const inputEmail = document.getElementById('email');
const inputMensagem = document.getElementById('mensagem');
const modalSucesso = document.getElementById('modal-sucesso');
const closeModalBtn = document.getElementById('close-modal');

// Regex para validação de formato de e-mail
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Função auxiliar para exibir erro
function showError(inputElement, message) {
    const formGroup = inputElement.parentElement;
    const errorMsgElement = formGroup.querySelector('.error-msg');
    
    inputElement.classList.add('error');
    errorMsgElement.textContent = message;
}

// Função auxiliar para limpar erro
function clearError(inputElement) {
    const formGroup = inputElement.parentElement;
    const errorMsgElement = formGroup.querySelector('.error-msg');
    
    inputElement.classList.remove('error');
    errorMsgElement.textContent = '';
}

// Evento de Submit do Formulário
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validação do Nome
    if (inputNome.value.trim() === '') {
        showError(inputNome, 'O nome é obrigatório.');
        isValid = false;
    } else {
        clearError(inputNome);
    }

    // Validação do E-mail
    if (inputEmail.value.trim() === '') {
        showError(inputEmail, 'O e-mail é obrigatório.');
        isValid = false;
    } else if (!emailRegex.test(inputEmail.value.trim())) {
        showError(inputEmail, 'Insira um e-mail válido (ex: usuario@dominio.com).');
        isValid = false;
    } else {
        clearError(inputEmail);
    }

    // Validação da Mensagem
    if (inputMensagem.value.trim() === '') {
        showError(inputMensagem, 'A mensagem não pode estar vazia.');
        isValid = false;
    } else {
        clearError(inputMensagem);
    }

    // limpar campos e exibir modal
    if (isValid) {
        form.reset();
        modalSucesso.classList.remove('hidden');
    }
});

// Fechar Modal
closeModalBtn.addEventListener('click', () => {
    modalSucesso.classList.add('hidden');
});