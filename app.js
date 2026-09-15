const data = PABOTIK_DATA;
const $ = (selector) => document.querySelector(selector);
const modal = $('#modal-backdrop');
let selectedActivity = data.activities[0];
let selectedBookingSlot = '';
let shopCart = [];
let currentFilters = { category: 'all', location: 'all', type: 'all', family: false, instant: false };

function populateSelects() {
  const options = data.categories.map((category) => `<option value="${category.id}">${category.name}</option>`).join('');
  $('#search-category').insertAdjacentHTML('beforeend', options);
  $('#filter-category').insertAdjacentHTML('beforeend', options);
  const locationOptions = data.locations.map((location) => `<option value="${location}"></option>`).join('');
  $('#location-options').innerHTML = locationOptions;
  $('#filter-location').insertAdjacentHTML('beforeend', data.locations.map((location) => `<option value="${location}">${location}</option>`).join(''));
}

let calendarMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
function renderCalendar() {
  const monthName = calendarMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  $('#calendar-month').textContent = monthName;
  const firstDay = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1).getDay();
  const daysInMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 0).getDate();
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const selected = $('#search-date').value;
  let cells = '';
  for (let index = 0; index < firstDay; index += 1) cells += '<span class="calendar-empty"></span>';
  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day);
    const iso = date.toISOString().slice(0, 10);
    const disabled = date < today ? ' disabled' : '';
    const selectedClass = iso === selected ? ' selected' : '';
    cells += `<button class="calendar-day${selectedClass}" type="button" data-date="${iso}"${disabled}>${day}</button>`;
  }
  $('#calendar-days').innerHTML = cells;
  document.querySelectorAll('.calendar-day:not([disabled])').forEach((dayButton) => dayButton.addEventListener('click', () => {
    $('#search-date').value = dayButton.dataset.date;
    $('#date-picker-button').innerHTML = `${new Date(`${dayButton.dataset.date}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} <span>▣</span>`;
    $('#calendar-popover').hidden = true;
    renderCalendar();
  }));
}
function setupCalendar() {
  renderCalendar();
  $('#date-picker-button').addEventListener('click', () => { $('#calendar-popover').hidden = !$('#calendar-popover').hidden; });
  $('#calendar-prev').addEventListener('click', () => { calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1); renderCalendar(); });
  $('#calendar-next').addEventListener('click', () => { calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1); renderCalendar(); });
  $('#calendar-clear').addEventListener('click', () => { $('#search-date').value = ''; $('#date-picker-button').innerHTML = 'Choose a date <span>▣</span>'; renderCalendar(); });
}

function renderCategories() {
  $('#category-grid').innerHTML = data.categories.map((category) => `<article class="category-card" data-category="${category.id}"><img src="${category.image}" alt="${category.name}"><div class="category-card-content"><div class="icon">${category.icon}</div><h3>${category.name}</h3><p>Explore the blue</p></div></article>`).join('');
  document.querySelectorAll('.category-card').forEach((card) => card.addEventListener('click', () => {
    currentFilters.category = card.dataset.category;
    $('#filter-category').value = card.dataset.category;
    $('#listing').scrollIntoView({ behavior: 'smooth' });
    renderActivities();
  }));
}

function filteredActivities() {
  let activities = data.activities.filter((activity) => {
    const categoryMatch = currentFilters.category === 'all' || activity.category === currentFilters.category;
    const locationKey = currentFilters.location.split(' (')[0].toLowerCase();
    const locationMatch = currentFilters.location === 'all' || activity.location.toLowerCase().includes(locationKey) || (locationKey.includes('male atoll') && activity.location.toLowerCase().includes('male'));
    const typeMatch = currentFilters.type === 'all' || (currentFilters.type === 'private' ? activity.private : !activity.private);
    return categoryMatch && locationMatch && typeMatch;
  });
  const sort = $('#sort-select').value;
  if (sort === 'price-low') activities.sort((a, b) => a.price - b.price);
  if (sort === 'rating') activities.sort((a, b) => b.rating - a.rating);
  return activities;
}

function renderActivities() {
  const activities = filteredActivities();
  $('#result-count').textContent = `${activities.length} experience${activities.length === 1 ? '' : 's'}`;
  $('#activity-grid').innerHTML = activities.length ? activities.map(activityCard).join('') : '<div class="summary-box"><strong>No experiences match yet.</strong><br>Try clearing a filter or widening your search.</div>';
  document.querySelectorAll('[data-details]').forEach((button) => button.addEventListener('click', () => openDetails(button.dataset.details)));
  document.querySelectorAll('[data-open-booking]').forEach((button) => button.addEventListener('click', () => openBooking(button.dataset.openBooking)));
}

function activityCard(activity) {
  return `<article class="activity-card"><div class="activity-image"><img src="${activity.image}" alt="${activity.name}">${activity.private ? '<span class="activity-badge">PRIVATE</span>' : ''}<button class="save-button" type="button" aria-label="Save ${activity.name}">♡</button></div><div class="activity-body"><div class="activity-top"><div><h3>${activity.name}</h3><p class="activity-location">⌖ ${activity.location}</p></div><div class="rating"><b>${activity.rating}</b> ★ <span>${activity.reviews} reviews</span></div></div><p class="activity-description">${activity.summary}</p><div class="activity-meta"><span>◷ ${activity.duration}</span><span>${activity.private ? 'Private boat' : 'Small group'}</span><span>Instant confirmation</span></div><div class="activity-footer"><div class="price"><small>Indicative from</small><strong>$${activity.price}</strong><small> / guest</small><em>Verify live operator rate</em></div><div class="card-buttons"><button class="outline-button" data-details="${activity.id}">View details</button><button class="button button-coral" data-open-booking="${activity.id}">Reserve</button></div></div></div></article>`;
}

function renderOfficialDirectories() {
  $('#official-grid').innerHTML = data.officialDirectories.map((directory) => `<article class="official-card"><div class="official-icon">${directory.icon}</div><h3>${directory.title}</h3><p>${directory.description}</p><div class="official-links"><a href="${directory.url}" target="_blank" rel="noopener">${directory.label} ↗</a>${directory.secondaryUrl ? `<a href="${directory.secondaryUrl}" target="_blank" rel="noopener">Liveaboards ↗</a>` : ''}</div></article>`).join('');
}
function renderPropertyResults(query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) { $('#property-results').hidden = true; return; }
  const matches = data.properties.filter((property) => `${property.name} ${property.location} ${property.type}`.toLowerCase().includes(normalized));
  $('#property-results').hidden = false;
  $('#property-results-title').textContent = matches.length ? `Results for “${query}”` : `No local profile for “${query}” yet`;
  $('#property-grid').innerHTML = matches.length ? matches.map((property) => `<article class="property-card"><div class="property-card-top"><span class="property-type">${property.type}</span><span class="property-source">✓ ${property.source}</span></div><h3>${property.name}</h3><p class="property-location">⌖ ${property.location}</p><p>${property.bio}</p><div class="property-provides">${property.provides.map((item) => `<span>${item}</span>`).join('')}</div><div class="property-card-footer"><strong>${property.price}</strong><div><a href="${property.url}" target="_blank" rel="noopener">Property details ↗</a>${property.bookingUrl ? `<a href="${property.bookingUrl}" target="_blank" rel="noopener">Check availability ↗</a>` : ''}</div></div></article>`).join('') : `<div class="property-empty"><strong>Search the complete official directory.</strong><p>This name is not in the locally cached profiles yet. Visit Maldives maintains the live resort, hotel and guesthouse registries.</p><a href="https://visitmaldives.com/en/resorts" target="_blank" rel="noopener">Open official resort directory ↗</a><a href="https://visitmaldives.com/en/guesthouses" target="_blank" rel="noopener">Open official guesthouse directory ↗</a></div>`;
  $('#property-results').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function renderShop(category = 'all') {
  const products = data.shopProducts.filter((product) => category === 'all' || product.category === category);
  $('#shop-grid').innerHTML = products.map((product) => `<article class="shop-product"><div class="shop-product-photo">${product.image ? `<img src="${product.image}" alt="${product.name}">` : '<span>Photo coming soon</span>'}<button class="shop-save" type="button" aria-label="Save ${product.name}">♡</button></div><div class="shop-product-body"><span class="shop-category">${product.category}</span><h3>${product.name}</h3><p>${product.description}</p><small>${product.material}</small><div class="shop-product-footer"><strong>${product.price ? `$${product.price}` : 'Price coming soon'}</strong><button class="button button-coral" data-add-shop="${product.id}" type="button">Request to buy</button></div></div></article>`).join('');
  document.querySelectorAll('[data-add-shop]').forEach((button) => button.addEventListener('click', () => { const product = data.shopProducts.find((item) => item.id === button.dataset.addShop); if (!shopCart.some((item) => item.id === product.id)) shopCart.push(product); updateShopBag(); button.textContent = 'Added'; }));
}
function updateShopBag() { $('#shop-bag-count').textContent = shopCart.length; }
function openShopBag() {
  const items = shopCart.length ? shopCart.map((product) => `<div class="bag-item"><div><strong>${product.name}</strong><span>${product.material}</span></div><b>${product.price ? `$${product.price}` : 'Price to be confirmed'}</b></div>`).join('') : '<div class="shop-empty">Your bag is ready for your island finds. Add a handmade piece to continue.</div>';
  openModal(`<div class="shop-bag-panel"><p class="kicker">Evershell.mv / PURCHASE REQUEST</p><h2>Tell us where to send your <em>piece.</em></h2><p class="shop-form-intro">The admin will contact you before shipping to confirm the final price, availability, delivery timing and payment instructions.</p><div class="bag-items">${items}</div>${shopCart.length ? '<form class="shop-request-form" id="shop-request-form"><div class="form-grid"><label>Email address<input type="email" required placeholder="you@example.com"></label><label>Phone number<div class="phone-field"><select aria-label="Country code" required><option>+960</option><option>+971</option><option>+94</option><option>+91</option><option>+44</option><option>+1</option></select><input type="tel" required placeholder="700 0000"></div></label></div><label>Shipping location<select required><option value="">Select delivery location</option><option>Male’</option><option>Hulhumale’</option><option>Another Maldives island</option><option>International destination</option></select></label><label>Preferred payment method<select required><option value="">Choose a payment method</option><option>Bank transfer - BML</option><option>Bank transfer - MIB</option><option>PayPal</option><option>International card</option><option>Discuss with admin</option></select></label><label>Notes or preferred materials<textarea placeholder="Tell us what you are looking for..."></textarea></label><button class="button button-coral" type="submit">Send purchase request <span>→</span></button></form>' : ''}<p class="shop-note">Shipping to Male’ is available. Product photos and final prices will be confirmed by the Evershell.mv admin before any payment or shipping.</p></div>`);
  if (shopCart.length) $('#shop-request-form').addEventListener('submit', (event) => { event.preventDefault(); openModal('<div class="confirmation"><div class="success-mark">✓</div><p class="kicker">PURCHASE REQUEST RECEIVED</p><h2>The admin will contact <em>you.</em></h2><p>Your Evershell.mv request has been recorded. The admin will confirm the item, final price, shipping to your location and payment steps before anything is shipped.</p><button class="button button-navy" id="shop-done" type="button">Back to shop</button></div>'); $('#shop-done').addEventListener('click', closeModal); });
}

function openModal(content) { $('#modal-content').innerHTML = content; modal.hidden = false; document.body.style.overflow = 'hidden'; }
function closeModal() { modal.hidden = true; document.body.style.overflow = ''; }
function getProviderSlots(activity, date, guests) {
  const day = new Date(`${date}T12:00:00`).getDay();
  const schedules = {
    cruises: ['08:00', '14:00', '16:30'], snorkeling: ['08:30', '13:30'], diving: ['07:30', '12:30'],
    fishing: ['06:00', '13:00'], sandbank: ['09:00', '14:30'], islands: ['08:00', '10:00']
  };
  const times = schedules[activity.category] || ['08:00', '13:00'];
  return times.map((time, index) => ({ time, available: Math.max(0, (activity.private ? 1 : 6) - ((day + index + guests) % (activity.private ? 2 : 5))) })).filter((slot) => slot.available >= guests);
}
function renderProviderAvailability() {
  const provider = data.providers[selectedActivity.providerId];
  const date = $('#booking-date').value;
  const guests = Number($('#booking-adults').value) + Number($('#booking-children').value);
  const slots = getProviderSlots(selectedActivity, date, guests);
  $('#provider-sync-label').textContent = `${provider.syncLabel} · ${provider.name}`;
  $('#availability-status').textContent = slots.length ? `${slots.length} departure options · capacity checked for ${guests} guest${guests === 1 ? '' : 's'}` : 'No departure has enough capacity for this group on this date.';
  $('#availability-slots').innerHTML = slots.length ? slots.map((slot) => `<button class="slot-button${slot.time === selectedBookingSlot ? ' selected' : ''}" type="button" data-slot="${slot.time}"><strong>${slot.time}</strong><span>${slot.available} place${slot.available === 1 ? '' : 's'} left</span></button>`).join('') : '<div class="availability-empty">Try another date or reduce the group size.</div>';
  document.querySelectorAll('.slot-button').forEach((button) => button.addEventListener('click', () => { selectedBookingSlot = button.dataset.slot; renderProviderAvailability(); updateBookingTotal(); }));
  if (!slots.some((slot) => slot.time === selectedBookingSlot)) selectedBookingSlot = '';
}
function openAccount() {
  const savedUser = localStorage.getItem('pabotik-user');
  if (savedUser) {
    openModal(`<div class="account-panel"><div class="account-orbit">✦</div><p class="kicker">YOUR PABOTIK ACCOUNT</p><h2>Welcome back, <em>${savedUser}</em>.</h2><p class="account-copy">Your saved experiences and booking requests will appear here as you plan your next day on the water.</p><div class="account-links"><button class="button button-navy" id="account-booking" type="button">View my booking</button><button class="outline-button" id="account-logout" type="button">Sign out</button></div></div>`);
    $('#account-logout').addEventListener('click', () => { localStorage.removeItem('pabotik-user'); closeModal(); updateAccountButton(); });
    $('#account-booking').addEventListener('click', () => openBooking('sunset-dolphin-cruise'));
    return;
  }
  openModal(`<div class="account-panel"><div class="account-orbit">✦</div><p class="kicker">PABOTIK TRAVELS</p><h2>Keep your <em>blue days</em> together.</h2><p class="account-copy">Create a free account to save experiences, manage booking requests and pick up where you left off.</p><div class="account-tabs"><button class="active" type="button">Sign in</button><button type="button">Create account</button></div><form class="account-form" id="account-form"><label>Email address<input type="email" required placeholder="you@example.com"></label><label>Password<input type="password" required minlength="6" placeholder="At least 6 characters"></label><label class="account-name-field" hidden>First name<input type="text" placeholder="Your first name"></label><button class="button button-coral" type="submit" id="account-submit">Sign in <span>→</span></button></form><p class="account-note">Demo account state is stored only in this browser. No password is sent anywhere.</p></div>`);
  const tabs = document.querySelectorAll('.account-tabs button');
  tabs.forEach((tab, index) => tab.addEventListener('click', () => { tabs.forEach((item) => item.classList.remove('active')); tab.classList.add('active'); const create = index === 1; $('.account-name-field').hidden = !create; $('#account-submit').innerHTML = create ? 'Create account <span>→</span>' : 'Sign in <span>→</span>'; }));
  $('#account-form').addEventListener('submit', (event) => { event.preventDefault(); const name = $('.account-name-field input')?.value || $('#account-form input[type="email"]').value.split('@')[0]; localStorage.setItem('pabotik-user', name); closeModal(); updateAccountButton(); });
}
function updateAccountButton() { const user = localStorage.getItem('pabotik-user'); $('#account-button').innerHTML = user ? `♙ <span>${user}</span>` : '♙ <span>Sign in</span>'; }
function botReply(message) {
  const text = message.toLowerCase();
  if (text.includes('famil')) return 'For families, I recommend Reef Life Explorer. It is beginner friendly, includes equipment and has a calm 3-hour format. Want me to open it?';
  if (text.includes('include')) return 'Most trips include the boat, a local guide, safety equipment and drinking water. Each activity page lists the exact inclusions and exclusions.';
  if (text.includes('book')) return 'Choose an experience, select Reserve, enter your date and guest details, then choose a payment method. Payment is still a placeholder until your business details are added.';
  if (text.includes('price') || text.includes('cost')) return 'Prices are shown per guest in USD and marked as special Pabotik rates. They are editable in data.js.';
  if (text.includes('dive')) return 'Blue Water Discovery Dive is our certified-diver option in Vaavu Atoll. I can show you the details.';
  return 'I can help with family trips, what is included, prices, diving, cancellation or how booking works. Try one of those topics.';
}
function addBotMessage(text, sender) { const messages = $('#bot-messages'); const bubble = document.createElement('div'); bubble.className = `${sender}-message`; bubble.textContent = text; messages.appendChild(bubble); messages.scrollTop = messages.scrollHeight; }
function sendBotMessage(message) { if (!message.trim()) return; addBotMessage(message, 'user'); window.setTimeout(() => addBotMessage(botReply(message), 'bot'), 350); }
function openDetails(id) {
  selectedActivity = data.activities.find((activity) => activity.id === id);
  openModal(`<div class="detail-hero"><img src="${selectedActivity.gallery[0]}" alt="${selectedActivity.name}"><div class="detail-title"><p class="kicker light">${selectedActivity.private ? 'PRIVATE EXPERIENCE' : 'CURATED EXPERIENCE'}</p><h2>${selectedActivity.name}</h2></div></div><div class="modal-pad"><div class="detail-stats"><span><b>★ ${selectedActivity.rating}</b>${selectedActivity.reviews} reviews</span><span><b>${selectedActivity.duration}</b>duration</span><span><b>$${selectedActivity.price}</b>from / guest</span><span><b>${selectedActivity.location}</b>meeting area</span></div><div class="detail-section"><h3>About this experience</h3><p>${selectedActivity.summary} ${selectedActivity.highlights.join('. ')}.</p></div><div class="detail-section"><h3>What you'll do</h3><p>Meet your crew, receive a clear safety briefing, then head out across the lagoon toward the day's best conditions. Your guide will shape the pace around the group and the water.</p></div><div class="detail-section detail-columns"><div><h3>What's included</h3><ul class="detail-list">${selectedActivity.included.map((item) => `<li>${item}</li>`).join('')}</ul></div><div><h3>What's not included</h3><ul class="detail-list">${selectedActivity.excluded.map((item) => `<li>${item}</li>`).join('')}</ul></div></div><div class="detail-section"><h3>Meeting point and requirements</h3><p>${selectedActivity.location}. ${selectedActivity.requirements}</p><p style="margin-top:8px"><strong>Bring:</strong> ${selectedActivity.bring.join(', ')}.</p></div><div class="detail-section"><h3>Cancellation policy</h3><p>${selectedActivity.cancellation}</p></div><div class="reserve-bar"><span class="price"><small>From</small><strong>$${selectedActivity.price}</strong></span><button class="button button-coral" data-open-booking="${selectedActivity.id}">Reserve now <span>→</span></button></div></div>`);
  $('#modal-content [data-open-booking]').addEventListener('click', () => openBooking(selectedActivity.id));
}

function openBooking(id) {
  selectedActivity = data.activities.find((activity) => activity.id === id) || selectedActivity;
  selectedBookingSlot = '';
  const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  openModal(`<div class="booking-title"><p class="kicker">RESERVE YOUR EXPERIENCE</p><h2>One step closer to <em>blue.</em></h2><p>${selectedActivity.name} / ${selectedActivity.location}</p><div class="provider-sync-card"><span class="sync-dot"></span><span id="provider-sync-label">Checking provider calendar...</span></div></div><form class="booking-form" id="booking-form"><div class="form-grid"><label>Date<input id="booking-date" type="date" min="${tomorrow}" required></label><div class="availability-box"><span class="field-label">Available departure times</span><div id="availability-status" class="availability-status">Checking capacity...</div><div id="availability-slots" class="availability-slots"></div></div></div><div class="form-grid"><label>Adults<select id="booking-adults"><option value="1">1 adult</option><option value="2" selected>2 adults</option><option value="3">3 adults</option><option value="4">4 adults</option></select></label><label>Children<select id="booking-children"><option value="0">0 children</option><option value="1">1 child</option><option value="2">2 children</option></select></label></div><div class="form-grid"><label>Your name<input id="customer-name" required placeholder="Full name"></label><label>Email<input id="customer-email" type="email" required placeholder="you@example.com"></label></div><div class="form-grid"><label>WhatsApp / mobile<input id="customer-phone" required placeholder="+960 ..."></label><label>Hotel or guesthouse<input id="customer-hotel" required placeholder="Where are you staying?"></label></div><label>Pickup location<input id="customer-pickup" placeholder="Pier, hotel lobby or island"></label><label>Special requests<textarea id="customer-notes" placeholder="Dietary needs, celebrations, accessibility..."></textarea></label><div class="summary-box"><div><strong>${selectedActivity.name}</strong><br><span id="booking-summary">Choose your date and guests</span></div><div style="margin-top:10px">Indicative total: <strong id="booking-total">$${selectedActivity.price * 2}</strong></div></div><button class="button button-coral" type="submit">Continue to payment <span>→</span></button></form>`);
  $('#booking-date').value = tomorrow;
  ['booking-date', 'booking-adults', 'booking-children'].forEach((id) => $(`#${id}`).addEventListener('change', () => { if (id !== 'booking-date') selectedBookingSlot = ''; renderProviderAvailability(); updateBookingTotal(); }));
  renderProviderAvailability();
  updateBookingTotal();
  $('#booking-form').addEventListener('submit', (event) => { event.preventDefault(); if (!selectedBookingSlot) { $('#availability-status').textContent = 'Select an available departure time to continue.'; return; } renderProviderAvailability(); if (!selectedBookingSlot) return; openPayment(); });
}

function updateBookingTotal() {
  const adults = Number($('#booking-adults').value); const children = Number($('#booking-children').value); const guests = adults + children;
  $('#booking-total').textContent = `$${selectedActivity.price * guests}`;
  $('#booking-summary').textContent = `${$('#booking-date').value} at ${selectedBookingSlot || 'a selected time'} / ${guests} guest${guests === 1 ? '' : 's'} / ${selectedActivity.duration}`;
}

function openPayment() {
  const total = $('#booking-total').textContent;
  openModal(`<div class="booking-title"><p class="kicker">SECURE YOUR RESERVATION</p><h2>Choose your <em>payment</em> method.</h2><p>${selectedActivity.name} / ${total} estimated total</p></div><div class="booking-form"><div class="summary-box">Payment methods are placeholders for now. No payment is processed on this demo site.</div><div class="payment-options">${data.payments.filter((payment) => payment.enabled).map((payment, index) => `<label class="payment-option"><input type="radio" name="payment" value="${payment.id}" ${index === 0 ? 'checked' : ''}><span><strong>${payment.name}</strong><small>${payment.detail}</small></span></label>`).join('')}</div><button class="button button-coral" id="payment-submit" type="button">Confirm reservation request <span>→</span></button><p style="color:var(--muted);font-size:11px">Your booking request will be reviewed and confirmation instructions will be shared by the Pabotik Travels team.</p></div>`);
  $('#payment-submit').addEventListener('click', () => openConfirmation());
}
function openConfirmation() { openModal(`<div class="confirmation"><div class="success-mark">✓</div><p class="kicker">REQUEST RECEIVED</p><h2>You're almost <em>there.</em></h2><p>Thank you for choosing Pabotik Travels. Your experience request is ready for confirmation. Our team will contact you with payment instructions and pickup details.</p><button class="button button-navy" id="done-button" type="button">Back to experiences</button></div>`); $('#done-button').addEventListener('click', closeModal); }

populateSelects(); renderCategories(); renderActivities(); renderOfficialDirectories(); renderShop(); setupCalendar();
updateAccountButton();
$('#search-button').addEventListener('click', () => { currentFilters.category = $('#search-category').value; currentFilters.location = $('#search-location').value; $('#filter-category').value = currentFilters.category; $('#filter-location').value = currentFilters.location; renderActivities(); $('#listing').scrollIntoView({ behavior: 'smooth' }); });
$('#search-button').addEventListener('click', () => renderPropertyResults($('#search-location').value));
$('#search-location').addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); $('#search-button').click(); } });
$('#property-results-close').addEventListener('click', () => { $('#search-location').value = ''; $('#property-results').hidden = true; });
$('#filter-category').addEventListener('change', (event) => { currentFilters.category = event.target.value; renderActivities(); });
$('#filter-location').addEventListener('change', (event) => { currentFilters.location = event.target.value; renderActivities(); });
$('#filter-type').addEventListener('change', (event) => { currentFilters.type = event.target.value; renderActivities(); });
$('#filter-family').addEventListener('change', (event) => { currentFilters.family = event.target.checked; });
$('#filter-instant').addEventListener('change', (event) => { currentFilters.instant = event.target.checked; });
$('#sort-select').addEventListener('change', renderActivities);
$('#clear-filters').addEventListener('click', () => { currentFilters = { category: 'all', location: 'all', type: 'all', family: false, instant: false }; $('#filter-category').value = 'all'; $('#filter-location').value = 'all'; $('#filter-type').value = 'all'; $('#filter-family').checked = false; $('#filter-instant').checked = false; renderActivities(); });
$('#view-all').addEventListener('click', () => { currentFilters.category = 'all'; $('#filter-category').value = 'all'; renderActivities(); $('#listing').scrollIntoView({ behavior: 'smooth' }); });
$('#modal-close').addEventListener('click', closeModal); modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
document.querySelectorAll('[data-scroll="top"]').forEach((button) => button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' })));
$('#newsletter-form').addEventListener('submit', (event) => { event.preventDefault(); event.currentTarget.innerHTML = '<span style="color:var(--aqua);font-weight:700">You are on the list. See you by the water.</span>'; });
$('#back-button').addEventListener('click', () => { if (window.history.length > 1) window.history.back(); else window.scrollTo({ top: 0, behavior: 'smooth' }); });
$('#account-button').addEventListener('click', openAccount);
$('#bot-toggle').addEventListener('click', () => { $('#bot-panel').hidden = !$('#bot-panel').hidden; });
$('#bot-close').addEventListener('click', () => { $('#bot-panel').hidden = true; });
$('#bot-form').addEventListener('submit', (event) => { event.preventDefault(); const input = $('#bot-input'); sendBotMessage(input.value); input.value = ''; });
document.querySelectorAll('[data-chat]').forEach((button) => button.addEventListener('click', () => sendBotMessage(button.dataset.chat)));
document.querySelectorAll('[data-shop-category]').forEach((button) => button.addEventListener('click', () => { document.querySelectorAll('[data-shop-category]').forEach((item) => item.classList.remove('active')); button.classList.add('active'); renderShop(button.dataset.shopCategory); }));
$('#shop-bag-button').addEventListener('click', openShopBag);
