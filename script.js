document.addEventListener("DOMContentLoaded", () => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  // Smooth navigation
  $$("[data-scroll]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelector(btn.dataset.scroll)?.scrollIntoView({behavior:"smooth"});
    });
  });

  // Scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: .12});
  $$(".reveal").forEach(el => observer.observe(el));

  // Floating hearts
  const hearts = $("#hearts");
  function makeHeart() {
    const h = document.createElement("span");
    h.className = "heart";
    h.textContent = Math.random() > .5 ? "♥" : "♡";
    h.style.left = Math.random() * 100 + "%";
    h.style.fontSize = (12 + Math.random() * 18) + "px";
    h.style.animationDuration = (7 + Math.random() * 7) + "s";
    hearts.appendChild(h);
    setTimeout(() => h.remove(), 15000);
  }
  setInterval(makeHeart, 900);

  // Simple editable memory quiz
  const questions = [
    {
      q: "Where did our little story start getting interesting?",
      options: ["Instagram 👀", "LinkedIn 💼", "Discord 🎮", "Email 📧"],
      answer: 0
    },
    {
      q: "What is our little hashtag?",
      options: ["#AaruForever", "#Aaruma", "#AkAaru", "#Aaru2026"],
      answer: 1
    }
  ];

  let qi = 0;
  function renderQuiz() {
    const item = questions[qi];
    $("#quiz-question").textContent = item.q;
    const box = $("#quiz-options");
    box.innerHTML = "";
    item.options.forEach((option, i) => {
      const b = document.createElement("button");
      b.className = "quiz-option";
      b.textContent = option;
      b.addEventListener("click", () => {
        const feedback = $("#quiz-feedback");
        if (i === item.answer) {
          feedback.textContent = "Okayyy, detective ji. 🕵️‍♀️❤️";
          if (qi < questions.length - 1) {
            setTimeout(() => { qi++; renderQuiz(); }, 900);
          } else {
            feedback.textContent = "Okay, you remember. 😂❤️";
          }
        } else {
          feedback.textContent = "Nice try 😂 Try again.";
        }
      });
      box.appendChild(b);
    });
  }
  renderQuiz();

  // AARUMA puzzle: tap two letters to swap
  const target = "AARUMA";
  let letters = ["A","R","U","M","A","A"];
  let selected = null;
  const lettersBox = $("#letters");

  function renderLetters() {
    lettersBox.innerHTML = "";
    letters.forEach((letter, i) => {
      const tile = document.createElement("button");
      tile.className = "letter-tile";
      tile.textContent = letter;
      tile.setAttribute("aria-label", `Letter ${letter}, position ${i+1}`);
      if (selected === i) tile.classList.add("selected");
      tile.addEventListener("click", () => {
        if (selected === null) {
          selected = i;
          renderLetters();
          return;
        }
        if (selected === i) {
          selected = null;
          renderLetters();
          return;
        }
        [letters[selected], letters[i]] = [letters[i], letters[selected]];
        selected = null;
        renderLetters();
        checkPuzzle();
      });
      lettersBox.appendChild(tile);
    });
  }

  function checkPuzzle() {
    const current = letters.join("");
    const feedback = $("#puzzle-feedback");
    if (current === target) {
      feedback.textContent = "You got it. ❤️";
      $("#hashtag").classList.remove("hidden");
      celebrate(18);
    } else {
      feedback.textContent = "Almost... keep going 👀";
    }
  }
  renderLetters();

  // Envelope
  $("#openLetter").addEventListener("click", () => {
    document.querySelector("#letter")?.scrollIntoView({behavior:"smooth"});
    setTimeout(() => {
      $("#envelope").classList.add("open");
      setTimeout(() => $("#letterContent").classList.remove("hidden"), 500);
    }, 700);
  });

  $("#envelope").addEventListener("click", () => {
    $("#envelope").classList.add("open");
    $("#letterContent").classList.remove("hidden");
  });

  // Final proposal
  $("#yesBtn").addEventListener("click", () => {
    const msg = $("#final-message");
    msg.innerHTML = "<strong>Maybe this is where our next chapter begins. ❤️</strong><br><br>#Aaruma";
    msg.classList.remove("hidden");
    celebrate(45);
  });

  $("#maybeBtn").addEventListener("click", () => {
    const msg = $("#final-message");
    msg.innerHTML = "Take all the time you need. 🌷<br><br>I just wanted you to know that I'm sorry...<br>and that this time, I genuinely want to do better.";
    msg.classList.remove("hidden");
  });

  function celebrate(count) {
    for (let i = 0; i < count; i++) {
      setTimeout(makeHeart, i * 35);
    }
  }
});
