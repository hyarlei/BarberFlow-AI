import { PrismaClient } from "@prisma/client";

// Load test environment variables
process.env.NODE_ENV = 'test';

// Setup for E2E tests
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || "postgresql://barberflow_user:barberflow_pass@localhost:5432/barberflow_test"
    }
  }
});

beforeAll(async () => {
  try {
    // Connect to test database
    await prisma.$connect();
    console.log('✅ Connected to test database');
    
    // Clean up test database
    await cleanDatabase();
  } catch (error) {
    console.error('❌ Failed to connect to test database:', error);
    throw error;
  }
}, 30000);

afterAll(async () => {
  try {
    // Cleanup and disconnect
    await cleanDatabase();
    await prisma.$disconnect();
    console.log('✅ Disconnected from test database');
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  }
}, 30000);

// Helper function to clean database
async function cleanDatabase() {
  const tablenames = await prisma.$queryRaw<Array<{ tablename: string }>>`
    SELECT tablename FROM pg_tables WHERE schemaname='public'
  `;

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== '_prisma_migrations')
    .map((name) => `"public"."${name}"`)
    .join(', ');

  try {
    if (tables.length > 0) {
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
    }
  } catch (error) {
    console.log('Note: Some tables might not exist yet, which is normal for first run');
  }
}
