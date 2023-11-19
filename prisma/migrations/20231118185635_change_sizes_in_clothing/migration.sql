/*
  Warnings:

  - You are about to drop the column `clothingId` on the `Size` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Clothing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "clothingId" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "isParcel" BOOLEAN NOT NULL,
    "numberOfParcel" TEXT,
    "parcelValue" DECIMAL,
    "sizeId" TEXT,
    CONSTRAINT "Clothing_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Clothing" ("clothingId", "id", "isParcel", "numberOfParcel", "parcelValue", "price", "title") SELECT "clothingId", "id", "isParcel", "numberOfParcel", "parcelValue", "price", "title" FROM "Clothing";
DROP TABLE "Clothing";
ALTER TABLE "new_Clothing" RENAME TO "Clothing";
CREATE TABLE "new_Size" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "size" TEXT NOT NULL
);
INSERT INTO "new_Size" ("id", "size") SELECT "id", "size" FROM "Size";
DROP TABLE "Size";
ALTER TABLE "new_Size" RENAME TO "Size";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
