<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  body {
    font-family: 'Segoe UI', sans-serif;
    background: #0f1a0c;
    color: #F0EDE6;
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 20px;
    line-height: 1.6;
  }

  .header {
    text-align: center;
    padding: 60px 0 40px;
    border-bottom: 1px solid rgba(200,241,53,0.2);
    margin-bottom: 48px;
  }

  .logo {
    font-size: 64px;
    font-weight: 900;
    letter-spacing: -2px;
    color: #F0EDE6;
    margin: 0;
    line-height: 1;
  }

  .logo span {
    color: #C8F135;
  }

  .tagline {
    font-size: 13px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: rgba(240,237,230,0.4);
    margin-top: 12px;
  }

  .badge-row {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 24px;
  }

  .badge {
    background: rgba(200,241,53,0.1);
    border: 1px solid rgba(200,241,53,0.25);
    color: #C8F135;
    font-size: 11px;
    padding: 5px 14px;
    border-radius: 999px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  h2 {
    font-size: 11px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: #C8F135;
    margin-bottom: 16px;
    margin-top: 48px;
  }

  p {
    color: rgba(240,237,230,0.7);
    font-size: 15px;
  }

  .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 12px;
    margin-top: 16px;
  }

  .tech-card {
    background: rgba(240,237,230,0.04);
    border: 1px solid rgba(240,237,230,0.08);
    border-radius: 10px;
    padding: 16px;
    font-size: 13px;
    color: rgba(240,237,230,0.8);
  }

  .tech-card span {
    display: block;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(240,237,230,0.3);
    margin-bottom: 6px;
  }

  .section-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 16px;
  }

  .section-card {
    background: rgba(240,237,230,0.03);
    border: 1px solid rgba(240,237,230,0.08);
    border-radius: 10px;
    padding: 18px 20px;
  }

  .section-card h3 {
    font-size: 14px;
    color: #F0EDE6;
    margin: 0 0 6px 0;
  }

  .section-card p {
    font-size: 12px;
    color: rgba(240,237,230,0.4);
    margin: 0;
  }

  .links-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-top: 16px;
  }

  .link-btn {
    display: inline-block;
    padding: 10px 24px;
    border-radius: 999px;
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    font-weight: 600;
  }

  .link-btn.primary {
    background: #C8F135;
    color: #0f1a0c;
  }

  .link-btn.secondary {
    border: 1px solid rgba(240,237,230,0.2);
    color: #F0EDE6;
  }

  .footer {
    margin-top: 64px;
    padding-top: 32px;
    border-top: 1px solid rgba(200,241,53,0.15);
    text-align: center;
    font-size: 12px;
    color: rgba(240,237,230,0.25);
    letter-spacing: 0.1em;
  }

  code {
    background: rgba(200,241,53,0.08);
    border: 1px solid rgba(200,241,53,0.15);
    color: #C8F135;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 13px;
  }

  .command-block {
    background: rgba(0,0,0,0.4);
    border: 1px solid rgba(240,237,230,0.08);
    border-radius: 10px;
    padding: 20px 24px;
    margin-top: 16px;
    font-family: monospace;
    font-size: 13px;
    color: #C8F135;
    line-height: 2;
  }

  .command-block .comment {
    color: rgba(240,237,230,0.25);
  }
</style>
</head>
<body>

<div class="header">
  <h1 class="logo">KAG<span>ETSU</span></h1>
  <p class="tagline">Studio · Pune, India · Est. 2025</p>
  <div class="badge-row">
    <span class="badge">HTML</span>
    <span class="badge">CSS</span>
    <span class="badge">Vanilla JS</span>
    <span class="badge">GSAP</span>
    <span class="badge">Three.js</span>
    <span class="badge">EmailJS</span>
  </div>
</div>

<h2>About</h2>
<p>
  Portfolio website for <strong style="color:#F0EDE6">Kagetsu Studio</strong> — a one-person creative force specializing in graphic design, video editing, and animation. Built with zero frameworks, pure HTML/CSS/JS with heavy animation using GSAP and Three.js.
</p>

<h2>Sections</h2>
<div class="section-grid">
  <div class="section-card">
    <h3>🎨 Hero</h3>
    <p>Interactive Three.js particle canvas with mouse repulsion and stat cards</p>
  </div>
  <div class="section-card">
    <h3>🖼 Work Gallery</h3>
    <p>Bento-style dark grid — Posters, Video Edits, Art with tab switching</p>
  </div>
  <div class="section-card">
    <h3>⚡ Services</h3>
    <p>Dual opposing marquee strip with custom software logo pills</p>
  </div>
  <div class="section-card">
    <h3>👤 Creator</h3>
    <p>Card swap stack showcasing the person behind the studio</p>
  </div>
  <div class="section-card">
    <h3>📸 About</h3>
    <p>Polaroid scatter layout with scroll-triggered spread animation</p>
  </div>
  <div class="section-card">
    <h3>📬 Contact</h3>
    <p>Modal form with real EmailJS integration — lands in inbox directly</p>
  </div>
</div>

<h2>Tech Stack</h2>
<div class="tech-grid">
  <div class="tech-card"><span>Animation</span>GSAP 3 + ScrollTrigger</div>
  <div class="tech-card"><span>3D</span>Three.js r128</div>
  <div class="tech-card"><span>Fonts</span>Google Fonts</div>
  <div class="tech-card"><span>Email</span>EmailJS</div>
  <div class="tech-card"><span>Build</span>Vite</div>
  <div class="tech-card"><span>Deploy</span>GitHub Pages</div>
</div>

<h2>Run Locally</h2>
<div class="command-block">
  <span class="comment"># Clone the repo</span><br>
  git clone https://github.com/Sunilkashyaap/Kagetsu_studio.git<br><br>
  <span class="comment"># Navigate to project</span><br>
  cd Kagetsu_studio<br><br>
  <span class="comment"># Open index.html directly or use live server</span><br>
  open index.html
</div>

<h2>Connect</h2>
<div class="links-row">
  <a class="link-btn primary" href="https://www.behance.net/sunilkashyaap">Behance</a>
  <a class="link-btn secondary" href="https://www.instagram.com/kagetsu.studio/">Instagram</a>
  <a class="link-btn secondary" href="https://www.linkedin.com/in/sunil-kashyap11">LinkedIn</a>
  <a class="link-btn secondary" href="https://dribbble.com/animevuee">Dribbble</a>
</div>

<div class="footer">
  © 2025 KAGETSU STUDIO · PUNE, INDIA · ALL RIGHTS RESERVED
</div>

</body>
</html>