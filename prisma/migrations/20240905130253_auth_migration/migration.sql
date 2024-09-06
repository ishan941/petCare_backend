-- CreateTable
CREATE TABLE "Authorization" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "method" TEXT[],

    CONSTRAINT "Authorization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "roleId" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("roleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Authorization_id_key" ON "Authorization"("id");

-- CreateIndex
CREATE UNIQUE INDEX "role_role_key" ON "role"("role");

-- AddForeignKey
ALTER TABLE "Authorization" ADD CONSTRAINT "Authorization_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("roleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authorization" ADD CONSTRAINT "Authorization_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
