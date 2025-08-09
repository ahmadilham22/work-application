-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Applied', 'Interviewed', 'Rejected', 'Accepted');

-- CreateTable
CREATE TABLE "jobs" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "company" VARCHAR(100) NOT NULL,
    "position" VARCHAR(100) NOT NULL,
    "salary" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
