(function () {
  const p = window.PROFILE || {};
  const app = document.getElementById("app");

  function inLiveWindow(startAt, endAt) {
    if (!startAt || !endAt) return false;
    const [sh, sm] = String(startAt).split(":").map(Number);
    const [eh, em] = String(endAt).split(":").map(Number);
    const start = sh * 60 + sm;
    const end = eh * 60 + em;
    const now = new Date();
    const cur = now.getHours() * 60 + now.getMinutes();
    if (start === end) return true;
    if (start < end) return cur >= start && cur < end;
    return cur >= start || cur < end;
  }

  const liveOn = inLiveWindow(p.live?.startAt, p.live?.endAt);
  const avatarSrc = liveOn && p.live?.gif ? p.live.gif : p.logo;
  const posts = (p.posts || []).filter((x) => x && x.image);
  const stories = (p.stories || []).filter((x) => x && x.image).slice(0, 5);

  app.innerHTML = `
    <div class="banner" style="background-image:url('${p.banner || ""}')"></div>
    <div class="identity">
      <div class="avatar-ring ${liveOn ? "live" : ""}"><img src="${avatarSrc || ""}" alt=""></div>
      <div class="name-block">
        <div class="name">${p.displayName || p.username || ""} ${p.verified ? '<span class="badge">✓</span>' : ""}</div>
        <div class="handle">@${p.username || ""}</div>
      </div>
    </div>
    <div class="stats">
      <span><span class="i">🖼</span> <b>${p.nbPosts ?? 0}</b> Photos</span>
      <span><span class="i">🎬</span> <b>${p.nbVideos ?? 0}</b> Vidéos</span>
      <span><span class="i">💜</span> <b>${p.nbLikes ?? 0}</b> Likes</span>
    </div>
    <div class="bio">${p.bio || ""}</div>
    <div class="divider"></div>
    <div class="stories">${stories.map((s) => `
      <div class="story">
        <div class="story-ring ${s.blurred ? "blur" : ""}">
          <img src="${s.image}" alt="">
          ${s.blurred ? '<div class="eye">👁</div>' : ""}
        </div>
        ${s.name || ""}
      </div>`).join("")}</div>
    <div class="tabs">
      <button class="tab active" data-tab="posts">🔥 Posts</button>
      <button class="tab" data-tab="profils">👤 Profils</button>
      <button class="tab" data-tab="live">📡 Live</button>
    </div>
    <div id="posts" class="panel show">
      <div class="grid">${posts.map((post) => `
        <a class="card ${post.blurred ? "blur" : ""}" href="${p.ctaUrl || "#"}">
          <img src="${post.image}" alt="">
          <div class="play">▶</div>
        </a>`).join("")}</div>
    </div>
    <div id="profils" class="panel">Aucun autre profil.</div>
    <div id="live" class="panel">${liveOn ? `Live en cours · ${p.live?.viewers || 0} personnes` : "Live inactif pour le moment."}</div>
    <div class="popup ${p.hideOfferPopup ? "hidden" : ""}" id="offer">
      <div class="sheet">
        <h2>Accès privé</h2>
        <p>Débloque les photos floutées, les stories et le live.</p>
        <button type="button" id="offer-go">${p.ctaLabel || "Déverrouiller"}</button>
      </div>
    </div>
  `;

  app.querySelectorAll(".tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      app.querySelectorAll(".tab").forEach((b) => b.classList.remove("active"));
      app.querySelectorAll(".panel").forEach((pane) => pane.classList.remove("show"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab)?.classList.add("show");
    });
  });
  document.getElementById("offer-go")?.addEventListener("click", () => {
    if (p.ctaUrl) window.location.href = p.ctaUrl;
  });
  document.getElementById("offer")?.addEventListener("click", (e) => {
    if (e.target.id === "offer") e.currentTarget.classList.add("hidden");
  });
})();
