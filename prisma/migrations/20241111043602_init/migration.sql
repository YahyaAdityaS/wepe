-- AlterTable
ALTER TABLE `order` ADD COLUMN `totalBayar` INTEGER NULL,
    MODIFY `status` ENUM('DONE', 'PAID', 'NEW') NOT NULL DEFAULT 'NEW';
