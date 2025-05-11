// Заглушки с имитацией постов и комментариев
const mockPosts = [
  {
    id: 1,
    username: 'IvanPetrov',
    userPhoto: 'https://randomuser.me/api/portraits/men/32.jpg',
    topic: 'Общие новости',
    content: 'Приветствую всех в нашем общем глобальном форуме!',
    created_at: '2024-06-10T12:00:00Z',
    comments: [
      { id: 1, username: 'AnnaS', content: 'Отлично, рад что мы все здесь!' },
      { id: 2, username: 'TechGuru', content: 'С нетерпением жду новых обсуждений.' },
      { id: 3, username: 'DevMaster', content: 'Интересно, какие темы будут популярны.' },
      { id: 4, username: 'Guest', content: 'Я люблю этот форум!' }
    ]
  },
  {
    id: 2,
    username: 'AnnaS',
    userPhoto: 'https://randomuser.me/api/portraits/women/44.jpg',
    topic: 'PHP библиотеки',
    content: 'Недавно попробовал новую библиотеку для PHP, очень удобная!',
    created_at: '2024-06-10T13:15:00Z',
    comments: [
      { id: 1, username: 'IvanPetrov', content: 'Какая именно?' },
      { id: 2, username: 'TechGuru', content: 'Поделись ссылкой!' }
    ]
  },
  {
    id: 3,
    username: 'TechGuru',
    userPhoto: 'https://randomuser.me/api/portraits/men/66.jpg',
    topic: 'REST API',
    content: 'Какие лучшие практики для написания REST API вы используете?',
    created_at: '2024-06-10T14:30:00Z',
    comments: []
  }
];

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString('ru-RU', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

function createCommentElement(comment) {
  return `
    <div class="comment mb-2">
      <strong>${comment.username}:</strong> ${comment.content}
    </div>
  `;
}

function renderPost(post) {
  const commentsToShow = post.comments.slice(0, 3);
  const hiddenComments = post.comments.slice(3);

  // Создаем уникальный id для блока скрытых комментариев и кнопки раскрытия
  const hiddenId = `hiddenComments-${post.id}`;
  const btnId = `showMoreBtn-${post.id}`;

  const commentsHtml = commentsToShow.map(createCommentElement).join('');
  const hiddenCommentsHtml = hiddenComments.map(createCommentElement).join('');

  return `
    <article class="post d-flex" tabindex="0" aria-label="Пост автора ${post.username}">
      <img src="${post.userPhoto}" alt="Фото пользователя ${post.username}" class="user-photo me-3" />
      <div class="post-body flex-grow-1">
        <div class="post-header d-flex justify-content-between align-items-center">
          <div>
            <strong class="username">${post.username}</strong>
            ${post.topic ? `<span class="topic badge bg-secondary ms-2">${post.topic}</span>` : ''}
          </div>
          <div class="post-time text-muted">${formatDate(post.created_at)}</div>
        </div>
        <p class="post-content mt-2">${post.content}</p>
        <div class="comments mt-3">
          ${commentsHtml}
          ${hiddenComments.length ? `
            <div id="${hiddenId}" class="hidden-comments d-none">
              ${hiddenCommentsHtml}
            </div>
            <button id="${btnId}" type="button" class="btn btn-link p-0">More</button>
          ` : ''}
        </div>
      </div>
    </article>
  `;
}

function renderPosts(posts) {
  const postsList = document.getElementById('postsList');
  postsList.innerHTML = posts.map(renderPost).join('');

  // Навесим обработчики на кнопки "More"
  posts.forEach(post => {
    if (post.comments.length > 3) {
      const btn = document.getElementById(`showMoreBtn-${post.id}`);
      const hiddenContainer = document.getElementById(`hiddenComments-${post.id}`);
      btn.addEventListener('click', () => {
        if (hiddenContainer.classList.contains('d-none')) {
          hiddenContainer.classList.remove('d-none');
          btn.textContent = 'Hide';
        } else {
          hiddenContainer.classList.add('d-none');
          btn.textContent = 'More';
        }
      });
    }
  });
}

// Изначально отрисуем моковые посты
renderPosts(mockPosts);

