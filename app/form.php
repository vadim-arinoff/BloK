<?php

require __DIR__ . '/../config/database.php'; // Подключение к базе данных

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем данные из формы
    $userId = $_SESSION['user_id']; // Предполагаем, что user_id хранится в сессии
    $postId = htmlspecialchars($_POST['post_id']); // ID поста, к которому добавляется комментарий
    $comment = htmlspecialchars(trim($_POST['comment']));

    $response = array();

    // Проверка на пустой комментарий
    if (empty($comment)) {
        $response['status'] = 'error';
        $response['message'] = 'Комментарий не может быть пустым';
        header('Content-Type: application/json');
        echo json_encode($response);
        exit();
    }

    try {
        // Вставка комментария в базу данных
        $stmt = $pdo->prepare("INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)");
        $stmt->bindParam(1, $postId, PDO::PARAM_INT);
        $stmt->bindParam(2, $userId, PDO::PARAM_INT);
        $stmt->bindParam(3, $comment, PDO::PARAM_STR);
        $stmt->execute();

        // Получение всех комментариев к посту
        $stmt = $pdo->prepare("SELECT comments.id, comments.content, users.username 
                       FROM comments 
                       JOIN users ON comments.user_id = users.id 
                       WHERE comments.post_id = ? 
                       ORDER BY comments.created_at DESC");
        $stmt->bindParam(1, $postId, PDO::PARAM_INT);
        $stmt->execute();
        $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $response['status'] = 'success';
        $response['message'] = 'Комментарий успешно добавлен!';
        $response['comments'] = $comments;
    } catch (PDOException $e) {
        $response['status'] = 'error';
        $response['message'] = 'Ошибка при передаче данных в БД: ' . $e->getMessage();
    }

    header('Content-Type: application/json');
    echo json_encode($response);
    exit();
}
