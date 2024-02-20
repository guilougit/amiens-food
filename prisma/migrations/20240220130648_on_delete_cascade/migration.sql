-- DropForeignKey
ALTER TABLE `Media` DROP FOREIGN KEY `Media_partnerId_fkey`;

-- DropForeignKey
ALTER TABLE `Offer` DROP FOREIGN KEY `Offer_partnerId_fkey`;

-- AddForeignKey
ALTER TABLE `Offer` ADD CONSTRAINT `Offer_partnerId_fkey` FOREIGN KEY (`partnerId`) REFERENCES `Partner`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Media` ADD CONSTRAINT `Media_partnerId_fkey` FOREIGN KEY (`partnerId`) REFERENCES `Partner`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
