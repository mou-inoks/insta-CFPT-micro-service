-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : mariadb:3306
-- Généré le : mar. 20 août 2024 à 08:59
-- Version du serveur : 11.5.2-MariaDB-ubu2404
-- Version de PHP : 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `instacfpt2`
--
CREATE DATABASE IF NOT EXISTS `instacfpt2` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci;
USE `instacfpt2`;

-- --------------------------------------------------------

--
-- Structure de la table `Comments`
--
-- Création : mar. 20 août 2024 à 08:57
--

CREATE TABLE `Comments` (
  `CommentID` bigint(20) UNSIGNED NOT NULL COMMENT 'CommentID (Primary Key): It is a Unique identifier for each comment.',
  `PostID` bigint(20) UNSIGNED NOT NULL COMMENT 'PostID: Identifier for the associated post.',
  `UserID` bigint(20) UNSIGNED NOT NULL COMMENT 'UserID: Identifier for the user who made the comment.',
  `Content` text NOT NULL COMMENT 'Content: The text content of the comment.',
  `CreatedAt` timestamp NULL DEFAULT current_timestamp() COMMENT 'CreatedAt: Timestamp when the comment was made.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Follows`
--
-- Création : mar. 20 août 2024 à 08:57
--

CREATE TABLE `Follows` (
  `FollowerID` bigint(20) UNSIGNED NOT NULL,
  `FolloweeID` bigint(20) UNSIGNED NOT NULL,
  `CreatedAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Likes`
--
-- Création : mar. 20 août 2024 à 08:57
--

CREATE TABLE `Likes` (
  `LikeID` bigint(20) UNSIGNED NOT NULL COMMENT 'LikeID (Primary Key): It is a Unique identifier for each like.',
  `PostID` bigint(20) UNSIGNED NOT NULL COMMENT 'PostID: Identifier for the liked post.',
  `UserID` bigint(20) UNSIGNED NOT NULL COMMENT 'UserID: Identifier for the user who liked the post.',
  `CreatedAt` timestamp NULL DEFAULT current_timestamp() COMMENT 'CreatedAt: Timestamp when the like was made.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Photos`
--
-- Création : mar. 20 août 2024 à 08:57
--

CREATE TABLE `Photos` (
  `PhotoID` bigint(20) UNSIGNED NOT NULL COMMENT 'PhotoID (Primary Key): It is a Unique identifier for each photo.',
  `PostID` bigint(20) UNSIGNED NOT NULL COMMENT 'PostID: Identifier for the photo post.',
  `PhotoURL` varchar(255) NOT NULL COMMENT 'It is a URL or reference to the photo',
  `CreatedAt` timestamp NULL DEFAULT current_timestamp() COMMENT 'It is a Timestamp of when the photo was created.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Posts`
--
-- Création : mar. 20 août 2024 à 08:57
--

CREATE TABLE `Posts` (
  `PostID` bigint(20) UNSIGNED NOT NULL COMMENT 'PostID (Primary Key): It is a Unique identifier for each post.',
  `UserID` bigint(20) UNSIGNED NOT NULL COMMENT 'UserID: Identifier for the user who created the post.',
  `ContentURL` varchar(255) DEFAULT NULL COMMENT 'ContentURL: It is a URL or reference to the photo or video.',
  `Caption` text DEFAULT NULL COMMENT 'Caption: Text caption accompanying the post.',
  `CreatedAt` timestamp NULL DEFAULT current_timestamp() COMMENT 'CreatedAt: It is a Timestamp of when the post was created.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Users`
--
-- Création : mar. 20 août 2024 à 08:57
--

CREATE TABLE `Users` (
  `UserID` bigint(20) UNSIGNED NOT NULL COMMENT 'UserID (Primary Key): It is a Unique identifier for each user.',
  `Username` varchar(255) NOT NULL COMMENT 'Username: User’s display name.',
  `Email` varchar(255) NOT NULL COMMENT 'Email: User’s email address for contact and login.',
  `PasswordHash` varchar(255) NOT NULL COMMENT 'PasswordHash: Securely hashed password for user authentication.',
  `ProfilePicture` varchar(255) DEFAULT NULL COMMENT 'ProfilePicture: It is a URL or reference to the user’s profile picture.',
  `Bio` text DEFAULT NULL COMMENT 'Bio: User’s profile bio.',
  `CreatedAt` timestamp NULL DEFAULT current_timestamp() COMMENT 'CreatedAt: Timestamp when the user account was created.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Comments`
--
ALTER TABLE `Comments`
  ADD PRIMARY KEY (`CommentID`),
  ADD KEY `PostID` (`PostID`),
  ADD KEY `UserID` (`UserID`);

--
-- Index pour la table `Follows`
--
ALTER TABLE `Follows`
  ADD PRIMARY KEY (`FollowerID`,`FolloweeID`),
  ADD KEY `FolloweeID` (`FolloweeID`);

--
-- Index pour la table `Likes`
--
ALTER TABLE `Likes`
  ADD PRIMARY KEY (`LikeID`),
  ADD KEY `PostID` (`PostID`),
  ADD KEY `UserID` (`UserID`);

--
-- Index pour la table `Photos`
--
ALTER TABLE `Photos`
  ADD PRIMARY KEY (`PhotoID`),
  ADD KEY `PostID` (`PostID`);

--
-- Index pour la table `Posts`
--
ALTER TABLE `Posts`
  ADD PRIMARY KEY (`PostID`),
  ADD KEY `UserID` (`UserID`);

--
-- Index pour la table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Comments`
--
ALTER TABLE `Comments`
  MODIFY `CommentID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'CommentID (Primary Key): It is a Unique identifier for each comment.';

--
-- AUTO_INCREMENT pour la table `Likes`
--
ALTER TABLE `Likes`
  MODIFY `LikeID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'LikeID (Primary Key): It is a Unique identifier for each like.';

--
-- AUTO_INCREMENT pour la table `Photos`
--
ALTER TABLE `Photos`
  MODIFY `PhotoID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'PhotoID (Primary Key): It is a Unique identifier for each photo.';

--
-- AUTO_INCREMENT pour la table `Posts`
--
ALTER TABLE `Posts`
  MODIFY `PostID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'PostID (Primary Key): It is a Unique identifier for each post.';

--
-- AUTO_INCREMENT pour la table `Users`
--
ALTER TABLE `Users`
  MODIFY `UserID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'UserID (Primary Key): It is a Unique identifier for each user.';

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Comments`
--
ALTER TABLE `Comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`PostID`) REFERENCES `Posts` (`PostID`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`);

--
-- Contraintes pour la table `Follows`
--
ALTER TABLE `Follows`
  ADD CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`FollowerID`) REFERENCES `Users` (`UserID`),
  ADD CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`FolloweeID`) REFERENCES `Users` (`UserID`);

--
-- Contraintes pour la table `Likes`
--
ALTER TABLE `Likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`PostID`) REFERENCES `Posts` (`PostID`),
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`);

--
-- Contraintes pour la table `Photos`
--
ALTER TABLE `Photos`
  ADD CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`PostID`) REFERENCES `Posts` (`PostID`);

--
-- Contraintes pour la table `Posts`
--
ALTER TABLE `Posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
