# 🔐 HashShield

A web app that verifies file integrity using **SHA-256 hashes**. This tool provides a clean, responsive interface for generating and verifying file hashes — ensuring your files remain 🔒 authentic and 🛡️ untampered.

---

## ✨ Features

### 🔄 **Generate Hash**
- 📂 Upload any file.
- 🔐 Compute **SHA-256 hash** using the Web Crypto API.
- 📝 Display file name, size, and SHA-256 hash.
- 📋 Copy hash to clipboard.
- 📥 Download hash as a `.txt` file.
- 📱 Generate QR code for the hash.
- 💾 Store recent hashes in local storage.

### ✅ **Verify Hash**
- 📂 Upload a file.
- 🧾 Input the expected SHA-256 hash.
- 🔍 Compare the computed hash with the provided hash.
- 🟢 Display verification result (**Match ✅** or **Mismatch ❌**).

### 🖥️ **UI/UX**
- 📱 Responsive dashboard layout.
- 🌗 Light/Dark mode toggle.
- 🔔 Toast notifications for status messages.
- ✨ Clean, modern design with soft shadows and rounded corners.

---

## 🛠️ Tech Stack

- ⚛️ React
- ⚡ Vite
- 🎨 Tailwind CSS
- 🔐 Web Crypto API
- 📱 qrcode.react
- 🖼️ lucide-react

---

## 📦 Installation

1. 🚀 Clone the repository:

    ```bash
    git clone https://github.com/zeusgodyt/file-integrity-checker-sha256
    ```

2. 📁 Navigate to the project directory:

    ```bash
    cd file-integrity-checker-sha256
    ```

3. 📦 Install dependencies:

    ```bash
    npm install
    ```

---

## ▶️ Usage

1. 💻 Start the development server:

    ```bash
    npm run dev
    ```

2. 🌐 Open your browser and navigate to the URL provided by Vite.

---

### 🔄 Generating a Hash

1. Click the **"Generate Hash"** tab.
2. 📂 Upload your file using drag & drop or the file browser.
3. 🧮 Click the **"Generate SHA-256 Hash"** button.
4. 📋 Copy or 📥 download the generated hash as a text file.
5. 📱 Optionally, view the QR code representation of the hash.

---

### ✅ Verifying a Hash

1. Click the **"Verify Hash"** tab.
2. 📂 Upload the file you want to verify.
3. ✍️ Paste the expected SHA-256 hash.
4. 🔍 Click the **"Verify Hash"** button.
5. ✅ Check the result to confirm if the file is **authentic** or **tampered**.

---

🔒 Made with 💙 to keep your data **secure & trusted**.
