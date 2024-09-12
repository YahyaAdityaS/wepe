/*
  Warnings:

  - You are about to drop the column `jumlah` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `subTotal` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `jumlah`,
    DROP COLUMN `subTotal`;

-- CreateTable
CREATE TABLE `subOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idOrder` INTEGER NULL,
    `idProduk` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `subOrder` ADD CONSTRAINT `subOrder_idOrder_fkey` FOREIGN KEY (`idOrder`) REFERENCES `order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subOrder` ADD CONSTRAINT `subOrder_idProduk_fkey` FOREIGN KEY (`idProduk`) REFERENCES `produk`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
