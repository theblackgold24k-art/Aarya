document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       PAGE NAVIGATION
    ========================= */

    const pages = [...document.querySelectorAll(".page")];

    let currentPage = 0;


    function showPage(index) {

        if (index < 0 || index >= pages.length) {
            return;
        }

        pages[currentPage].classList.remove("active");

        pages[currentPage].classList.add("previous");


        pages[index].classList.remove("previous");

        pages[index].classList.add("active");


        currentPage = index;

    }


    document.querySelectorAll(".next").forEach(button => {

        button.addEventListener("click", () => {

            showPage(currentPage + 1);

        });

    });



    /* =========================
       FLOATING HEARTS
    ========================= */

    const heartsContainer =
        document.getElementById("hearts");


    function createHeart() {

        const heart =
            document.createElement("span");


        heart.className = "heart";


        heart.textContent =
            Math.random() > .5
                ? "♥"
                : "♡";


        heart.style.left =
            Math.random() * 100 + "%";


        heart.style.fontSize =
            (12 + Math.random() * 18) + "px";


        heart.style.animationDuration =
            (7 + Math.random() * 7) + "s";


        heartsContainer.appendChild(heart);


        setTimeout(() => {

            heart.remove();

        }, 15000);

    }


    setInterval(createHeart, 900);



    /* =========================
       AARUMA PUZZLE
    ========================= */

    const target =
        "AARUMA";


    let letters = [
        "A",
        "R",
        "U",
        "M",
        "A",
        "A"
    ];


    let selectedLetter = null;


    const lettersContainer =
        document.getElementById("letters");


    function renderPuzzle() {

        lettersContainer.innerHTML = "";


        letters.forEach((letter, index) => {

            const tile =
                document.createElement("button");


            tile.className =
                "letter-tile";


            tile.textContent =
                letter;


            if (selectedLetter === index) {

                tile.classList.add("selected");

            }


            tile.addEventListener(
                "click",
                () => {

                    if (selectedLetter === null) {

                        selectedLetter = index;

                        renderPuzzle();

                        return;

                    }


                    if (selectedLetter === index) {

                        selectedLetter = null;

                        renderPuzzle();

                        return;

                    }


                    [
                        letters[selectedLetter],
                        letters[index]
                    ] = [
                        letters[index],
                        letters[selectedLetter]
                    ];


                    selectedLetter = null;


                    renderPuzzle();


                    checkPuzzle();

                }
            );


            lettersContainer.appendChild(tile);

        });

    }


    function checkPuzzle() {

        const current =
            letters.join("");


        const feedback =
            document.getElementById(
                "puzzle-feedback"
            );


        if (current === target) {

            feedback.textContent =
                "You got it. ❤️";


            document
                .getElementById("hashtag")
                .classList.remove("hidden");


            celebrate(20);

        } else {

            feedback.textContent =
                "Almost... keep going 👀";

        }

    }


    renderPuzzle();



    /* =========================
       OPEN LETTER
    ========================= */

    const openLetter =
        document.getElementById("openLetter");


    const envelope =
        document.getElementById("envelope");


    const letterContent =
        document.getElementById("letterContent");


    openLetter.addEventListener(
        "click",
        () => {

            showPage(currentPage + 1);


            setTimeout(() => {

                envelope.classList.add("open");


                setTimeout(() => {

                    letterContent
                        .classList
                        .remove("hidden");

                }, 500);

            }, 500);

        }
    );


    envelope.addEventListener(
        "click",
        () => {

            envelope.classList.add("open");

            letterContent
                .classList
                .remove("hidden");

        }
    );



    /* =========================
       FINAL PROPOSAL
    ========================= */

    const yesButton =
        document.getElementById("yesBtn");


    const maybeButton =
        document.getElementById("maybeBtn");


    const finalMessage =
        document.getElementById(
            "final-message"
        );


    yesButton.addEventListener(
        "click",
        () => {

            finalMessage.innerHTML = `
                <strong>
                    Maybe this is where our
                    next chapter begins. ❤️
                </strong>
                <br><br>
                #Aaruma
            `;


            finalMessage
                .classList
                .remove("hidden");


            celebrate(50);

        }
    );


    maybeButton.addEventListener(
        "click",
        () => {

            finalMessage.innerHTML = `
                Take all the time you need. 🌷
                <br><br>
                I just wanted you to know
                that I'm sorry...
                <br>
                and that this time,
                I genuinely want to do better.
            `;


            finalMessage
                .classList
                .remove("hidden");

        }
    );



    /* =========================
       CELEBRATION
    ========================= */

    function celebrate(count) {

        for (let i = 0; i < count; i++) {

            setTimeout(
                createHeart,
                i * 35
            );

        }

    }

});
