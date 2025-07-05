function navigate(page) {
  fetch(`pages/${page}.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById('content').innerHTML = html;
    });
}

window.addEventListener('load', () => {
  const hash = window.location.hash.replace('#/', '') || 'home';
  navigate(hash);
});