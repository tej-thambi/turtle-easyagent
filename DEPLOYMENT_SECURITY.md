# EasyAgent Deployment Security Guide

**Version:** 1.0
**Last Updated:** February 18, 2026
**Status:** Pre-Production Checklist

---

## Table of Contents
1. [Environment Security](#1-environment-security)
2. [Deployment Platforms](#2-deployment-platforms)
3. [Security Headers](#3-security-headers)
4. [Secrets Management](#4-secrets-management)
5. [Data Protection](#5-data-protection)
6. [Monitoring & Logging](#6-monitoring--logging)
7. [Incident Response](#7-incident-response)
8. [Compliance](#8-compliance)

---

## 1. Environment Security

### 1.1 Development Environment
```bash
# .env.local (local development only - DO NOT COMMIT)
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
NEXT_PUBLIC_LOG_LEVEL=debug
```

### 1.2 Staging Environment
```bash
# .env.staging (managed in CI/CD secrets)
NEXT_PUBLIC_API_URL=https://staging-api.easyagent.io
NODE_ENV=staging
NEXT_PUBLIC_LOG_LEVEL=info
DATABASE_URL=*** (from secrets manager)
ENCRYPTION_KEY=*** (from secrets manager)
JWT_SECRET=*** (from secrets manager)
```

### 1.3 Production Environment
```bash
# .env.production (managed in CI/CD secrets)
NEXT_PUBLIC_API_URL=https://api.easyagent.io
NODE_ENV=production
NEXT_PUBLIC_LOG_LEVEL=warn
DATABASE_URL=*** (from secrets manager)
ENCRYPTION_KEY=*** (from secrets manager)
JWT_SECRET=*** (from secrets manager)
SENTRY_DSN=*** (error tracking)
SENTRY_ENVIRONMENT=production
```

### 1.4 Secrets Management Strategy

**Never store secrets in:**
- ❌ `.env` files (committed to git)
- ❌ Code comments
- ❌ Configuration files
- ❌ Docker images

**Always use:**
- ✅ GitHub Secrets (for CI/CD)
- ✅ AWS Secrets Manager / Azure Key Vault / GCP Secret Manager
- ✅ Hashicorp Vault
- ✅ 1Password / LastPass for team secrets

**Implementation:**
```yaml
# Example GitHub Actions workflow
name: Deploy
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          JWT_SECRET: ${{ secrets.JWT_SECRET }}
          ENCRYPTION_KEY: ${{ secrets.ENCRYPTION_KEY }}
        run: npm run build && npm run deploy
```

---

## 2. Deployment Platforms

### 2.1 Vercel (Recommended for Next.js)

**Setup:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Security Configuration:**
```javascript
// vercel.json
{
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "env": {
    "DATABASE_URL": "@DATABASE_URL",
    "JWT_SECRET": "@JWT_SECRET",
    "ENCRYPTION_KEY": "@ENCRYPTION_KEY"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=63072000; includeSubDomains; preload"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "geolocation=(), microphone=(), camera=()"
        }
      ]
    }
  ]
}
```

**Environment Variables in Vercel Dashboard:**
1. Go to Project Settings → Environment Variables
2. Add secrets with scope: Production, Preview, Development
3. Rotate secrets regularly

### 2.2 AWS Amplify

**Setup:**
```bash
npm install -g @aws-amplify/cli
amplify init
amplify add hosting
amplify publish
```

**IAM Permissions Required:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "amplify:*",
        "codecommit:*",
        "s3:*",
        "cloudfront:*",
        "secretsmanager:GetSecretValue"
      ],
      "Resource": "*"
    }
  ]
}
```

### 2.3 Docker Deployment

**Dockerfile (Multi-stage build):**
```dockerfile
# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Build application
COPY . .
RUN npm run build

# Production stage
FROM node:22-alpine
WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built application from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Security: Run as non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
USER nextjs

EXPOSE 3000
ENV NODE_ENV=production

CMD ["npm", "start"]
```

**Docker Security Best Practices:**
- ✅ Use Alpine Linux (smaller attack surface)
- ✅ Multi-stage builds (smaller final image)
- ✅ Non-root user (principle of least privilege)
- ✅ Scan images with Trivy: `trivy image easyagent:latest`
- ✅ Sign images with Docker Content Trust

---

## 3. Security Headers

### 3.1 HTTP Security Headers

Add to `next.config.js`:
```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevent clickjacking
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          // Prevent MIME-type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // Enable XSS filter
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          // Referrer policy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          // Permissions policy
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=(), payment=()'
          },
          // HSTS (only after HTTPS confirmed)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          // CSP (Content Security Policy)
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.easyagent.io https://sentry.io"
          }
        ]
      },
      // Disable caching for sensitive pages
      {
        source: '/dashboard/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate'
          }
        ]
      }
    ];
  }
};
```

### 3.2 CSP Policy Refinement

```javascript
// Stricter CSP for production
const cspHeader = [
  "default-src 'self'",
  "script-src 'self' https://cdn.jsdelivr.net",
  "style-src 'self' https://fonts.googleapis.com",
  "img-src 'self' data: https:",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self' https://api.easyagent.io",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'"
].join('; ');
```

---

## 4. Secrets Management

### 4.1 Create .gitignore File

```bash
# Create required file
cat > /home/node/.openclaw/workspace/turtle-easyagent/.gitignore << 'EOF'
# Environment variables
.env
.env.local
.env.*.local
.env.production.local

# Dependencies
node_modules/
package-lock.json
yarn.lock

# Build artifacts
.next/
dist/
build/
*.tsbuildinfo

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# OS
Thumbs.db
.DS_Store

# Testing
coverage/
.nyc_output/

# Misc
*.pem
*.key
secrets/
EOF
```

### 4.2 Credential Rotation Policy

**Weekly:**
- Rotate API keys used by services

**Monthly:**
- Rotate database passwords
- Rotate encryption keys (generate new one, re-encrypt data)
- Review access logs for unauthorized access

**Quarterly:**
- Rotate long-term credentials
- Audit all stored secrets
- Review and update security policies

### 4.3 Secret Scanning in CI/CD

```yaml
# GitHub Actions - Secret Scanning
name: Secret Scanning
on: [push, pull_request]
jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          format: 'sarif'
          output: 'trivy-results.sarif'
      
      - name: Upload Trivy results
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: 'trivy-results.sarif'
```

---

## 5. Data Protection

### 5.1 Data Encryption

**At Rest:**
```javascript
// Use node crypto for encryption
const crypto = require('crypto');

function encryptData(data, encryptionKey) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(encryptionKey), iv);
  
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}

function decryptData(encrypted, encryptionKey) {
  const [iv, authTag, data] = encrypted.split(':');
  const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(encryptionKey), Buffer.from(iv, 'hex'));
  
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  let decrypted = decipher.update(data, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}
```

**In Transit:**
- ✅ HTTPS only (TLS 1.2+)
- ✅ Certificate pinning for sensitive APIs
- ✅ Disable HTTP fallback

### 5.2 Data Retention Policy

```javascript
// Delete old data automatically
const deleteOldAgentLogs = async () => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  
  await db.agentLogs.deleteMany({
    createdAt: { $lt: thirtyDaysAgo }
  });
};

// Schedule daily
schedule.scheduleJob('0 2 * * *', deleteOldAgentLogs);
```

---

## 6. Monitoring & Logging

### 6.1 Logging Strategy

```javascript
// src/utils/logger.ts
import * as Sentry from "@sentry/nextjs";

export const logger = {
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${message}`, data);
  },
  
  error: (message: string, error: Error, context?: any) => {
    console.error(`[ERROR] ${message}`, error);
    Sentry.captureException(error, { extra: context });
  },
  
  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, data);
  },
  
  security: (message: string, data: any) => {
    console.log(`[SECURITY] ${message}`, {
      timestamp: new Date().toISOString(),
      ...data
    });
    // Always log to security monitoring service
    Sentry.captureMessage(`[SECURITY] ${message}`, 'warning');
  }
};
```

### 6.2 Sentry Integration

```bash
npm install @sentry/nextjs
```

```javascript
// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  denyUrls: [
    // Ignore errors from browser extensions
    /extensions\//i,
    /^chrome:\/\//i,
  ],
});
```

### 6.3 Monitoring Checklist

- [ ] Set up error tracking (Sentry)
- [ ] Configure log aggregation (DataDog, ELK, CloudWatch)
- [ ] Set up performance monitoring
- [ ] Configure uptime monitoring
- [ ] Set up security alerts for:
  - Failed login attempts (>5 in 5 minutes)
  - Unusual API patterns
  - Rate limit violations
  - Suspicious geolocation access

---

## 7. Incident Response

### 7.1 Incident Response Plan

**Discovery Phase:**
1. Detect incident via monitoring
2. Verify the issue
3. Determine severity level (Critical/High/Medium/Low)

**Response Phase:**
1. Activate incident response team
2. Isolate affected systems
3. Begin forensics
4. Implement temporary mitigation
5. Communicate status to stakeholders

**Recovery Phase:**
1. Implement permanent fix
2. Verify restoration
3. Review logs for scope of compromise
4. Notify affected users if data was exposed

**Post-Incident:**
1. Root cause analysis
2. Implement preventive measures
3. Update security policies
4. Document lessons learned

### 7.2 Security Incident Playbook

```yaml
Critical Incident: Data Breach
Severity: P1 (Critical)
Response Time: Immediate

Actions:
  1. Isolate affected database
  2. Stop all writes to system
  3. Begin forensic analysis
  4. Notify security team and leadership
  5. Contact legal and compliance teams
  6. Prepare user notification if required
  7. Monitor for further anomalies
```

---

## 8. Compliance

### 8.1 Compliance Frameworks

**GDPR (if serving EU users):**
- [ ] Data processing agreements in place
- [ ] Privacy policy updated
- [ ] Right to be forgotten implemented
- [ ] Data portability implemented
- [ ] Breach notification procedures
- [ ] DPA on file for all vendors

**CCPA (if serving California users):**
- [ ] Privacy policy compliant
- [ ] Opt-out mechanisms
- [ ] Do Not Sell tracking
- [ ] User request processing (30 days)

**SOC 2 Type II (for enterprise customers):**
- [ ] Security controls documented
- [ ] Audit trail maintained
- [ ] Availability monitoring
- [ ] Confidentiality measures
- [ ] Change management process

### 8.2 Privacy Policy Template

```markdown
# EasyAgent Privacy Policy

## Data Collection
We collect:
- Account information (email, name, company)
- Usage data (agents created, workflows executed)
- Technical data (IP address, user agent, browser)

## Data Usage
- Improve service functionality
- Provide customer support
- Send service notifications
- Analyze usage patterns

## Data Retention
- Personal data: 2 years after account deletion
- Usage logs: 90 days
- Backups: 30 days after deletion

## Data Security
- Encryption at rest (AES-256)
- Encryption in transit (TLS 1.2+)
- Regular security audits
- Penetration testing annually

## User Rights
- Right of access
- Right of rectification
- Right to erasure
- Right to restrict processing
- Right to data portability
```

### 8.3 Compliance Checklist

- [ ] Privacy policy published
- [ ] Terms of service reviewed by legal
- [ ] GDPR/CCPA/local regulations compliance
- [ ] Data processing agreements signed
- [ ] Security certifications obtained
- [ ] Incident response plan documented
- [ ] Data retention policy defined
- [ ] Backup and recovery tested
- [ ] Annual penetration test completed
- [ ] Security training for all developers

---

## 9. Pre-Production Deployment Checklist

### Code Security
- [ ] All code reviewed for security issues
- [ ] Dependencies updated and audited
- [ ] Secrets not committed to repository
- [ ] TypeScript strict mode enabled
- [ ] ESLint security rules enabled
- [ ] SAST scanning passed

### Infrastructure
- [ ] HTTPS/TLS 1.2+ enforced
- [ ] Security headers configured
- [ ] WAF rules deployed
- [ ] DDoS protection enabled
- [ ] Database encryption enabled
- [ ] Backups automated and tested

### Authentication & Access
- [ ] Authentication service configured
- [ ] MFA enabled for admin accounts
- [ ] Role-based access control implemented
- [ ] Service account credentials rotated
- [ ] API rate limiting enabled
- [ ] CORS properly configured

### Monitoring & Logging
- [ ] Error tracking configured (Sentry)
- [ ] Log aggregation enabled
- [ ] Security monitoring active
- [ ] Uptime monitoring configured
- [ ] Alerting rules configured
- [ ] On-call rotation established

### Operations
- [ ] Runbooks created
- [ ] Incident response plan documented
- [ ] Disaster recovery tested
- [ ] Change management process defined
- [ ] Security training completed
- [ ] Documentation updated

---

## 10. Quick Reference Commands

```bash
# Install security dependencies
npm install --save-dev npm-audit-resolver snyk

# Run security audit
npm audit

# Check for outdated packages
npm outdated

# Check for vulnerable dependencies
npx snyk test

# Scan code with Trivy
trivy fs .

# Generate SBOM (Software Bill of Materials)
npx cyclonedx-npm --output-file sbom.json

# Validate security headers
curl -I https://easyagent.io | grep -i "x-frame-options\|x-content-type-options\|strict-transport-security"

# Check SSL certificate
openssl s_client -connect easyagent.io:443 -showcerts
```

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-18 | Security Team | Initial security guide |

**Next Review Date:** 2026-05-18 (90 days)

---

## Support & Questions

For security concerns or questions:
1. **Internal:** Reach out to security team
2. **External:** security@easyagent.io
3. **Responsible Disclosure:** Follow coordinated disclosure policy

**Do NOT disclose vulnerabilities publicly before remediation.**

