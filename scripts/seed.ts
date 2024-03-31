const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

const createDummyCategories = async () => {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Music" },
        { name: "Fitness" },
        { name: "Photography" },
        { name: "Accounting" },
        { name: "Engeneering" },
        { name: "Data science" },
        { name: "Web development" },
        { name: "Filming" },
        { name: "Trading" },
        { name: "Finance" },
        { name: "Technology" },
      ],
    });

    console.log("Successfully added categories");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect;
  }
};

createDummyCategories();
