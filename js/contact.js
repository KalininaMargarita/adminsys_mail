// Настройте свои данные EmailJS ниже
const EMAILJS_SERVICE_ID = "service_6x9w86f";
const EMAILJS_TEMPLATE_ID = "template_ah2cxgw";
const EMAILJS_PUBLIC_KEY = "yEpyfELisgg0JMKA9";

(function initEmailJS() {
  if (typeof emailjs === "undefined") {
    console.error("EmailJS SDK не загружен");
    return;
  }
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
})();

const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");
const contactSubmit = document.getElementById("contact-submit");

function setStatus(message, isError = false) {
  if (!contactStatus) return;
  contactStatus.textContent = message;
  contactStatus.classList.toggle("error", isError);
}

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!emailjs) {
      setStatus("EmailJS не загрузился. Проверьте подключение.", true);
      return;
    }

    setStatus("Отправляем...");
    if (contactSubmit) {
      contactSubmit.disabled = true;
    }

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        contactForm
      );
      setStatus("Сообщение отправлено! Я свяжусь с вами скоро.");
      contactForm.reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("Не удалось отправить. Попробуйте позже.", true);
    } finally {
      if (contactSubmit) {
        contactSubmit.disabled = false;
      }
    }
  });
}


