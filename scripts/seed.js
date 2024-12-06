import bcrypt from 'bcryptjs';
import db from '../src/lib/db/index.js';

async function seed() {
  try {
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    db.prepare(`
      INSERT OR REPLACE INTO users (id, email, name, password, role, is_active)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      'admin',
      'admin@iamtechnology.store',
      'Admin',
      hashedPassword,
      'admin',
      1
    );

    console.log('✅ Database seeded successfully');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();