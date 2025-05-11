<?php 
//Здесь файл временно, безопасно его кинуть выше папки public OPS
$host = 'localhost';
$port = '5432';
$database = 'blok';
$user = 'postgres';
$password = 'admin';

try {
    $dsn = "pgsql:host=$host;port=$port;dbname=$database;";
    $pdo = new PDO($dsn, $user, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
} catch (PDOException $e) {
    die ("Ошибка подключения к БД:" . $e->getMessage());
}
