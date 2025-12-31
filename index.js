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
    domain: "industrial",
    keyword: "fabrication",
  },
  {
    name: "Düz Dünyacılar",
    presenter: "Ercan İnce",
    presentation: "projects/504231334/sunum.pdf",
    domain: "historical",
    keyword: "misconduct",
  },
  {
    name: "Galileo ve Kilise",
    presenter: "Yusuf Kağan Hanoğlu",
    pdf: "projects/504231343/rapor.pdf",
    presentation: "projects/504231343/sunum.pdf",
    domain: "historical",
    keyword: "misconduct",
  },
  {
    name: "Uluslararası Yüksek Öğrenim Öğrencilerinde Akademik Mobbing",
    presenter: "Nazife Esra Çiğdem",
    pdf: "projects/504231339/rapor.pdf",
    presentation: "projects/504231339/sunum.pdf",
    domain: "academic",
    keyword: "misconduct",
  },
  {
    name: "Düz Dünyacılar",
    presenter: "Emre Saka",
    pdf: "projects/504231341/rapor.pdf",
    presentation: "projects/504231341/sunum.pdf",
    domain: "historical",
    keyword: "misconduct",
  },
  {
    name: "Makalelerde İntihalin Yapay Zeka Destekli Analizi",
    presenter: "Beyza SENEL",
    presentation: "projects/504241301/sunum.pdf",
    domain: "academic",
    keyword: "plagiarism",
  },
  {
    name: "C. L. Max Nikias Vakası",
    presenter: "Ömer Lütfü Karakelle",
    pdf: "projects/504241304/rapor.pdf",
    presentation: "projects/504241304/sunum.pdf",
    domain: "industrial",
    keyword: "misconduct",
  },
  {
    name: "Murat Uysal’ın Tezindeki İntihal Vakası ve Danışmanı Erişah Arıcan",
    presenter: "Bora Bozkurt",
    pdf: "projects/504241306/rapor.pdf",
    presentation: "projects/504241306/sunum.pdf",
    domain: "academic",
    keyword: "plagiarism",
  },
  {
    name: "NEWTON – LEIBNIZ KALKÜLÜS TARTIŞMASI",
    presenter: "EYLÜL COŞAR",
    pdf: "projects/504241307/rapor.pdf",
    presentation: "projects/504241307/sunum.pdf",
    domain: "historical",
    keyword: "scientific_dispute",
  },
  {
    name: "ABDÜLHAMİT SUBAŞI",
    presenter: "Cevdet Tosun",
    presentation: "projects/504241318/sunum.pdf",
    domain: "academic",
    keyword: "plagiarism",
  },
  {
    name: "Galileo ve Kilise",
    presenter: "CAN KORKMAZ",
    pdf: "projects/504241340/rapor.pdf",
    presentation: "projects/504241340/sunum.pdf",
    domain: "historical",
    keyword: "misconduct",
  },
  {
    name: "DIESELGATE",
    presenter: "Osman Mert Yılmaz",
    pdf: "projects/504241344/rapor.pdf",
    presentation: "projects/504241344/sunum.pdf",
    domain: "industrial",
    keyword: "falsification",
  },
  {
    name: "ÖMER DİNÇER VAKASI",
    presenter: "YUSUF ŞAMİL DİNGEÇ",
    pdf: "projects/504241345/rapor.pdf",
    presentation: "projects/504241345/sunum.pdf",
    domain: "industrial",
    keyword: "misconduct",
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

const domainFilter = document.getElementById("context-filter");
const keywordFilter = document.getElementById("ethic-filter");

const detailView = document.getElementById("detail");
const detailTitle = document.getElementById("detail-title");
const detailPresenter = document.getElementById("detail-presenter");
const detailPdf = document.getElementById("detail-pdf");
const detailPresentation = document.getElementById("detail-presentation");
const backButton = document.getElementById("back-button");

/************************
 * LABEL MAPS
 ************************/
const domainLabels = {
  academic: "Akademik",
  industrial: "Endüstriyel",
  historical: "Tarihsel",
};

const keywordLabels = {
  plagiarism: "İntihal",
  fabrication: "Veri Uydurma",
  falsification: "Veri Çarpıtma",
  misconduct: "Etik İhlali",
  scientific_dispute: "Bilimsel Öncelik / Tartışma",
};

/************************
 * PASSWORD LOGIC
 ************************/
passwordButton.addEventListener("click", () => {
  if (passwordInput.value === HARDCODED_PASSWORD) {
    sessionStorage.setItem("authenticated", "true");
    passwordScreen.classList.add("hidden");
    container.classList.remove("hidden");
    loadItems();
  } else {
    errorDiv.textContent = "Hatalı şifre";
  }
});

/************************
 * LIST + FILTER + TAGS
 ************************/
function loadItems() {
  const domainValue = domainFilter.value;
  const keywordValue = keywordFilter.value;

  itemsDiv.innerHTML = "";

  data
    .map((item, index) => ({ ...item, index }))
    .filter(
      (item) =>
        (domainValue === "all" || item.domain === domainValue) &&
        (keywordValue === "all" || item.keyword === keywordValue)
    )
    .forEach((item) => {
      const div = document.createElement("div");
      div.className = "item";
      div.style.cursor = "pointer";
      div.style.marginBottom = "10px";

      div.innerHTML = `
        <strong>${item.name}</strong><br/>
        <small>${item.presenter}</small><br/>
        <span style="font-size:12px; padding:2px 6px; border:1px solid #444; margin-right:5px;">
          ${domainLabels[item.domain]}
        </span>
        <span style="font-size:12px; padding:2px 6px; border:1px solid #444;">
          ${keywordLabels[item.keyword]}
        </span>
      `;

      div.addEventListener("click", () => showDetail(item.index));
      itemsDiv.appendChild(div);
    });
}

domainFilter.addEventListener("change", loadItems);
keywordFilter.addEventListener("change", loadItems);

/************************
 * DETAIL VIEW
 ************************/
function showDetail(index) {
  const item = data[index];

  detailTitle.textContent = item.name;
  detailPresenter.textContent = item.presenter;

  if (item.pdf) {
    detailPdf.href = item.pdf;
    detailPdf.parentElement.classList.remove("hidden");
  } else {
    detailPdf.parentElement.classList.add("hidden");
  }

  if (item.presentation) {
    detailPresentation.href = item.presentation;
    detailPresentation.parentElement.classList.remove("hidden");
  } else {
    detailPresentation.parentElement.classList.add("hidden");
  }

  container.classList.add("hidden");
  detailView.classList.remove("hidden");
}

/************************
 * BACK
 ************************/
backButton.addEventListener("click", () => {
  detailView.classList.add("hidden");
  container.classList.remove("hidden");
});

/************************
 * INIT
 ************************/
if (sessionStorage.getItem("authenticated") === "true") {
  passwordScreen.classList.add("hidden");
  container.classList.remove("hidden");
  loadItems();
}
