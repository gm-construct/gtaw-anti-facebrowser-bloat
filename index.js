const RULES = {
  blockSuggestions: 'div[class*="card-suggestions"] { display: none !important; }',  
  blockTrending: 'div[class*="card-trending"] { display: none !important; }',  
  blockHottestPosts: 'div[class*="card-hottest"] { display: none !important; }',
  blockBoosted: 'div[class*="boosted-post-glow"] { display: none !important; }',
  blockStories: 'div[class*="bg-card text-card-foreground flex flex-col gap-6 rounded-2xl border border-border/80 shadow-[var(--shadow-card)] transition-shadow duration-300 ease-out hover:shadow-[var(--shadow-card-hover)] mb-4 relative group p-4"], section[aria-label="Stories"] { display: none !important; }',
  blockSponsored: 'div[class*="card-sponsored"] { display: none !important; }'
};

const styleElement = document.createElement('style');
(document.head || document.documentElement).appendChild(styleElement);

function updateBlocking(settings) {
  let cssString = "";

  if (settings.blockSuggestions) cssString += RULES.blockSuggestions;
  if (settings.blockTrending) cssString += RULES.blockTrending;
  if (settings.blockHottestPosts) cssString += RULES.blockHottestPosts;
  if (settings.blockBoosted) cssString += RULES.blockBoosted;
  if (settings.blockStories) cssString += RULES.blockStories;
  if (settings.blockSponsored) cssString += RULES.blockSponsored;

  styleElement.textContent = cssString;
}

chrome.storage.sync.get(['blockHottestPosts', 'blockBoosted', 'blockStories', 'blockSponsored', 'blockTrending', 'blockSuggestions'], (settings) => {
  updateBlocking(settings);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync') {
    chrome.storage.sync.get(['blockHottestPosts', 'blockBoosted', 'blockStories', 'blockSponsored', 'blockTrending', 'blockSuggestions'], (settings) => {
      updateBlocking(settings);
    });
  }
});