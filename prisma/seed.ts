import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  
  await prisma.cartItems.deleteMany();
  await prisma.images.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  
  const user1 = await prisma.user.create({
    data: {
      name: "Alice Johnson",
      email: "alice@example.com",
      phoneNumber: "1234567890",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Bob Smith",
      email: "bob@example.com",
      phoneNumber: "0987654321",
    },
  });

  
  const product1 = await prisma.product.create({
    data: {
      name: "Apple",
      itemQuantity: 100,
      itemWeight: "1kg",
      price: 3,
      images: {
        create: [
          { imageLink: "https://via.placeholder.com/150?text=Apple" },
          { imageLink: "https://via.placeholder.com/150?text=Apple+2" },
        ],
      },
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Banana",
      itemQuantity: 200,
      itemWeight: "1kg",
      price: 2,
      images: {
        create: [
          { imageLink: "https://via.placeholder.com/150?text=Banana" },
        ],
      },
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: "Orange",
      itemQuantity: 150,
      itemWeight: "1kg",
      price: 4,
      images: {
        create: [
          { imageLink: "https://via.placeholder.com/150?text=Orange" },
        ],
      },
    },
  });

  
  await prisma.cartItems.create({
    data: {
      userId: user1.id,
      productId: product1.id,
      quantity: 2,
    },
  });

  await prisma.cartItems.create({
    data: {
      userId: user1.id,
      productId: product2.id,
      quantity: 1,
    },
  });

  
  await prisma.cartItems.create({
    data: {
      userId: user2.id,
      productId: product3.id,
      quantity: 5,
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
