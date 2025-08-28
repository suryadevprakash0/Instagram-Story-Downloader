# Instagram Story Downloader

यह Node.js में बना एक सिंपल इंस्टाग्राम स्टोरी डाउनलोडर है।

## ✨ फीचर्स
- पब्लिक इंस्टाग्राम स्टोरीज को डाउनलोड करें।
- वीडियो और इमेज दोनों को सपोर्ट करता है।
- आसान और क्लीन यूजर इंटरफेस।

---

## 🚀 डिप्लॉयमेंट (Deployment)

आप इस प्रोजेक्ट को Heroku या किसी भी VPS पर आसानी से डिप्लॉय कर सकते हैं।

###  방법 1: Heroku पर डिप्लॉय करें (आसान तरीका)

1.  **Heroku अकाउंट बनाएं:** अगर आपका अकाउंट नहीं है, तो [heroku.com](https://heroku.com) पर जाकर बना लें।

2.  **ऐप बनाएं:** Heroku डैशबोर्ड में "New" > "Create new app" पर क्लिक करके एक नया ऐप बनाएं।

3.  **डिप्लॉयमेंट मेथड चुनें:** "Deployment" टैब पर जाएं और "Deployment method" में "GitHub" चुनें। अपने GitHub अकाउंट को कनेक्ट करें और इस रिपॉजिटरी को चुनें।

4.  **Config Vars सेट करें:** "Settings" टैब पर जाएं और "Reveal Config Vars" पर क्लिक करें। यहां अपना इंस्टाग्राम यूजरनेम और पासवर्ड डालें:
    - `KEY`: `IG_USERNAME`
    - `VALUE`: `your_insta_username_here`
    - `KEY`: `IG_PASSWORD`
    - `VALUE`: `your_insta_password_here`

5.  **ऐप डिप्लॉय करें:** "Deploy" टैब पर वापस जाएं और "Deploy Branch" बटन पर क्लिक करें।

बस! आपका ऐप लाइव हो जाएगा।

---

### 방법 2: VPS पर डिप्लॉय करें (Ubuntu)

1.  **रिपॉजिटरी क्लोन करें:** अपने VPS में SSH करें और इस रिपॉजिटरी को क्लोन करें।
    ```bash
    git clone [https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git)
    cd YOUR_REPOSITORY_NAME
    ```

2.  **Node.js और npm इंस्टॉल करें:**
    ```bash
    sudo apt update
    sudo apt install nodejs npm -y
    ```

3.  **पैकेज इंस्टॉल करें:**
    ```bash
    npm install
    ```

4.  **Environment Variables सेट करें:**
    `server.js` फाइल को एडिट करने की बजाय, हम `.env` फाइल का उपयोग करेंगे।
    - `npm install dotenv` कमांड चलाएं।
    - `server.js` में सबसे ऊपर `require('dotenv').config();` लाइन जोड़ें।
    - एक `.env` फाइल बनाएं (`nano .env`) और उसमें यह लिखें:
      ```
      IG_USERNAME=your_insta_username_here
      IG_PASSWORD=your_insta_password_here
      ```

5.  **सर्वर चलाएं (PM2 के साथ):**
    ```bash
    sudo npm install pm2 -g
    pm2 start server.js
    ```
आपका ऐप अब आपके VPS पर लाइव है!
