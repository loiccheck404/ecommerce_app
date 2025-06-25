import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const electronics = await prisma.category.create({
    data: {
      name: "ELectronics",
      description: "Electronic devices and gadgets",
    },
  });

  const clothing = await prisma.category.create({
    data: {
      name: "Clothing",
      description: "Fashion and apparel",
    },
  });

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);
  await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  // Create sample products
  await prisma.product.createMany({
    data: [
      {
        name: "iPhone 15",
        description: "Latest iPhone with advanced features",
        price: 999.99,
        sku: "IP15-001",
        inventory: 50,
        images: ["https://example.com/iphone15.jpg"],
        categoryId: electronics.id,
        featured: true,
      },
      {
        name: "Classic T-Shirt",
        description: "Comfortable cotton t-shirt",
        price: 29.99,
        sku: "TS-001",
        inventory: 100,
        images: ["https://example.com/tshirt.jpg"],
        categoryId: clothing.id,
      },
    ],
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
