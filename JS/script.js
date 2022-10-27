//Element Selection
const container = document.querySelector("#container");
const qrCodeBtn = document.querySelector(".btn");
const qrCodeInput = document.querySelector("#qrcode_value");
const alertText = document.querySelector("#alert");
const qrCodeImg = document.querySelector("#qr_code img");

//Functions
const genQRCode = () => {
  //Element Selection to manipulate
  const qrCodeInputValue = qrCodeInput.value;
  console.log(qrCodeInputValue);

  //Validation for empty input
  if (!qrCodeInputValue) {
    //Show alert msg, remove qr container & get back btn value
    alertText.classList.toggle("hide");
    container.classList.remove("active");
    qrCodeBtn.innerText = "Gerar QRcode";

    //Remove alert msg after 2s
    setTimeout(() => {
      alertText.classList.toggle("hide");
    }, 2000);
  } else {
    //Await btn msg
    qrCodeBtn.innerText = "Gerando Código . . .";

    //Put the input value on QRcode URL
    qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrCodeInput.value}`;

    //Await QR image & set btn value
    qrCodeImg.addEventListener("load", () => {
      container.classList.add("active");
      qrCodeBtn.innerText = "Código criado!";

      //Set btn msg to user get another QRcode
      setTimeout(() => {
        qrCodeBtn.innerText = "Digite outro texto/URL para gerar um novo";
      }, 2000);
    });
  }
};

const cleanInputValue = () => {
  qrCodeInput.addEventListener("keyup", () => {
    if (!qrCodeInput.value) {
      container.classList.remove("active");
      qrCodeBtn.innerText = "Gerar QRcode";
    }
  });
};

//Events
qrCodeBtn.addEventListener("click", () => {
  genQRCode();
});

qrCodeInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    genQRCode();
  }
});
