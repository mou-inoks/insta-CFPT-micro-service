<?php

namespace App\Models;

use PDO; // Add this line to import the PDO class
use PDOException;
use App\Config\Database;


require_once __DIR__ . '/../Config/Database.php';


class Post
{
    private $conn;
    private $table = 'Posts';

    public $PostID;
    public $UserID;
    public $Caption;
    public $CreatedAt;

    public function __construct()
    {
        // get database connection from app/config/database.php
        $this->conn = Database::getInstance()->getConnection();
    }

    public function create()
    {
        try {
            // create query
            $query = "INSERT INTO " . $this->table . " (UserID, Caption) VALUES (:userID, :caption)";

            $stmt = $this->conn->prepare($query);

            // Utilisez les mêmes noms de paramètres que ceux définis dans la requête SQL
            $stmt->bindParam(':userID', $this->UserID);
            $stmt->bindParam(':caption', $this->Caption);

            if ($stmt->execute()) {
                // get last inserted on $table and put it in $this->PostID
                $this->PostID = $this->conn->lastInsertId();
                // get time stamp of created post from database
                $date = $this->conn->query("SELECT CreatedAt FROM " . $this->table . " WHERE PostID = " . $this->PostID)->fetch(PDO::FETCH_ASSOC);
                $this->CreatedAt = $date;
                return $this;
            }
            return false;
        } catch (PDOException $e) {
            // handle PDO exceptions here
            // you can log the error, display a user-friendly message, or take any other appropriate action
            echo "@TODO : supprimer l'affichage des erreurs en production\n";
            echo "Error Post.php create() : \n";
            echo $e->getMessage();
            return false;
        }
    }
}
