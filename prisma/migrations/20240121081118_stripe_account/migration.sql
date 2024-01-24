-- CreateTable
CREATE TABLE `StripeAccount` (
    `id` VARCHAR(191) NOT NULL,
    `customer_id` VARCHAR(191) NOT NULL,
    `subscription` VARCHAR(191) NOT NULL,
    `plan` ENUM('MONTHLY', 'ANNUALLY') NOT NULL DEFAULT 'MONTHLY',
    `userId` VARCHAR(191) NOT NULL,
    `sub_valid` BOOLEAN NOT NULL DEFAULT false,
    `start` DATETIME(3) NULL,

    UNIQUE INDEX `StripeAccount_customer_id_key`(`customer_id`),
    UNIQUE INDEX `StripeAccount_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StripeAccount` ADD CONSTRAINT `StripeAccount_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
