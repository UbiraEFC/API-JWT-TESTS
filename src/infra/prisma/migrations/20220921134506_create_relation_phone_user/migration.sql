/*
  Warnings:

  - Added the required column `userId` to the `phones` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `phones` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `phones` ADD CONSTRAINT `phones_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
