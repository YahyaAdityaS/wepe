/*
  Warnings:

  - You are about to drop the column `idproduk` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `alamat` on the `suborder` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_idproduk_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `idproduk`,
    ADD COLUMN `alamat` VARCHAR(191) NULL,
    ADD COLUMN `produkId` INTEGER NULL;

-- AlterTable
ALTER TABLE `suborder` DROP COLUMN `alamat`;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_produkId_fkey` FOREIGN KEY (`produkId`) REFERENCES `produk`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
