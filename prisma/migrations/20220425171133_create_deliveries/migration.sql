-- CreateTable
CREATE TABLE "Deliveries" (
    "id" TEXT NOT NULL,
    "id_client" TEXT NOT NULL,
    "id_delivery" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Deliveries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Deliveries" ADD CONSTRAINT "Deliveries_id_delivery_fkey" FOREIGN KEY ("id_delivery") REFERENCES "deliveryman"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deliveries" ADD CONSTRAINT "Deliveries_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
