/* ============================================================
   JOIN THE CLUB — NEWSLETTER SIGNUP FORM
   Injected once here and shared across every page, instead of
   duplicating the modal markup in each HTML file. Step 1 only asks
   for an email; submitting it reveals the full subscription form
   (name, country, DOB, postal code, phone, consent) which posts to
   Sony's subscription backend, matching the fields/IDs required by
   that system (see newsletter/newsletter_form_nathy_peluso.html).
   ============================================================ */

const JOIN_COUNTRIES = [
  ['AF', 'Afghanistan'], ['AL', 'Albania'], ['DZ', 'Algeria'], ['AS', 'American Samoa'],
  ['AD', 'Andorra'], ['AO', 'Angola'], ['AI', 'Anguilla'], ['AQ', 'Antarctica'],
  ['AG', 'Antigua & Barbuda'], ['AR', 'Argentina'], ['AM', 'Armenia'], ['AW', 'Aruba'],
  ['AU', 'Australia'], ['AT', 'Austria'], ['AZ', 'Azerbaijan'], ['BS', 'Bahamas'],
  ['BH', 'Bahrain'], ['BD', 'Bangladesh'], ['BB', 'Barbados'], ['BY', 'Belarus'],
  ['BE', 'Belgium'], ['BZ', 'Belize'], ['BJ', 'Benin'], ['BM', 'Bermuda'],
  ['BT', 'Bhutan'], ['BO', 'Bolivia'], ['BA', 'Bosnia & Herzegovina'], ['BW', 'Botswana'],
  ['BV', 'Bouvet Island'], ['BR', 'Brazil'], ['IO', 'British Indian Ocean Territory'],
  ['VG', 'British Virgin Islands'], ['BN', 'Brunei'], ['BG', 'Bulgaria'], ['BF', 'Burkina Faso'],
  ['BI', 'Burundi'], ['KH', 'Cambodia'], ['CM', 'Cameroon'], ['CA', 'Canada'],
  ['CV', 'Cape Verde'], ['BQ', 'Caribbean Netherlands'], ['KY', 'Cayman Islands'],
  ['CF', 'Central African Republic'], ['TD', 'Chad'], ['CL', 'Chile'], ['CN', 'China'],
  ['CX', 'Christmas Island'], ['CC', 'Cocos (Keeling) Islands'], ['CO', 'Colombia'],
  ['KM', 'Comoros'], ['CG', 'Congo - Brazzaville'], ['CD', 'Congo - Kinshasa'],
  ['CK', 'Cook Islands'], ['CR', 'Costa Rica'], ['HR', 'Croatia'], ['CU', 'Cuba'],
  ['CW', 'Curaçao'], ['CY', 'Cyprus'], ['CZ', 'Czechia'], ['CI', 'Côte d’Ivoire'],
  ['DK', 'Denmark'], ['DJ', 'Djibouti'], ['DM', 'Dominica'], ['DO', 'Dominican Republic'],
  ['EC', 'Ecuador'], ['EG', 'Egypt'], ['SV', 'El Salvador'], ['GQ', 'Equatorial Guinea'],
  ['ER', 'Eritrea'], ['EE', 'Estonia'], ['SZ', 'Eswatini'], ['ET', 'Ethiopia'],
  ['FK', 'Falkland Islands'], ['FO', 'Faroe Islands'], ['FJ', 'Fiji'], ['FI', 'Finland'],
  ['FR', 'France'], ['GF', 'French Guiana'], ['PF', 'French Polynesia'],
  ['TF', 'French Southern Territories'], ['GA', 'Gabon'], ['GM', 'Gambia'], ['GE', 'Georgia'],
  ['DE', 'Germany'], ['GH', 'Ghana'], ['GI', 'Gibraltar'], ['GR', 'Greece'],
  ['GL', 'Greenland'], ['GD', 'Grenada'], ['GP', 'Guadeloupe'], ['GU', 'Guam'],
  ['GT', 'Guatemala'], ['GG', 'Guernsey'], ['GN', 'Guinea'], ['GW', 'Guinea-Bissau'],
  ['GY', 'Guyana'], ['HT', 'Haiti'], ['HM', 'Heard & McDonald Islands'], ['HN', 'Honduras'],
  ['HK', 'Hong Kong SAR China'], ['HU', 'Hungary'], ['IS', 'Iceland'], ['IN', 'India'],
  ['ID', 'Indonesia'], ['IR', 'Iran'], ['IQ', 'Iraq'], ['IE', 'Ireland'],
  ['IM', 'Isle of Man'], ['IL', 'Israel'], ['IT', 'Italy'], ['JM', 'Jamaica'],
  ['JP', 'Japan'], ['JE', 'Jersey'], ['JO', 'Jordan'], ['KZ', 'Kazakhstan'],
  ['KE', 'Kenya'], ['KI', 'Kiribati'], ['XK', 'Kosovo'], ['KW', 'Kuwait'],
  ['KG', 'Kyrgyzstan'], ['LA', 'Laos'], ['LV', 'Latvia'], ['LB', 'Lebanon'],
  ['LS', 'Lesotho'], ['LR', 'Liberia'], ['LY', 'Libya'], ['LI', 'Liechtenstein'],
  ['LT', 'Lithuania'], ['LU', 'Luxembourg'], ['MO', 'Macao SAR China'], ['MG', 'Madagascar'],
  ['MW', 'Malawi'], ['MY', 'Malaysia'], ['MV', 'Maldives'], ['ML', 'Mali'],
  ['MT', 'Malta'], ['MH', 'Marshall Islands'], ['MQ', 'Martinique'], ['MR', 'Mauritania'],
  ['MU', 'Mauritius'], ['YT', 'Mayotte'], ['MX', 'Mexico'], ['FM', 'Micronesia'],
  ['MD', 'Moldova'], ['MC', 'Monaco'], ['MN', 'Mongolia'], ['ME', 'Montenegro'],
  ['MS', 'Montserrat'], ['MA', 'Morocco'], ['MZ', 'Mozambique'], ['MM', 'Myanmar (Burma)'],
  ['NA', 'Namibia'], ['NR', 'Nauru'], ['NP', 'Nepal'], ['NL', 'Netherlands'],
  ['NC', 'New Caledonia'], ['NZ', 'New Zealand'], ['NI', 'Nicaragua'], ['NE', 'Niger'],
  ['NG', 'Nigeria'], ['NU', 'Niue'], ['NF', 'Norfolk Island'], ['KP', 'North Korea'],
  ['MK', 'North Macedonia'], ['MP', 'Northern Mariana Islands'], ['NO', 'Norway'],
  ['OM', 'Oman'], ['PK', 'Pakistan'], ['PW', 'Palau'], ['PS', 'Palestinian Territories'],
  ['PA', 'Panama'], ['PG', 'Papua New Guinea'], ['PY', 'Paraguay'], ['PE', 'Peru'],
  ['PH', 'Philippines'], ['PN', 'Pitcairn Islands'], ['PL', 'Poland'], ['PT', 'Portugal'],
  ['PR', 'Puerto Rico'], ['QA', 'Qatar'], ['RO', 'Romania'], ['RU', 'Russia'],
  ['RW', 'Rwanda'], ['RE', 'Réunion'], ['WS', 'Samoa'], ['SM', 'San Marino'],
  ['SA', 'Saudi Arabia'], ['SN', 'Senegal'], ['RS', 'Serbia'], ['SC', 'Seychelles'],
  ['SL', 'Sierra Leone'], ['SG', 'Singapore'], ['SX', 'Sint Maarten'], ['SK', 'Slovakia'],
  ['SI', 'Slovenia'], ['SB', 'Solomon Islands'], ['SO', 'Somalia'], ['ZA', 'South Africa'],
  ['GS', 'South Georgia & South Sandwich Islands'], ['KR', 'South Korea'], ['SS', 'South Sudan'],
  ['ES', 'Spain'], ['LK', 'Sri Lanka'], ['BL', 'St. Barthélemy'], ['SH', 'St. Helena'],
  ['KN', 'St. Kitts & Nevis'], ['LC', 'St. Lucia'], ['MF', 'St. Martin'],
  ['PM', 'St. Pierre & Miquelon'], ['VC', 'St. Vincent & Grenadines'], ['SD', 'Sudan'],
  ['SR', 'Suriname'], ['SJ', 'Svalbard & Jan Mayen'], ['SE', 'Sweden'], ['CH', 'Switzerland'],
  ['SY', 'Syria'], ['ST', 'São Tomé & Príncipe'], ['TW', 'Taiwan'], ['TJ', 'Tajikistan'],
  ['TZ', 'Tanzania'], ['TH', 'Thailand'], ['TL', 'Timor-Leste'], ['TG', 'Togo'],
  ['TK', 'Tokelau'], ['TO', 'Tonga'], ['TT', 'Trinidad & Tobago'], ['TN', 'Tunisia'],
  ['TM', 'Turkmenistan'], ['TC', 'Turks & Caicos Islands'], ['TV', 'Tuvalu'],
  ['TR', 'Türkiye'], ['UM', 'U.S. Outlying Islands'], ['VI', 'U.S. Virgin Islands'],
  ['UG', 'Uganda'], ['UA', 'Ukraine'], ['AE', 'United Arab Emirates'], ['GB', 'United Kingdom'],
  ['US', 'United States'], ['UY', 'Uruguay'], ['UZ', 'Uzbekistan'], ['VU', 'Vanuatu'],
  ['VA', 'Vatican City'], ['VE', 'Venezuela'], ['VN', 'Vietnam'], ['WF', 'Wallis & Futuna'],
  ['EH', 'Western Sahara'], ['YE', 'Yemen'], ['ZM', 'Zambia'], ['ZW', 'Zimbabwe'],
  ['AX', 'Åland Islands'],
];

function joinCountryOptionsHtml() {
  return '<option selected disabled value="" data-en="- Country * -" data-es="- País * -">- Country * -</option>'
    + JOIN_COUNTRIES.map(([code, name]) => `<option value="${code}">${name}</option>`).join('');
}

const JOIN_MODAL_HTML = `
<div class="modal-overlay" id="joinModal">
  <div class="join-card" id="joinCard">
    <button class="join-card__close" id="joinClose" aria-label="Close">✕</button>

    <div class="join-card__step join-card__step--1" id="joinStep1">
      <div class="join-card__label" data-en="UNITE A:" data-es="ÚNETE A:">UNITE A:</div>
      <div class="join-card__logo">club<br />grasa</div>
      <div class="join-card__member-row">
        <span data-en="BECOME A" data-es="HAZTE">BECOME A</span>
        <mark data-en="MEMBER" data-es="MIEMBRO">MEMBER</mark>
        <span>Nº001</span>
      </div>
      <div class="join-card__photo">
        <img src="assets/images/home/member-photo.jpg" alt="" />
      </div>
      <form id="joinEmailForm" class="join-card__form" novalidate>
        <div class="join-card__field">
          <label for="joinStepEmail" data-en="Email:" data-es="Email:">Email:</label>
          <input type="email" id="joinStepEmail" maxlength="60" required />
          <div class="join-card__error" data-for="joinStepEmail" data-en="Please enter a valid email" data-es="Debes proporcionar un email válido"></div>
        </div>
        <button type="submit" class="btn btn--black join-card__submit" data-en="JOIN THE CLUB" data-es="ÚNETE AL CLUB">JOIN THE CLUB</button>
      </form>
    </div>

    <div class="join-card__step join-card__step--2" id="joinStep2" hidden>
      <form id="newsletter-form" class="join-card__form" novalidate>
        <input id="js_url" name="js_url" type="hidden" value="https://subs.sonymusicfans.com/submit" />
        <input name="form" type="hidden" value="62739" />

        <div class="join-card__field">
          <label for="field_email_address" data-en="Email:" data-es="Email:">Email:</label>
          <input id="field_email_address" name="field_email_address" type="email" maxlength="60" required />
          <div class="join-card__error" data-for="field_email_address" data-en="Please enter a valid email" data-es="Debes proporcionar un email válido"></div>
        </div>
        <div class="join-card__field">
          <label for="field_first_name" data-en="First name:" data-es="Nombre:">First name:</label>
          <input id="field_first_name" name="field_first_name" type="text" maxlength="30" required />
          <div class="join-card__error" data-for="field_first_name" data-en="Enter your first name" data-es="Introduce tu nombre"></div>
        </div>
        <div class="join-card__field">
          <label for="field_last_name" data-en="Last name:" data-es="Apellidos:">Last name:</label>
          <input id="field_last_name" name="field_last_name" type="text" maxlength="60" required />
          <div class="join-card__error" data-for="field_last_name" data-en="Enter your last name" data-es="Introduce tus apellidos"></div>
        </div>
        <div class="join-card__field">
          <label for="field_country_region" data-en="Country:" data-es="País:">Country:</label>
          <select id="field_country_region" name="field_country_region" required>${joinCountryOptionsHtml()}</select>
          <div class="join-card__error" data-for="field_country_region" data-en="Select your country" data-es="Selecciona tu país"></div>
        </div>
        <div class="join-card__field">
          <label for="field_dob" data-en="Date of birth:" data-es="Fecha de nacimiento:">Date of birth:</label>
          <input id="field_dob" name="field_dob" type="date" required />
          <div class="join-card__error" data-for="field_dob" data-en="Enter your date of birth" data-es="Introduce tu fecha de nacimiento"></div>
        </div>
        <div class="join-card__field">
          <label for="field_postal_code" data-en="Postal code:" data-es="Código postal:">Postal code:</label>
          <input id="field_postal_code" name="field_postal_code" type="text" maxlength="20" required />
          <div class="join-card__error" data-for="field_postal_code" data-en="Enter your postal code" data-es="Introduce tu código postal"></div>
        </div>
        <div class="join-card__field">
          <label for="phone" data-en="Mobile:" data-es="Móvil:">Mobile:</label>
          <input id="phone" type="tel" required />
          <div class="join-card__error" data-for="phone" data-en="Enter a valid mobile number" data-es="Introduce tu teléfono móvil"></div>
        </div>

        <input type="checkbox" name="triggered_sends[]" id="confirmation_email" class="join-card__hidden-checkbox" checked value="">
        <input type="checkbox" name="triggered_sends[]" id="ts-for-ml-0" class="join-card__hidden-checkbox" value="">
        <label class="join-card__consent">
          <input type="checkbox" class="join-card__mailing-list" id="mailing-list-id[0]" name="mailing-list-id[0]" value="a0S1p00000USoTNEA1" required>
          <span>He leído y acepo la <a href="https://www.sonymusic.es/politica-de-privacidad-y-cookies/" target="_blank" rel="noopener">Política de Privacidad</a> y, en consecuencia, deseo recibir información sobre <strong>Nathy Peluso</strong> a través de correo electrónico, SMS, Whatsapp u otros medios electrónicos. *</span>
        </label>
        <div class="join-card__error" data-for="mailing-list-id[0]" data-en="You must accept to continue" data-es="Debes marcar la casilla para aceptar"></div>

        <input type="checkbox" name="triggered_sends[]" id="ts-for-ml-1" class="join-card__hidden-checkbox" value="">
        <label class="join-card__consent">
          <input type="checkbox" class="join-card__mailing-list" id="mailing-list-id[1]" name="mailing-list-id[1]" value="a0S61000000ZYfcEAG">
          <span>Quiero recibir información comercial, concursos, material promocional de SONY MUSIC ENTERTAINMENT ESPAÑA, S.L. y sus artistas a través de correo electrónico, SMS, Whatsapp u otros medios electrónicos.</span>
        </label>

        <div class="join-card__footnote" data-en="* Required field" data-es="* Denota un campo requerido">* Denota un campo requerido</div>
        <button type="submit" class="btn btn--black join-card__submit" data-en="JOIN THE CLUB" data-es="ÚNETE AL CLUB">JOIN THE CLUB</button>
      </form>
    </div>

    <div class="join-card__step join-card__step--response" id="joinResponse" hidden>
      <p data-en="Thanks for joining the club!!" data-es="¡Gracias por unirte al club!!">¡Gracias por unirte al club!!</p>
    </div>
  </div>
</div>
`;

document.body.insertAdjacentHTML('beforeend', JOIN_MODAL_HTML);

const joinCard        = document.getElementById('joinCard');
const joinStep1        = document.getElementById('joinStep1');
const joinStep2        = document.getElementById('joinStep2');
const joinResponse      = document.getElementById('joinResponse');
const joinEmailForm     = document.getElementById('joinEmailForm');
const joinStepEmail     = document.getElementById('joinStepEmail');
const newsletterForm    = document.getElementById('newsletter-form');
const fieldEmailAddress = document.getElementById('field_email_address');

function joinShowError(el, show) {
  const wrapper = el.closest('.join-card__field') || el.parentElement;
  const error = wrapper.querySelector(`.join-card__error[data-for="${el.id}"]`)
    || document.querySelector(`.join-card__error[data-for="${el.id}"]`);
  if (error) error.classList.toggle('is-visible', show);
  el.classList.toggle('is-invalid', show);
}

function resetJoinModal() {
  joinStep1.hidden = false;
  joinStep2.hidden = true;
  joinResponse.hidden = true;
  joinCard.classList.remove('join-card--wide');
  joinEmailForm.reset();
  newsletterForm.reset();
  newsletterForm.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
  newsletterForm.querySelectorAll('.join-card__error.is-visible').forEach(el => el.classList.remove('is-visible'));
}

new MutationObserver(() => {
  if (!document.getElementById('joinModal').classList.contains('is-open')) resetJoinModal();
}).observe(document.getElementById('joinModal'), { attributes: true, attributeFilter: ['class'] });

joinEmailForm.addEventListener('submit', e => {
  e.preventDefault();
  const valid = joinStepEmail.checkValidity();
  joinShowError(joinStepEmail, !valid);
  if (!valid) return;
  fieldEmailAddress.value = joinStepEmail.value;
  joinStep1.hidden = true;
  joinStep2.hidden = false;
  joinCard.classList.add('join-card--wide');
  initJoinPhoneField();
});

/* ============================================================
   PHONE FIELD (intl-tel-input) — loaded lazily, initialized once
   the full form becomes visible
   ============================================================ */
let joinIti = null;
let joinPhoneInitStarted = false;

function loadScriptOnce(url, callback) {
  const script = document.createElement('script');
  script.src = url;
  script.onload = callback;
  document.body.appendChild(script);
}

function initJoinPhoneField() {
  if (joinPhoneInitStarted) return;
  joinPhoneInitStarted = true;
  loadScriptOnce('https://cdn.jsdelivr.net/npm/intl-tel-input@26.0.6/build/js/intlTelInput.min.js', () => {
    const input = document.getElementById('phone');
    joinIti = window.intlTelInput(input, {
      initialCountry: 'auto',
      geoIpLookup: (success, failure) => {
        fetch('https://ipapi.co/json').then(res => res.json()).then(data => success(data.country_code)).catch(() => failure());
      },
      hiddenInput: () => ({ phone: 'field_mobile_phone' }),
      loadUtils: () => import('https://cdn.jsdelivr.net/npm/intl-tel-input@26.0.6/build/js/utils.js'),
    });
    input.addEventListener('input', () => joinShowError(input, false));

    // Auto-select the detected country in the Country field too, but
    // only until the visitor has picked one themselves.
    let countryFieldTouchedByUser = false;
    const countrySelect = document.getElementById('field_country_region');
    countrySelect.addEventListener('change', () => { countryFieldTouchedByUser = true; });
    input.addEventListener('countrychange', () => {
      if (countryFieldTouchedByUser) return;
      const iso2 = joinIti.getSelectedCountryData().iso2;
      if (!iso2) return;
      const option = countrySelect.querySelector(`option[value="${iso2.toUpperCase()}"]`);
      if (option) option.selected = true;
    });
  });
}

/* ============================================================
   MAILING LIST CHECKBOXES — mirror each into its triggered_sends
   hidden checkbox, same as the original jQuery delegated handler
   ============================================================ */
document.body.addEventListener('change', e => {
  if (!e.target.classList.contains('join-card__mailing-list')) return;
  const index = e.target.id.match(/\[(\d)\]/)[1];
  const triggered = document.getElementById(`ts-for-ml-${index}`);
  if (triggered) triggered.checked = e.target.checked;
});

/* ============================================================
   FULL FORM SUBMISSION
   ============================================================ */
newsletterForm.addEventListener('submit', e => {
  e.preventDefault();

  const requiredFields = [
    fieldEmailAddress,
    document.getElementById('field_first_name'),
    document.getElementById('field_last_name'),
    document.getElementById('field_country_region'),
    document.getElementById('field_dob'),
    document.getElementById('field_postal_code'),
  ];

  let hasError = false;
  requiredFields.forEach(el => {
    const valid = el.checkValidity();
    joinShowError(el, !valid);
    if (!valid) hasError = true;
  });

  const consent = document.getElementById('mailing-list-id[0]');
  const consentValid = consent.checked;
  joinShowError(consent, !consentValid);
  if (!consentValid) hasError = true;

  const phoneInput = document.getElementById('phone');
  if (!phoneInput.value.trim()) {
    joinShowError(phoneInput, true);
    hasError = true;
  } else if (joinIti && !joinIti.isValidNumber()) {
    joinShowError(phoneInput, true);
    hasError = true;
  } else {
    joinShowError(phoneInput, false);
  }

  if (hasError) return;

  const strip = value => value.replace(/(<([^>]+)>)/gi, '').trim();
  const data = new URLSearchParams();
  new FormData(newsletterForm).forEach((value, key) => {
    data.append(key, typeof value === 'string' ? strip(value) : value);
  });

  fetch('https://subs.sonymusicfans.com/submit', {
    method: 'POST',
    body: data,
  })
    .then(res => {
      if (!res.ok) throw new Error('Request failed');
      joinStep2.hidden = true;
      joinResponse.hidden = false;
    })
    .catch(() => {
      alert('Ha ocurrido un error. Por favor, inténtalo más tarde.');
    });
});
