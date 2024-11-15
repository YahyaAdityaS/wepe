/*
  Warnings:

  - You are about to drop the column `foto` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `foto`,
    ADD COLUMN `buktiBayar` VARCHAR(191) NOT NULL DEFAULT '';
