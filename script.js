const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav-list");

hamburger.addEventListener("click", function() {
    nav.classList.toggle("show-menu");
    hamburger.classList.toggle("show");
});

const navLinks = document.querySelectorAll(".nav-list a");

navLinks.forEach(function(link) {
    link.addEventListener("click", function() {
        nav.classList.remove("show-menu");
        hamburger.classList.remove("show");
    });
});

const form = document.querySelector("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const errorName = document.getElementById("error-name");
const errorEmail = document.getElementById("error-email");
const errorMessage = document.getElementById("error-message");
const successMessage = document.querySelector(".success-message");

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

nameInput.addEventListener("blur", function() {
    errorName.textContent = nameInput.value.trim() === "" ? "お名前を入力してください" : "";
});

emailInput.addEventListener("blur", function() {
    if(emailInput.value.trim() === "") {
        errorEmail.textContent = "メールアドレスを入力してください";
    } else if(!validateEmail(emailInput.value.trim())) {
        errorEmail.textContent = "正しいメールアドレスを入力してください";
    } else {
        errorEmail.textContent = "";
    }
});

messageInput.addEventListener("blur", function() {
    errorMessage.textContent = messageInput.value.trim() === "" ? "お問い合わせ内容を入力してください" : "";
});

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let valid = true;

    if(nameInput.value.trim() === "") {
        errorName.textContent = "お名前を入力してください";
        valid = false;
    }
    if(emailInput.value.trim() === "") {
        errorEmail.textContent = "メールアドレスを入力してください";
        valid = false;
    } else if(!validateEmail(emailInput.value.trim())) {
        errorEmail.textContent = "正しいメールアドレスを入力してください"
        valid = false;
    }
    if(messageInput.value.trim() === "") {
        errorMessage.textContent = "お問い合わせ内容を入力してください";
        valid = false;
    }

    if(valid) {
        fetch("https://script.google.com/macros/s/AKfycbzkjxTW3rCXXVYEckvI1DTOJsejOrAOswl5BQdpVrfT_hz17WAmu4Gw62MUiwYQMQ6r/exec", {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams({
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim(),
            hp: document.querySelector('[name="hp"]').value
        })
        })
        .then(res => res.text())
        .then(text => {
            if(text === "OK") {
                successMessage.textContent = "送信しました。ありがとうございます！";
                form.reset();
            } else {
                successMessage.textContent = "送信に失敗しました。入力内容を確認してください。";
            }
        })
        .catch(() => {
            successMessage.textContent = "送信に失敗しました。もう一度お試しください。";
        });
    }
});



const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.1
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});    