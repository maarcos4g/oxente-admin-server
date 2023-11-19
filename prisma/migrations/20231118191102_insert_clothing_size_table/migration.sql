/*
  Warnings:

  - You are about to drop the column `sizeId` on the `Clothing` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "ClothingSize" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clothingId" TEXT NOT NULL,
    "sizeId" TEXT NOT NULL,
    CONSTRAINT "ClothingSize_clothingId_fkey" FOREIGN KEY ("clothingId") REFERENCES "Clothing" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ClothingSize_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Clothing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "clothingId" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "isParcel" BOOLEAN NOT NULL,
    "numberOfParcel" TEXT,
    "parcelValue" DECIMAL
);
INSERT INTO "new_Clothing" ("clothingId", "id", "isParcel", "numberOfParcel", "parcelValue", "price", "title") SELECT "clothingId", "id", "isParcel", "numberOfParcel", "parcelValue", "price", "title" FROM "Clothing";
DROP TABLE "Clothing";
ALTER TABLE "new_Clothing" RENAME TO "Clothing";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "ClothingSize_clothingId_sizeId_key" ON "ClothingSize"("clothingId", "sizeId");
