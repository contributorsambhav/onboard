# **Cross-Border AI-Powered Payments**
    
### **Problem:**
    
Businesses incur **high FX fees** when transferring funds across borders. Many companies **aren’t aware** of cost-saving alternatives like USDC or stablecoins because they don’t know if their vendors or partners accept them. convert to markdown properly

# Onboard: Revolutionizing International Transactions with PaymanAI

**Onboard** is an innovative platform powered by PaymanAI that redefines cross-border payments using cryptocurrency. Our solution removes traditional banking hurdles, ensuring that international transactions are faster, more cost-effective, and secure.

![Onboard Banner](https://github.com/user-attachments/assets/d9634ab8-705c-4c1a-9f83-2136a11a375f)

---

## Table of Contents

- [Overview](#overview)
- [Key Benefits](#key-benefits)
- [Features](#features)
- [How It Works](#how-it-works)
- [User Interface](#user-interface)
- [Testing & Limitations](#testing--limitations)


---

## Overview

**Onboard** is designed to streamline international transactions by leveraging cryptocurrency to bypass the limitations of traditional banking systems. With our platform, you can eliminate delays—forget the 3-4 business days wait for payments to clear. Onboard offers instant and secure transactions across the globe by intelligently comparing and selecting the most efficient payment methods.

---

## Key Benefits

- **Instant Transactions:** Process payments instantly—no more waiting multiple business days.
- **Cost Efficiency:** Save on high fees associated with traditional payment methods.
- **Global Accessibility:** Seamlessly transact with users around the world without restrictions.
- **Enhanced Security:** Leverage blockchain technology to ensure transactions are secure and transparent.
- **User-Friendly Experience:** Enjoy a clean and intuitive interface designed for users at every level, from beginners to crypto experts.

---

## Features

- **Multi-Currency Support:** Transact using cryptocurrencies like USDC and USDT, as well as traditional payment methods including PayPal, Stripe, Bank Wire Transfer, Wise, and Payoneer.
- **Automated Transaction Engine:** Our proprietary RAG model automates transactions, calculates Ethereum gas fees, and selects the most cost-effective method for each transaction.
- **Recipient Management:** Easily add and manage recipients with a comprehensive interface that streamlines data entry and payment processing.
- **Real-Time Status Updates:** Monitor your transaction status in real time with a dynamic status interface that updates from initiation to completion.

---

## How It Works

1. **Recipient Setup:**  
   Add a new recipient by selecting the type of payment and choosing from a variety of supported methods:
   - **Supported Methods:** USDT, USDC, PayPal, Stripe, Bank Wire Transfer, Wise, Payoneer.  
   ![Adding Recipient](https://github.com/user-attachments/assets/a1f02276-690d-4634-9d8c-e9a9057aae94)

2. **Transaction Automation:**  
   The RAG model automates transactions by:
   - Collecting transaction data.
   - Calculating Ethereum gas fees and fees for alternative methods.
   - Comparing fees to determine the most efficient payment method.  
   ![Transaction Automation](https://github.com/user-attachments/assets/b4a9f4c6-a0ed-4512-b9d1-bad72ae7c75d)  
   **Note:** Cloudflare limitations currently restrict the system to automating two transactions per click for USDC and USDT.  
   ![Cloudflare Limitation Notice](https://github.com/user-attachments/assets/c70b5c72-f708-4b0b-9ddc-df479a26705d)

3. **Transaction Execution & Confirmation:**  
   Transactions are executed within a dialog box, and once processed, the status is updated to "paid".  
   ![Transaction Dialog](https://github.com/user-attachments/assets/b1353ac8-80a6-45b4-8e7c-b554acf96c63)  
   ![Status Change - Paid](https://github.com/user-attachments/assets/d6abc2a3-94f0-4e0d-8e26-89a894765607)  
   ![Final Transaction Status](https://github.com/user-attachments/assets/d387bdf3-5af7-476a-bffd-3f01a1cdaab6)

---

## User Interface

The recipient page is designed to provide all necessary details in one convenient view, ensuring you have everything you need at your fingertips.

![Recipient Page](https://github.com/user-attachments/assets/6e13ccbf-764a-4308-8fc4-a0bffe7472b4)Currently, only USDC and USDT payments can be processed directly through our automated AI agent.
![Additional Recipient View](https://github.com/user-attachments/assets/78a8c369-635e-49a8-bc21-47f1a133e796)

---

## Testing & Limitations

- **Testing Environment:**  
  Currently, all transaction amounts are set to 0.5 TSD for testing purposes.
  ![Test Amount](https://github.com/user-attachments/assets/b8c35f09-fe05-46ee-af4c-7cd4eac21cb1)

- **Cloudflare Limitations:**  
  Due to current Cloudflare restrictions, only two USDC and USDT transactions can be processed in one go. We are actively working on scaling up this limitation.

---
