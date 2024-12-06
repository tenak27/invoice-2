import { readFileSync } from 'fs';
import { join } from 'path';
import db from '../src/lib/db/index.js';

const MIGRATIONS_DIR = join(process.cwd(), 'src', 'lib', 'db', 'migrations');

try {
  // Read and execute migrations
  const migration = readFileSync(join(MIGRATIONS_DIR, '001_initial.sql'), 'utf8');
  
  // Split migration into up/down parts
  const [up] = migration.split('-- Down');
  
  // Execute migration
  db.exec(up);
  
  console.log('✅ Migrations completed successfully');
} catch (error) {
  console.error('❌ Migration failed:', error);
  process.exit(1);
}