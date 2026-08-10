/* nav.js — Phase 1 shared multi-page navigation & boot
   Does not change accounting logic. Uses loadData/calc from core modules.
*/
const NAV_ITEMS = [
  { id: 'dashboard', href: './index.html',     label: 'داشبورد' },
  { id: 'customers', href: './customers.html', label: 'مشتریان' },
  { id: 'products',  href: './products.html',  label: 'اجناس' },
  { id: 'inventory', href: './inventory.html', label: 'انبار' },
  { id: 'suppliers', href: './suppliers.html', label: 'تامین‌کننده‌ها' },
  { id: 'invoices',  href: './invoices.html',  label: 'فاکتورها' },
  { id: 'payments',  href: './payments.html',  label: 'پرداخت‌ها' },
  { id: 'checks',    href: './checks.html',    label: 'چک‌ها' },
  { id: 'visits',    href: './visits.html',    label: 'ویزیت' },
  { id: 'reports',   href: './reports.html',   label: 'گزارش‌ها' },
  { id: 'settings',  href: './settings.html',  label: 'تنظیمات' },
];

function renderSharedNav(activeId){
  const nav = document.getElementById('nav');
  if(!nav) return;
  nav.innerHTML = NAV_ITEMS.map(t => {
    const active = t.id === activeId ? ' active' : '';
    return `<a class="nav-link${active}" href="${t.href}">${t.label}</a>`;
  }).join('');
}

function getQueryParam(name){
  try{
    return new URLSearchParams(window.location.search).get(name);
  }catch(e){
    return null;
  }
}

/** Load IndexedDB data, draw shared nav, then run page callback. */
async function bootPage(activeId, afterLoad){
  try{
    await loadData();
    renderSharedNav(activeId);
    if(typeof afterLoad === 'function'){
      await afterLoad();
    }
  }catch(e){
    console.error('bootPage failed', e);
    if(typeof showToast === 'function'){
      showToast('خطا در بارگذاری اطلاعات');
    }
    const main = document.getElementById('main');
    if(main){
      main.innerHTML = `<div class="empty">خطا در بارگذاری اطلاعات. صفحه را دوباره باز کنید.</div>`;
    }
  }
}

function pageShellNote(title, detail){
  return `
    <h2 class="section-title">${title}</h2>
    <div class="page-skeleton-note">
      ${detail || 'این صفحه در مرحله ۱ فقط اسکلت معماری است. امکانات کامل در مراحل بعد منتقل می‌شوند.'}
    </div>
  `;
}
