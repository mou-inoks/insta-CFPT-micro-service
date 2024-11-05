<?php

namespace App\Controllers;

use App\Models\Post;

require_once __DIR__ . '/../Models/Post.php';

class PostController
{
    private $postModel;

    public function __construct()
    {
        $this->postModel = new Post();
    }

    /**
     * Lorsque vous envoyez des données dans le body d'une requette, elles ne sont pas disponibles directement dans $_POST. 
     * Au lieu de cela, vous devez lire le flux de la requête pour obtenir les données JSON 
     * et les convertir en tableau associatif PHP. 
     * Voici comment vous pouvez le faire dans votre fichier PostController.php :
     */
    public function createPost()
    {
        // Lire le corps de la requête
        $inputJSON = file_get_contents('php://input');

        // Décoder les données JSON en tableau associatif
        $data = json_decode($inputJSON, true);

        // Vérifier et récupérer les données

        // Récupérer l'ID de l'utilisateur à partir des données décodées
        $userID = isset($data['userID']) ? htmlspecialchars(strip_tags($data['userID'])) : null;
        if (!$userID) {
            http_response_code(400);
            echo json_encode(["message" => "User ID is required."]);
            return;
        }

        // Récupérer le caption à partir des données décodées
        $caption = isset($data['caption']) ? htmlspecialchars(strip_tags($data['caption'])) : null;
        if (!$caption) {
            http_response_code(400);
            echo json_encode(["message" => "Caption is required."]);
            return;
        }

        // Ensuite, vous pouvez procéder avec la création du post
        
        // Utiliser les données pour créer un post
        $this->postModel->UserID = $userID;
        $this->postModel->Caption = $caption;

        // Appeler la méthode pour créer le post et renvoyer la réponse
        $result = $this->postModel->create();
        if ($result) {
            http_response_code(201);            
            // encode new post in json format and return it
            echo json_encode($result);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Post could not be created."]);
        }
    }

    // Lire tous les posts
    public function readAllPosts()
    {
        $result = $this->postModel->readAll();
        if ($result) {
            http_response_code(200);
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "No posts found."]);
        }
    }

    // Lire un seul post par ID
    public function readSinglePost($id)
    {
        $this->postModel->PostID = $id;
        $result = $this->postModel->readOne();
        if ($result) {
            http_response_code(200);
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Post not found."]);
        }
    }

    // Mettre à jour un post
    public function updatePost($id)
    {
        $inputJSON = file_get_contents('php://input');
        $data = json_decode($inputJSON, true);

        $caption = isset($data['caption']) ? htmlspecialchars(strip_tags($data['caption'])) : null;

        if (!$caption) {
            http_response_code(400);
            echo json_encode(["message" => "Caption is required."]);
            return;
        }

        $this->postModel->PostID = $id;
        $this->postModel->Caption = $caption;

        $result = $this->postModel->update();
        if ($result) {
            http_response_code(200);
            echo json_encode($result);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Post could not be updated."]);
        }
    }

    // Supprimer un post
    public function deletePost($id)
    {
        $this->postModel->PostID = $id;
        if ($this->postModel->delete()) {
            http_response_code(200);
            echo json_encode(["message" => "Post deleted successfully."]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Post could not be deleted."]);
        }
    }
}