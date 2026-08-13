const form = document.querySelector("#enquiry-form");
const body = document.querySelector("body");
const projectsSection = document.querySelector("#projects");

const nameInput = document.querySelector("#full-name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const ageInput = document.querySelector("#age");
const messageInput = document.querySelector("#message");

const successMessage = document.createElement("p");

const projectData = [
    {
        title: "Web Development",
        description: "Building responsive and accessible websites using HTML, CSS and JavaScript.",
        category: "web"
    },
    {
        title: "Python and Data",
        description: "Working with Python to explore data analysis, processing and visualisation.",
        category: "data"
    },
    {
        title: "Artificial Intelligence",
        description: "Exploring how intelligent systems can be designed to solve practical problems.",
        category: "ai"
    },
    {
        title: "Machine Learning",
        description: "Learning how algorithms can identify patterns and make predictions from data.",
        category: "ai"
    },
    {
        title: "Cyber Security",
        description: "Developing an understanding of security, privacy and responsible computing.",
        category: "security"
    }
];

if (body) {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
    }
}

if (body) {
    const themeButton = document.createElement("button");

    themeButton.type = "button";
    themeButton.id = "theme-toggle";
    themeButton.textContent = body.classList.contains("dark-mode")
        ? "Light Mode"
        : "Dark Mode";

    const header = document.querySelector("header");

    if (header) {
        const navigation = header.querySelector("nav");

        if (navigation) {
            navigation.appendChild(themeButton);
        }
    }

    themeButton.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        const isDark = body.classList.contains("dark-mode");

        localStorage.setItem("theme", isDark ? "dark" : "light");

        themeButton.textContent = isDark
            ? "Light Mode"
            : "Dark Mode";
    });
}

if (projectsSection) {
    const cardGrid = projectsSection.querySelector(".card-grid");

    if (cardGrid) {
        const filteredProjects = projectData.filter((project) => {
            return project.category === "ai";
        });

        const sortedProjects = [...filteredProjects].sort((a, b) => {
            return a.title.localeCompare(b.title);
        });

        cardGrid.textContent = "";

        sortedProjects.forEach((project) => {
            const article = document.createElement("article");
            const heading = document.createElement("h3");
            const paragraph = document.createElement("p");

            article.className = "project-card";
            heading.textContent = project.title;
            paragraph.textContent = project.description;

            article.appendChild(heading);
            article.appendChild(paragraph);
            cardGrid.appendChild(article);
        });
    }
}

function createError(input, message) {
    if (!input || !input.parentElement) {
        return;
    }

    let error = input.parentElement.querySelector(".field-error");

    if (!error) {
        error = document.createElement("small");
        error.className = "field-error";
        error.setAttribute("role", "alert");
        input.parentElement.appendChild(error);
    }

    error.textContent = message;
}

function clearError(input) {
    if (!input || !input.parentElement) {
        return;
    }

    const error = input.parentElement.querySelector(".field-error");

    if (error) {
        error.remove();
    }
}

function validateName() {
    if (!nameInput) {
        return true;
    }

    if (nameInput.value.trim().length < 2) {
        createError(nameInput, "Please enter at least 2 characters.");
        return false;
    }

    clearError(nameInput);
    return true;
}

function validateEmail() {
    if (!emailInput) {
        return true;
    }

    if (emailInput.value.trim() === "") {
        createError(emailInput, "Email address is required.");
        return false;
    }

    if (!emailInput.validity.valid) {
        createError(emailInput, "Please enter a valid email address.");
        return false;
    }

    clearError(emailInput);
    return true;
}

function validatePhone() {
    if (!phoneInput) {
        return true;
    }

    const phonePattern = /^[0-9]{10}$/;

    if (!phonePattern.test(phoneInput.value.trim())) {
        createError(phoneInput, "Please enter exactly 10 digits.");
        return false;
    }

    clearError(phoneInput);
    return true;
}

function validateAge() {
    if (!ageInput) {
        return true;
    }

    const age = Number(ageInput.value);

    if (!Number.isFinite(age) || age < 16 || age > 100) {
        createError(ageInput, "Age must be between 16 and 100.");
        return false;
    }

    clearError(ageInput);
    return true;
}

function validateMessage() {
    if (!messageInput) {
        return true;
    }

    if (messageInput.value.trim().length < 10) {
        createError(
            messageInput,
            "Message must contain at least 10 characters."
        );
        return false;
    }

    clearError(messageInput);
    return true;
}

if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const submittedData = Object.fromEntries(formData.entries());

        const nameValid = validateName();
        const emailValid = validateEmail();
        const phoneValid = validatePhone();
        const ageValid = validateAge();
        const messageValid = validateMessage();

        if (
            !nameValid ||
            !emailValid ||
            !phoneValid ||
            !ageValid ||
            !messageValid
        ) {
            successMessage.textContent = "";
            return;
        }

        successMessage.textContent =
            `Thank you, ${submittedData.fullName}. Your enquiry was received successfully. This is a practice form, so no information has actually been sent to a server.`;

        successMessage.setAttribute("role", "status");
        successMessage.className = "success-message";

        form.appendChild(successMessage);

        form.reset();
    });
}

if (nameInput) {
    nameInput.addEventListener("input", validateName);
}

if (emailInput) {
    emailInput.addEventListener("input", validateEmail);
}

if (phoneInput) {
    phoneInput.addEventListener("input", validatePhone);
}

if (ageInput) {
    ageInput.addEventListener("input", validateAge);
}

if (messageInput) {
    messageInput.addEventListener("input", validateMessage);
}

if (form) {
    form.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            form.reset();

            clearError(nameInput);
            clearError(emailInput);
            clearError(phoneInput);
            clearError(ageInput);
            clearError(messageInput);

            successMessage.textContent = "";
        }
    });
}

if (projectsSection) {
    projectsSection.addEventListener("click", (event) => {
        const card = event.target.closest(".project-card");

        if (!card) {
            return;
        }

        card.classList.toggle("selected");
    });
}