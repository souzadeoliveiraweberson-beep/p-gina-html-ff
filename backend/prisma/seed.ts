import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await argon2.hash('admin123');

  const user = await prisma.users.create({
    data: {
      name: 'Demo Admin',
      email: 'admin@demo.com',
      password_hash: adminPassword,
    },
  });

  const role = await prisma.roles.create({
    data: {
      name: 'Admin',
      description: 'Administrator role (DEMONSTRATIVO)',
    },
  });

  await prisma.user_roles.create({
    data: {
      user_id: user.id,
      role_id: role.id,
    },
  });

  const election = await prisma.elections.create({
    data: {
      name: 'Election RO 2026 (DEMONSTRATIVO)',
      date: new Date('2026-10-04'),
      status: 'ACTIVE',
    },
  });

  const research = await prisma.researches.create({
    data: {
      election_id: election.id,
      name: 'Pesquisa RO 2026 (DEMONSTRATIVO)',
      status: 'ATIVA',
      start_date: new Date(),
    },
  });

  console.log('Seed executed successfully: DEMONSTRATIVO data created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
