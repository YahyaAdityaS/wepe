/*
  Warnings:

  - You are about to drop the column `tanggal` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalBayar` on the `order` table. All the data in the column will be lost.
  - Added the required column `updateAt` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `admin` ADD COLUMN `uuid` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `customer` ADD COLUMN `uuid` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `order` DROP COLUMN `tanggal`,
    DROP COLUMN `tanggalBayar`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL,
    ADD COLUMN `uuid` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `produk` ADD COLUMN `uuid` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `suborder` ADD COLUMN `uuid` VARCHAR(191) NOT NULL DEFAULT '';
