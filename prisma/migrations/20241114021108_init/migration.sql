/*
  Warnings:

  - You are about to drop the column `alamat` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `alamat`;

-- AlterTable
ALTER TABLE `suborder` ADD COLUMN `alamat` VARCHAR(191) NOT NULL DEFAULT '';
