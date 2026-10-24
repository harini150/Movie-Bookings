document.addEventListener("DOMContentLoaded", function () {

    console.log("CineBook loaded successfully.");

    const movieCards = document.querySelectorAll(".movie-mini-card");

    movieCards.forEach(function (card) {
        card.addEventListener("click", function () {

            const movieName = card.querySelector("h3")?.textContent.trim();

            if (movieName) {
                localStorage.setItem("cinebookMovie", movieName);
            }

            window.location.href = "movies.html";
        });
    });

    const bookButtons = document.querySelectorAll("[data-movie]");

    bookButtons.forEach(function (button) {
        button.addEventListener("click", function () {

            const movie = button.getAttribute("data-movie");

            if (movie) {
                localStorage.setItem("cinebookMovie", movie);
            }

            window.location.href = "theatres.html";
        });
    });

    const showtimeButtons = document.querySelectorAll("[data-showtime]");

    showtimeButtons.forEach(function (button) {
        button.addEventListener("click", function () {

            const showtime = button.getAttribute("data-showtime");
            const theatre = button.getAttribute("data-theatre");

            if (showtime) {
                localStorage.setItem("cinebookShowtime", showtime);
            }

            if (theatre) {
                localStorage.setItem("cinebookTheatre", theatre);
            }

            window.location.href = "seats.html";
        });
    });

    const seats = document.querySelectorAll(".seat:not(.occupied)");

    const selectedSeatDisplay = document.getElementById("selectedSeats");
    const seatCountDisplay = document.getElementById("seatCount");
    const totalDisplay = document.getElementById("totalPrice");

    const pricePerSeat = 220;

    function updateSeats() {
        const selectedSeats = document.querySelectorAll(".seat.selected");

        const seatNames = Array.from(selectedSeats).map(function (seat) {
            return seat.textContent.trim();
        });

        const count = selectedSeats.length;
        const total = count * pricePerSeat;

        if (selectedSeatDisplay) {
            selectedSeatDisplay.textContent =
                count > 0 ? seatNames.join(", ") : "None";
        }

        if (seatCountDisplay) {
            seatCountDisplay.textContent = count;
        }

        if (totalDisplay) {
            totalDisplay.textContent = "₹" + total;
        }

        localStorage.setItem("cinebookSeats", seatNames.join(", "));
        localStorage.setItem("cinebookSeatCount", count);
        localStorage.setItem("cinebookTotal", total);
    }

    seats.forEach(function (seat) {
        seat.addEventListener("click", function () {
            seat.classList.toggle("selected");
            updateSeats();
        });
    });

    const paymentButton = document.getElementById("continuePayment");

    if (paymentButton) {
        paymentButton.addEventListener("click", function (event) {

            const selectedSeats =
                document.querySelectorAll(".seat.selected");

            if (selectedSeats.length === 0) {
                event.preventDefault();
                alert("Please select at least one seat.");
                return;
            }

            window.location.href = "payment.html";
        });
    }

    const payButton = document.getElementById("payNow");

    if (payButton) {
        payButton.addEventListener("click", function () {

            const selectedPayment =
                document.querySelector('input[name="payment"]:checked');

            if (!selectedPayment) {
                alert("Please select a payment method.");
                return;
            }

            localStorage.setItem(
                "cinebookPayment",
                selectedPayment.value
            );

            window.location.href = "success.html";
        });
    }

    const ticketButton = document.getElementById("viewTicket");

    if (ticketButton) {
        ticketButton.addEventListener("click", function () {
            window.location.href = "ticket.html";
        });
    }

    const printButton = document.getElementById("printTicket");

    if (printButton) {
        printButton.addEventListener("click", function () {
            window.print();
        });
    }

    const movieNameDisplay =
        document.getElementById("selectedMovie");

    if (movieNameDisplay) {
        const savedMovie =
            localStorage.getItem("cinebookMovie");

        if (savedMovie) {
            movieNameDisplay.textContent = savedMovie;
        }
    }

    const theatreDisplay =
        document.getElementById("selectedTheatre");

    if (theatreDisplay) {
        const savedTheatre =
            localStorage.getItem("cinebookTheatre");

        if (savedTheatre) {
            theatreDisplay.textContent = savedTheatre;
        }
    }

    const showtimeDisplay =
        document.getElementById("selectedShowtime");

    if (showtimeDisplay) {
        const savedShowtime =
            localStorage.getItem("cinebookShowtime");

        if (savedShowtime) {
            showtimeDisplay.textContent = savedShowtime;
        }
    }

    const savedSeatDisplay =
        document.getElementById("confirmedSeats");

    if (savedSeatDisplay) {
        const savedSeats =
            localStorage.getItem("cinebookSeats");

        if (savedSeats) {
            savedSeatDisplay.textContent = savedSeats;
        }
    }

    const savedTotalDisplay =
        document.getElementById("amountPaid");

    if (savedTotalDisplay) {
        const savedTotal =
            localStorage.getItem("cinebookTotal");

        if (savedTotal) {
            savedTotalDisplay.textContent = "₹" + savedTotal;
        }
    }
});

const movies = {
    sitaraman: {
        title: "Sitaraman",
        poster: "images/sitaraman.jpg",
        description: "An exciting Tamil movie filled with emotion, entertainment and memorable moments.",
        language: "Tamil",
        duration: "2h 25m",
        rating: "8.2/10"
    },

    remo: {
        title: "Remo",
        poster: "images/remo.jpg",
        description: "A fun romantic comedy filled with love, comedy and entertaining moments.",
        language: "Tamil",
        duration: "2h 31m",
        rating: "7.8/10"
    },

    jananayagan: {
        title: "Jananayagan",
        poster: "images/jananayagan.jpg",
        description: "An upcoming Tamil movie with action, drama and powerful moments.",
        language: "Tamil",
        duration: "2h 35m",
        rating: "8.5/10"
    },

    spiderman: {
        title: "Spider-Man",
        poster: "images/spiderman.jpg",
        description: "A superhero adventure filled with action, excitement and spectacular moments.",
        language: "English",
        duration: "2h 28m",
        rating: "8.7/10"
    },

    touristfamily: {
        title: "Tourist Family",
        poster: "images/tourist-family.jpg",
        description: "A heartwarming family entertainer filled with comedy, emotions and fun.",
        language: "Tamil",
        duration: "2h 15m",
        rating: "8.0/10"
    }
};

function openMovie(movieName) {
    localStorage.setItem("selectedMovie", movieName);
    window.location.href = "movie-details.html";
}

const selectedMovie = localStorage.getItem("selectedMovie");

if (selectedMovie && document.getElementById("movieTitle")) {

    const movie = movies[selectedMovie];

    if (movie) {
        document.getElementById("movieTitle").textContent = movie.title;
        document.getElementById("moviePoster").src = movie.poster;
        document.getElementById("movieDescription").textContent = movie.description;
        document.getElementById("movieLanguage").textContent = movie.language;
        document.getElementById("movieDuration").textContent = movie.duration;
        document.getElementById("movieRating").textContent = movie.rating;
    }
}

function bookMovie() {
    window.location.href = "booking.html";
}

const bookingMovieName =
    localStorage.getItem("selectedMovie");

if (
    bookingMovieName &&
    document.getElementById("bookingMovie")
) {

    const movie = movies[bookingMovieName];

    if (movie) {
        document.getElementById("bookingMovie")
            .textContent = movie.title;

        document.getElementById("bookingPoster")
            .src = movie.poster;

        document.getElementById("bookingLanguage")
            .textContent = movie.language;
    }
}

function selectTime(button) {

    document
        .querySelectorAll(".show-times button")
        .forEach(btn => {
            btn.classList.remove("selected");
        });

    button.classList.add("selected");
}

let selectedSeats = [];

function selectSeat(button) {

    const seat = button.textContent;

    if (button.classList.contains("selected")) {

        button.classList.remove("selected");

        selectedSeats =
            selectedSeats.filter(
                item => item !== seat
            );

    } else {

        button.classList.add("selected");
        selectedSeats.push(seat);
    }

    updateTotal();
}

function updateTotal() {

    const pricePerSeat = 180;

    const total =
        selectedSeats.length *
        pricePerSeat;

    document.getElementById("totalAmount")
        .textContent = "₹" + total;
}

function continueBooking() {

    if (selectedSeats.length === 0) {
        alert("Please select at least one seat.");
        return;
    }

    window.location.href = "payment.html";
}

if (document.getElementById("confirmMovie")) {

    const movieName =
        localStorage.getItem("selectedMovie");

    const movie =
        movies[movieName];

    if (movie) {
        document.getElementById("confirmMovie")
            .textContent = movie.title;
    }

    document.getElementById("confirmTheatre")
        .textContent = "PVR Cinemas";

    document.getElementById("confirmDate")
        .textContent = "Selected Date";

    document.getElementById("confirmTime")
        .textContent = "07:30 PM";

    document.getElementById("confirmSeats")
        .textContent = "A1, A2";

    document.getElementById("confirmAmount")
        .textContent = "₹360";

    const randomNumber =
        Math.floor(100000 + Math.random() * 900000);

    document.getElementById("bookingId")
        .textContent = "CB" + randomNumber;
}

function goHome() {
    window.location.href = "index.html";
}

function goMovies() {
    window.location.href = "movies.html";
}

function bookMovie(movieName) {
    localStorage.setItem("selectedMovie", movieName);
    window.location.href = "booking.html";
}

document.addEventListener("DOMContentLoaded", function () {

    const selectedMovie =
        localStorage.getItem("selectedMovie");

    const movieNameElement =
        document.getElementById("selectedMovieName");

    if (movieNameElement && selectedMovie) {
        movieNameElement.textContent = selectedMovie;
    }
});

const timeButtons =
    document.querySelectorAll(".time-btn");

timeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        timeButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        localStorage.setItem(
            "selectedTime",
            button.textContent.trim()
        );
    });
});

function continueBooking() {

    const theatre =
        document.getElementById("theatre").value;

    const bookingDate =
        document.getElementById("bookingDate").value;

    const selectedTime =
        localStorage.getItem("selectedTime");

    if (theatre === "") {
        alert("Please select a theatre.");
        return;
    }

    if (bookingDate === "") {
        alert("Please select a date.");
        return;
    }

    if (!selectedTime) {
        alert("Please select a show time.");
        return;
    }

    localStorage.setItem(
        "selectedTheatre",
        theatre
    );

    localStorage.setItem(
        "selectedDate",
        bookingDate
    );

    window.location.href = "seats.html";
}

const seats =
    document.querySelectorAll(".seat:not(.sold)");

const selectedSeatsElement =
    document.getElementById("selectedSeats");

const ticketCountElement =
    document.getElementById("ticketCount");

const totalAmountElement =
    document.getElementById("totalAmount");

const ticketPrice = 180;

seats.forEach(function (seat) {

    seat.addEventListener("click", function () {

        seat.classList.toggle("selected");

        updateSeatDetails();
    });
});

function updateSeatDetails() {

    const selectedSeats =
        document.querySelectorAll(".seat.selected");

    let seatNames = [];

    selectedSeats.forEach(function (seat) {
        seatNames.push(seat.textContent.trim());
    });

    const ticketCount =
        selectedSeats.length;

    const totalAmount =
        ticketCount * ticketPrice;

    if (ticketCount === 0) {
        selectedSeatsElement.textContent = "None";
    } else {
        selectedSeatsElement.textContent =
            seatNames.join(", ");
    }

    ticketCountElement.textContent =
        ticketCount;

    totalAmountElement.textContent =
        "₹" + totalAmount;

    localStorage.setItem(
        "selectedSeats",
        JSON.stringify(seatNames)
    );

    localStorage.setItem(
        "ticketCount",
        ticketCount
    );

    localStorage.setItem(
        "totalAmount",
        totalAmount
    );
}

function proceedToPayment() {

    const selectedSeats =
        document.querySelectorAll(".seat.selected");

    if (selectedSeats.length === 0) {
        alert("Please select at least one seat.");
        return;
    }

    window.location.href = "payment.html";
}

const paymentMovie =
    document.getElementById("paymentMovie");

const paymentTheatre =
    document.getElementById("paymentTheatre");

const paymentDate =
    document.getElementById("paymentDate");

const paymentTime =
    document.getElementById("paymentTime");

const paymentSeats =
    document.getElementById("paymentSeats");

const paymentTickets =
    document.getElementById("paymentTickets");

const paymentAmount =
    document.getElementById("paymentAmount");

if (paymentMovie) {

    const movie =
        localStorage.getItem("selectedMovie") || "-";

    const theatre =
        localStorage.getItem("selectedTheatre") || "-";

    const date =
        localStorage.getItem("selectedDate") || "-";

    const time =
        localStorage.getItem("selectedTime") || "-";

    const seats =
        JSON.parse(
            localStorage.getItem("selectedSeats")
        ) || [];

    const tickets =
        localStorage.getItem("ticketCount") || 0;

    const amount =
        localStorage.getItem("totalAmount") || 0;

    paymentMovie.textContent = movie;
    paymentTheatre.textContent = theatre;
    paymentDate.textContent = date;
    paymentTime.textContent = time;

    paymentSeats.textContent =
        seats.length > 0
            ? seats.join(", ")
            : "-";

    paymentTickets.textContent = tickets;

    paymentAmount.textContent =
        "₹" + amount;
}

let selectedPaymentMethod = "UPI";

function selectPaymentMethod(method, button) {

    selectedPaymentMethod = method;

    const buttons =
        document.querySelectorAll(".payment-option");

    buttons.forEach(function (btn) {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    const form =
        document.getElementById("paymentForm");

    if (method === "UPI") {

        form.innerHTML = `
            <label for="upiId">
                Enter UPI ID
            </label>

            <input
                type="text"
                id="upiId"
                placeholder="example@upi"
            >
        `;

    } else if (method === "Card") {

        form.innerHTML = `
            <div class="card-fields">

                <div class="full">
                    <label for="cardNumber">
                        Card Number
                    </label>

                    <input
                        type="text"
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        maxlength="19"
                    >
                </div>

                <div>
                    <label for="expiry">
                        Expiry Date
                    </label>

                    <input
                        type="text"
                        id="expiry"
                        placeholder="MM/YY"
                    >
                </div>

                <div>
                    <label for="cvv">
                        CVV
                    </label>

                    <input
                        type="password"
                        id="cvv"
                        placeholder="***"
                        maxlength="3"
                    >
                </div>

            </div>
        `;

    } else {

        form.innerHTML = `
            <label for="bank">
                Select Your Bank
            </label>

            <select id="bank">

                <option value="">
                    Choose Bank
                </option>

                <option value="SBI">
                    State Bank of India
                </option>

                <option value="HDFC">
                    HDFC Bank
                </option>

                <option value="ICICI">
                    ICICI Bank
                </option>

                <option value="Axis">
                    Axis Bank
                </option>

                <option value="Canara">
                    Canara Bank
                </option>

            </select>
        `;
    }
}

function makePayment() {

    let valid = false;

    if (selectedPaymentMethod === "UPI") {

        const upi =
            document.getElementById("upiId");

        if (
            upi &&
            upi.value.trim() !== ""
        ) {
            valid = true;
        }

    } else if (selectedPaymentMethod === "Card") {

        const card =
            document.getElementById("cardNumber");

        const expiry =
            document.getElementById("expiry");

        const cvv =
            document.getElementById("cvv");

        if (
            card &&
            expiry &&
            cvv &&
            card.value.trim() !== "" &&
            expiry.value.trim() !== "" &&
            cvv.value.trim() !== ""
        ) {
            valid = true;
        }

    } else if (
        selectedPaymentMethod === "Net Banking"
    ) {

        const bank =
            document.getElementById("bank");

        if (
            bank &&
            bank.value !== ""
        ) {
            valid = true;
        }
    }

    if (!valid) {
        alert("Please enter your payment details.");
        return;
    }

    localStorage.setItem(
        "paymentMethod",
        selectedPaymentMethod
    );

    window.location.href =
        "confirmation.html";
}

const bookingIdElement =
    document.getElementById("bookingId");

if (bookingIdElement) {

    let bookingId =
        localStorage.getItem("bookingId");

    if (!bookingId) {

        bookingId =
            "MB" +
            Math.floor(
                100000 +
                Math.random() * 900000
            );

        localStorage.setItem(
            "bookingId",
            bookingId
        );
    }

    bookingIdElement.textContent =
        bookingId;

    document.getElementById(
        "confirmMovie"
    ).textContent =
        localStorage.getItem(
            "selectedMovie"
        ) || "-";

    document.getElementById(
        "confirmTheatre"
    ).textContent =
        localStorage.getItem(
            "selectedTheatre"
        ) || "-";

    document.getElementById(
        "confirmDate"
    ).textContent =
        localStorage.getItem(
            "selectedDate"
        ) || "-";

    document.getElementById(
        "confirmTime"
    ).textContent =
        localStorage.getItem(
            "selectedTime"
        ) || "-";

    const seats =
        JSON.parse(
            localStorage.getItem(
                "selectedSeats"
            )
        ) || [];

    document.getElementById(
        "confirmSeats"
    ).textContent =
        seats.length > 0
            ? seats.join(", ")
            : "-";

    document.getElementById(
        "confirmTickets"
    ).textContent =
        localStorage.getItem(
            "ticketCount"
        ) || "0";

    document.getElementById(
        "confirmPayment"
    ).textContent =
        localStorage.getItem(
            "paymentMethod"
        ) || "-";

    document.getElementById(
        "confirmAmount"
    ).textContent =
        "₹" +
        (
            localStorage.getItem(
                "totalAmount"
            ) || "0"
        );
}

function printTicket() {
    window.print();
}

function goHome() {
    window.location.href = "index.html";
}