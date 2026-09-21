(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{constructor(e,t,n,r=crypto.randomUUID()){this.id=r,this.title=e,this.author=t,this.year=n,this.isBorrowed=!1,this.borrowedByUserId=null}getInfo(){return`${this.title} by ${this.author} (${this.year})`}},t=class{constructor(e,t,n,r=[]){this.id=e,this.name=t,this.email=n,this.borrowedBookIds=r}addBorrowedBook(e){this.borrowedBookIds.includes(e)||this.borrowedBookIds.push(e)}removeBorrowedBook(e){this.borrowedBookIds=this.borrowedBookIds.filter(t=>t!==e)}},n=class{constructor(e=[]){this.items=[],this.items=[...e]}add(e){this.items.push(e)}remove(e){let t=this.items.findIndex(t=>t.id===e);return t!==-1&&(this.items.splice(t,1),!0)}find(e){return this.items.find(t=>t.id===e)}getAll(){return[...this.items]}filter(e){return this.items.filter(e)}size(){return this.items.length}},r=class{constructor(e){this.overlay=null,this.config=e}show(){this.remove();let e=document.getElementById(`app`);if(!e)return;let t=document.createElement(`div`);t.className=`fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4`;let n=document.createElement(`div`);n.className=`relative w-full rounded-md border border-gray-200 bg-white p-6 shadow-xl`;let r=this.config.size===`lg`?`max-w-lg`:this.config.size===`sm`?`max-w-sm`:`max-w-md`;n.className+=` ${r}`;let i=document.createElement(`button`);i.type=`button`,i.className=`absolute right-4 top-4 text-2xl leading-none text-gray-400 hover:text-gray-600`,i.textContent=`×`,i.setAttribute(`aria-label`,`Close`),i.addEventListener(`click`,()=>this.close());let a=document.createElement(`h2`);a.className=`mb-4 pr-8 text-lg font-semibold text-gray-900`,a.textContent=this.config.title;let o=document.createElement(`div`);o.className=`text-gray-900`,o.innerHTML=this.config.content;let s=document.createElement(`div`);s.className=`mt-6 flex justify-end gap-3`,this.config.actions.forEach(e=>{let t=document.createElement(`button`);t.type=`button`,t.textContent=e.label,t.className=e.variant===`primary`?`rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700`:`rounded bg-slate-600 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700`,t.addEventListener(`click`,()=>{e.onClick(),this.close()}),s.appendChild(t)}),n.appendChild(i),this.config.title&&n.appendChild(a),n.appendChild(o),n.appendChild(s),t.appendChild(n),e.appendChild(t),this.overlay=t}close(){this.remove(),this.config.onClose&&this.config.onClose()}remove(){this.overlay&&=(this.overlay.remove(),null)}},i=class{static showBorrowPrompt(e,t,n){new r({title:`Введіть ID користувача для позичення книги:`,size:`md`,onClose:n,content:`
        <div class="space-y-4">
          <div class="rounded border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
            ${e}
          </div>
          <label class="block">
            <span class="sr-only">ID</span>
            <input
              type="text"
              id="borrow-user-id"
              class="w-full rounded border border-gray-300 px-3 py-2 text-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="ID"
              inputmode="numeric"
            />
          </label>
        </div>
      `,actions:[{label:`Скасувати`,variant:`secondary`,onClick:n},{label:`Зберегти`,variant:`primary`,onClick:()=>{let e=document.getElementById(`borrow-user-id`)?.value.trim()??``;e&&t(e)}}]}).show()}static showInfo(e,t,n){new r({title:``,size:`md`,onClose:n??(()=>void 0),content:`<p class="text-xl leading-relaxed text-gray-900">${e}</p>`,actions:[{label:t,variant:`primary`,onClick:n??(()=>void 0)}]}).show()}},a=class{static load(e,t){try{let n=localStorage.getItem(e);if(!n)return t;let r=JSON.parse(n);return Array.isArray(r)?r:t}catch(n){return console.error(`Failed to load ${e}:`,n),t}}static save(e,t){localStorage.setItem(e,JSON.stringify(t))}};function o(){return String(Date.now()+Math.floor(Math.random()*1e3))}var s;(function(e){function t(e){return e.trim().length>0}e.isRequired=t;function n(e){let t=e.trim();if(!/^\d{4}$/.test(t))return!1;let n=Number(t),r=new Date().getFullYear();return n>=800&&n<=r}e.isValidYear=n;function r(e){return/^\d+$/.test(e.trim())}e.isNumericId=r;function i(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim())}e.isValidEmail=i})(s||={});var c=class{static render(){return`
      <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-xl font-bold text-black">Додати Книгу</h2>
        <form id="book-form" class="space-y-4">
          <div>
            <input name="title" type="text" placeholder="Назва книги" class="w-full rounded border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            <p class="mt-1 hidden text-xs text-red-600">Це поле є обов'язковим</p>
          </div>
          <div>
            <input name="author" type="text" placeholder="Автор" class="w-full rounded border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            <p class="mt-1 hidden text-xs text-red-600">Це поле є обов'язковим</p>
          </div>
          <div>
            <input name="year" type="text" placeholder="Рік видання" class="w-full rounded border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            <p class="mt-1 hidden text-xs text-red-600">Рік має бути 4-значним числом</p>
          </div>
          <button type="submit" class="rounded bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700">Додати Книгу</button>
        </form>
      </div>
    `}static validate(e){let t=new FormData(e),n={title:String(t.get(`title`)??``),author:String(t.get(`author`)??``),year:String(t.get(`year`)??``)},r={};return s.isRequired(n.title)||(r.title=`Це поле є обов'язковим`),s.isRequired(n.author)||(r.author=`Це поле є обов'язковим`),s.isValidYear(n.year)||(r.year=`Рік має бути 4-значним числом`),r}},l=class{static render(e,t,n,r){let i=e.length?e.map(e=>`
              <div class="flex items-center justify-between border-b border-gray-200 py-3 last:border-0">
                <span class="text-base text-gray-800">${e.title} by ${e.author} (${e.year})</span>
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    class="${e.isBorrowed?`bg-amber-500 hover:bg-amber-600`:`bg-blue-600 hover:bg-blue-700`} rounded px-4 py-1.5 text-sm text-white"
                    data-action="${e.isBorrowed?`return`:`borrow`}"
                    data-book-id="${e.id}"
                  >
                    ${e.isBorrowed?`Повернути`:`Позичити`}
                  </button>
                  <button type="button" class="rounded bg-red-600 px-2 py-1 text-sm text-white" data-action="delete-book" data-book-id="${e.id}">✕</button>
                </div>
              </div>
            `).join(``):`<p class="py-3 text-gray-500">Немає книг.</p>`,a=Array.from({length:n},(e,n)=>{let r=n+1;return`
        <button
          type="button"
          data-page="${r}"
          class="min-w-9 rounded border px-2 py-1 text-sm ${r===t?`border-blue-600 bg-blue-600 text-white`:`border-gray-300 bg-white text-gray-700 hover:bg-gray-100`}"
        >
          ${r}
        </button>
      `}).join(``);return`
      <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-xl font-bold text-black">Список Книг</h2>
        <div class="mb-4">
          <input
            type="search"
            value="${r}"
            data-role="book-search"
            placeholder="Пошук за назвою або автором"
            class="w-full rounded border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div class="space-y-0">${i}</div>
        ${n>1?`
          <div class="mt-4 flex items-center justify-between gap-3 pt-4">
            <button type="button" data-page="prev" class="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 ${t===1?`cursor-not-allowed opacity-50`:``}">Назад</button>
            <div class="flex flex-wrap items-center gap-2">${a}</div>
            <button type="button" data-page="next" class="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 ${t===n?`cursor-not-allowed opacity-50`:``}">Вперед</button>
          </div>
        `:``}
      </div>
    `}},u=class{static render(){return`
      <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-xl font-bold text-black">Додати Користувача</h2>
        <form id="user-form" class="space-y-4">
          <div>
            <input name="name" type="text" placeholder="Ім'я" class="w-full rounded border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            <p class="mt-1 hidden text-xs text-red-600">Це поле є обов'язковим</p>
          </div>
          <div>
            <input name="email" type="email" placeholder="Email" class="w-full rounded border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            <p class="mt-1 hidden text-xs text-red-600">Некоректний email</p>
          </div>
          <button type="submit" class="rounded bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700">Додати Користувача</button>
        </form>
      </div>
    `}static validate(e){let t=new FormData(e),n={name:String(t.get(`name`)??``),email:String(t.get(`email`)??``)},r={};return s.isRequired(n.name)||(r.name=`Це поле є обов'язковим`),s.isValidEmail(n.email)||(r.email=`Некоректний email`),r}},d=class{static render(e){return e.length?`
      <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-xl font-bold text-black">Список Користувачів</h2>
        <div class="space-y-0">
          ${e.map(e=>`
                <div class="flex items-center justify-between border-b border-gray-200 py-3 last:border-0">
                  <span class="text-base text-gray-800">${e.id} ${e.name} (${e.email})</span>
                  <button type="button" class="rounded bg-red-600 px-2 py-1 text-sm text-white hover:bg-red-700" data-action="delete-user" data-user-id="${e.id}">✕</button>
                </div>
              `).join(``)}
        </div>
      </div>
    `:`
        <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 class="mb-4 text-xl font-bold text-black">Список Користувачів</h2>
          <p class="text-gray-500">Немає користувачів.</p>
        </div>
      `}},f=`library-books`,p=`library-users`,m=class{constructor(e){this.searchTerm=``,this.currentPage=1,this.root=e;let r=a.load(f,[{id:`1`,title:`Code Complete`,author:`Steve McConnell`,year:2004,isBorrowed:!1,borrowedByUserId:null},{id:`2`,title:`Clean Code`,author:`Robert Martin`,year:2008,isBorrowed:!1,borrowedByUserId:null},{id:`3`,title:`The Pragmatic Programmer`,author:`Andrew Hunt`,year:1999,isBorrowed:!1,borrowedByUserId:null}]),i=a.load(p,[new t(`1725533394038`,`Артем`,`artemkarachevstev@gmail.com`),new t(`1725533377985`,`Мартін`,`martin@softwar.com`)]);this.books=new n(r),this.users=new n(i)}render(){let e=this.books.getAll().filter(e=>{let t=this.searchTerm.trim().toLowerCase();return!t||`${e.title} ${e.author}`.toLowerCase().includes(t)}),t=Math.max(1,Math.ceil(e.length/5));this.currentPage=Math.min(this.currentPage,t);let n=(this.currentPage-1)*5,r=e.slice(n,n+5);this.root.innerHTML=`
      <div class="min-h-screen bg-gray-100 px-4 py-8 font-sans">
        <div class="mx-auto max-w-4xl space-y-6">
          <h1 class="text-center text-3xl font-bold text-black">Система Управління Бібліотекою</h1>
          ${c.render()}
          ${u.render()}
          ${l.render(r,this.currentPage,t,this.searchTerm)}
          ${d.render(this.users.getAll())}
        </div>
      </div>
    `,this.attachFormHandlers(),this.attachActionHandlers()}attachFormHandlers(){let n=document.getElementById(`book-form`);n&&n.addEventListener(`submit`,t=>{t.preventDefault();let r=c.validate(n);if(this.showFieldErrors(n,r),Object.keys(r).length>0)return;let i=new FormData(n),o=new e(String(i.get(`title`)??``).trim(),String(i.get(`author`)??``).trim(),Number(String(i.get(`year`)??``)));this.books.add(o),a.save(f,this.books.getAll()),n.reset(),this.render()});let r=document.getElementById(`user-form`);r&&r.addEventListener(`submit`,e=>{e.preventDefault();let n=u.validate(r);if(this.showFieldErrors(r,n),Object.keys(n).length>0)return;let i=new FormData(r),s=String(i.get(`name`)??``).trim(),c=String(i.get(`email`)??``).trim(),l=new t(o(),s,c);this.users.add(l),a.save(p,this.users.getAll()),r.reset(),this.render()});let i=document.querySelector(`[data-role="book-search"]`);i&&i.addEventListener(`input`,e=>{this.searchTerm=e.target.value,this.currentPage=1,this.render()})}attachActionHandlers(){document.querySelectorAll(`[data-page]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-page`);t&&(t===`prev`?this.currentPage=Math.max(1,this.currentPage-1):t===`next`?this.currentPage+=1:this.currentPage=Number(t),this.render())})}),document.querySelectorAll(`[data-action="borrow"]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-book-id`);t&&this.handleBorrow(t)})}),document.querySelectorAll(`[data-action="return"]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-book-id`);t&&this.handleReturn(t)})}),document.querySelectorAll(`[data-action="delete-book"]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-book-id`);t&&this.handleDeleteBook(t)})}),document.querySelectorAll(`[data-action="delete-user"]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-user-id`);t&&this.handleDeleteUser(t)})})}showFieldErrors(e,t){e.querySelectorAll(`input`).forEach(e=>{let n=e.getAttribute(`name`),r=e.parentElement?.querySelector(`p`);if(!n||!r)return;let i=t[n],a=!!i;e.classList.toggle(`border-red-500`,a),e.classList.toggle(`focus:ring-red-500`,a),r.textContent=i??``,r.classList.toggle(`hidden`,!a)})}handleBorrow(e){let t=this.books.find(e);t&&i.showBorrowPrompt(`${t.title} by ${t.author} (${t.year})`,e=>{let n=this.users.find(e);if(!n){i.showInfo(`Користувача з таким ID не знайдено.`,`Зрозуміло!`);return}if(n.borrowedBookIds.length>=3){i.showInfo(`Користувач ${n.name} вже позичив 3 книги! Максимальний ліміт вичерпано.`,`Зрозуміло!`);return}t.isBorrowed=!0,t.borrowedByUserId=n.id,n.addBorrowedBook(t.id),a.save(f,this.books.getAll()),a.save(p,this.users.getAll()),this.render(),i.showInfo(`${t.title} by ${t.author} (${t.year}) has been borrowed by ${n.id} ${n.name} (${n.email}).`,`Зрозуміло!`)},()=>void 0)}handleReturn(e){let t=this.books.find(e);if(!t||!t.isBorrowed)return;let n=this.users.find(t.borrowedByUserId??``);n&&n.removeBorrowedBook(t.id),t.isBorrowed=!1,t.borrowedByUserId=null,a.save(f,this.books.getAll()),a.save(p,this.users.getAll()),this.render(),i.showInfo(`${t.title} by ${t.author} (${t.year}) has been returned.`,`Закрити`)}handleDeleteBook(e){let t=this.books.find(e);if(t){if(t.isBorrowed&&t.borrowedByUserId){let e=this.users.find(t.borrowedByUserId);e&&e.removeBorrowedBook(t.id)}this.books.remove(e),a.save(f,this.books.getAll()),a.save(p,this.users.getAll()),this.render()}}handleDeleteUser(e){let t=this.users.find(e);if(t){if(t.borrowedBookIds.length>0){i.showInfo(`Неможливо видалити користувача з активними позичками.`,`Зрозуміло!`);return}this.users.remove(e),a.save(p,this.users.getAll()),this.render()}}},h=document.getElementById(`app`);h&&new m(h).render();