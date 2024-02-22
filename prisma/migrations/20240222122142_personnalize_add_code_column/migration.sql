/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Personnalize` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Personnalize` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Personnalize` ADD COLUMN `code` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Post` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Post_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Personnalize_code_key` ON `Personnalize`(`code`);
