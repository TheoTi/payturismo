-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(26) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `role` ENUM('admin', 'analyst') NOT NULL DEFAULT 'analyst',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `agencies` (
    `id` VARCHAR(26) NOT NULL,
    `fantasyName` VARCHAR(191) NOT NULL,
    `corporateName` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NOT NULL,
    `stateRegistration` VARCHAR(191) NULL,
    `municipalRegistration` VARCHAR(191) NULL,
    `status` ENUM('active', 'inactive', 'pending', 'suspended') NOT NULL DEFAULT 'pending',
    `foundationDate` DATETIME(3) NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `website` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `agencies_cnpj_key`(`cnpj`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
