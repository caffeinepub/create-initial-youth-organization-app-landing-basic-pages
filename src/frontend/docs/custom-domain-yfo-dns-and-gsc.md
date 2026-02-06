# Custom Domain Setup for yfo.org with DNS Verification

This guide explains how to connect your custom domain **yfo.org** to your existing Internet Computer production site and verify it with Google Search Console using DNS verification.

## Important Notes

- **DNS changes must be made at your domain registrar or DNS provider** (e.g., GoDaddy, Namecheap, Cloudflare, etc.). This app cannot make DNS changes for you.
- Your existing IC URL (`https://pd5nf-fqaaa-aaaan-qetaq-cai.icp0.io`) will continue to work as a backup access point.
- DNS propagation can take 24-48 hours, though it's often faster.

---

## Prerequisites

Before you begin, ensure you have:

1. **Ownership of the domain** - You must own the domain **yfo.org** and have access to its DNS settings
2. **Access to your domain registrar/DNS provider** - You'll need login credentials to modify DNS records
3. **Your IC canister ID** - `pd5nf-fqaaa-aaaan-qetaq-cai`
4. **Google Search Console account** - For domain verification

---

## Part 1: Connect Your Custom Domain via DNS

### Step 1: Understand the DNS Records Needed

To point your custom domain to your Internet Computer site, you need to add DNS records at your domain registrar. The Internet Computer uses a boundary node system that routes traffic to your canister.

**For the apex domain (yfo.org):**
- Add a **CNAME** record (if your DNS provider supports CNAME at apex) OR
- Add an **ALIAS/ANAME** record (preferred for apex domains) OR
- Add **A** records pointing to IC boundary nodes

**For the www subdomain (www.yfo.org):**
- Add a **CNAME** record

### Step 2: Add DNS Records at Your Registrar

Log in to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.) and navigate to the DNS management section for **yfo.org**.

#### Option A: Using CNAME/ALIAS (Recommended)

**For apex domain (yfo.org):**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| ALIAS or ANAME | @ | icp1.io | 3600 |

**For www subdomain (www.yfo.org):**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | icp1.io | 3600 |

#### Option B: Using A Records (If ALIAS/ANAME not supported)

If your DNS provider doesn't support ALIAS/ANAME records at the apex, use A records pointing to IC boundary nodes:

**For apex domain (yfo.org):**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 147.75.83.194 | 3600 |
| A | @ | 147.75.83.195 | 3600 |

**For www subdomain (www.yfo.org):**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | icp1.io | 3600 |

> **Note:** The A record IP addresses above are examples. Check the [Internet Computer documentation](https://internetcomputer.org/docs/current/developer-docs/production/custom-domain/) for the latest boundary node IP addresses.

### Step 3: Register Your Domain with IC Boundary Nodes

After adding DNS records, you need to register your custom domain with the Internet Computer boundary nodes. This tells the IC network to route traffic from your domain to your canister.

**Using `dfx`:**

