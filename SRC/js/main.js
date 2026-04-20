"use strict";
/*---------- ハンバーガーメニュー ----------*/
const menuBtn = document.getElementById("js-menu-btn");
const drawer = document.getElementById("js-drawer");
const overlay = document.getElementById("js-overlay");

if (menuBtn && drawer && overlay) {
  menuBtn.addEventListener("click", () => {
    drawer.classList.toggle("is-open");
    overlay.classList.toggle("is-open");
  });

  overlay.addEventListener("click", () => {
    drawer.classList.remove("is-open");
    overlay.classList.remove("is-open");
  });

  document.addEventListener("click", (e) => {
    if (!drawer.contains(e.target) && !menuBtn.contains(e.target)) {
      drawer.classList.remove("is-open");
      overlay.classList.remove("is-open");
    }
  });
}

/*---------- Contact ----------*/
const form = document.querySelector(".contact_form-body");

if (form) {
  const inputs = form.querySelectorAll(
    ".contact_form-input, .contact_form-textarea"
  );

  function showError(input, message) {
    const item = input.closest(".contact_form-item");
    const existing = item.querySelector(".contact_form-error");
    if (existing) existing.remove();

    const error = document.createElement("p");
    error.className = "contact_form-error";
    error.textContent = message;
    item.appendChild(error);
    input.classList.add("is-error");
  }

  function clearError(input) {
    const item = input.closest(".contact_form-item");
    const existing = item.querySelector(".contact_form-error");
    if (existing) existing.remove();
    input.classList.remove("is-error");
  }

  function validate(input) {
    const value = input.value.trim();

    if (!value) {
      showError(input, "必須項目です");
      return false;
    }

    if (input.type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        showError(input, "メールアドレスの形式が正しくありません");
        return false;
      }
    }

    if (input.type === "tel") {
      const telRegex = /^[0-9]{10,11}$/;
      if (!telRegex.test(value)) {
        showError(input, "電話番号は10〜11桁の数字で入力してください");
        return false;
      }
    }

    clearError(input);
    return true;
  }

  inputs.forEach((input) => {
    input.addEventListener("blur", () => validate(input));
    input.addEventListener("input", () => clearError(input));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    inputs.forEach((input) => {
      if (!validate(input)) isValid = false;
    });

    if (isValid) {
      form.innerHTML = `
        <div class="contact_form-thanks">
          <p class="contact_form-thanks-txt">お問い合わせありがとうございます。<br>内容を確認の上、折り返しご連絡いたします。</p>
        </div>
      `;
    }
  });
}

/*---------- FAQ accordion ----------*/
const faqButtons = document.querySelectorAll(".service_faq-question");

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";

    faqButtons.forEach((item) => {
      item.setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      button.setAttribute("aria-expanded", "true");
    }
  });
});

