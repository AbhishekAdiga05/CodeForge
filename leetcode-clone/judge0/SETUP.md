# Judge0 Code Execution Setup for Windows

This guide will help you set up Judge0 CE (Community Edition) for your LeetCode clone project.

## ⚠️ Important: Windows Compatibility Note

**Local Docker Setup on Windows has limitations:**
- Judge0 uses `isolate` sandbox which requires Linux cgroups v1
- Docker Desktop on Windows uses cgroups v2, causing compatibility issues
- **Recommended for Windows development: Use the free Judge0 Cloud API**

## Option 1: Use Judge0 Cloud API (Recommended for Windows)

The easiest option for Windows development is to use the free Judge0 cloud API.

### Setup

Add to your `.env.local`:
```env
JUDGE0_API_URL=https://ce.judge0.com
JUDGE0_AUTH_TOKEN=
```

That's it! The cloud API is free for basic usage and works immediately.

### Rate Limits
- Free tier: ~100 submissions per day
- No authentication required for basic usage

---

## Option 2: Local Docker Setup (Linux/Mac Only)

> **Note:** This option is NOT recommended for Windows due to cgroups compatibility issues.

## Prerequisites

### 1. Install Docker Desktop for Windows

1. **Download Docker Desktop**: https://www.docker.com/products/docker-desktop/
2. **Run the installer** and follow the installation wizard
3. **Enable WSL 2** during installation (recommended for better performance)
4. **Restart your computer** after installation

### 2. Enable WSL 2 (if not already enabled)

Open PowerShell as Administrator and run:

```powershell
# Enable WSL
wsl --install

# Set WSL 2 as default
wsl --set-default-version 2
```

### 3. Verify Docker Installation

Open a new terminal and run:

```powershell
docker --version
docker-compose --version
```

## Quick Start

### Step 1: Navigate to the Judge0 folder

```powershell
cd "c:\Users\abhis\OneDrive\Desktop\Next.Js\Major Projects\Project-1\leetcode-clone\judge0"
```

### Step 2: Start Judge0 Services

```powershell
# Start all services (this may take a few minutes on first run)
docker-compose up -d
```

This will download and start:

- **Judge0 Server** (port 2358) - The main API
- **Judge0 Workers** - Handles code execution
- **PostgreSQL** - Database for submissions
- **Redis** - Queue management

### Step 3: Verify Services are Running

```powershell
# Check if all containers are running
docker-compose ps

# Check Judge0 health
curl http://localhost:2358/workers
```

Or open http://localhost:2358/workers in your browser.

### Step 4: Test Code Execution

You can test the setup with:

```powershell
# Test a simple Python code execution
curl -X POST http://localhost:2358/submissions?wait=true ^
  -H "Content-Type: application/json" ^
  -d "{\"source_code\": \"print('Hello, World!')\", \"language_id\": 71}"
```

## Managing Judge0

### Start Services

```powershell
cd judge0
docker-compose up -d
```

### Stop Services

```powershell
cd judge0
docker-compose down
```

### View Logs

```powershell
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f server
docker-compose logs -f workers
```

### Restart Services

```powershell
docker-compose restart
```

### Remove Everything (including data)

```powershell
docker-compose down -v
```

## Environment Variables

Add these to your `.env.local` file in the project root:

```env
# Judge0 Configuration
JUDGE0_API_URL=http://localhost:2358
JUDGE0_AUTH_TOKEN=your-secret-auth-token-change-me
```

## Usage in Your Application

### Basic Code Execution

```javascript
import { submitCode, LANGUAGE_IDS } from "@/lib/judge0";

// Execute Python code
const result = await submitCode({
  sourceCode: "print('Hello, World!')",
  languageId: LANGUAGE_IDS.python,
  stdin: "",
});

console.log(result.stdout); // "Hello, World!"
```

### Running Code with Test Cases

```javascript
import { runCodeWithTests } from "@/lib/judge0";

const results = await runCodeWithTests({
  sourceCode: `
def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Read input
nums = eval(input())
target = int(input())
print(twoSum(nums, target))
  `,
  language: "python",
  testCases: [
    { input: "[2,7,11,15]\n9", expectedOutput: "[0, 1]" },
    { input: "[3,2,4]\n6", expectedOutput: "[1, 2]" },
  ],
});

console.log(results);
// {
//   success: true,
//   totalTests: 2,
//   passedTests: 2,
//   results: [...]
// }
```

### Using the API Route

```javascript
// From your frontend
const response = await fetch("/api/execute", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    sourceCode: "console.log('Hello!')",
    language: "javascript",
  }),
});

const data = await response.json();
console.log(data.data.output); // "Hello!"
```

## Supported Languages

| Language  | ID  | Language   | ID  |
| --------- | --- | ---------- | --- |
| Python 3  | 71  | JavaScript | 63  |
| Python 2  | 70  | TypeScript | 74  |
| C         | 50  | Java       | 62  |
| C++       | 54  | Go         | 60  |
| C# (Mono) | 51  | Rust       | 73  |
| Ruby      | 72  | Swift      | 83  |
| PHP       | 68  | Kotlin     | 78  |

Full list available at: https://ce.judge0.com/languages

## Troubleshooting

### Docker not starting?

- Make sure WSL 2 is enabled
- Restart Docker Desktop
- Check Windows Features: "Virtual Machine Platform" and "Windows Subsystem for Linux" should be enabled

### Port 2358 already in use?

```powershell
# Find what's using the port
netstat -ano | findstr :2358

# Kill the process (replace PID with the actual process ID)
taskkill /PID <PID> /F
```

### Services not healthy?

```powershell
# Check container status
docker-compose ps

# Check logs for errors
docker-compose logs server
docker-compose logs db
```

### Memory issues?

Judge0 requires at least 4GB of RAM. You can adjust Docker Desktop memory allocation:

1. Open Docker Desktop
2. Go to Settings → Resources
3. Increase Memory to at least 4GB
4. Apply & Restart

### First time setup takes too long?

The first run downloads all required images (~2-3GB). This is normal and only happens once.

## Security Notes

For production deployment:

1. **Change passwords** in `judge0.conf`:
   - `POSTGRES_PASSWORD`
   - `REDIS_PASSWORD`
   - `AUTHN_TOKEN`

2. **Enable authentication**:
   - Set `DISABLE_AUTH=false` in `judge0.conf`

3. **Use a reverse proxy** (nginx/traefik) with HTTPS

4. **Limit resources** appropriately based on your infrastructure

## Resources

- [Judge0 Documentation](https://github.com/judge0/judge0)
- [Judge0 API Docs](https://ce.judge0.com/)
- [Docker Desktop for Windows](https://docs.docker.com/desktop/windows/install/)
