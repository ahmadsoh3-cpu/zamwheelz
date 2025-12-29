// ====== SET YOUR LAUNCH DATE HERE ======
const launchDate = new Date("2026-03-01T00:00:00").getTime(); // change to your real launch date

const $ = (id) => document.getElementById(id);

const daysEl = $("days");
const hoursEl = $("hours");
const minutesEl = $("minutes");
const secondsEl = $("seconds");
const toast = $("toast");

function pad(n){ return String(n).padStart(2, "0"); }

function showToast(msg){
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 2200);
}

function tick(){
  const now = Date.now();
  let diff = launchDate - now;

  if (diff <= 0){
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / (3600 * 24));
  const hours = Math.floor((sec % (3600 * 24)) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;

  daysEl.textContent = String(days);
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
}

tick();
setInterval(tick, 1000);

// ====== Notify form (frontend only demo) ======
$("notifyForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const val = $("contactInput").value.trim();

  if (!val){
    showToast("Please enter your email or phone number.");
    return;
  }

  // Replace this with your backend later:
  // fetch("/api/notify", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ contact: val }) })

  $("contactInput").value = "";
  showToast("Thanks! We’ll notify you when ZamwheelZ launches.");
});
