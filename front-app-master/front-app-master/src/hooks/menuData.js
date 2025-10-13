export const mainMenus = [
  { name: '홈', hover: '' , path: '/main'},
  { name: '카테고리', hover: '카테고리', path: '/books'},
  { name: '베스트', hover: '베스트', path: '/best'},
  { name: '신상품', hover: '신상품', path: '/new'},
];


export const subMenus = {
    '홈': [],
    '카테고리': [
        { name: '전체보기', path: '/books/all', categoryId: 0 },
        { name: '소설', path: '/books/novel', categoryId: 1 },
        { name: '요리', path: '/books/cooking', categoryId: 2 },
        { name: '컴퓨터/IT', path: '/books/it', categoryId: 3 },
        { name: '만화', path: '/books/comic', categoryId: 4 },
    ],
    '베스트': [
      { name: '전체보기', path: '/best' },
      { name: '인기 상품 1', path: '/best/item1' },
      { name: '인기 상품 2', path: '/best/item2' },
    ],
    '신상품': [
      { name: '전체보기', path: '/new' },
      { name: '이번 주 신상', path: '/new/week' },
      { name: '이번 달 신상', path: '/new/month' },
    ],
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


