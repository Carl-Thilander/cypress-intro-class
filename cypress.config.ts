import { defineConfig } from "cypress";
import { db } from "./prisma/db";
import { seedTodos } from "./prisma/seed/todo";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        // 1. Skapa en in-memory databas (replica set prisma gnäller annars)
        // 2. Starta Next.js servern (på en annan port som ansluter till 1.)
        // 3. Vänta på att Next.js servern är igång innan cypress kör vidare
        // 4. Städa upp processerna dvs Mongo databasen och Next.js servern
        // 5. Reseeda om databasen så att testerna blir oberoende av varandra

        async reseed() {
          await db.todo.deleteMany();
          await seedTodos();

          return null;
        },
      });
    },
  },
});
