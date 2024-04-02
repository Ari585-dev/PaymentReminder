-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-04-2024 a las 20:57:48
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `universidad`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `information`
--

CREATE TABLE `information` (
  `payment_opening_date` date DEFAULT NULL,
  `closing_payment_date` date DEFAULT NULL,
  `extraordinary_date` date DEFAULT NULL,
  `info_1` varchar(300) NOT NULL,
  `info_2` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `information`
--

INSERT INTO `information` (`payment_opening_date`, `closing_payment_date`, `extraordinary_date`, `info_1`, `info_2`) VALUES
('2023-06-18', '2023-06-24', '2023-06-30', 'https://placekitten.com/500/200', 'https://placekitten.com/501/300');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `students`
--

CREATE TABLE `students` (
  `id` double DEFAULT NULL,
  `first_name` varchar(25) DEFAULT NULL,
  `middle_name` varchar(25) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `profile_picture` varchar(500) DEFAULT NULL,
  `identification` varchar(50) DEFAULT NULL,
  `mail` varchar(50) NOT NULL,
  `birthdate` date DEFAULT NULL,
  `grade` decimal(5,2) DEFAULT NULL,
  `career` varchar(80) DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(200) NOT NULL,
  `tuition_value` varchar(20) DEFAULT NULL,
  `payed` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `students`
--

INSERT INTO `students` (`id`, `first_name`, `middle_name`, `last_name`, `profile_picture`, `identification`, `mail`, `birthdate`, `grade`, `career`, `phone`, `password`, `tuition_value`, `payed`) VALUES
(20192578094, 'Julian', 'Andrés', 'Gómez Galvis', 'https://static.vecteezy.com/system/resources/previews/002/275/847/non_2x/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg', '1003374839', 'juliaan657@gmail.com', '2002-02-09', 3.99, 'Tecnología en Sistematización de Datos', '3195792810', '$2b$10$abcdefghijklmnopqrstuuPTKHQVVyHUzSY2mU5u6MTtbFSf69uIe', '100.000 COP', 1),
(20192578045, 'Sergio', 'Alejandro', 'Giraldo Alzate', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngitem.com%2Fpimgs%2Fm%2F22-220721_circled-user-male-type-user-colorful-icon-png.png&f=1&nofb=1&ipt=42f04348b7fc081d7dba809535a04339bf3b31316f739ff06dae19c2c0b1d0f4&ipo=images', '1002354987', 'seragial@gmail.com', '2001-05-20', 4.04, 'Tecnología en Sistematización de Datos', '3209928242', '$2b$10$abcdefghijklmnopqrstuus7DuZiLGzt0KipYv1Yk5hvypiiAVLN6', '83.300 COP', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
