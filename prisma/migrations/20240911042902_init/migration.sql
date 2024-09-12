-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL DEFAULT '',
    `password` VARCHAR(191) NOT NULL DEFAULT '',
    `telepon` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL DEFAULT '',
    `password` VARCHAR(191) NOT NULL DEFAULT '',
    `alamat` VARCHAR(191) NOT NULL DEFAULT '',
    `telepon` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `customer_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idCustomer` INTEGER NULL,
    `jumlah` INTEGER NOT NULL DEFAULT 0,
    `subTotal` INTEGER NOT NULL DEFAULT 0,
    `tanggal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tanggalBayar` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `metodeBayar` ENUM('CASH', 'QRIS') NOT NULL DEFAULT 'QRIS',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL DEFAULT '',
    `deskripsi` VARCHAR(191) NOT NULL DEFAULT '',
    `harga` INTEGER NOT NULL DEFAULT 0,
    `stok` INTEGER NOT NULL DEFAULT 0,
    `foto` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_idCustomer_fkey` FOREIGN KEY (`idCustomer`) REFERENCES `customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
