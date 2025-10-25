const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 1;
    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * 3 + 1;
    this.speedX = Math.cos(angle) * speed;
    this.speedY = Math.sin(angle) * speed;
    this.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
    this.alpha = 1;
    this.fade = Math.random() * 0.01 + 0.005;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= this.fade;
  }

  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function spawnParticles() {
  const qr = document.querySelector('.qr-image');
  const rect = qr.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 5; i++) {
    particlesArray.push(new Particle(centerX, centerY));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach((p, index) => {
    p.update();
    p.draw();
    if (p.alpha <= 0) {
      particlesArray.splice(index, 1);
    }
  });
  requestAnimationFrame(animate);
}

setInterval(spawnParticles, 100);
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
