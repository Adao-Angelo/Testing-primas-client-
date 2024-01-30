import { PrismaClient } from "@prisma/client";
import festify from "fastify";
import { pid } from "process";
import { z } from "zod";
const prisma = new PrismaClient();
const app = festify();

app.get("/users", async () => {
  const users = await prisma.user.findMany();
  return { users };
});

app.post("/users", async (request, replay) => {
  const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
  });
  const { name, email } = createUserSchema.parse(request.body);

  await prisma.user.create({
    data: {
      name,
      email,
    },
  });

  return replay.status(201).send();
});

app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 4000,
  })
  .then(() => {
    console.log("Http server running");
  });
