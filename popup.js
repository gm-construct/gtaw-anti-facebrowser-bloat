const checkboxes = ['blockBoosted', 'blockStories', 'blockSponsored', 'blockHottestPosts', 'blockTrending', 'blockSuggestions'];

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(checkboxes, (data) => {
    checkboxes.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.checked = data[id] || false;
      }
    });
  });
});

checkboxes.forEach(id => {
  const element = document.getElementById(id);
  if (element) {
    element.addEventListener('change', (e) => {
      const setting = {};
      setting[id] = e.target.checked;
      chrome.storage.sync.set(setting);
    });
  }
});