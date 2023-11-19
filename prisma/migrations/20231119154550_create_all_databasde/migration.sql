-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clothing" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "clothingId" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "isParcel" BOOLEAN NOT NULL,
    "numberOfParcel" TEXT,
    "parcelValue" DECIMAL(65,30),

    CONSTRAINT "Clothing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Color" (
    "id" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "clothingId" TEXT,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Size" (
    "id" TEXT NOT NULL,
    "size" TEXT NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClothingSize" (
    "id" TEXT NOT NULL,
    "clothingId" TEXT NOT NULL,
    "sizeId" TEXT NOT NULL,

    CONSTRAINT "ClothingSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "clothingId" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clothing_clothingId_key" ON "Clothing"("clothingId");

-- CreateIndex
CREATE UNIQUE INDEX "ClothingSize_clothingId_sizeId_key" ON "ClothingSize"("clothingId", "sizeId");

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_clothingId_fkey" FOREIGN KEY ("clothingId") REFERENCES "Clothing"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClothingSize" ADD CONSTRAINT "ClothingSize_clothingId_fkey" FOREIGN KEY ("clothingId") REFERENCES "Clothing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClothingSize" ADD CONSTRAINT "ClothingSize_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_clothingId_fkey" FOREIGN KEY ("clothingId") REFERENCES "Clothing"("id") ON DELETE SET NULL ON UPDATE CASCADE;
