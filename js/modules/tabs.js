function tabs(tabItemSelector, tabContentSelector, parentTabItemSelector, activeClass) {
  // Tabs
  const tabContent = document.querySelectorAll(tabContentSelector);
  const tabItem = document.querySelectorAll(tabItemSelector);
  const parentTabItem = document.querySelector(parentTabItemSelector);

  function hideTab() {
    tabContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabItem.forEach(item => {
      item.classList.remove(activeClass);
    });

  }

  function showTab(i = 0) {
    tabContent[i].classList.remove('hide');
    tabContent[i].classList.add('show', 'fade');
    tabItem[i].classList.add(activeClass);

  }
  parentTabItem.addEventListener('click', (event) => {
    const target = event.target;
    if (target && target.classList.contains(tabItemSelector.slice(1))) {
      tabItem.forEach((item, i) => {
        if (item === target) {
          hideTab();
          showTab(i);
        }

      });
    }
  });

  hideTab();
  showTab();
}
export default tabs;