
const axios = require('axios');

async function testJudge0() {
  const url = 'https://ce.judge0.com/about';
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      console.log('✅ Judge0 API is reachable!');
      console.log('Version:', response.data.version);
    } else {
      console.log('❌ Judge0 API returned status:', response.status);
    }
  } catch (err) {
    console.error('❌ Judge0 API is not reachable:', err.message);
  }
}

testJudge0();
