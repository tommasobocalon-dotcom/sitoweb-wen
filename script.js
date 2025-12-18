/* ========== MENU MOBILE ========== */
function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("open");
}

/* ========== ANIMAZIONI ALLO SCROLL ========== */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
});

document.querySelectorAll(".fade").forEach(el => observer.observe(el));

/* ========== VALIDAZIONE FORM CONTATTI ========== */
if (document.getElementById("contactForm")) {
    document.getElementById("contactForm").addEventListener("submit", function (e) {
        e.preventDefault();

        let nome = document.getElementById("nome").value.trim();
        let email = document.getElementById("email").value.trim();
        let telefono = document.getElementById("telefono").value.trim();
        let messaggio = document.getElementById("messaggio").value.trim();
        let msg = document.getElementById("formMessage");

        if (nome.length < 2) {
            msg.textContent = "Inserisci un nome valido.";
            msg.style.color = "red";
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            msg.textContent = "Inserisci un'email valida.";
            msg.style.color = "red";
            return;
        }

        if (telefono.length < 7) {
            msg.textContent = "Inserisci un numero di telefono valido.";
            msg.style.color = "red";
            return;
        }

        msg.textContent = "Messaggio inviato con successo!";
        msg.style.color = "green";

        document.getElementById("contactForm").reset();
    });
}
