/*
  Warnings:

  - A unique constraint covering the columns `[clothingId]` on the table `Clothing` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Clothing_clothingId_key" ON "Clothing"("clothingId");
