<?php
        require_once 'views/header.php';
    ?>
<main class="container">

    <h1 class="mb-4 text-center">BloK</h1>
    <h2 class="mb-4 text-center">Massive discussion feed</h2>
    <section class="new-post-area">
      <h5>Create new post</h5>
      <form id="newPostForm">
        <div class="mb-3">
          <textarea class="form-control" id="postContent" rows="3" placeholder="What's on your mind?" required></textarea>
        </div>
        <div class="mb-3">
          <input type="text" class="form-control" id="postTopic" placeholder="Topic of discussion" />
        </div>
        <button type="submit" class="btn btn-primary">Publish</button>
      </form>
    </section>

    <section id="postsList" aria-live="polite">
      <!-- Здесь будут посты -->
    </section>

  </main>

<script src="assets/js/form-handler.js"></script>
<?php
        require_once 'views/footer.php';