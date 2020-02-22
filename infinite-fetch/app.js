const postContainer = document.querySelector('.post-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 4;
let page = 1;

async function getPost() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();

  return data;
}

async function showPosts() {
  const posts = await getPost();

  posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
          <h2 class="post-title">
            ${post.title}
          </h2>
          <div class="post-body">
            ${post.body}
          </div>
        </div>
    `;
    postContainer.appendChild(postEl);
  });
}

// show Loading and fetch more
function showLoading() {
  loading.classList.add('show');

  setTimeout(() => {
    loading.classList.remove('show');

    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

showPosts();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement; //getting all this functionalty from documet.documentElement

  if (scrollTop + clientHeight > scrollHeight - 10) {
    showLoading();
  }
});

function filterPost(e) {
  e.preventDefault;

  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach(post => {
    const title = document.querySelector('.post-title').innerText.toUpperCase();
    const body = document.querySelector('.post-body').innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

filter.addEventListener('input', filterPost);
