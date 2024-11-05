<?php

// Include Composer's autoloader
require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/src/Controllers/PostController.php';

// Instantiate the controllers
$postController = new \App\Controllers\PostController();

// Add the routing logic here
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Logic to create a new post : passer la main au controlleur
    $postController->createPost();
} else {
    // Default response if no route matches
    http_response_code(404);
    echo "404 Not Found :(";
}
