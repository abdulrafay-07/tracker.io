-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('Pending', 'Accepted', 'Rejected');

-- CreateTable
CREATE TABLE "Jobs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "status" "JobStatus" NOT NULL,
    "applicationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Jobs_pkey" PRIMARY KEY ("id")
);
