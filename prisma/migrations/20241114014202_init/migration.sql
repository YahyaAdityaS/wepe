-- AlterTable
ALTER TABLE `order` ADD COLUMN `alamat` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `idproduk` INTEGER NULL;

-- AlterTable
ALTER TABLE `suborder` ADD COLUMN `note` VARCHAR(191) NULL,
    ADD COLUMN `quanity` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_idproduk_fkey` FOREIGN KEY (`idproduk`) REFERENCES `produk`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
