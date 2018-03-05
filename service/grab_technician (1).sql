-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 02, 2018 at 03:28 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `grab_technician`
--

-- --------------------------------------------------------

--
-- Table structure for table `area_bangkok`
--

CREATE TABLE `area_bangkok` (
  `id` int(11) NOT NULL,
  `area_name` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `area_bangkok`
--

INSERT INTO `area_bangkok` (`id`, `area_name`) VALUES
(1, 'เขตพระนคร'),
(2, 'เขตดุสิต'),
(3, 'เขตหนองจอก'),
(4, 'เขตบางรัก'),
(5, 'เขตบางเขน'),
(6, 'เขตบางกะปิ'),
(7, 'เขตปทุมวัน'),
(8, 'เขตป้อมปราบศัตรูพ่าย\r\n'),
(9, 'เขตพระโขนง'),
(10, 'เขตมีนบุรี'),
(11, 'เขตลาดกระบัง'),
(12, 'เขตยานนาวา'),
(13, 'เขตสัมพันธวงศ์'),
(14, 'เขตพญาไท'),
(15, 'เขตธนบุรี'),
(16, 'เขตบางกอกใหญ่'),
(17, 'เขตห้วยขวาง'),
(18, 'เขตคลองสาน'),
(19, 'เขตตลิ่งชัน'),
(20, 'เขตบางกอกน้อย'),
(21, 'เขตบางขุนเทียน'),
(22, 'เขตภาษีเจริญ'),
(23, 'เขตหนองแขม'),
(24, 'เขตราษฎร์บูรณะ'),
(25, 'เขตบางพลัด'),
(26, 'เขตดินแดง\r\n'),
(27, 'เขตบึงกุ่ม\r\n'),
(28, 'เขตสาทร'),
(29, 'เขตบางซื่อ\r\n'),
(30, 'เขตจตุจักร'),
(31, 'เขตบางคอแหลม'),
(32, 'เขตประเวศ'),
(33, 'เขตคลองเตย'),
(34, 'เขตสวนหลวง'),
(35, 'เขตจอมทอง'),
(36, 'เขตดอนเมือง'),
(37, 'เขตราชเทวี'),
(38, 'เขตลาดพร้าว'),
(39, 'เขตวัฒนา'),
(40, 'เขตบางแค'),
(41, 'เขตหลักสี่\r\n'),
(42, 'เขตสายไหม'),
(43, 'เขตคันนายาว'),
(44, 'เขตสะพานสูง'),
(45, 'เขตวังทองหลาง'),
(46, 'เขตคลองสามวา'),
(47, 'เขตบางนา'),
(48, 'เขตทวีวัฒนา'),
(49, 'เขตทุ่งครุ'),
(50, 'เขตบางบอน');

-- --------------------------------------------------------

--
-- Table structure for table `register`
--

CREATE TABLE `register` (
  `id` int(10) UNSIGNED NOT NULL,
  `user` varchar(40) COLLATE utf8_unicode_ci NOT NULL COMMENT 'ชื่อเข้าระบบ',
  `password` varchar(40) COLLATE utf8_unicode_ci NOT NULL COMMENT 'รหัสผ่าน',
  `status` varchar(1) COLLATE utf8_unicode_ci NOT NULL COMMENT 'เช็คสถานะ',
  `ref_store` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `register`
--

INSERT INTO `register` (`id`, `user`, `password`, `status`, `ref_store`) VALUES
(43, '1', '1', '1', 0),
(44, '2', '2', '2', 0),
(45, '3', '3', '1', 0),
(46, '1', '4', '1', 0),
(47, '4', '1', '1', 0),
(48, '1', '6', '2', 0),
(49, '2', '1', '1', 0),
(50, '5', '8', '1', 0),
(51, '', '', '', 0),
(52, '22', '22', '2', 0),
(53, 'ton', '1234', '1', 0),
(54, '789', '789', '1', 0);

-- --------------------------------------------------------

--
-- Table structure for table `technician_store`
--

CREATE TABLE `technician_store` (
  `id` int(11) NOT NULL,
  `name_store` text COLLATE utf8_unicode_ci NOT NULL,
  `ref_type` int(11) NOT NULL,
  `ref_area` int(11) NOT NULL,
  `home_number` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `street` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `district` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `img_store` text COLLATE utf8_unicode_ci NOT NULL,
  `time_start` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `time_end` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `tel_technician` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `cost_begin` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `technician_store`
--

INSERT INTO `technician_store` (`id`, `name_store`, `ref_type`, `ref_area`, `home_number`, `street`, `district`, `img_store`, `time_start`, `time_end`, `tel_technician`, `cost_begin`, `lat`, `lng`) VALUES
(1, 'ช่างหมู(สาขา1)', 1, 1, '', '', '', '', '10:00 - 17', '', '', '', 13.753287, 100.501904),
(2, 'ร้าน เมลอน', 3, 4, '', '', '', '', '10.00-16.0', '', '', '', 13.726154, 100.526661),
(3, 'ร้าน แตงโม', 2, 3, '', '', '', '', '09.00-18.0', '', '', '', 13.853773, 100.852183),
(4, 'ร้าน มะม่วง', 2, 2, '', '', '', '', '08.00-14.0', '', '', '', 13.767469, 100.511759),
(18, '', 0, 0, '', '', '', '', '', '', '', '', 0, 0),
(23, '', 0, 0, '', '', '', '', '', '', '', '', 0, 0),
(24, 'phoaaa52', 3, 1, '5678/1122', 'ff', 'ff', 'fff.jpg', '12.00', '13.00', '0123456789', '401', 1231, 123222);

-- --------------------------------------------------------

--
-- Table structure for table `technician_type`
--

CREATE TABLE `technician_type` (
  `id` int(11) NOT NULL,
  `type_name` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `technician_type`
--

INSERT INTO `technician_type` (`id`, `type_name`) VALUES
(1, 'ตู้เย็น'),
(2, 'ทีวี'),
(3, 'เครื่องซักผ้า'),
(4, 'เครื่องเสียง'),
(5, 'แอร์');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `area_bangkok`
--
ALTER TABLE `area_bangkok`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `register`
--
ALTER TABLE `register`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `technician_store`
--
ALTER TABLE `technician_store`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `technician_type`
--
ALTER TABLE `technician_type`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `area_bangkok`
--
ALTER TABLE `area_bangkok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
--
-- AUTO_INCREMENT for table `register`
--
ALTER TABLE `register`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
--
-- AUTO_INCREMENT for table `technician_store`
--
ALTER TABLE `technician_store`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `technician_type`
--
ALTER TABLE `technician_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
