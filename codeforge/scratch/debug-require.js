
try {
  const m = require('lightningcss-win32-x64-msvc');
  console.log('✅ Successfully required lightningcss-win32-x64-msvc');
  console.log('Exports:', Object.keys(m));
} catch (err) {
  console.error('❌ Failed to require lightningcss-win32-x64-msvc');
  console.error('Error:', err.message);
  if (err.code) console.error('Code:', err.code);
  console.error('Stack:', err.stack);
}
