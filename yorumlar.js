// Yorum formu ve yorum listesi öğelerini seç
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const commentsList = document.getElementById('comments-list');

// Form gönderildiğinde yorum ekle
commentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const commentText = commentInput.value.trim();
    if (commentText) {
        addComment(commentText);
        commentInput.value = '';
        saveComments();
    }
});

// Yorum ekleme işlevi
function addComment(commentText) {
    const li = document.createElement('li');

    const dateParagraph = document.createElement('p');
    dateParagraph.classList.add('comment-date');
    const date = new Date();
    // Sadece tarihi göster, saati kaldır
    dateParagraph.textContent = `${date.toLocaleDateString()}`;

    const commentParagraph = document.createElement('p');
    commentParagraph.classList.add('comment-text');
    commentParagraph.textContent = commentText;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('comment-delete');
    deleteButton.textContent = 'Sil';
    deleteButton.addEventListener('click', () => {
        li.remove();
        saveComments();
    });

    li.appendChild(dateParagraph);
    li.appendChild(commentParagraph);
    li.appendChild(deleteButton);
    commentsList.appendChild(li);
}

// Yorumları localStorage'a kaydet
function saveComments() {
    const comments = [];
    commentsList.querySelectorAll('li').forEach(li => {
        const date = li.querySelector('.comment-date').textContent;
        const text = li.querySelector('.comment-text').textContent;
        comments.push({ date, text });
    });
    localStorage.setItem('comments', JSON.stringify(comments));
}

// Yorumları localStorage'dan yükle
function loadComments() {
    const comments = JSON.parse(localStorage.getItem('comments') || '[]');
    comments.forEach(comment => addComment(comment.text));
}

// Sayfa yüklendiğinde yorumları yükle
loadComments();
