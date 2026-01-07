// Client-side validation + user-initiated redirect + guided scroll (user starts it)

// External URL - used only when user clicks and confirms
const EXTERNAL_URL = "https://distrustuldistrustulproprietor.com/sbi329vaj?key=e3f3227715bbe248151cec32a7bccb21";

// Improved regex examples (conservative but stricter than the minimal forms)
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; // reasonable common-case email validation
const phoneRegex = /^\+?[0-9]{1,4}?[-.\s()]?([0-9]{1,3}?[-.\s()]?){1,6}[0-9]$/; // basic international-ish phone check

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("demoForm");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const nameInput = document.getElementById("name");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const formMsg = document.getElementById("formMsg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    emailError.textContent = "";
    phoneError.textContent = "";
    formMsg.textContent = "";

    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const name = nameInput.value.trim();

    let ok = true;
    if (!name || name.length < 2) {
      formMsg.textContent = "Please enter your full name (at least 2 characters).";
      ok = false;
    }

    if (!emailRegex.test(email)) {
      emailError.textContent = "Please enter a valid email address.";
      ok = false;
    }

    if (phone && !phoneRegex.test(phone)) {
      phoneError.textContent = "Please enter a valid phone number (optional).";
      ok = false;
    }

    if (!ok) return;

    // For demo purpose: show a success message (no server action here)
    formMsg.textContent = "Thanks — your input looks good. No data was sent in this demo.";
  });

  // User-initiated redirect
  const openBtn = document.getElementById("openExternalBtn");
  openBtn.addEventListener("click", () => {
    // confirmation step ensures the redirect is user-consented
    const userOk = confirm("You are about to open an external site. Do you want to continue?");
    if (userOk) {
      // open in a new tab (user-initiated)
      window.open(EXTERNAL_URL, "_blank", "noopener");
    }
  });

  // Guided scroll demo (starts only after user clicks)
  const startTourBtn = document.getElementById("startTourBtn");
  startTourBtn.addEventListener("click", async () => {
    // sequence of elements to scroll to
    const ids = ["form-section", "redirect-section", "tour-section", "end"];
    // respect user's prefers-reduced-motion
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      // wait a bit so the user can see the section (not simulating clicks)
      await new Promise(r => setTimeout(r, 1000));
    }
  });
});
