import { defineConfig } from "cypress";
import { MongoMemoryReplSet } from "mongodb-memory-server";
import { seedTodos } from "./prisma/seed/todo";

export default defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      // 1. Skapa en in-memory databas (replica set prisma gnäller annars)
      const db = await MongoMemoryReplSet.create({ replSet: { count: 1 } });
      const dbUri = db.getUri("cypress-test");

      // 2. Starta Next.js servern (på en annan port som ansluter till 1.)
      // 3. Vänta på att Next.js servern är igång innan cypress kör vidare
      // 4. Städa upp processerna dvs Mongo databasen och Next.js servern
      // 5. Reseeda om databasen så att testerna blir oberoende av varandra

      on("task", {
        async reseed() {
          await db.todo.deleteMany();
          await seedTodos();

          return null;
        },
      });
    },
  },
});
