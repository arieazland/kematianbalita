-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 20, 2021 at 05:41 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_kematian_balita`
--

-- --------------------------------------------------------

--
-- Table structure for table `kb_account`
--

CREATE TABLE `kb_account` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `password_nonhashed` varchar(255) NOT NULL,
  `jabatan` varchar(256) DEFAULT NULL,
  `telepon` varchar(15) DEFAULT NULL,
  `fax` varchar(15) DEFAULT NULL,
  `status` enum('user','admin','nonaktif') NOT NULL,
  `date_created` date DEFAULT NULL,
  `date_updated` date DEFAULT NULL,
  `time_created` time DEFAULT NULL,
  `time_updated` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kb_account`
--

INSERT INTO `kb_account` (`id`, `email`, `nama`, `password`, `password_nonhashed`, `jabatan`, `telepon`, `fax`, `status`, `date_created`, `date_updated`, `time_created`, `time_updated`) VALUES
(1, 'admin@admin.com', 'Admin', '$2a$08$lmf2/N2nu6p5LCrBfdy4nej8lb6.Od5oV0zCYfZxUWVWtk9VdNmiu', 'lupague', '', '', '', 'admin', '2021-11-10', NULL, '19:24:25', NULL),
(2, 'user1@example.com', 'User 1', '$2a$08$ftLThd2j8fPF75.HAR48e.lDqZVU7VSeJMj1ddZqY49RI4lpbNao2', 'lupague', 'Kepala Bidan', '08765498765', '', 'user', '2021-11-10', NULL, '19:29:15', NULL),
(3, 'user2@example.com', 'User 2', '$2a$08$rP3wNE/8kG7f.dv2GT9RuucMTfc3KMIUndgAR36EyfJmF7E89SYh2', 'lupague', 'Dokter Penanggung Jawab', '012345687', '', 'user', '2021-11-10', NULL, '19:32:10', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `kb_detail_1`
--

CREATE TABLE `kb_detail_1` (
  `id` int(11) NOT NULL,
  `kode_registrasi` varchar(17) NOT NULL,
  `soal` longtext DEFAULT NULL,
  `jawaban` longtext DEFAULT NULL,
  `soal_essay_jawaban` longtext DEFAULT NULL,
  `essay_jawaban` longtext DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `date_updated` date DEFAULT NULL,
  `time_created` time DEFAULT NULL,
  `time_updated` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kb_detail_1`
--

INSERT INTO `kb_detail_1` (`id`, `kode_registrasi`, `soal`, `jawaban`, `soal_essay_jawaban`, `essay_jawaban`, `date_created`, `date_updated`, `time_created`, `time_updated`) VALUES
(1, 'REG-20211118-0001', 'Nama Balita:', 'Gege', NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(2, 'REG-20211118-0001', 'Umur Balita', '3 tahun, 7 hari', NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(3, 'REG-20211118-0001', 'Tanggal Lahir Balita', '2018-11-11', NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(4, 'REG-20211118-0001', 'Jenis Kelamin Balita', 'Perempuan', NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(5, 'REG-20211118-0001', 'Urutan Balita Ke-:', '1', NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(6, 'REG-20211118-0001', 'Jumlah Balita yang Dilahirkan (Hidup)', '1', NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(7, 'REG-20211118-0001', 'Nama Ibu:', 'Rere', NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(8, 'REG-20211118-0001', 'Umur Ibu:', '24', NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(9, 'REG-20211118-0001', 'Pekerjaan Ibu', 'Pegawai Swasta', 'Sebutkan', '', '2021-11-18', NULL, '20:50:55', NULL),
(10, 'REG-20211118-0001', 'Pendidikan Ibu', 'Tamat Akademi/Universitas', NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(11, 'REG-20211118-0001', 'Nama Ayah:', 'Jojo', NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(12, 'REG-20211118-0001', 'Umur Ayah:', '25', NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(13, 'REG-20211118-0001', 'Pekerjaan Ayah', 'Lainnya', 'Sebutkan', 'Freelancer', '2021-11-18', NULL, '20:50:55', NULL),
(14, 'REG-20211118-0001', 'Pendidikan Ayah', 'Tamat Akademi/Universitas', NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(15, 'REG-20211118-0001', 'Alamat:', 'Jl. Masjid Al Gazali, Bukit Lama, Kec. Ilir Bar. I, Kota Palembang, Sumatera Selatan 30128', NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(16, 'REG-20211118-0001', 'Nomor Telephone:', '1234567898765', NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(17, 'REG-20211118-0001', 'Penghasilan Keluarga:', '10000000', NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `kb_detail_2`
--

CREATE TABLE `kb_detail_2` (
  `id` int(11) NOT NULL,
  `kode_registrasi` varchar(17) NOT NULL,
  `soal` longtext DEFAULT NULL,
  `jawaban` longtext DEFAULT NULL,
  `soal1` longtext DEFAULT NULL,
  `jawaban1` longtext DEFAULT NULL,
  `soal2` longtext DEFAULT NULL,
  `jawaban2` longtext DEFAULT NULL,
  `soal3` longtext DEFAULT NULL,
  `jawaban3` longtext DEFAULT NULL,
  `soal4` longtext DEFAULT NULL,
  `jawaban4` longtext DEFAULT NULL,
  `soal5` longtext DEFAULT NULL,
  `jawaban5` longtext DEFAULT NULL,
  `soal6` longtext DEFAULT NULL,
  `jawaban6` longtext DEFAULT NULL,
  `soal7` longtext DEFAULT NULL,
  `jawaban7` longtext DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `date_updated` date DEFAULT NULL,
  `time_created` time DEFAULT NULL,
  `time_updated` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kb_detail_2`
--

INSERT INTO `kb_detail_2` (`id`, `kode_registrasi`, `soal`, `jawaban`, `soal1`, `jawaban1`, `soal2`, `jawaban2`, `soal3`, `jawaban3`, `soal4`, `jawaban4`, `soal5`, `jawaban5`, `soal6`, `jawaban6`, `soal7`, `jawaban7`, `date_created`, `date_updated`, `time_created`, `time_updated`) VALUES
(1, 'REG-20211118-0001', 'Berat Badan Lahir:', '3000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(2, 'REG-20211118-0001', 'Berat Badan Saat Ini:', '15', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(3, 'REG-20211118-0001', 'Tinggi Badan/Panjang Badan Saat Ini:', '95', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(4, 'REG-20211118-0001', 'Cara Persalinan:', 'Vaginam Dengan Tindakan:', 'Sebutkan:', 'Vacuum', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(5, 'REG-20211118-0001', 'Usia Kehamilan Saat lahir:', '9 Bulan', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(6, 'REG-20211118-0001', 'Riwayat Pemberian ASI IMD:', 'Tidak', 'Riwayat Pemberian ASI:', 'Tidak', 'Pengganti:', 'ASI+Susu Formula', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(7, 'REG-20211118-0001', 'Status Nutrisi:', 'Baik', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(8, 'REG-20211118-0001', 'Riwayat Pemberian Imunisasi:', 'Pernah Diberikan', 'Jenis Imuniasi yang pernah diberikan:\r\n                                                                    <24 Jam: Hepatitis, HBO:', 'Ya', '1 Bulan: BCG, OPV1:', 'Ya', '2 Bulan: DPT-HB-Hib1,OPV2:', 'Ya', '3 Bulan: DPT-HB-Hib2,OPV3:', 'Ya', '4 Bulan: DPT-HB-Hib3,OPV4,IPV:', 'Ya', '9 Bulan: MR:', 'Ya', '18 Bulan: MR,DPT-HB-Hib:', 'Ya', '2021-11-18', NULL, '20:50:55', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `kb_detail_3`
--

CREATE TABLE `kb_detail_3` (
  `id` int(11) NOT NULL,
  `kode_registrasi` varchar(17) NOT NULL,
  `soal` longtext DEFAULT NULL,
  `jawaban` longtext DEFAULT NULL,
  `soal1` longtext DEFAULT NULL,
  `jawaban1` longtext DEFAULT NULL,
  `soal2` longtext DEFAULT NULL,
  `jawaban2` longtext DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `date_updated` date DEFAULT NULL,
  `time_created` time DEFAULT NULL,
  `time_updated` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kb_detail_3`
--

INSERT INTO `kb_detail_3` (`id`, `kode_registrasi`, `soal`, `jawaban`, `soal1`, `jawaban1`, `soal2`, `jawaban2`, `date_created`, `date_updated`, `time_created`, `time_updated`) VALUES
(1, 'REG-20211118-0001', 'Usia Balita Saat Meninggal:', '3 tahun, 5 hari', 'Tanggal Kematian:', '2021-11-16', 'Jam Kematian:', '18:30', '2021-11-18', NULL, '20:50:55', NULL),
(2, 'REG-20211118-0001', 'Nama Fasilitas Kesehatan Tempat Kematian:', 'Fasyankes 1', NULL, NULL, NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(3, 'REG-20211118-0001', 'Apakah Balita dibawa dari Rumah ke Fasilitas Kesehatan:', 'Ya', NULL, NULL, NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(4, 'REG-20211118-0001', 'Apakah balita dirujuk dari Fasilitas Kesehatan Lain:', 'Ya', NULL, NULL, NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `kb_detail_4`
--

CREATE TABLE `kb_detail_4` (
  `id` int(11) NOT NULL,
  `kode_registrasi` varchar(17) NOT NULL,
  `soal` longtext DEFAULT NULL,
  `soal1` longtext DEFAULT NULL,
  `soal2` longtext DEFAULT NULL,
  `soal3` longtext DEFAULT NULL,
  `soal4` longtext DEFAULT NULL,
  `soal5` longtext DEFAULT NULL,
  `soal6` longtext DEFAULT NULL,
  `soal7` longtext DEFAULT NULL,
  `soal8` longtext DEFAULT NULL,
  `soal9` longtext DEFAULT NULL,
  `soal10` longtext DEFAULT NULL,
  `soal11` longtext DEFAULT NULL,
  `soal12` longtext DEFAULT NULL,
  `soal13` longtext DEFAULT NULL,
  `soal14` longtext DEFAULT NULL,
  `jawaban` longtext DEFAULT NULL,
  `jawaban1` longtext DEFAULT NULL,
  `jawaban2` longtext DEFAULT NULL,
  `jawaban3` longtext DEFAULT NULL,
  `jawaban4` longtext DEFAULT NULL,
  `jawaban5` longtext DEFAULT NULL,
  `jawaban6` longtext DEFAULT NULL,
  `jawaban7` longtext DEFAULT NULL,
  `jawaban8` longtext DEFAULT NULL,
  `jawaban9` longtext DEFAULT NULL,
  `jawaban10` longtext DEFAULT NULL,
  `jawaban11` longtext DEFAULT NULL,
  `jawaban12` longtext DEFAULT NULL,
  `jawaban13` longtext DEFAULT NULL,
  `jawaban14` longtext DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `date_updated` date DEFAULT NULL,
  `time_created` time DEFAULT NULL,
  `time_updated` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kb_detail_4`
--

INSERT INTO `kb_detail_4` (`id`, `kode_registrasi`, `soal`, `soal1`, `soal2`, `soal3`, `soal4`, `soal5`, `soal6`, `soal7`, `soal8`, `soal9`, `soal10`, `soal11`, `soal12`, `soal13`, `soal14`, `jawaban`, `jawaban1`, `jawaban2`, `jawaban3`, `jawaban4`, `jawaban5`, `jawaban6`, `jawaban7`, `jawaban8`, `jawaban9`, `jawaban10`, `jawaban11`, `jawaban12`, `jawaban13`, `jawaban14`, `date_created`, `date_updated`, `time_created`, `time_updated`) VALUES
(1, 'REG-20211118-0001', 'Penyakit Penyebab Utama Kematian:', 'Diagnosis:', 'Diagnosis:', 'Riwayat Balita Saat Dilahirkan:\r\n                                                                BBLR:', 'Prematuritas:', 'Infeksi Neonatal:', 'Kondisi Perinatal:', 'Malformasi Congenital:', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Ya', 'Pernafasan', NULL, 'Tidak', 'Tidak', 'Tidak', 'Tidak', 'Tidak', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(2, 'REG-20211118-0001', 'Gejala Penyakit yang Dirasakan Sampai Kematian:\r\n                                                                    Panas, berapa lama (hari):', 'Batuk, berapa lama (hari):', 'Sesak Nafas, berapa lama (hari):', 'Nafas Cepat, berapa lama (hari):', 'Tarikan dinding dada, berapa lama (hari):', 'Cuping hidung pernafasan, berapa lama (hari):', 'Nafas berbunyi, berapa lama (hari):', 'Diare, berapa lama (hari):', 'Muntah, berapa lama (hari):', 'Kejang, berapa lama (hari):', 'Letargi, berapa lama (hari):', 'Tidak sadar, berapa lama (hari):', 'Tidak bisa minum, berapa lama (hari):', 'Pendarahan, berapa lama (hari):', 'Lainnya:', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Tidak ada gejala penyakit', '2021-11-18', NULL, '20:50:55', NULL),
(3, 'REG-20211118-0001', 'Kondisi Kronis atau Komordibitas yang Mendasari:', 'Sebutkan:', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tidak Ada', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(4, 'REG-20211118-0001', 'Riwayat penyakit atau kondisi balita/ balita sebelum meninggal:', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'tidak ada riwayat penyakit atau kondisi balita/ balita baik-baik saja sebelum meninggal', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(5, 'REG-20211118-0001', 'Apakah balita memiliki gangguan pertumbuhan dan perkembangan lainnya pada saat kematian?', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tidak', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(6, 'REG-20211118-0001', 'Apakah balita tersebut memiliki gangguan kesehatan mental yang sudah ada sebelumnya pada saat kematian?', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tidak', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(7, 'REG-20211118-0001', 'Faktor intrinsik balita:', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'balita dalam keadaan baik-baik saja sebelum meninggal', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `kb_detail_5`
--

CREATE TABLE `kb_detail_5` (
  `id` int(11) NOT NULL,
  `kode_registrasi` varchar(17) NOT NULL,
  `soal` longtext DEFAULT NULL,
  `soal1` longtext DEFAULT NULL,
  `soal2` longtext DEFAULT NULL,
  `soal3` longtext DEFAULT NULL,
  `soal4` longtext DEFAULT NULL,
  `soal5` longtext DEFAULT NULL,
  `soal6` longtext DEFAULT NULL,
  `soal7` longtext DEFAULT NULL,
  `soal8` longtext DEFAULT NULL,
  `soal9` longtext DEFAULT NULL,
  `soal10` longtext DEFAULT NULL,
  `soal11` longtext DEFAULT NULL,
  `soal12` longtext DEFAULT NULL,
  `soal13` longtext DEFAULT NULL,
  `soal14` longtext DEFAULT NULL,
  `soal15` longtext DEFAULT NULL,
  `soal16` longtext DEFAULT NULL,
  `jawaban` longtext DEFAULT NULL,
  `jawaban1` longtext DEFAULT NULL,
  `jawaban2` longtext DEFAULT NULL,
  `jawaban3` longtext DEFAULT NULL,
  `jawaban4` longtext DEFAULT NULL,
  `jawaban5` longtext DEFAULT NULL,
  `jawaban6` longtext DEFAULT NULL,
  `jawaban7` longtext DEFAULT NULL,
  `jawaban8` longtext DEFAULT NULL,
  `jawaban9` longtext DEFAULT NULL,
  `jawaban10` longtext DEFAULT NULL,
  `jawaban11` longtext DEFAULT NULL,
  `jawaban12` longtext DEFAULT NULL,
  `jawaban13` longtext DEFAULT NULL,
  `jawaban14` longtext DEFAULT NULL,
  `jawaban15` longtext DEFAULT NULL,
  `jawaban16` longtext DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `date_updated` date DEFAULT NULL,
  `time_created` time DEFAULT NULL,
  `time_updated` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kb_detail_5`
--

INSERT INTO `kb_detail_5` (`id`, `kode_registrasi`, `soal`, `soal1`, `soal2`, `soal3`, `soal4`, `soal5`, `soal6`, `soal7`, `soal8`, `soal9`, `soal10`, `soal11`, `soal12`, `soal13`, `soal14`, `soal15`, `soal16`, `jawaban`, `jawaban1`, `jawaban2`, `jawaban3`, `jawaban4`, `jawaban5`, `jawaban6`, `jawaban7`, `jawaban8`, `jawaban9`, `jawaban10`, `jawaban11`, `jawaban12`, `jawaban13`, `jawaban14`, `jawaban15`, `jawaban16`, `date_created`, `date_updated`, `time_created`, `time_updated`) VALUES
(1, 'REG-20211118-0001', 'Faktor lingkungan atau sosial apa yang terlibat dalam kematian balita tersebut?', 'Sebutkan:', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tidak Ada', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(2, 'REG-20211118-0001', 'Penyebab lain:', 'Sebutkan:', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tidak Ada', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(3, 'REG-20211118-0001', 'Personal/ Keluarga/ Masyarakat:\r\n                                                                a. Terlambat Mencari Bantuan', 'b. Menolak pengobatan atau dirawat', 'c. Kepemilikan asuransi', 'Sebutkan nama asuransi:', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tidak', 'Ada', 'BPJS', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(4, 'REG-20211118-0001', 'Kurangnya fasilitas, peralatan atau bahan yang diperlukan', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tidak', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(5, 'REG-20211118-0001', 'Tindakan yang diberikan selama di fasyankes:\r\n                                                                a. Apakah balita diberikan antibiotik?', 'Alasan tidak diberikan antibiotik:', 'b. Apakah balita diberikan intravena?', 'Alasan tidak diberikan intravena:', 'c. Apakah ada pendamping atau konsultan dalam pelaksanaan tindakan?', 'Alasan tidak ada pendamping atau konsultan dalam pelaksanaan tindakan:', 'd. Kondisi parenteral:', 'Alasan tidak diberikan:', 'e. Pemberian Nutrisi', 'Alasan tidak diberikan:', 'f. Pemberian Obat', 'Alasan tidak diberikan:', 'g. Pemberian Cairan', 'Alasan:', 'h. Apakah terdapat tindakan operasi?', 'Alasan:', 'i. Apakah ada tindakan yang dibutuhkan tetapi tidak tersedia?', 'Tidak', 'tidak diperlukan', 'Tidak', 'tidak diperlukan', 'Tidak', 'tidak diperlukan', 'normal', 'Tidak', 'tidak diperlukan', 'Tidak', 'tidak diperlukan', 'Tidak', 'tidak diperlukan', 'Tidak', 'tidak diperlukan', 'Tidak', 'tidak ada', '2021-11-18', NULL, '20:50:55', NULL),
(6, 'REG-20211118-0001', 'Masalah tenaga kesehatan (termasuk berfungsinya petugas) (Kurangnya sumber daya manusia)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tidak', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(7, 'REG-20211118-0001', 'Administrasi (Kesulitan dalam pengurusan Surat Keterangan Tidak Mampu atau akses terhadap JKN KIS)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tidak', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(8, 'REG-20211118-0001', 'Lainnya:\r\n                                                                a. Apakah ada investigasi insiden serius yang bersifat formal atau investigasi internal lembaga lainnya?', 'b. Apakah kematian balita ini termasuk kasus serius (perlindungan balita)/ tinjauan praktik perlindungan balita lokal atau nasional?', 'c. Apakah kematian balita ini termasuk kasus hukum lainnya?', 'd. Apakah kematian balita ini masuk pada penyelidikan kriminal atau polisi?', 'e. Jika salah satu dari investigasi di atas berlaku, berikan rincian', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tidak', 'Tidak', 'Tidak', 'Tidak', 'Tidak', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `kb_detail_6`
--

CREATE TABLE `kb_detail_6` (
  `id` int(11) NOT NULL,
  `kode_registrasi` varchar(17) NOT NULL,
  `soal` longtext DEFAULT NULL,
  `jawaban` longtext DEFAULT NULL,
  `soal1` longtext DEFAULT NULL,
  `jawaban1` longtext DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `date_updated` date DEFAULT NULL,
  `time_created` time DEFAULT NULL,
  `time_updated` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kb_detail_6`
--

INSERT INTO `kb_detail_6` (`id`, `kode_registrasi`, `soal`, `jawaban`, `soal1`, `jawaban1`, `date_created`, `date_updated`, `time_created`, `time_updated`) VALUES
(1, 'REG-20211118-0001', 'Masalah tenaga kesehatan (termasuk berfungsinya petugas)\r\n                                                                Jelaskan:', 'tidak bermasalah', NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(2, 'REG-20211118-0001', 'Siaga (kesiapsiagaan bertindak)', 'Siaga', 'Jelaskan: ', 'siap sedia', '2021-11-18', NULL, '20:50:55', NULL),
(3, 'REG-20211118-0001', 'Respon time', 'Tepat', 'Jelaskan:', 'sangat cepat', '2021-11-18', NULL, '20:50:55', NULL),
(4, 'REG-20211118-0001', 'Pelayanan Administrasi\r\n                                                                Jelaskan', 'sangat baik', NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(5, 'REG-20211118-0001', 'Kepatuhan tenaga kesehatan dalam menerapkan SOP di wilayah kerjanya\r\n                                                                Jelaskan', 'sangat baik', NULL, NULL, '2021-11-18', NULL, '20:50:55', NULL),
(6, 'REG-20211118-0001', 'Ketersediaan farmasi', 'Tersedia', 'Jelaskan:', 'farmasi tersedia 24jam', '2021-11-18', NULL, '20:50:55', NULL),
(7, 'REG-20211118-0001', 'Ketersedian alat kesehatan/penunjang pemeriksaan laboratorium di fasilitas pelayanan kesehatan', 'Ada', 'Jelaskan:', 'tersedia jika dibutuhkan', '2021-11-18', NULL, '20:50:55', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `kb_detail_7`
--

CREATE TABLE `kb_detail_7` (
  `id` int(11) NOT NULL,
  `kode_registrasi` varchar(17) NOT NULL,
  `soal` longtext DEFAULT NULL,
  `jawaban` longtext DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `date_updated` date DEFAULT NULL,
  `time_created` time DEFAULT NULL,
  `time_updated` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kb_detail_7`
--

INSERT INTO `kb_detail_7` (`id`, `kode_registrasi`, `soal`, `jawaban`, `date_created`, `date_updated`, `time_created`, `time_updated`) VALUES
(1, 'REG-20211118-0001', 'Penyebab kematian langsung\r\n                                                                Jelaskan:', 'test kesimpulan penyebab kematian langsung', '2021-11-18', NULL, '20:50:55', NULL),
(2, 'REG-20211118-0001', 'Penyebab kematian antara/ underlying\r\n                                                                Jelaskan:', 'test kesimpulan penyebab kematian antara/ underlying', '2021-11-18', NULL, '20:50:55', NULL),
(3, 'REG-20211118-0001', 'Penyebab kematian dasar/ lainnya\r\n                                                                Jelaskan:', 'test kesimpulan penyebab kematian dasar/ lainnya', '2021-11-18', NULL, '20:50:55', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `kb_header`
--

CREATE TABLE `kb_header` (
  `id` int(11) NOT NULL,
  `kode_registrasi` varchar(17) NOT NULL,
  `id_user` int(11) NOT NULL,
  `nama_balita` varchar(256) NOT NULL,
  `tanggal_lahir_balita` date NOT NULL,
  `nama_ibu` varchar(256) NOT NULL,
  `date_created` date DEFAULT NULL,
  `date_updated` date DEFAULT NULL,
  `time_created` time DEFAULT NULL,
  `time_updated` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kb_header`
--

INSERT INTO `kb_header` (`id`, `kode_registrasi`, `id_user`, `nama_balita`, `tanggal_lahir_balita`, `nama_ibu`, `date_created`, `date_updated`, `time_created`, `time_updated`) VALUES
(1, 'REG-20211118-0001', 2, 'Gege', '2018-11-11', 'Rere', '2021-11-18', NULL, '20:50:55', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kb_account`
--
ALTER TABLE `kb_account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kb_detail_1`
--
ALTER TABLE `kb_detail_1`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kb_detail_2`
--
ALTER TABLE `kb_detail_2`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kb_detail_3`
--
ALTER TABLE `kb_detail_3`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kb_detail_4`
--
ALTER TABLE `kb_detail_4`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kb_detail_5`
--
ALTER TABLE `kb_detail_5`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kb_detail_6`
--
ALTER TABLE `kb_detail_6`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kb_detail_7`
--
ALTER TABLE `kb_detail_7`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kb_header`
--
ALTER TABLE `kb_header`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kb_account`
--
ALTER TABLE `kb_account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `kb_detail_1`
--
ALTER TABLE `kb_detail_1`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `kb_detail_2`
--
ALTER TABLE `kb_detail_2`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `kb_detail_3`
--
ALTER TABLE `kb_detail_3`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `kb_detail_4`
--
ALTER TABLE `kb_detail_4`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `kb_detail_5`
--
ALTER TABLE `kb_detail_5`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `kb_detail_6`
--
ALTER TABLE `kb_detail_6`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `kb_detail_7`
--
ALTER TABLE `kb_detail_7`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `kb_header`
--
ALTER TABLE `kb_header`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
