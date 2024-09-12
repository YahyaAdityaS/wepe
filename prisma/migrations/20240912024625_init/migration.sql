/*
  Warnings:

  - A unique constraint covering the columns `[telepon]` on the table `admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[telepon]` on the table `customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `produk` MODIFY `deskripsi` TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX `admin_telepon_key` ON `admin`(`telepon`);

-- CreateIndex
CREATE UNIQUE INDEX `customer_telepon_key` ON `customer`(`telepon`);
