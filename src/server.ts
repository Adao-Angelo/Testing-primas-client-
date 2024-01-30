import { PrismaClient } from "@prisma/client";
import festify from "fastify";

const prisma = new PrismaClient();
const app = festify();

app.get("/users", async () => {
  const users = await prisma.user.findMany();
  return { users };
});

app.post("/users", (request) => {
  const { name, email } = request.body;
});

