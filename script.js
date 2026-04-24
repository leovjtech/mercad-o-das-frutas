// --- INTERATIVIDADE DO SITE (Sticky Header e Scroll) ---
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');

    // Troca de estilo do header ao rolar a página
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Rolagem suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// --- SISTEMA DE AVALIAÇÃO (Funções Globais) ---
let feedbackData = {
    atendimento: "",
    qualidade: 0
};

function updateProgress() {
    let progress = 0;
    if (feedbackData.atendimento !== "") progress += 50;
    if (feedbackData.qualidade > 0) progress += 50;

    const progressBar = document.getElementById('progress-bar');
    if (progressBar) progressBar.style.width = progress + "%";

    const btn = document.getElementById('send-btn');
    if (progress === 100 && btn) {
        btn.style.background = "#25d366"; // Verde do WhatsApp
        btn.style.cursor = "pointer";
        btn.disabled = false;
    }
}

function selectEmoji(element, valor) {
    // Limpa a seleção anterior dos emojis
    document.querySelectorAll('.emoji-btn').forEach(e => e.classList.remove('active'));
    // Ativa o emoji clicado
    element.classList.add('active');
    feedbackData.atendimento = valor;
    updateProgress();
}

function selectStar(rating) {
    const stars = document.querySelectorAll('.star');
    feedbackData.qualidade = rating;
    
    // Pinta as estrelas até o número selecionado
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
    updateProgress();
}

function sendToWhatsApp() {
    const numero = "5589999906986"; // Usando o número principal do rodapé
    const saudacao = "🍎 *AVALIAÇÃO MERCADÃO* 🍎";
    const msg = `${saudacao}\n\n⭐ *Qualidade:* ${feedbackData.qualidade}/5\n😊 *Atendimento:* ${feedbackData.atendimento}`;
    
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
}