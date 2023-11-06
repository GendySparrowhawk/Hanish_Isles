import { render } from './actions';


async function showHeader() {
    const res = await axios.get('/auth/authenticate');
    const headerEl = document.querySelector('#main-header');
  
    window.user = res.data;
    headerEl.innerHTML = headerView({
      user: res.data
    });
  
    const loginLink = document.querySelector('a[href="/login"]');
    const logoutLink = document.querySelector('a[href="/auth/logout"]')
  
    if (loginLink) {
      loginLink.addEventListener('click', showLogin);
    }
  
    if (logoutLink) {
      logoutLink.addEventListener('click', logoutUser);
    }
  }


function initViews() {
    render(landingContent);
  
    showHeader();
  
    const shopViewBtn = document.querySelector('#shop-view-btn');
    shopViewBtn.addEventListener('click', showShops);
  }
  
  export default initViews;