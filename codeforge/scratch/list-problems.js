
const { db } = require('./lib/db');

async function listProblems() {
  try {
    const problems = await db.problem.findMany();
    console.log(`Found ${problems.length} problems.`);
    problems.forEach(p => {
      console.log(`- [${p.id}] ${p.title} (${p.difficulty})`);
    });
  } catch (err) {
    console.error('❌ Error fetching problems:', err.message);
  }
}

listProblems();
