(function () {
  const p = window.PROFILE || {};
  const app = document.getElementById("app");

  function inLiveWindow(startAt, endAt) {
    if (!startAt || !endAt) return false;
    const now = new Date();
    const [sh, sm] = startAt.split(":").map(Number);
    const [eh, em] = endAt.split(":").map(Number);
    const start = sh * 60 + sm;
    const end = eh * 60 + em;
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
    <div class="profile-row">
      <div class="avatar-wrap">
        <img class="avatar ${liveOn ? "live-on" : "}" src="${avatarSrc || ""}" alt="" />
        ${liveOn ? `<div class="live-badge">LIVE${p.live?.viewers ? " · " + p.live.viewers : ""}</div>` : ""}
      </div>
      <div class="meta">
        <div class="name">${p.displayName || p.username || ""} ${p.verified ? '<span class="tick">✓</span>' : ""}</div>
        <div class="handle">@${p.username || ""}</div>
      </div>
    </div>
    <p class="bio">${p.bio || ""}</p>
    <div class="stats">
      <div><strong>${p.nbPosts ?? 0}</strong><span>Posts</span></div>
      <div><strong>${p.nbVideos ?? 0}</strong><span>Vidéos</span></div>
      <div><strong>${p.nbLikes ?? 0}</strong><span>Likes</span></div>
    </div>
    <a class="cta" href="${p.ctaUrl || "#"}">${p.ctaLabel || "Continuer"}</a>
    ${stories.length ? `<div class="section-title">Stories</div>
      <div class="stories">${stories.map((s) => `
        <div class="story">
          <img class="${s.blurred ? "blur" : ""}" src="${s.image}" alt="${s.name || ""}" />
          <div>${s.name || ""}</div>
        </div>`).join("")}</div>` : ""}
    <div class="section-title">Médias</div>
    <div class="grid">
      ${posts.map((post) => `
        <div class="cell ${post.blurred ? "blur" : ""}">
          <img src="${post.image}" alt="" />
          ${post.blurred ? '<div class="lock">🔒</div>' : ""}
          ${post.video ? '<div class="vid">▶</div>' : ""}
        </div>`).join("")}
    </div>
    <div class="popup ${p.hideOfferPopup ? "hidden" : ""}" id="offer">
      <div class="sheet">
        <h2>Accès privé</h2>
        <p>Débloque les photos floutées, les stories et le live.</p>
        <button type="button" id="offer-go">${p.ctaLabel || "Déverrouiller"}</button>
      </div>
    </div>
  `;

  document.getElementById("offer-go")?.addEventListener("click", () => {
    if (p.ctaUrl) window.location.href = p.ctaUrl;
  });
  document.getElementById("offer")?.addEventListener("click", (e) => {
    if (e.target.id === "offer") e.currentTarget.classList.add("hidden");
  });
})();
