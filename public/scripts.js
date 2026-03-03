const modal = document.getElementById("msgModal");
const modalUser = document.getElementById("modalUser");
const modalText = document.getElementById("modalText");
const modalAdded = document.getElementById("modalAdded");
const closeBtn = document.getElementById("closeModal");

document.querySelectorAll(".msgDetails").forEach((button) => {
  button.addEventListener("click", () => {
    modalUser.textContent = button.dataset.user;
    modalText.textContent = button.dataset.text;
    modalAdded.textContent = button.dataset.added;

    modal.showModal();
  });
});

closeBtn.addEventListener("click", () => {
  modal.close();
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.close();
  }
});
