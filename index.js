/************************
 * CONFIGURATION
 ************************/
const HARDCODED_PASSWORD = "TEL596";

/************************
 * MOCK DATA
 ************************/
const data = [
  {
    name: "ELIZABETH HOLMES VE THERANOS Bilimsel Sahtekarlık ve Etik İhlaller: Bir Etik İhlal Vaka Analizi",
    presenter: "Ahmet Kaçmaz",
    pdf: "projects/504231328/rapor.pdf",
    presentation: "projects/504231328/sunum.pdf",
  },
  {
    name: "Düz Dünyacılar",
    presenter: "Ercan İnce",
    presentation: "projects/504231334/sunum.pdf",
  },
  {
    name: "Uluslararası Yüksek Öğrenim Öğrencilerinde Akademik Mobbing",
    presenter: "Nazife Esra Çiğdem",
    pdf: "projects/504231339/rapor.pdf",
    presentation: "projects/504231339/sunum.pdf",
  },
  {
    name: "Düz Dünyacılar",
    presenter: "Emre Saka",
    pdf: "projects/504231341/rapor.pdf",
    presentation: "projects/504231341/sunum.pdf",
  },
  {
    name: "Galileo ve Kilise",
    presenter: "Yusuf Kağan Hanoğlu",
    pdf: "projects/504231343/rapor.pdf",
    presentation: "projects/504231343/sunum.pdf",
  },
  {
    name: "Makalelerde İntihalin Yapay Zeka Destekli Analizi",
    presenter: "Beyza SENEL",
    presentation: "projects/504241301/sunum.pdf",
  },
  {
    name: "C. L. Max Nikias Vakası",
    presenter: "Ömer Lütfü Karakelle",
    pdf: "projects/504241304/rapor.pdf",
    presentation: "projects/504241304/sunum.pdf",
  },
  {
    name: "Murat Uysal’ın Tezindeki İntihal Vakası ve Danışmanı Erişah Arıcan",
    presenter: "Bora Bozkurt",
    pdf: "projects/504241306/rapor.pdf",
    presentation: "projects/504241306/sunum.pdf",
  },
  {
    name: "NEWTON – LEIBNIZ KALKÜLÜS TARTIŞMASI BİLİMSEL ÖNCELİK, YAYIN ETİĞ İ VE KURUMSAL GÜÇ İLİŞKİLERİ ÜZERİNE BİR İNCELEME",
    presenter: "EYLÜL COŞAR",
    pdf: "projects/504241307/rapor.pdf",
    presentation: "projects/504241307/sunum.pdf",
  },
  {
    name: "ABDÜLHAMİT SUBAŞI",
    presenter: "Cevdet Tosun",
    presentation: "projects/504241318/sunum.pdf",
  },
  {
    name: "Galileo ve Kilise",
    presenter: "CAN KORKMAZ",
    pdf: "projects/504241340/rapor.pdf",
    presentation: "projects/504241340/sunum.pdf",
  },
  {
    name: "DIESELGATE",
    presenter: "Osman Mert Yılmaz",
    pdf: "projects/504241344/rapor.pdf",
    presentation: "projects/504241344/sunum.pdf",
  },
  {
    name: "ÖMER DİNÇER VAKASI",
    presenter: "YUSUF ŞAMİL DİNGEÇ",
    pdf: "projects/504241345/rapor.pdf",
    presentation: "projects/504241345/sunum.pdf",
  },
];

/************************
 * DOM REFERENCES
 ************************/
const passwordScreen = document.getElementById("password-screen");
const passwordInput = document.getElementById("password-input");
const passwordButton = document.getElementById("password-button");
const errorDiv = document.getElementById("error");

const container = document.getElementById("container");
const itemsDiv = document.getElementById("items");

const detailView = document.getElementById("detail");
const detailTitle = document.getElementById("detail-title");
const detailPresenter = document.getElementById("detail-presenter");
const presenterRow = document.getElementById("presenter-row");
const detailPdf = document.getElementById("detail-pdf");
const pdfRow = document.getElementById("pdf-row");
const detailPresentation = document.getElementById("detail-presentation");
const presentationRow = document.getElementById("presentation-row");
const detailVideo = document.getElementById("detail-video");
const backButton = document.getElementById("back-button");

/************************
 * NAVIGATION HELPERS
 ************************/
function showList() {
  detailView.classList.add("hidden");
  container.classList.remove("hidden");
}

function showDetailPage() {
  container.classList.add("hidden");
  detailView.classList.remove("hidden");
}

/************************
 * PASSWORD LOGIC
 ************************/
passwordButton.addEventListener("click", () => {
  if (passwordInput.value === HARDCODED_PASSWORD) {
    sessionStorage.setItem("authenticated", "true");
    passwordScreen.classList.add("hidden");
    showList();
    loadItems();
  } else {
    errorDiv.textContent = "Incorrect password";
  }
});

/************************
 * LIST RENDERING
 ************************/
function loadItems() {
  itemsDiv.innerHTML = "";

  data.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = item.presenter
      ? `${item.name} — ${item.presenter}`
      : item.name;

    div.addEventListener("click", () => showDetail(index));
    itemsDiv.appendChild(div);
  });
}

/************************
 * DETAIL VIEW
 ************************/
function showDetail(index) {
  const item = data[index];

  // Title (mandatory)
  detailTitle.textContent = item.name;

  // Presenter (optional)
  if (item.presenter) {
    detailPresenter.textContent = item.presenter;
    detailPresenter.parentElement.classList.remove("hidden");
  } else {
    detailPresenter.parentElement.classList.add("hidden");
  }

  // PDF (optional)
  if (item.pdf) {
    detailPdf.href = item.pdf;
    detailPdf.parentElement.classList.remove("hidden");
  } else {
    detailPdf.parentElement.classList.add("hidden");
  }

  // Presentation (optional)
  if (item.presentation) {
    detailPresentation.href = item.presentation;
    presentationRow.classList.remove("hidden");
  } else {
    presentationRow.classList.add("hidden");
  }

  // YouTube embed (optional, SAFE)
  if (item.youtube_url) {
    detailVideo.innerHTML = `
      <iframe
        class="w-full"
        src="${item.youtube_url}"
        title="YouTube video player"
        referrerpolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    `;
    detailVideo.classList.remove("hidden");
  } else {
    detailVideo.innerHTML = "";
    detailVideo.classList.add("hidden");
  }

  // Navigation
  container.classList.add("hidden");
  detailView.classList.remove("hidden");
}

/************************
 * BACK BUTTON
 ************************/
backButton.addEventListener("click", () => {
  detailVideo.innerHTML = ""; // stop video
  detailView.classList.add("hidden");
  container.classList.remove("hidden");
});

/************************
 * INIT
 ************************/
if (sessionStorage.getItem("authenticated") === "true") {
  passwordScreen.classList.add("hidden");
  showList();
  loadItems();
}
