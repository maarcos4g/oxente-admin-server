/*
  Warnings:

  - Added the required column `clothingId` to the `Clothing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isParcel` to the `Clothing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Clothing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Clothing` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Color" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "color" TEXT NOT NULL,
    "clothingId" TEXT,
    CONSTRAINT "Color_clothingId_fkey" FOREIGN KEY ("clothingId") REFERENCES "Clothing" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Size" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "size" TEXT NOT NULL,
    "clothingId" TEXT,
    CONSTRAINT "Size_clothingId_fkey" FOREIGN KEY ("clothingId") REFERENCES "Clothing" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fileUrl" TEXT NOT NULL,
    "clothingId" TEXT,
    CONSTRAINT "Image_clothingId_fkey" FOREIGN KEY ("clothingId") REFERENCES "Clothing" ("id") ON DELETE SET NULL ON UPDATE CASCADE
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
INSERT INTO "new_Clothing" ("id") SELECT "id" FROM "Clothing";
DROP TABLE "Clothing";
ALTER TABLE "new_Clothing" RENAME TO "Clothing";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
