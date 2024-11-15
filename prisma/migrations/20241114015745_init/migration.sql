/*
  Warnings:

  - You are about to drop the column `quanity` on the `suborder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `suborder` DROP COLUMN `quanity`,
    ADD COLUMN `quantity` INTEGER NULL;
