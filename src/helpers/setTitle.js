const setTitle = (lang) => {
  if (lang === 'en') {
    const titleInEnglish = 'Agricultural products in Armenia';
    document.title = titleInEnglish
  } else if (lang === 'ru') {
    const titleInRussian = 'Сельскохозяйственная продукция в Армении';
    document.title = titleInRussian
  } else {
    const titleInArmenian = 'Գյուղատնտեսական մթերք Հայաստանում';
    document.title = titleInArmenian
  }
}

module.exports = setTitle