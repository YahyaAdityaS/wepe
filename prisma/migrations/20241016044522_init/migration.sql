/*
  Warnings:

  - You are about to drop the column `idCustomer` on the `order` table. All the data in the column will be lost.
  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_idCustomer_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `idCustomer`,
    ADD COLUMN `idUser` INTEGER NULL;

-- DropTable
DROP TABLE `admin`;

-- DropTable
DROP TABLE `customer`;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL DEFAULT '',
    `nama` VARCHAR(191) NOT NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL DEFAULT '',
    `password` VARCHAR(191) NOT NULL DEFAULT '',
    `alamat` VARCHAR(191) NOT NULL DEFAULT '',
    `telepon` VARCHAR(191) NOT NULL DEFAULT '',
    `foto` VARCHAR(191) NOT NULL DEFAULT '',

    UNIQUE INDEX `user_email_key`(`email`),
    UNIQUE INDEX `user_telepon_key`(`telepon`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
