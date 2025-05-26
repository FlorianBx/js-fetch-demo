const API_URL = 'https://dummyjson.com';
const searchInput = document.querySelector('#searchInput');
const postsContainer = document.querySelector('#postsContainer');

async function fetchAllPosts() {
  try {
    const response = await fetch(`${API_URL}/posts`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.posts;
  } catch (error) {
    throw new Error(`Failed to fetch posts: ${error.message}`);
  }
}

function filterPostsBySearchTerm(posts, searchTerm) {
  const normalizedSearchTerm = searchTerm.toLowerCase().trim();
  
  return posts.filter((post) => 
    post.title.toLowerCase().includes(normalizedSearchTerm) || 
    post.body.toLowerCase().includes(normalizedSearchTerm)
  );
}

function renderPosts(posts) {
  postsContainer.innerHTML = '';

  if (posts.length === 0) {
    postsContainer.innerHTML = '<p class="text-gray-500">No post found !</p>';
    return;
  }

  const postsList = document.createElement('ul');
  
  posts.forEach((post) => {
    const postItem = document.createElement('li');
    postItem.className = 'list-none text-white mb-8';
    postItem.innerHTML = `
      <h2 class="text-2xl font-bold">${escapeHtml(post.title)}</h2>
      <p class="text-gray-500">${escapeHtml(post.body)}</p>
    `;
    postsList.appendChild(postItem);
  });
  
  postsContainer.appendChild(postsList);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

async function initializeApp() {
  try {
    const allPosts = await fetchAllPosts();
    
    renderPosts(allPosts);
    
    searchInput.addEventListener('input', (event) => {
      const searchTerm = event.target.value;
      const filteredPosts = filterPostsBySearchTerm(allPosts, searchTerm);
      renderPosts(filteredPosts);
    });
    
  } catch (error) {
    console.error('Failed to initialize app:', error);
    postsContainer.innerHTML = '<p class="text-red-500">Error while loading...</p>';
  }
}

initializeApp();
