# SKDV जानकारी — अनौपचारिक वेबसाइट (Unofficial)

सदगुरु कबीर साहेब, धनी धर्मदास साहब, कबीर पंथ, वंश परंपरा, दामाखेड़ा, SKDV मिशन, नवोदय यात्रा, ऐप और YouTube — 10 पेज की स्थिर (static) वेबसाइट।
कोई framework या build-step नहीं: सिर्फ़ HTML + CSS + थोड़ा JavaScript।

## चलाने का तरीक़ा (ज़रूरी: YouTube वीडियो के लिए)
YouTube एम्बेड `file://` (डबल-क्लिक) से नहीं चलते। इनमें से कोई एक करें:
1. **Local server (सबसे आसान):** `start-local.bat` (Windows) पर डबल-क्लिक, या Mac/Linux पर `python3 -m http.server 8000` चलाकर http://localhost:8000 खोलें।
2. **मुफ़्त होस्टिंग:** Netlify Drop (netlify.com/drop) में पूरा फ़ोल्डर खींचकर छोड़ें, या GitHub Pages / Cloudflare Pages।

## तस्वीरें बदलना (ज़रूरी पढ़ें)
साइट पर अभी लगी सभी तस्वीरें **नमूना (sample)** हैं — Unsplash से ली गई सामान्य/मिलती-जुलती तस्वीरें, असली आयोजनों/स्थलों की फ़ोटो नहीं। हर तस्वीर पर छोटा "नमूना चित्र" बैज भी दिखता है।

अपनी असली तस्वीरें लगाने के लिए **सिर्फ़ एक फ़ाइल** बदलनी है: `assets/js/images.js`
```js
window.SKDV_IMAGES = {
  "kabir-hero": "https://...अपनी-फ़ोटो.jpg",      // या "assets/img/kabir-hero.jpg"
  "dama-hero": "assets/img/damakheda-1.jpg",
  ...
};
```
- हर लाइन के आगे `//` कमेंट में बताया गया है वह चित्र किस पेज पर है।
- अपनी तस्वीरें `assets/img/` फ़ोल्डर में रखकर वहीं से path दें (ऑफ़लाइन भी चलेगा)।
- सारे नमूना-बैज एक साथ हटाने के लिए फ़ाइल की पहली लाइन `window.SKDV_SAMPLE_BADGE = true;` को `false` कर दें।
- किसी चित्र का key क्या रखा गया है, यह उस जगह HTML में `data-img="..."` एट्रिब्यूट में भी दिखता है।

## फ़ाइल संरचना
- `index.html` होम · `sadguru-kabir.html` · `dhani-dharmdas.html` · `kabir-panth.html` · `vansh-parampara.html`
- `damakheda.html` · `skdv-mission.html` · `navoday-yatra.html` · `app.html` · `videos.html` · `sources.html`
- `assets/css/style.css` (रंग `:root` में) · `assets/js/main.js` · `assets/js/images.js` (तस्वीरें) · `assets/img/favicon.svg`

## अपडेट कैसे करें
- **नई नवोदय यात्रा जोड़ें:** `navoday-yatra.html` में `<ol class="chain yatra">` के अंदर पहला `<li data-y="2026">…</li>` कॉपी करके बदलें।
- **नया वीडियो जोड़ें:** `videos.html` में `<ul class="vlist">` के अंदर कोई `<li><button …>` कॉपी करें और `data-vid` में YouTube video ID डालें (`type` = `video`; playlist के लिए `list`)।
- **ताज़ा जानकारी (होम):** `index.html` में `<ul class="feed">` की प्रविष्टियाँ।
- `sources.html` में "जो सत्यापित नहीं हुआ" सूची अपडेट करते रहें।

## जाँचने योग्य बातें
- वीडियो सेक्शन में मुख्य प्लेयर में केडीवी मिशन का वीडियो (`SCix-AJKU54`) एवं दोनों आधिकारिक YouTube चैनलों (**Anhad Kabir** व **Kabir Dharmdas Vanshavali**) के वीडियो/प्लेलिस्ट प्रदर्शित हैं।
- Fonts (Mukta, Tiro Devanagari Hindi) Google Fonts से आते हैं; offline में सिस्टम फ़ॉन्ट चलेंगे।
- यदि साइट सार्वजनिक करें तो संपर्क/सुधार का ईमेल sources.html में जोड़ें।

डिज़ाइन: हल्की (light) थीम, कोई ॐ/धार्मिक चिह्न नहीं। सामग्री कबीर पंथ की वंशगद्दी के परिचय-पाठ (कबीर पंथ, सदगुरु कबीर साहेब, धर्मदास जी साहब) और सार्वजनिक/आधिकारिक समाचार-स्रोतों पर आधारित है।
