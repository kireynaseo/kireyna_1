/**
 * 광명리더스 공인중개사사무소 - Interactive Core Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // ================= 1. SAMPLE REAL ESTATE DATA (광명시 실매물 8선) =================
  const propertiesData = [
    {
      id: 1,
      title: "철산래미안자이 84㎡ (33평형) 로얄동 남향 햇살가득",
      category: "아파트",
      transType: "매매",
      priceDisplay: "10억 8,000만원",
      priceNum: 108000,
      district: "철산동",
      location: "경기도 광명시 철산동 (7호선 철산역 도보 5분)",
      area: "공급 112㎡ / 전용 84㎡",
      specs: "방 3개 · 욕실 2개 · 18/25층 · 남향",
      tags: ["급매", "역세권", "올확장", "로얄층"],
      image: "assets/images/apt_cheolsan.jpg",
      fallbackImg: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      description: "철산역 초역세권 대단지 프리미엄 아파트입니다. 주인 직접 거주로 상태 최상이며 올확장 및 중문 시공 완료되어 탄탄한 구조를 자랑합니다.",
      maintenanceFee: "약 22만원",
      parking: "세대당 1.4대 (지하주차장 직통)",
      moveInDate: "즉시입주 가능 (협의 가능)"
    },
    {
      id: 2,
      title: "유플래닛 광명데시앙 102㎡ (40평형) 초고층 안양천 파노라마뷰",
      category: "아파트",
      transType: "전세",
      priceDisplay: "7억 5,000만원",
      priceNum: 75000,
      district: "일직동",
      location: "경기도 광명시 일직동 (KTX 광명역 도보 3분)",
      area: "공급 132㎡ / 전용 102㎡",
      specs: "방 4개 · 욕실 2개 · 32/49층 · 남동향",
      tags: ["KTX역세권", "신축급", "뷰맛집", "대형평형"],
      image: "assets/images/hero_bg.jpg",
      fallbackImg: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      description: "KTX 광명역, 코스트코, 이케아, 중앙대병원을 도보로 이용할 수 있는 일직동 최고 입지! 탁 트인 막힘없는 안양천 조망권을 선사합니다.",
      maintenanceFee: "약 28만원",
      parking: "세대당 1.6대",
      moveInDate: "2026년 11월 중순 협의"
    },
    {
      id: 3,
      title: "광명뉴타운 11구역 조합원 입주권 (전용 84㎡ 확정배정)",
      category: "재개발/입주권",
      transType: "매매",
      priceDisplay: "매매 6억 2,000만원 (프리미엄 2억 8천 포함)",
      priceNum: 62000,
      district: "광명동",
      location: "경기도 광명시 광명동 (7호선 광명사거리역 인근)",
      area: "전용 84A 타입 배정완료",
      specs: "대단지 4,200세대 랜드마크 예정 · 조합원 혜택 최상",
      tags: ["재개발", "조합원입주권", "초역세권", "미래가치"],
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
      fallbackImg: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
      description: "광명뉴타운 대장주 11구역 입주권 매물입니다. 이주 완료 단계로 시공사 대우건설/현대건설 컨소시엄 프리미엄 브랜드 단지로 재탄생합니다.",
      maintenanceFee: "해당 없음",
      parking: "신축 지하 100% 주차",
      moveInDate: "준공 후 입주"
    },
    {
      id: 4,
      title: "하안주공 12단지 59㎡ (24평형) 올수리 갭투자 추천",
      category: "아파트",
      transType: "매매",
      priceDisplay: "5억 3,000만원 (전세 3억 안고 매수)",
      priceNum: 53000,
      district: "하안동",
      location: "경기도 광명시 하안동 (하안사거리 상권 인근)",
      area: "공급 79㎡ / 전용 59㎡",
      specs: "방 2개 · 욕실 1개 · 8/15층 · 남향",
      tags: ["급매", "재건축유망", "올수리", "소액투자"],
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      fallbackImg: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      description: "재건축 정밀안단통과 추진 단지! 최근 샷시 포함 전체 올수리되어 깔끔한 임차인이 거주 중인 소액 갭투자 최적 매물입니다.",
      maintenanceFee: "약 14만원",
      parking: "단지 내 지상/지하 주차",
      moveInDate: "임대차 승계 (투자용)"
    },
    {
      id: 5,
      title: "소하동 신촌휴먼시아 84㎡ (33평형) 쾌적한 구름산 숲세권",
      category: "아파트",
      transType: "월세",
      priceDisplay: "보증금 1억원 / 월세 140만원",
      priceNum: 10000,
      district: "소하동",
      location: "경기도 광명시 소하동 (소하초·중·고 도보 3분)",
      area: "공급 110㎡ / 전용 84㎡",
      specs: "방 3개 · 욕실 2개 · 12/18층 · 남동향",
      tags: ["숲세권", "초품아", "시스템에어컨", "쾌적"],
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      fallbackImg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      description: "구름산 자락 산책로와 연결되어 공기 쾌적하고 조용한 단지! 시스템에어컨 4대 풀옵션 설치되어 아이 키우기 최고인 아파트입니다.",
      maintenanceFee: "약 20만원",
      parking: "세대당 1.3대",
      moveInDate: "즉시입주 가능"
    },
    {
      id: 6,
      title: "광명역 자이타워 코너변 1층 15평 전면 로드 상가",
      category: "상가/사무실",
      transType: "월세",
      priceDisplay: "보증금 5,000만원 / 월세 280만원",
      priceNum: 5000,
      district: "일직동",
      location: "경기도 광명시 일직동 (지식산업센터 1층 스트리트몰)",
      area: "전용면적 49.5㎡ (15평)",
      specs: "1층 전면 노출성 우수 · 층고 4.5m 높은 쾌적함",
      tags: ["역세권상가", "추천업종카페", "유동인구풍부", "무권리"],
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      fallbackImg: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      description: "상주인구 5,000여 명의 자이타워 1층 메인 동선 코너 상가입니다. 카페, 베이커리, 프랜차이즈, 사무실 등 강력 추천합니다.",
      maintenanceFee: "실비 정산",
      parking: "고객 무제한 주차 가능",
      moveInDate: "즉시 입주 및 인테리어 가능"
    },
    {
      id: 7,
      title: "철산 센트럴푸르지오 59㎡ (25평형) 초역세권 신축급 전세",
      category: "아파트",
      transType: "전세",
      priceDisplay: "5억 8,000만원",
      priceNum: 58000,
      district: "철산동",
      location: "경기도 광명시 철산동 (7호선 철산역 2번출구 2분)",
      area: "공급 81㎡ / 전용 59㎡",
      specs: "방 3개 · 욕실 2개 · 20/29층 · 남서향",
      tags: ["신축", "초역세권", "풀옵션", "안심전세"],
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      fallbackImg: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      description: "철산역 도보 2분 최신축 단지! 융자 없는 안전한 1순위 안심 전세 매물이며 전세자금대출 적극 협조해 드립니다.",
      maintenanceFee: "약 16만원",
      parking: "세대당 1.35대",
      moveInDate: "2026년 12월 이내 지정입주"
    },
    {
      id: 8,
      title: "광명역 클래시아 오피스텔 전용 24㎡ (7.5평) 복층형",
      category: "오피스텔",
      transType: "월세",
      priceDisplay: "보증금 1,000만원 / 월세 65만원",
      priceNum: 1000,
      district: "일직동",
      location: "경기도 광명시 일직동 (광명역 도보 4분)",
      area: "전용 24㎡ + 서비스 복층 8㎡",
      specs: "풀옵션 (세탁기, 냉장고, 에어컨, 인덕션, 수납장)",
      tags: ["풀옵션", "복층구조", "주차편리", "직주근접"],
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      fallbackImg: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      description: "복층 구조로 공간 활용도 극대화! 1인 가구 및 광명역 직장인 강추 매물입니다. 지하주차장 넓고 보안 철저합니다.",
      maintenanceFee: "약 8만원",
      parking: "1대 지정주차",
      moveInDate: "즉시입주 가능"
    }
  ];

  // Global State
  let currentFilters = {
    transType: 'all',
    district: 'all',
    propType: 'all',
    price: 'all',
    keyword: '',
    categoryBtn: 'all'
  };

  let favoriteIds = JSON.parse(localStorage.getItem('gwangmyeong_favs') || '[]');

  // ================= 2. DOM ELEMENTS =================
  const propertyGrid = document.getElementById('property-grid');
  const noPropMsg = document.getElementById('no-properties-msg');
  
  // Counter elements
  const countAll = document.getElementById('count-all');
  const countApt = document.getElementById('count-apt');
  const countRedev = document.getElementById('count-redev');
  const countComm = document.getElementById('count-comm');
  const countOfficetel = document.getElementById('count-officetel');

  // Filter elements
  const transTabs = document.querySelectorAll('#transaction-tabs .tab-btn');
  const selectDistrict = document.getElementById('filter-district');
  const selectPropType = document.getElementById('filter-property-type');
  const selectPrice = document.getElementById('filter-price');
  const inputKeyword = document.getElementById('filter-keyword');
  const btnSearchSubmit = document.getElementById('search-submit-btn');
  const quickTagBtns = document.querySelectorAll('.quick-tag-btn');
  const categoryBtns = document.querySelectorAll('.prop-filter-btn');
  const resetSearchBtn = document.getElementById('reset-search-btn');

  // Modal elements
  const modalOverlay = document.getElementById('property-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBody = document.getElementById('modal-body-content');

  // Mobile drawer elements
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Calculators elements
  const calcPropType = document.getElementById('calc-prop-type');
  const calcPrice = document.getElementById('calc-price');
  const calcRent = document.getElementById('calc-rent');
  const groupCalcRent = document.getElementById('group-calc-rent');
  const labelCalcPrice = document.getElementById('label-calc-price');
  const btnCalcFee = document.getElementById('btn-calculate-fee');
  const calcResultBox = document.getElementById('calc-result-box');
  const resRate = document.getElementById('res-rate');
  const resMaxFee = document.getElementById('res-max-fee');

  const loanHouseStatus = document.getElementById('loan-house-status');
  const loanHousePrice = document.getElementById('loan-house-price');
  const btnCalcLoan = document.getElementById('btn-calculate-loan');
  const loanResultBox = document.getElementById('loan-result-box');
  const resLoanLtv = document.getElementById('res-loan-ltv');
  const resLoanAmount = document.getElementById('res-loan-amount');

  // Toast notification elements
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');

  // Bookmark page btn
  const bookmarkBtn = document.getElementById('bookmark-page-btn');

  // KakaoTalk AI Chatbot DOM elements
  const kakaoToggleBtn = document.getElementById('kakao-ai-toggle-btn');
  const kakaoChatWindow = document.getElementById('kakao-ai-chat-window');
  const kakaoMinimizeBtn = document.getElementById('kakao-chat-minimize');
  const kakaoCloseBtn = document.getElementById('kakao-chat-close');
  const kakaoChatMessages = document.getElementById('kakao-chat-messages');
  const kakaoChatForm = document.getElementById('kakao-chat-form');
  const kakaoChatInput = document.getElementById('kakao-chat-input');
  const aiTypingIndicator = document.getElementById('ai-typing-indicator');
  const initMsgTime = document.getElementById('init-msg-time');

  // ================= 3. RENDER PROPERTY CARDS =================
  function renderProperties() {
    // Filter array based on state
    const filtered = propertiesData.filter(item => {
      // 1. Trans Type (매매, 전세, 월세)
      if (currentFilters.transType !== 'all' && item.transType !== currentFilters.transType) {
        return false;
      }
      // 2. Category Tab
      if (currentFilters.categoryBtn !== 'all' && item.category !== currentFilters.categoryBtn) {
        return false;
      }
      // 3. District
      if (currentFilters.district !== 'all' && !item.district.includes(currentFilters.district)) {
        return false;
      }
      // 4. Property Type Select
      if (currentFilters.propType !== 'all' && item.category !== currentFilters.propType) {
        return false;
      }
      // 5. Price Range
      if (currentFilters.price !== 'all') {
        const val = item.priceNum;
        if (currentFilters.price === 'under5' && val > 50000) return false;
        if (currentFilters.price === '5to10' && (val < 50000 || val > 100000)) return false;
        if (currentFilters.price === '10to15' && (val < 100000 || val > 150000)) return false;
        if (currentFilters.price === 'over15' && val < 150000) return false;
      }
      // 6. Keyword
      if (currentFilters.keyword.trim() !== '') {
        const kw = currentFilters.keyword.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(kw);
        const matchLoc = item.location.toLowerCase().includes(kw);
        const matchTag = item.tags.some(t => t.toLowerCase().includes(kw));
        if (!matchTitle && !matchLoc && !matchTag) return false;
      }
      return true;
    });

    // Update Category Counts
    updateCounts();

    // Clear grid
    propertyGrid.innerHTML = '';

    if (filtered.length === 0) {
      noPropMsg.classList.remove('hidden');
    } else {
      noPropMsg.classList.add('hidden');
      filtered.forEach(item => {
        const isFav = favoriteIds.includes(item.id);
        const cardEl = document.createElement('div');
        cardEl.className = 'property-card';
        cardEl.innerHTML = `
          <div class="card-img-wrapper">
            <img src="${item.image}" alt="${item.title}" class="card-img" onerror="this.src='${item.fallbackImg}'">
            <div class="card-badges">
              <span class="badge badge-trans">${item.transType}</span>
              ${item.tags.includes('급매') ? '<span class="badge badge-urgent">급매물</span>' : ''}
              <span class="badge badge-tag">${item.category}</span>
            </div>
            <button class="favorite-btn ${isFav ? 'active' : ''}" data-id="${item.id}" title="관심매물 저장">
              <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>
            </button>
          </div>
          <div class="card-body">
            <div class="card-price-row">
              <span class="price-type">${item.transType}</span>
              <span class="price-value">${item.priceDisplay}</span>
            </div>
            <h3 class="card-title">${item.title}</h3>
            <div class="card-specs">
              <span class="spec-item"><i class="fa-solid fa-ruler-combined"></i> ${item.area}</span>
            </div>
            <div class="card-specs">
              <span class="spec-item"><i class="fa-solid fa-bed"></i> ${item.specs}</span>
            </div>
            <div class="card-location">
              <i class="fa-solid fa-location-dot"></i> ${item.location}
            </div>
            <div class="card-footer-btns">
              <button class="btn-card-detail" data-id="${item.id}">상세보기 <i class="fa-solid fa-arrow-right"></i></button>
              <a href="tel:01048208888" class="btn-card-call" title="즉시 문의"><i class="fa-solid fa-phone"></i></a>
            </div>
          </div>
        `;
        propertyGrid.appendChild(cardEl);
      });
    }
  }

  function updateCounts() {
    countAll.textContent = propertiesData.length;
    countApt.textContent = propertiesData.filter(i => i.category === '아파트').length;
    countRedev.textContent = propertiesData.filter(i => i.category === '재개발/입주권').length;
    countComm.textContent = propertiesData.filter(i => i.category === '상가/사무실').length;
    countOfficetel.textContent = propertiesData.filter(i => i.category === '오피스텔').length;
  }

  // ================= 4. FILTER CONTROLLER EVENTS =================
  // Transaction type tabs
  transTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      transTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilters.transType = tab.dataset.type;
      renderProperties();
    });
  });

  // Category filter buttons
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilters.categoryBtn = btn.dataset.category;
      renderProperties();
    });
  });

  // Submit Search
  btnSearchSubmit.addEventListener('click', () => {
    currentFilters.district = selectDistrict.value;
    currentFilters.propType = selectPropType.value;
    currentFilters.price = selectPrice.value;
    currentFilters.keyword = inputKeyword.value;
    renderProperties();
  });

  // Enter Key on search keyword
  inputKeyword.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      btnSearchSubmit.click();
    }
  });

  // Quick Tags
  quickTagBtns.forEach(tagBtn => {
    tagBtn.addEventListener('click', () => {
      const tagText = tagBtn.dataset.tag;
      inputKeyword.value = tagText;
      currentFilters.keyword = tagText;
      renderProperties();
    });
  });

  // Reset Search
  if (resetSearchBtn) {
    resetSearchBtn.addEventListener('click', () => {
      currentFilters = {
        transType: 'all',
        district: 'all',
        propType: 'all',
        price: 'all',
        keyword: '',
        categoryBtn: 'all'
      };
      selectDistrict.value = 'all';
      selectPropType.value = 'all';
      selectPrice.value = 'all';
      inputKeyword.value = '';
      transTabs.forEach(t => t.classList.remove('active'));
      transTabs[0].classList.add('active');
      categoryBtns.forEach(b => b.classList.remove('active'));
      categoryBtns[0].classList.add('active');
      renderProperties();
    });
  }

  // Favorites click delegate
  document.addEventListener('click', (e) => {
    const favBtn = e.target.closest('.favorite-btn');
    if (favBtn) {
      const id = parseInt(favBtn.dataset.id);
      if (favoriteIds.includes(id)) {
        favoriteIds = favoriteIds.filter(fId => fId !== id);
        showToast("관심 매물 목록에서 삭제되었습니다.");
      } else {
        favoriteIds.push(id);
        showToast("관심 매물로 등록되었습니다! (♥)");
      }
      localStorage.setItem('gwangmyeong_favs', JSON.stringify(favoriteIds));
      renderProperties();
    }
  });

  // ================= 5. MODAL DIALOG CONTROLLER =================
  document.addEventListener('click', (e) => {
    const detailBtn = e.target.closest('.btn-card-detail');
    if (detailBtn) {
      const id = parseInt(detailBtn.dataset.id);
      openModal(id);
    }
  });

  function openModal(propId) {
    const item = propertiesData.find(p => p.id === propId);
    if (!item) return;

    modalBody.innerHTML = `
      <div class="modal-header-section">
        <div class="card-badges" style="position:relative; top:0; left:0; margin-bottom:10px;">
          <span class="badge badge-trans">${item.transType}</span>
          <span class="badge badge-tag">${item.category}</span>
          <span class="badge" style="background:#0F2C59; color:white;"><i class="fa-solid fa-location-dot"></i> ${item.district}</span>
        </div>
        <div class="modal-price-tag">${item.transType} ${item.priceDisplay}</div>
        <h2 class="modal-title-text">${item.title}</h2>
        <p style="color:var(--text-muted); font-size:0.95rem;"><i class="fa-solid fa-map-pin"></i> ${item.location}</p>
      </div>

      <div class="modal-gallery-main">
        <img src="${item.image}" alt="${item.title}" onerror="this.src='${item.fallbackImg}'">
      </div>

      <h3 style="font-size:1.2rem; font-weight:800; margin-bottom:12px; color:var(--primary-navy);"><i class="fa-solid fa-list-check"></i> 상세매물 정보</h3>
      <table class="modal-detail-table">
        <tbody>
          <tr>
            <th>거래종류</th>
            <td>${item.transType}</td>
            <th>매물유형</th>
            <td>${item.category}</td>
          </tr>
          <tr>
            <th>공급/전용면적</th>
            <td>${item.area}</td>
            <th>구조 / 방향</th>
            <td>${item.specs}</td>
          </tr>
          <tr>
            <th>관리비</th>
            <td>${item.maintenanceFee}</td>
            <th>주차 대수</th>
            <td>${item.parking}</td>
          </tr>
          <tr>
            <th>입주가능일</th>
            <td colspan="3">${item.moveInDate}</td>
          </tr>
        </tbody>
      </table>

      <div class="agent-comment-box">
        <h4><i class="fa-solid fa-user-tie"></i> 대표 공인중개사 추천 의견</h4>
        <p style="font-size:0.98rem; color:var(--text-main); line-height:1.6;">"${item.description}"</p>
      </div>

      <div style="display:flex; gap:12px; margin-top:20px;">
        <a href="tel:01048208888" class="btn btn-primary" style="flex:1; text-align:center;">
          <i class="fa-solid fa-phone"></i> 즉시 전화 문의 (010-4820-8888)
        </a>
        <button class="btn btn-gold" id="btn-modal-inquire" style="flex:1;">
          <i class="fa-solid fa-envelope"></i> 이 매물 상담 신청하기
        </button>
      </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Inquire button inside modal
    const btnInquire = document.getElementById('btn-modal-inquire');
    if (btnInquire) {
      btnInquire.addEventListener('click', () => {
        closeModal();
        const contactSec = document.getElementById('contact-section');
        if (contactSec) {
          contactSec.scrollIntoView({ behavior: 'smooth' });
        }
        // Switch to buy tab
        switchInquiryTab('tab-buy');
        const buyMsgInput = document.getElementById('buy-message');
        if (buyMsgInput) {
          buyMsgInput.value = `[추천 매물 상담 신청] ${item.title} (${item.transType} ${item.priceDisplay})에 대해 상세 상담을 희망합니다.`;
        }
        const buyDistrict = document.getElementById('buy-district');
        if (buyDistrict && item.district) {
          for (let option of buyDistrict.options) {
            if (option.value.includes(item.district)) {
              buyDistrict.value = option.value;
              break;
            }
          }
        }
        const buyPropType = document.getElementById('buy-property-type');
        if (buyPropType && item.category) {
          for (let option of buyPropType.options) {
            if (option.value.includes(item.category) || item.category.includes(option.value)) {
              buyPropType.value = option.value;
              break;
            }
          }
        }
        const buyNameInput = document.getElementById('buy-name');
        if (buyNameInput) buyNameInput.focus();
      });
    }
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // ================= 6. MOBILE DRAWER NAVIGATION =================
  if (mobileToggleBtn && mobileDrawer) {
    mobileToggleBtn.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
    });
  }
  if (mobileCloseBtn && mobileDrawer) {
    mobileCloseBtn.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
    });
  }
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
    });
  });

  // ================= 7. REAL ESTATE FEE & LOAN CALCULATOR =================
  // Toggle rent input visibility
  const radiosTransType = document.querySelectorAll('input[name="calc-trans-type"]');
  radiosTransType.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'rent') {
        groupCalcRent.classList.remove('hidden');
        labelCalcPrice.textContent = '보증금 (만원)';
      } else {
        groupCalcRent.classList.add('hidden');
        labelCalcPrice.textContent = '거래 금액 (만원)';
      }
    });
  });

  // Calculate Fee
  btnCalcFee.addEventListener('click', () => {
    const pType = calcPropType.value;
    const transType = document.querySelector('input[name="calc-trans-type"]:checked').value;
    const priceVal = parseFloat(calcPrice.value) || 0;
    const rentVal = parseFloat(calcRent.value) || 0;

    if (priceVal <= 0) {
      showToast("거래 금액을 정확히 입력해주세요.");
      return;
    }

    let calculatedFee = 0;
    let rateText = "0.4%";

    if (pType === 'housing') {
      if (transType === 'trade') {
        if (priceVal < 5000) { rateText = "0.6%"; calculatedFee = Math.min(priceVal * 10000 * 0.006, 250000); }
        else if (priceVal < 20000) { rateText = "0.5%"; calculatedFee = Math.min(priceVal * 10000 * 0.005, 800000); }
        else if (priceVal < 90000) { rateText = "0.4%"; calculatedFee = priceVal * 10000 * 0.004; }
        else if (priceVal < 120000) { rateText = "0.5%"; calculatedFee = priceVal * 10000 * 0.005; }
        else if (priceVal < 150000) { rateText = "0.6%"; calculatedFee = priceVal * 10000 * 0.006; }
        else { rateText = "0.7%"; calculatedFee = priceVal * 10000 * 0.007; }
      } else if (transType === 'jeonse') {
        if (priceVal < 5000) { rateText = "0.5%"; calculatedFee = Math.min(priceVal * 10000 * 0.005, 200000); }
        else if (priceVal < 10000) { rateText = "0.4%"; calculatedFee = Math.min(priceVal * 10000 * 0.004, 300000); }
        else if (priceVal < 60000) { rateText = "0.3%"; calculatedFee = priceVal * 10000 * 0.003; }
        else if (priceVal < 120000) { rateText = "0.4%"; calculatedFee = priceVal * 10000 * 0.004; }
        else { rateText = "0.5%"; calculatedFee = priceVal * 10000 * 0.005; }
      } else { // rent
        let totalVal = priceVal + (rentVal * 100);
        if (totalVal < 5000) { totalVal = priceVal + (rentVal * 70); }
        rateText = "0.4%";
        calculatedFee = totalVal * 10000 * 0.004;
      }
    } else { // commercial
      rateText = "0.9% 이하 협의";
      if (transType === 'rent') {
        let totalVal = priceVal + (rentVal * 100);
        calculatedFee = totalVal * 10000 * 0.009;
      } else {
        calculatedFee = priceVal * 10000 * 0.009;
      }
    }

    resRate.textContent = rateText;
    resMaxFee.textContent = Math.round(calculatedFee).toLocaleString('ko-KR') + " 원";
    calcResultBox.classList.remove('hidden');
  });

  // Calculate Loan LTV
  btnCalcLoan.addEventListener('click', () => {
    const ltvRatio = parseFloat(loanHouseStatus.value);
    const housePrice = parseFloat(loanHousePrice.value) || 0;

    if (housePrice <= 0) {
      showToast("아파트 시세 또는 매매가를 입력해주세요.");
      return;
    }

    const estAmount = housePrice * ltvRatio;
    resLoanLtv.textContent = (ltvRatio * 100) + "%";
    resLoanAmount.textContent = Math.round(estAmount).toLocaleString('ko-KR') + " 만원 (약 " + (estAmount / 10000).toFixed(2) + "억원)";
    loanResultBox.classList.remove('hidden');
  });

  // ================= 8. INQUIRY SECTION & MULTI-TAB LOGIC =================
  // 1. Tab Switching
  const inquiryTabs = document.querySelectorAll('.inquiry-tab');
  const inquiryPanels = document.querySelectorAll('.inquiry-form-panel');

  window.switchInquiryTab = function(tabId) {
    inquiryTabs.forEach(tab => {
      if (tab.dataset.tab === tabId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    inquiryPanels.forEach(panel => {
      if (panel.id === `form-inquiry-${tabId.replace('tab-', '')}`) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });
  };

  inquiryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchInquiryTab(tab.dataset.tab);
    });
  });

  // 2. Choice Chips
  setupSingleChoiceChips('#buy-trans-chips', '#buy-trans-type-val');
  setupSingleChoiceChips('#sell-type-chips', '#sell-type-val');
  setupSingleChoiceChips('#visit-topic-chips', '#visit-topic-val', 'topic');
  setupSingleChoiceChips('#time-slot-chips', '#visit-time-val', 'time');

  function setupSingleChoiceChips(containerSelector, hiddenInputSelector, dataKey = 'value') {
    const container = document.querySelector(containerSelector);
    const hiddenInput = document.querySelector(hiddenInputSelector);
    if (!container || !hiddenInput) return;

    const chips = container.querySelectorAll('button');
    chips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        hiddenInput.value = chip.dataset[dataKey] || chip.textContent.trim();
      });
    });
  }

  // 3. Preference Chips (선호 조건 토글)
  const prefChips = document.querySelectorAll('#buy-pref-tags .pref-chip');
  prefChips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
    });
  });

  // 4. Phone Number Auto-Formatting (010-XXXX-XXXX)
  const phoneInputs = document.querySelectorAll('.phone-input');
  phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      let val = e.target.value.replace(/[^0-9]/g, '');
      if (val.length > 11) val = val.slice(0, 11);
      
      let formatted = val;
      if (val.length > 7) {
        formatted = `${val.slice(0, 3)}-${val.slice(3, 7)}-${val.slice(7)}`;
      } else if (val.length > 3) {
        formatted = `${val.slice(0, 3)}-${val.slice(3)}`;
      }
      e.target.value = formatted;
    });
  });

  // 5. Visit Date minimum = today
  const visitDateInput = document.getElementById('visit-date');
  if (visitDateInput) {
    const todayStr = new Date().toISOString().split('T')[0];
    visitDateInput.min = todayStr;
    visitDateInput.value = todayStr;
  }

  // 6. Live Activity Ticker Animation Loop
  const tickerContainer = document.getElementById('live-ticker-content');
  if (tickerContainer) {
    const tickerItems = [
      { area: "[철산동]", client: "김*수 고객님 (010-****-4820)", desc: "아파트 매수 및 급매 상담 접수 완료", time: "방금 전" },
      { area: "[일직동]", client: "최*진 고객님 (010-****-1983)", desc: "광명역 KTX 역세권 전세 상담 신청", time: "3분 전" },
      { area: "[광명동]", client: "박*호 고객님 (010-****-6214)", desc: "11구역 조합원 입주권 방문 예약", time: "8분 전" },
      { area: "[하안동]", client: "정*선 고객님 (010-****-3351)", desc: "하안주공 12단지 매도 의뢰 등록", time: "15분 전" },
      { area: "[소하동]", client: "이*영 고객님 (010-****-8829)", desc: "신촌휴먼시아 월세 매물 문의", time: "22분 전" },
      { area: "[철산동]", client: "한*우 고객님 (010-****-7512)", desc: "푸르지오 신축 전세 자금대출 상담", time: "31분 전" }
    ];
    let tickerIndex = 0;
    setInterval(() => {
      tickerIndex = (tickerIndex + 1) % tickerItems.length;
      const item = tickerItems[tickerIndex];
      tickerContainer.innerHTML = `
        <span class="ticker-text"><strong class="ticker-area">${item.area}</strong> ${item.client} — ${item.desc} <span class="ticker-time">${item.time}</span></span>
      `;
    }, 4000);
  }

  // 7. Modals: Success Receipt Modal
  const successModal = document.getElementById('inquiry-success-modal');
  const successModalCloseBtn = document.getElementById('inquiry-modal-close-btn');
  const btnReceiptConfirm = document.getElementById('btn-receipt-confirm');
  const btnReceiptKakaoChat = document.getElementById('btn-receipt-kakao-chat');

  function openReceiptModal(receiptData) {
    document.getElementById('receipt-id').textContent = receiptData.id;
    document.getElementById('receipt-type').textContent = receiptData.type;
    document.getElementById('receipt-name').textContent = `${receiptData.name} 고객님`;
    
    // Mask phone number: 010-1234-5678 -> 010-****-5678
    const phone = receiptData.phone;
    let maskedPhone = phone;
    const parts = phone.split('-');
    if (parts.length === 3) {
      maskedPhone = `${parts[0]}-****-${parts[2]}`;
    }
    document.getElementById('receipt-phone').textContent = maskedPhone;
    document.getElementById('receipt-time').textContent = receiptData.time;

    const emailStatusEl = document.getElementById('receipt-email-status');
    if (emailStatusEl) {
      if (receiptData.emailSent) {
        emailStatusEl.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #059669;"></i> Resend 알림 발송 완료 (${receiptData.resendId ? receiptData.resendId.slice(0, 8) + '...' : '전송됨'})`;
        emailStatusEl.style.color = '#059669';
      } else if (receiptData.emailPending) {
        emailStatusEl.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="color: #2563EB;"></i> Resend 이메일 발송 중...`;
        emailStatusEl.style.color = '#2563EB';
      } else {
        emailStatusEl.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #059669;"></i> 시스템 접수 완료`;
        emailStatusEl.style.color = '#059669';
      }
    }

    successModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeReceiptModal() {
    successModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (successModalCloseBtn) successModalCloseBtn.addEventListener('click', closeReceiptModal);
  if (btnReceiptConfirm) btnReceiptConfirm.addEventListener('click', closeReceiptModal);
  if (btnReceiptKakaoChat) {
    btnReceiptKakaoChat.addEventListener('click', () => {
      closeReceiptModal();
      if (kakaoChatWindow) {
        kakaoChatWindow.classList.remove('hidden');
        kakaoChatInput.focus();
      }
    });
  }

  // 8. Form Submission Handlers for all 4 forms (Resend API Connected)
  const inquiryForms = [
    document.getElementById('form-inquiry-buy'),
    document.getElementById('form-inquiry-sell'),
    document.getElementById('form-inquiry-visit'),
    document.getElementById('form-inquiry-quick')
  ];

  inquiryForms.forEach(form => {
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formType = form.dataset.type || '1:1 맞춤 상담';
      let clientName = '';
      let clientPhone = '';
      let summaryText = '';
      const details = {};

      if (form.id === 'form-inquiry-buy') {
        clientName = document.getElementById('buy-name').value.trim();
        clientPhone = document.getElementById('buy-phone').value.trim();
        const transType = document.getElementById('buy-trans-type-val').value;
        const propType = document.getElementById('buy-property-type').value;
        const district = document.getElementById('buy-district').value;
        const budget = document.getElementById('buy-budget').value;
        const movein = document.getElementById('buy-movein').value;
        const memo = document.getElementById('buy-message').value.trim();
        const activeTags = Array.from(form.querySelectorAll('#buy-pref-tags .pref-chip.active')).map(el => el.textContent.trim());

        details['상담 구분'] = transType;
        details['부동산 유형'] = propType;
        details['희망 지역'] = district;
        details['희망 예산'] = budget;
        details['입주 시기'] = movein;
        if (activeTags.length) details['선호 조건'] = activeTags.join(', ');
        if (memo) details['상세 문의 내용'] = memo;

        summaryText = `[${transType}/${propType}] ${district} (예산: ${budget})`;
      } else if (form.id === 'form-inquiry-sell') {
        clientName = document.getElementById('sell-name').value.trim();
        clientPhone = document.getElementById('sell-phone').value.trim();
        const sellType = document.getElementById('sell-type-val').value;
        const propType = document.getElementById('sell-property-type').value;
        const location = document.getElementById('sell-location').value.trim();
        const area = document.getElementById('sell-area').value.trim();
        const price = document.getElementById('sell-price').value.trim();
        const status = document.getElementById('sell-status').value;
        const confidential = document.getElementById('sell-confidential').checked ? '비공개 중개 요청' : '일반 공개';
        const memo = document.getElementById('sell-message').value.trim();

        details['의뢰 구분'] = sellType;
        details['부동산 유형'] = propType;
        details['매물 위치'] = location;
        if (area) details['평형/면적'] = area;
        details['희망 가격'] = price;
        details['입주 상태'] = status;
        details['보안 옵션'] = confidential;
        if (memo) details['수리/매물 특징'] = memo;

        summaryText = `[${sellType}] ${location} (희망가: ${price})`;
      } else if (form.id === 'form-inquiry-visit') {
        clientName = document.getElementById('visit-name').value.trim();
        clientPhone = document.getElementById('visit-phone').value.trim();
        const date = document.getElementById('visit-date').value;
        const time = document.getElementById('visit-time-val').value;
        const topic = document.getElementById('visit-topic-val').value;
        const people = document.getElementById('visit-people').value;
        const vehicle = document.getElementById('visit-vehicle').value;
        const memo = document.getElementById('visit-memo').value.trim();

        details['상담 희망 주제'] = topic;
        details['방문 희망 날짜'] = date;
        details['방문 희망 시간'] = time;
        details['방문 인원'] = people;
        details['주차 지원 여부'] = vehicle;
        if (memo) details['사전 준비 요청'] = memo;

        summaryText = `[방문예약] ${date} ${time} (${topic})`;
      } else if (form.id === 'form-inquiry-quick') {
        clientName = document.getElementById('quick-name').value.trim();
        clientPhone = document.getElementById('quick-phone').value.trim();
        const category = document.getElementById('quick-category').value;
        const callTime = document.getElementById('quick-call-time').value;
        const memo = document.getElementById('quick-simple-note').value.trim();

        details['관심 상담 분야'] = category;
        details['통화 희망 시간대'] = callTime;
        if (memo) details['간단 문의'] = memo;

        summaryText = `[스피드요청] ${category} (희망시간: ${callTime})`;
      }

      // Generate Receipt
      const now = new Date();
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, '0');
      const d = String(now.getDate()).padStart(2, '0');
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const receiptId = `GL-${y}${m}${d}-${randomNum}`;
      const timeStr = `${y}.${m}.${d} ${hh}:${mm}`;

      const receiptRecord = {
        id: receiptId,
        type: formType,
        name: clientName,
        phone: clientPhone,
        summary: summaryText,
        time: timeStr,
        emailPending: true,
        emailSent: false
      };

      // Button Loading UI
      const submitBtn = form.querySelector('button[type="submit"]');
      const origBtnHtml = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> 접수 및 메일 전송 중...`;
      }

      // Send to Resend API via Relay
      const emailPayload = {
        id: receiptId,
        type: formType,
        name: clientName,
        phone: clientPhone,
        summary: summaryText,
        time: timeStr,
        details: details
      };

      fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailPayload)
      })
      .then(res => res.json())
      .then(result => {
        console.log('[Resend API Result]:', result);
        if (result && result.success) {
          receiptRecord.emailSent = true;
          receiptRecord.emailPending = false;
          receiptRecord.resendId = result.id;
          const emailStatusEl = document.getElementById('receipt-email-status');
          if (emailStatusEl) {
            emailStatusEl.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #059669;"></i> Resend 알림 발송 완료 (${result.id ? result.id.slice(0, 8) + '...' : '전달됨'})`;
            emailStatusEl.style.color = '#059669';
          }
        } else {
          receiptRecord.emailPending = false;
          console.warn('Resend response was not successful:', result);
        }
      })
      .catch(err => {
        console.warn('Email dispatch relay notice:', err);
        receiptRecord.emailPending = false;
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origBtnHtml;
        }
      });

      // Save to localStorage
      const existingInquiries = JSON.parse(localStorage.getItem('gwangmyeong_inquiries') || '[]');
      existingInquiries.unshift(receiptRecord);
      localStorage.setItem('gwangmyeong_inquiries', JSON.stringify(existingInquiries.slice(0, 10)));

      // Open Modal
      openReceiptModal(receiptRecord);
      showToast(`[접수 완료] ${clientName} 고객님, 10분 내로 전문 중개사가 연락드립니다!`);
      form.reset();

      // Reset chips default
      const defaultChips = form.querySelectorAll('.choice-chip');
      if (defaultChips.length > 0) {
        defaultChips.forEach((c, idx) => {
          if (idx === 0) c.classList.add('active');
          else c.classList.remove('active');
        });
      }
    });
  });

  // 9. Privacy Policy Modal
  const privacyModal = document.getElementById('privacy-policy-modal');
  const privacyModalCloseBtn = document.getElementById('privacy-modal-close-btn');
  const btnPrivacyAgreeConfirm = document.getElementById('btn-privacy-agree-confirm');
  const privacyViewBtns = document.querySelectorAll('.btn-privacy-view');

  privacyViewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (privacyModal) {
        privacyModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closePrivacyModal() {
    if (privacyModal) {
      privacyModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  if (privacyModalCloseBtn) privacyModalCloseBtn.addEventListener('click', closePrivacyModal);
  if (btnPrivacyAgreeConfirm) btnPrivacyAgreeConfirm.addEventListener('click', closePrivacyModal);

  // 10. History Modal (나의 최근 상담 신청 내역)
  const historyModal = document.getElementById('my-inquiries-modal');
  const historyModalCloseBtn = document.getElementById('history-modal-close-btn');
  const btnCloseHistoryModal = document.getElementById('btn-close-history-modal');
  const btnViewMyInquiries = document.getElementById('btn-view-my-inquiries');
  const historyListContainer = document.getElementById('history-list-container');

  if (btnViewMyInquiries && historyModal && historyListContainer) {
    btnViewMyInquiries.addEventListener('click', () => {
      const records = JSON.parse(localStorage.getItem('gwangmyeong_inquiries') || '[]');
      if (records.length === 0) {
        historyListContainer.innerHTML = `
          <div class="h-empty">
            <i class="fa-regular fa-folder-open" style="font-size:2rem; margin-bottom:8px; display:block;"></i>
            최근 신청하신 상담 내역이 없습니다.<br>
            위 상담 신청서를 통해 언제든 편하게 문의해 주세요!
          </div>
        `;
      } else {
        historyListContainer.innerHTML = records.map(rec => `
          <div class="history-item-card">
            <div class="h-top">
              <span class="h-type">${escapeHtml(rec.type)} (${escapeHtml(rec.id)})</span>
              <span class="h-date">${escapeHtml(rec.time)}</span>
            </div>
            <p class="h-summary"><strong>신청자:</strong> ${escapeHtml(rec.name)} / <strong>내용:</strong> ${escapeHtml(rec.summary)}</p>
          </div>
        `).join('');
      }

      historyModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    function closeHistoryModal() {
      historyModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }

    if (historyModalCloseBtn) historyModalCloseBtn.addEventListener('click', closeHistoryModal);
    if (btnCloseHistoryModal) btnCloseHistoryModal.addEventListener('click', closeHistoryModal);
  }

  // 11. Left Sidebar Direct Kakao Launch
  const btnLaunchKakaoContact = document.getElementById('btn-launch-kakao-contact');
  if (btnLaunchKakaoContact && kakaoChatWindow) {
    btnLaunchKakaoContact.addEventListener('click', () => {
      kakaoChatWindow.classList.remove('hidden');
      kakaoChatInput.focus();
      showToast("카카오톡 1:1 라이브 AI 상담 창이 열렸습니다! 😊");
    });
  }

  // Bookmark page button
  if (bookmarkBtn) {
    bookmarkBtn.addEventListener('click', () => {
      showToast("Ctrl + D 키를 누르시면 즐겨찾기에 등록됩니다!");
    });
  }

  // Toast Helper
  function showToast(message) {
    toastMsg.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 4000);
  }

  // ================= 9. KAKAOTALK AI CHATBOT LOGIC =================
  if (initMsgTime) {
    const now = new Date();
    initMsgTime.textContent = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  }

  if (kakaoToggleBtn && kakaoChatWindow) {
    kakaoToggleBtn.addEventListener('click', () => {
      kakaoChatWindow.classList.toggle('hidden');
      if (!kakaoChatWindow.classList.contains('hidden')) {
        kakaoChatInput.focus();
      }
    });

    if (kakaoMinimizeBtn) {
      kakaoMinimizeBtn.addEventListener('click', () => {
        kakaoChatWindow.classList.add('hidden');
      });
    }

    if (kakaoCloseBtn) {
      kakaoCloseBtn.addEventListener('click', () => {
        kakaoChatWindow.classList.add('hidden');
      });
    }
  }

  // Quick chips & form submit
  document.addEventListener('click', (e) => {
    const chipBtn = e.target.closest('.chip-btn');
    if (chipBtn) {
      const query = chipBtn.dataset.query;
      handleUserSendMessage(query);
    }
  });

  if (kakaoChatForm) {
    kakaoChatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = kakaoChatInput.value.trim();
      if (query) {
        handleUserSendMessage(query);
        kakaoChatInput.value = '';
      }
    });
  }

  function handleUserSendMessage(userText) {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    // Append User Message
    const userMsgEl = document.createElement('div');
    userMsgEl.className = 'chat-msg user-msg';
    userMsgEl.innerHTML = `
      <div class="msg-content-wrapper">
        <div class="msg-bubble">${escapeHtml(userText)}</div>
        <span class="msg-time">${timeStr}</span>
      </div>
    `;
    kakaoChatMessages.appendChild(userMsgEl);
    scrollToBottomChat();

    // Show Typing Indicator
    if (aiTypingIndicator) {
      aiTypingIndicator.classList.remove('hidden');
      kakaoChatMessages.appendChild(aiTypingIndicator);
      scrollToBottomChat();
    }

    // Simulate AI Response Delay
    setTimeout(() => {
      if (aiTypingIndicator) aiTypingIndicator.classList.add('hidden');
      const botReplyHtml = generateAiResponse(userText);
      
      const botMsgEl = document.createElement('div');
      botMsgEl.className = 'chat-msg bot-msg';
      botMsgEl.innerHTML = `
        <div class="bot-profile">
          <i class="fa-solid fa-robot"></i>
        </div>
        <div class="msg-content-wrapper">
          <span class="sender-name">광명리더스 AI 비서</span>
          <div class="msg-bubble">${botReplyHtml}</div>
          <span class="msg-time">${timeStr}</span>
        </div>
      `;
      kakaoChatMessages.appendChild(botMsgEl);
      scrollToBottomChat();
    }, 700);
  }

  // Right-Side KakaoTalk Launch Button Click Handler
  const btnLaunchKakaoRight = document.getElementById('btn-launch-kakao-right');
  if (btnLaunchKakaoRight && kakaoChatWindow) {
    btnLaunchKakaoRight.addEventListener('click', () => {
      kakaoChatWindow.classList.remove('hidden');
      kakaoChatInput.focus();
      showToast("카카오톡 1:1 라이브 AI 상담 창이 열렸습니다! 😊");
    });
  }

  function generateAiResponse(query) {
    const q = query.toLowerCase();

    if (q.includes('추천') || q.includes('매물') || q.includes('인기')) {
      return `현재 <strong>광명시 인기 추천 매물</strong> 8선이 메인 페이지에 업데이트되어 있습니다! 🏢<br><br>
              - <strong>철산래미안자이 84㎡</strong>: 10억 8천만원 (급매/올확장)<br>
              - <strong>유플래닛 광명데시앙</strong>: 전세 7억 5천만원 (안양천 뷰)<br>
              - <strong>광명뉴타운 11구역 입주권</strong>: 6억 2천만원<br><br>
              [핵심 추천 매물] 메뉴로 이동하시면 상세 정보를 확인하실 수 있습니다.`;
    }

    if (q.includes('철산') || q.includes('시세') || q.includes('하안') || q.includes('소하') || q.includes('일직') || q.includes('광명동')) {
      return `광명시 주요 지역 <strong>2026년 최신 아파트 시세동향</strong> 안내입니다: 🏙️<br><br>
              • <strong>철산동(7호선 역세권)</strong>: 84㎡ 기준 매매 10억 ~ 12.5억 / 전세 5.5억 ~ 7억<br>
              • <strong>일직동(KTX광명역)</strong>: 84㎡ 기준 매매 11.5억 ~ 14.5억 / 전세 6.8억 ~ 8억<br>
              • <strong>하안동(재건축 추진)</strong>: 59㎡ 기준 매매 5억 ~ 6.5억 / 전세 3억 ~ 4억<br><br>
              상세 단지별 실거래가는 📞 <strong>02-2610-8949</strong> 로 문의해주시면 즉시 조회해 드립니다.`;
    }

    if (q.includes('재개발') || q.includes('뉴타운') || q.includes('입주권')) {
      return `<strong>광명뉴타운 재개발 추진 현황</strong> 안내입니다: 📈<br><br>
              - <strong>11구역 (대장주)</strong>: 이주 진행 중, 전용 84㎡ 배정 입주권 매물 보유<br>
              - <strong>12구역 (철산역 도보권)</strong>: 철산역 초역세권 사업시행인가 단계<br>
              - <strong>9, 10구역</strong>: 착공 및 분양 순항 중<br><br>
              조합원 권수가, 감정평가액, 프리미엄 비교분석표가 필요하시면 1:1 상담을 신청해 주세요!`;
    }

    if (q.includes('복비') || q.includes('계산') || q.includes('대출') || q.includes('ltv')) {
      return `저희 홈페이지 <strong>'스마트 부동산 복비 & 대출 계산기'</strong>를 통해 1초 만에 법정 상한 요율과 대출 한도를 계산하실 수 있습니다! 🧮<br><br>
              • 주택 매매: 5억~9억 (0.4%), 9억~12억 (0.5%) 상한 요율 적용<br>
              • 주택담보대출: 무주택자 LTV 최대 70~80% 적용<br><br>
              화면 상단 [시세/중개보수 계산기] 버튼을 클릭해 직접 계산해 보세요!`;
    }

    if (q.includes('위치') || q.includes('주차') || q.includes('주소') || q.includes('오시는')) {
      return `📍 <strong>광명리더스 공인중개사사무소 위치 안내</strong><br><br>
              • <strong>주소</strong>: 경기도 광명시 오리로 854 센트럴타워 1층 102호<br>
              • <strong>지하철</strong>: 7호선 철산역 1번 출구 도보 3분<br>
              • <strong>주차</strong>: 건물 지하 주차장 <strong>2시간 무료 주차</strong> 지원! 편하게 차량으로 방문하세요.`;
    }

    if (q.includes('오픈') || q.includes('카카오') || q.includes('카톡') || q.includes('톡') || q.includes('채팅')) {
      return `💬 <strong>대표 공인중개사 1:1 카카오 오픈채팅방</strong><br><br>
              전화가 부담스러우실 때, 실시간 1:1 질의응답 및 사진/매물 자료를 간편하게 받아보실 수 있습니다! 😊<br><br>
              <a href="https://open.kakao.com/o/s222zcSi" target="_blank" rel="noopener noreferrer" class="chat-openchat-card-btn">
                <i class="fa-solid fa-comment-dots"></i> 1:1 카카오 오픈채팅방 입장하기 &rarr;
              </a>`;
    }

    if (q.includes('전화') || q.includes('상담') || q.includes('연락') || q.includes('대표')) {
      return `📞 <strong>광명리더스 직통 상담 연결</strong><br><br>
              • 대표 직통전화: <a href="tel:01048208888" style="color:#0F2C59; font-weight:bold; text-decoration:underline;">010-4820-8888</a><br>
              • 실시간 오픈채팅: <a href="https://open.kakao.com/o/s222zcSi" target="_blank" rel="noopener noreferrer" style="color:#3C1E1E; font-weight:800; background:#FEE500; padding:2px 8px; border-radius:4px; text-decoration:none;">💬 오픈채팅 입장</a><br><br>
              <a href="https://open.kakao.com/o/s222zcSi" target="_blank" rel="noopener noreferrer" class="chat-openchat-card-btn">
                <i class="fa-solid fa-comments"></i> 대표 중개사 1:1 오픈톡 바로가기 &rarr;
              </a>`;
    }

    return `문의해 주셔서 감사합니다! 😊<br>
            고객님께서 찾으시는 <strong>'${escapeHtml(query)}'</strong> 조건에 적합한 최적의 실매물을 빠르게 찾아드리겠습니다.<br><br>
            💬 실시간 1:1 카톡 상담: <a href="https://open.kakao.com/o/s222zcSi" target="_blank" rel="noopener noreferrer" style="color:#0F2C59; font-weight:bold; text-decoration:underline;">오픈채팅방 바로입장</a><br>
            📞 대표 직통전화: <a href="tel:01048208888" style="color:#0F2C59; font-weight:bold; text-decoration:underline;">010-4820-8888</a>`;
  }

  function scrollToBottomChat() {
    kakaoChatMessages.scrollTop = kakaoChatMessages.scrollHeight;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Initial Render
  renderProperties();
});
