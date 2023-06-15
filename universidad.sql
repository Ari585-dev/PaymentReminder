-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 16 juin 2023 à 00:17
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `universidad`
--

-- --------------------------------------------------------

--
-- Structure de la table `informacion`
--

CREATE TABLE `informacion` (
  `fecha_de_pago_apertura` date DEFAULT NULL,
  `fecha_de_pago_cierre` date DEFAULT NULL,
  `fecha_extraordinaria` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `informacion`
--

INSERT INTO `informacion` (`fecha_de_pago_apertura`, `fecha_de_pago_cierre`, `fecha_extraordinaria`) VALUES
('2023-06-18', '2023-06-27', '2023-07-04'),
('2023-06-14', '2023-06-29', '2023-06-27'),
('2023-06-20', '2023-06-22', '2023-07-06'),
('2023-06-18', '2023-06-24', '2023-06-30'),
('2023-06-14', '2023-06-30', '2023-07-01'),
('2023-06-21', '2023-06-24', '2023-07-03'),
('2023-06-14', '2023-06-27', '2023-07-05'),
('2023-06-17', '2023-06-23', '2023-06-30'),
('2023-06-21', '2023-06-22', '2023-06-28'),
('2023-06-17', '2023-06-28', '2023-06-29');

-- --------------------------------------------------------

--
-- Structure de la table `students`
--

CREATE TABLE `students` (
  `codigo` double DEFAULT NULL,
  `nombres` varchar(50) DEFAULT NULL,
  `matricula` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `students`
--

INSERT INTO `students` (`codigo`, `nombres`, `matricula`) VALUES
(1, 'John Doe', 1),
(2, 'Jane Smith', 0),
(3, 'Michael Johnson', 0),
(4, 'Emily Davis', 1),
(5, 'Robert Brown', 0),
(6, 'Emma Wilson', 0),
(7, 'David Taylor', 1),
(8, 'Olivia Clark', 0),
(9, 'William Martinez', 0),
(10, 'Sophia Anderson', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
