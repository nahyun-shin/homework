export const mainMenus = [
  { name: '홈', hover: '', path: '/main' },
  { name: '카테고리', hover: '카테고리', path: '/books' },
  { name: '베스트', hover: '베스트', path: '/best' },
  { name: '신상품', hover: '신상품', path: '/new' },
];




export const subMenus = {
  '카테고리': [], // 위에서 fetch
  '베스트': [],
  '신상품': [],
};

export const menuPathMap = {
  '카테고리': '/books',
  '베스트': '/best',
  '신상품': '/new'
};


// hooks/menuUtils.js (또는 menuData.js 내부에 추가 가능)
export const getFixedMenuKey = (pathname) => {
  return Object.entries(menuPathMap).find(([_, basePath]) =>
    pathname.startsWith(basePath)
  )?.[0]; // key만 반환
};


//메인메뉴 키찾을때
export const getActiveMenuKeyFromPath = (pathname) => {
  return Object.keys(menuPathMap).find((key) => pathname.startsWith(menuPathMap[key]));
};


