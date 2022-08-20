const FORM = document.getElementById("generator");
const QR = document.getElementById("qrcode");
const SPINNER = document.getElementById("spinner");
const BTN = document.getElementById("submit-btn");
const text = document.getElementById("text-btn");
const downloadText = document.getElementById("download-text");

const handleSubmit = (e) => {
  e.preventDefault();
  clearQRCode();
  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  if (url === "") {
    alert("Please enter a URL");
    return;
  } else {
    showSpinner();
    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);
      downloadText.innerText = "Click to download";
      setTimeout(() => {
        const imgUrl = QR.querySelector("img").src;
        QR.href = imgUrl;
        QR.download = `qrcode-${
          url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split(".")[0]
        }.png`;
      }, 50);
    }, 1000);
  }
};
const generateQRCode = (url, size) => {
  new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};

const showSpinner = () => {
  BTN.style.cursor = "not-allowed";
  text.innerText = "Generating...";
  SPINNER.style.display = "inline";
};
const hideSpinner = () => {
  BTN.style.cursor = "pointer";
  text.innerText = "Generate QR Code";
  SPINNER.style.display = "none";
};

const clearQRCode = () => {
  QR.innerHTML = "";
  downloadText.innerText = "";
};

hideSpinner();

FORM.addEventListener("submit", handleSubmit);
