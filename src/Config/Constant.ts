export const Constant = {
    localStorage: {
        Sign: "SignData",
        Product: "Product",
        Manufacture:"Manufacture",
        Brand:"Brand",
        configTable:"Configtable"
    },
    database:
    {
        baseName: "BusinessManagement",
        signInData: "SignTable",
        signUpData: "SignUpTable",
        orderData: "OrderTable",
        productData:"ProductTable",
        ConfigData:"ConfigtTable"
    },
    flag:
    {
        true: "True",
        false: "False",
        null:"",

    },
    logging:{
        path:"./assets/logging",
        filename:"/logging.txt",
    },
    filename:
    {
        productImage:"ProductImage.png",
        productEditedImage:"productEditedImage.png",
        otherImage:"OtherImage.zip",
        paymentSSImage:"PaymentSSImage.png",
        referenceImage:"ReferenceImage.png"
    },
    OrderStatus:
    {
        Placed:"Order Placed",
        Approved:"Order Approved",
        Editing:"Editor Assigned",
        verfication:"Waiting for Customer Approval",
        ApprovedC:"Customer Approved",
        manufacture:"Assigned for Making",
        making:"Making Started",
        DispatchReady:"Ready for Dispatch",
        Dispatched:"Order Dispatched",
        Delivered:"Order Delivered",
        OrderDamage:"Damaged Order",
        NotApproved:"Order Not Approved"

    },
    dateFormat:{
        string:'MM-dd-YYYY hh:mm:ss a',
        lan:'en',
        zone:'UTC+5:30'

    }

}



export const faqDetails = [
    {
        Question: "How do I place an order?",
        Answer: "To place an order, simply browse our products, select the items you want, and add them to your cart. Then, proceed to the checkout page and follow the prompts to provide your shipping and payment information."
      },
    {
      Question: "What is your return policy?",
      Answer: "Our return policy allows you to return items within 30 days of purchase for a full refund."
    },
    {
      Question: "How can I track my order?",
      Answer: "You can track your order by logging into your account and visiting the 'Order History' section."
    },
    {
      Question: "Do you offer international shipping?",
      Answer: "Yes, we offer international shipping to most countries. Shipping costs may vary."
    },
    {
      Question: "What payment methods do you accept?",
      Answer: "We accept credit cards, debit cards, PayPal, and other secure online payment methods."
    },
    {
      Question: "Is my personal information secure?",
      Answer: "Yes, we take the security of your personal information seriously. Our website is encrypted to protect your data."
    },
    {
      Question: "How can I contact your customer support?",
      Answer: "You can reach our customer support team by email at support@example.com or through the 'Contact Us' page on our website."
    },
    {
      Question: "Can I change my order after it's been placed?",
      Answer: "If your order hasn't been shipped yet, you may be able to make changes. Contact us for assistance."
    },
    {
      Question: "Do you offer gift wrapping services?",
      Answer: "Yes, we offer gift wrapping options for an additional fee. You can select this option during checkout."
    },
    {
      Question: "What should I do if I receive a damaged item?",
      Answer: "If your item arrives damaged, please contact us immediately with photos of the damage. We'll assist you in resolving the issue."
    },
    {
      Question: "How do I unsubscribe from marketing emails?",
      Answer: "You can unsubscribe from marketing emails by clicking the 'Unsubscribe' link at the bottom of any marketing email you receive."
    },
    {
      Question: "Do you have a loyalty rewards program?",
      Answer: "Yes, we have a loyalty rewards program that allows you to earn points with each purchase. These points can be redeemed for discounts on future orders."
    },
    {
      Question: "Can I cancel my order?",
      Answer: "If your order hasn't been processed or shipped yet, you may be able to cancel it. Contact us as soon as possible to request a cancellation."
    },
    {
      Question: "How long does shipping take?",
      Answer: "Shipping times vary depending on your location and the shipping method you choose during checkout. You can find estimated delivery times on our website."
    },
    {
      Question: "Do you offer expedited shipping?",
      Answer: "Yes, we offer expedited shipping options for faster delivery. Additional charges may apply."
    },
    {
      Question: "What if I forgot my password?",
      Answer: "If you forgot your password, you can click the 'Forgot Password' link on the login page. We'll send you instructions to reset your password."
    },
    {
      Question: "Do you have a size guide?",
      Answer: "Yes, we provide a size guide on our website to help you choose the right size for clothing and footwear."
    },
    {
      Question: "Can I change my shipping address after placing an order?",
      Answer: "If your order hasn't been shipped yet, you may be able to update your shipping address. Contact us as soon as possible to make the change."
    },
    {
      Question: "What if I receive the wrong item?",
      Answer: "If you receive the wrong item, please contact us with your order details. We'll arrange for the correct item to be sent to you and provide return instructions."
    },
    {
      Question: "Are your products ethically sourced?",
      Answer: "Yes, we are committed to ethical sourcing and sustainability. We strive to ensure that our products are sourced responsibly and meet ethical standards."
    },
    {
      Question: "How do I leave a product review?",
      Answer: "You can leave a product review by navigating to the product page and clicking on the 'Write a Review' button. Share your thoughts and feedback about the product."
    },
    {
      Question: "Do you offer bulk discounts?",
      Answer: "Yes, we offer bulk discounts for large orders. Contact our customer support team to inquire about bulk pricing and discounts."
    },
    {
      Question: "What is your privacy policy?",
      Answer: "Our privacy policy outlines how we collect, use, and protect your personal information. You can find our privacy policy on our website."
    },
    {
      Question: "Do you offer gift cards?",
      Answer: "Yes, we offer gift cards that can be purchased on our website. Gift cards make great gifts for friends and family."
    },
    {
      Question: "Can I change my shipping method after placing an order?",
      Answer: "If your order hasn't been shipped yet, you may be able to change your shipping method. Contact us to inquire about available options."
    },
    {
      Question: "What if I have allergies to certain ingredients in your products?",
      Answer: "If you have allergies, please review the product ingredients listed on our website before making a purchase. If you have specific concerns, contact our customer support."
    },
    {
      Question: "How do I apply a coupon code?",
      Answer: "During the checkout process"
    }]
    
    export const worksteps = [
        {
          title: "Choose Your Product",
          description: "Browse through our wide selection of products and choose the one that suits your needs and preferences."
        },
        {
          title: "Place the Order",
          description: "Add the chosen product to your cart and proceed to the checkout. Review your order details and confirm the purchase."
        },
        {
          title: "Fill Your Address",
          description: "Provide your accurate shipping address where you want the product to be delivered. Double-check the details to ensure successful delivery."
        },
        {
          title: "Process the Payment",
          description: "Select a secure payment method and complete the payment process. Your payment information will be encrypted for security."
        },
        {
          title: "Order Confirmation Message",
          description: "After successfully placing the order and processing the payment, you'll receive an order confirmation message with details of your purchase."
        },
        {
          title: "Deliver Your Order",
          description: "Once the order is confirmed, we'll initiate the shipping process. You will receive updates on the shipping status, and your order will be delivered to your specified address."
        }
      ];
      
    export const termsAndConditions = [
        {
          section: "Introduction",
          content: "Welcome to Online Shopping Cart! By accessing and using our website, you agree to comply with these terms and conditions. Please read them carefully before using our services."
        },
        {
          section: "Website Use",
          content: "You are granted a limited license to access and use our website for personal and non-commercial purposes. Unauthorized use or distribution of our content, products, or services is prohibited."
        },
        {
          section: "Product Information",
          content: "We strive to provide accurate product information, but we do not warrant the accuracy, completeness, or reliability of any product details. Prices, availability, and descriptions may change without notice."
        },
        {
          section: "Order Acceptance",
          content: "Placing an order does not guarantee acceptance. We reserve the right to refuse or cancel orders at our discretion, including cases of incorrect pricing or insufficient product availability."
        },
        {
          section: "Payment",
          content: "We accept various payment methods. By providing payment information, you represent that you are authorized to use the chosen payment method and that the information is accurate."
        },
        {
          section: "Shipping and Delivery",
          content: "We aim to deliver products within the specified timeframes, but delays may occur due to unforeseen circumstances. Shipping charges, delivery times, and tracking details will be provided upon confirmation."
        },
        {
          section: "Returns and Exchanges",
          content: "We have a return policy in place for damaged or defective products. Please review our return policy for specific guidelines on returning products and seeking replacements or refunds."
        },
        {
          section: "Intellectual Property",
          content: "All content, trademarks, logos, and intellectual property on our website are owned by us or our licensors. Reproduction, distribution, or modification of our content without permission is prohibited."
        },
        {
          section: "Privacy",
          content: "We value your privacy and handle personal information in accordance with our Privacy Policy. By using our services, you consent to the collection, use, and sharing of your information as outlined."
        },
        {
          section: "Limitation of Liability",
          content: "To the extent permitted by law, we are not liable for any indirect, incidental, or consequential damages arising from the use of our website or products. Our liability is limited to the amount paid for the product or service."
        },
        {
          section: "Changes to Terms",
          content: "We reserve the right to modify or update these terms and conditions at any time. Changes will be effective upon posting on our website. Continued use of our services constitutes acceptance of the updated terms."
        },
        {
          section: "Contact Information",
          content: "If you have questions or concerns about these terms, please contact our customer support. Thank you for choosing [Your E-Commerce Website] for your online shopping needs!"
        }
      ];


export const aboutUs = {
    companyName: "Online Shopping Cart",
    establishedYear: 2018,
    founder: "Abirami",
    coFounder: "John",
    ceo: "Alex Smith",
    mission: "At Online Shopping Cart, we are dedicated to providing an exceptional online shopping experience. Our mission is to offer a wide range of high-quality products at competitive prices, ensuring customer satisfaction and convenience.",
    vision: "Our vision is to become a leading online destination for shoppers seeking a diverse selection of products across various categories. We aim to continuously innovate and improve our services to exceed customer expectations.",
    values: [
      "Quality: We prioritize offering products that meet high-quality standards to ensure customer satisfaction.",
      "Variety: Our commitment to offering a diverse range of products caters to the unique preferences of our customers.",
      "Customer-Centric: We prioritize our customers' needs and strive to deliver exceptional service.",
      "Transparency: We believe in transparent business practices and open communication with our customers.",
      "Innovation: We continuously seek new ways to enhance the online shopping experience and stay ahead in the industry."
    ],
    accomplishments: [
      "Since our establishment in 2018, we have served thousands of satisfied customers across the globe.",
      "We have expanded our product offerings to include a wide array of categories, ensuring a one-stop shopping destination.",
      "Our commitment to quality and customer satisfaction has earned us positive feedback and reviews from our valued customers.",
      "We are proud to have developed strong partnerships with reputable suppliers and manufacturers to bring our customers the best products.",
      "Our growing community of loyal customers motivates us to consistently improve and enhance our services."
    ],
    team: {
      ceo: "Alex Smith",
      employees: [
        "Sarah Johnson - Marketing Manager",
        "David Lee - Customer Support Specialist",
        "Emily Davis - Product Sourcing",
        "Michael Brown - Logistics Coordinator"
      ]
    },
    contact: {
      email: "contact@yourwebsite.com",
      phone: "+123-456-7890",
      address: "123 Main Street, City, Country"
    }
  };


  export const contactUs = {
    companyName: "Online Shopping Cart",
    physicalAddress: {
      street: "123 Main Street",
      city: "City",
      state: "State",
      postalCode: "Postal Code",
      country: "Country"
    },
    mailingAddress: {
      street: "P.O. Box 456",
      city: "City",
      state: "State",
      postalCode: "Postal Code",
      country: "Country"
    },
    email: "contact@yourwebsite.com",
    phone: "+123-456-7890",
    customerServiceHours: "Monday - Friday, 9:00 AM - 6:00 PM",
    socialMedia: {
      facebook: "facebook.com/yourwebsite",
      twitter: "@yourwebsite",
      instagram: "@yourwebsite",
      linkedin: "linkedin.com/company/yourwebsite"
    },
    feedbackForm: {
      link: "yourwebsite.com/feedback",
      instructions: "We value your feedback! Please use our online feedback form to share your thoughts and suggestions with us."
    },
    customerSupport: {
      chat: "Chat live with our customer support team during business hours.",
      email: "Send your inquiries to our dedicated customer support email.",
      phone: "Call our customer support hotline for immediate assistance.",
      responseTime: "We aim to respond to all inquiries within 24 hours."
    },
    partnerships: {
      inquiries: "For reselling opportunities ,Manufacturers paternship and collaborations, please email partnerships@yourwebsite.com."
    }
  };
  
  export const CarsoulePhoto= [
    { url: './assets/2hzr936q.png',
    button:"Explore now !" ,
    title: "Unveiling 2023's Hottest Fashion Trends",
    text:"Welcome to ONLINE SHOPPIN CART, your destination for the freshest fashion finds." },
    { url: './assets/axfrfgqm.png',
     button:"Explore the future today" ,
     title: 'Discover the Future of Tech Accessories',text:" Elevate your style and functionality with cutting-edge gadgets." }
  ];
  