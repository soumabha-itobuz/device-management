-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('CUSTOMER', 'OWNER');

-- CreateTable
CREATE TABLE "User" (
    "_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "verificationToken" TEXT,
    "userType" "UserType" NOT NULL,
    "wrongPasswordAttempt" DOUBLE PRECISION,
    "lockoutTime" TIMESTAMP(3),
    "twoFactorAuthToken" TEXT,
    "roleId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
