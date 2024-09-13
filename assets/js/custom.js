document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('modal-ok-button').addEventListener('click', function() {
        var answers = [];
        document.querySelectorAll('.answer-input').forEach(function(input) {
            answers.push(input.value.trim());
        });
        console.log('Відповіді користувача:', answers);
    });
    loadComments();

    document.getElementById('comment-form').addEventListener('submit', function(e) {
        e.preventDefault();

        var commentText = document.getElementById('comment-text').value.trim();

        if (commentText) {
            var newComment = createComment('Анонім', commentText);
            var commentsList = document.getElementById('comments-list');
            commentsList.insertBefore(newComment, commentsList.firstChild);

            document.getElementById('comment-text').value = '';
            saveComments();
        }
    });
});

function createComment(userName, text) {
    var commentDiv = document.createElement('div');
    commentDiv.className = 'comments';

    commentDiv.innerHTML = `
        <div class="profile">
            <img src="images/1.gif">
        </div>
        <div class="comment-content">
            <p class="name">${userName}</p>
            <p>${text}</p>
        </div>
        <div class="clr"></div>
        <div class="comment-status">
            <span>
                <font style="vertical-align: inherit;">Curte comente</font>
                <img src="images/3.jpg" width="15px" height="15px">
                <font style="vertical-align: inherit;">0</font>
            </span>
            <small>
                <font style="vertical-align: inherit;">·</font>
            </small>
            <small>
                <u>
                    <font style="vertical-align: inherit;">Тільки що</font>
                </u>
            </small>
        </div>
    `;

    return commentDiv;
}

function saveComments() {
    var comments = [];
    var commentElements = document.querySelectorAll('#comments-list .comments');
    commentElements.forEach(function(comment) {
        var name = comment.querySelector('.comment-content .name').textContent;
        var text = comment.querySelector('.comment-content p:nth-child(2)').textContent;
        comments.push({ name: name, text: text });
    });
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments() {
    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    var commentsList = document.getElementById('comments-list');
    comments.forEach(function(comment) {
        var commentDiv = createComment(comment.name, comment.text);
        commentDiv.classList.add('old');
        commentsList.insertBefore(commentDiv, commentsList.firstChild);
    });
}
