export type Tone = "violet" | "pink" | "cyan" | "amber";

export const profile = {
  name: "Bryan Rumuy",
  role: "Data Scientist · Web Developer · AI Automation",
  tagline:
    "I build full-stack web systems and AI solutions that solve real business problems.",
  facts: [
    { label: "Based in", value: "Surabaya, Indonesia" },
    { label: "Experience", value: "6 projects, 3 of them for clients" },
    {
      label: "Open to",
      value: "Data Scientist, Web Developer and AI Automation roles",
    },
  ],
  location: "Surabaya, Indonesia",
  email: "rumuybryan@gmail.com",
  linkedinHref: "https://www.linkedin.com/in/bryanrumuy",
  githubHref: "https://github.com/bryanrumuy",
  summary:
    "Informatics Engineering graduate from Universitas Surabaya, specializing in Data Science and Artificial Intelligence. I design and build full-stack systems, from database design and workflow implementation to testing, and apply machine learning where it solves a real problem.",
  seeking: "Open to roles in data science, web development and AI automation.",
} as const;

export const education = {
  school: "Universitas Surabaya",
  period: "Aug 2022 - Aug 2026",
  degree:
    "Bachelor's Degree in Informatics Engineering, specialization in Data Science and Artificial Intelligence",
} as const;

export const projects = [
  {
    title: "HanziLearn: Mandarin Tutoring Management App",
    context: "Freelance, Oct 2026",
    tone: "pink",
    description:
      "A web app that runs a private Mandarin tutor's classes: students, lesson schedule, homework, invoices and self-study practice, with separate teacher and student logins. It installs on phones and sends push notifications. Demonstrated with fictional data.",
    points: [
      "Roles and security: the teacher manages students, schedule, homework and finance, while each student sees only their own lessons, homework and bills. Access is enforced in the database with PostgreSQL Row Level Security, and a new teacher account starts with a temporary password that must be changed on first login.",
      "Scheduling: weekly recurring lessons, editing or cancelling a lesson, a one-tap WhatsApp reminder, and an automatic reminder notification one hour before each lesson, sent by a scheduled database job.",
      "Homework and billing: the teacher sets homework, students submit text or a photo of their answer, and the teacher grades it. Finished lessons add up into a monthly invoice per student, with payment tracking and a ready-to-send WhatsApp message.",
      "Progress report: a monthly summary per student (lessons done, homework submitted and average score, practice) that the teacher can add a note to and send to the student or parent.",
      "Self-study: HSK 2.0 and 3.0 vocabulary with flashcards, quizzes, writing, listening and sentence practice, using spaced repetition. A review screen lets the teacher check and correct each word's Indonesian meaning.",
      "Installable on phones as a progressive web app, with push notifications for new homework, submissions and grades on iPhone and Android. The push service is written from scratch on Web Crypto (VAPID and RFC 8291 message encryption) instead of a push library.",
      "Quality: 216 automated tests, a 35-page user manual in Indonesian, a data backup script, and deployment on Cloudflare Workers with a Supabase backend.",
      "Limits: it is built for a single teacher, so serving several teachers would mean separate copies or a multi-teacher redesign. The live app and its code are private, and the screenshots use fictional demo data.",
    ],
  },
  {
    title: "Alter: AI Customer-Service Assistant",
    context: "Personal project, 2026 (proof of concept)",
    tone: "cyan",
    description:
      "An AI assistant that answers customer chats for a small business, takes pickup orders, and hands complaints and emergencies to staff, with a web dashboard to run it. Demonstrated on Telegram with a fictional cafe.",
    points: [
      "Answers from the business's own knowledge: hours, menu and policies come from an editable knowledge base. The assistant does not invent prices or promises, and replies in the customer's language (English or Indonesian).",
      'Takes orders end to end with function calling: it collects the items and pickup time, shows the total, and only after the customer confirms does a create_order function save the order. Item names are limited to the menu, the total is calculated by code instead of the model, and a repeated "yes" cannot create a duplicate order.',
      "Knows when to hand over: complaints, refunds, discounts and unanswered questions go to a follow-up queue, and emergencies are flagged urgent and sent to the owner at once.",
      "Staff dashboard (Node.js and SQLite): a kanban board of orders, a follow-up queue where staff reply to the customer, conversation history, and a knowledge editor. Moving an order to ready messages the customer automatically.",
      "Hardened after a security and a code review: password login with throttling, an anti-forgery header, a host check, parameterised SQL, safe rendering of customer text, per-customer order limits, and an order that was already saved is still confirmed if a later model call fails.",
      "Checked with 60 automated tests and scripted scenarios run against the real model (20 personal-assistant, 10 customer-service and 7 ordering scenarios). The data shown is fictional demo data.",
      "Limits: it runs locally. The same core also runs as an unofficial WhatsApp bot, but the demo uses Telegram's official API. A production version would use the WhatsApp Business Platform and a hosted server.",
    ],
  },
  {
    title: "Office Finance System",
    context: "Freelance, Feb 2026 - Apr 2026",
    tone: "violet",
    description:
      "A web-based financial management system that replaced manual office bookkeeping with one centralized digital workflow.",
    points: [
      "Transaction tracking: income and expense records with receipt uploads (photo or PDF, stored privately), auto-generated reference numbers, categories, departments, payee and payment method, and batch entry for expenses.",
      "Approval workflow: four roles (admin, finance, staff, executive) with separate permissions. Staff entries wait for approval and staff see only their own records, while entries by finance are approved straight away. Finance cannot approve its own entries. An admin can, but that is written to the activity log as a separate event so it is easy to find.",
      "Reporting: dashboard with cash-flow charts, a monthly cash book with carried-over opening balances, budgets per category or department with usage warnings, and period locking. Reports export to PDF and Excel (with real SUM formulas), and printable vouchers show the amount in words and carry a watermark until the transaction is approved.",
      "Security: mandatory two-factor authentication (authenticator app) for admin and finance, login and code attempts limited atomically, CSRF, XSS and SQL-injection protection, private receipt storage opened only through the app by authorised users, and an activity log of sign-ins, approvals and voucher views.",
      "Data integrity under simultaneous use: reference numbers come from an atomic counter so they never repeat, a transaction can be approved only once, edits and approvals made on stale data are refused (version check), and closing a period holds even while others are saving. Tested with 16 parallel processes on MariaDB.",
      "Quality: 840+ automated tests plus MySQL-specific tests, run in CI with a coverage threshold, a dependency security audit and a code-style check. Several self-audit rounds covered security, access control, calculations and fuzzing, and the findings were fixed with regression tests.",
      "Operations: encrypted daily backups (an unencrypted archive is refused in production) with a documented restore drill, plus operations, restore and user guides in Indonesian. In-app notifications are included, and receipt OCR and an n8n webhook are optional and off by default.",
    ],
  },
  {
    title: "Sales & Purchase Information System",
    context: "FL Beauty, Jan 2026 - Jul 2026",
    tone: "pink",
    description:
      "Web-based system for a skincare retailer to manage products, inventory, sales, and purchasing.",
    points: [
      "Built an admin module covering product catalog, product variants (sizes and prices), suppliers, and sales and purchase invoices, replacing manual record-keeping and reducing input errors.",
      "Implemented batch-level inventory with expiry dates: stock is auto-synced from valid batches, expired stock is excluded, and near-expiry batches can carry discounts that apply automatically to the storefront price.",
      "Developed a customer-facing storefront with a searchable and filterable catalog, product detail pages with multi-image galleries, a shopping cart, and checkout for pickup at the store.",
      "Designed the database schema and workflows from business requirements, documented through wireframes (15 screens) and a BPMN diagram of the variant and batch process.",
      "Tested core transaction flows (invoice creation, stock deduction, batch expiry) to verify accurate processing.",
    ],
  },
  {
    title: "Blockchain WFH Activity Monitoring System",
    context: "University group course project",
    tone: "cyan",
    description:
      "A blockchain-based WFH activity monitoring system built on Hyperledger Fabric. Employee activities are recorded as immutable transactions on a distributed ledger, ensuring data integrity and transparency.",
    points: [
      "Built with three layers: JavaScript chaincode on Fabric, a Node.js REST API via gRPC, and a PHP web client.",
      "Features role-based access (admin/user), real-time timer tracking, and full CRUD operations verified by blockchain consensus.",
    ],
  },
  {
    title: "HerbalScan: Medicinal Leaf Identification Web App",
    context: "Undergraduate thesis, Universitas Surabaya, 2026",
    tone: "amber",
    description:
      "Web app that lets anyone identify a medicinal plant from a photo of its leaf and learn how the plant is traditionally used. Undergraduate thesis project at Universitas Surabaya.",
    points: [
      "Built a web app where users upload a leaf photo (JPG, PNG or WEBP, with drag and drop) or take one directly with their device camera. The app identifies which of 10 common Indonesian medicinal plants the leaf belongs to: Binahong, Kaffir Lime, Basil, Cat’s Whiskers, Mint, Papaya, Indonesian Bay Leaf, Celery, Betel and Moringa.",
      "Designed a results page that shows the identified plant with a plant information card: Latin name, category, health benefits, active compounds, how to prepare and use it, and safety precautions.",
      "Made each prediction transparent: the page shows how many votes each plant received, what each AI architecture predicted, and how strongly the models agreed on the final answer.",
      "Added a safeguard that rejects a photo when the models do not agree enough, and asks the user for a clearer photo instead of showing an uncertain answer.",
      "Powered the identification with 15 deep learning models (5 each of MobileNetV2, ResNet50 and VGG16) built on a dataset of 2,746 leaf images. The models vote on every photo, and this combined vote reached 99.34% accuracy in testing, higher than any single architecture.",
    ],
  },
] as const;

export const skills = [
  {
    group: "AI Automation",
    tone: "pink",
    items: [
      "LLM API Integration (OpenAI)",
      "Function Calling",
      "Prompt Engineering",
      "Conversational Agents",
      "Workflow Automation",
      "LLM Evaluation",
      "Telegram Bot API",
    ],
  },
  {
    group: "Data Science & Machine Learning",
    tone: "cyan",
    items: [
      "Python",
      "TensorFlow / Keras",
      "Machine Learning",
      "Deep Learning (CNN)",
      "Transfer Learning",
      "Ensemble Learning",
      "Data Analysis",
      "Pandas",
      "NumPy",
    ],
  },
  {
    group: "Web & Backend Development",
    tone: "violet",
    items: [
      "PHP",
      "Laravel",
      "JavaScript",
      "React",
      "Node.js",
      "Flask",
      "REST API",
      "Progressive Web Apps",
      "Web Push",
      "HTML & CSS",
      "Bootstrap",
      "C#",
    ],
  },
  {
    group: "Database, Security & Tools",
    tone: "amber",
    items: [
      "MySQL",
      "PostgreSQL",
      "Supabase",
      "SQLite",
      "Role-based Access Control",
      "Row Level Security",
      "Two-factor Authentication",
      "Git & GitHub",
      "Automated Testing & CI",
      "AI-Assisted Development",
      "Microsoft Office",
    ],
  },
] as const;

export type ProjectShot = {
  src: string;
  label: string;
  caption: string;
  alt: string;
};

export type ProjectShotGroup = {
  name: string;
  note?: string;
  shots: readonly ProjectShot[];
};

// Screenshots shown on the Projects page, keyed by project title. A project
// with several groups gets tabs (for example customer side and admin side).
export const projectShots: Readonly<
  Record<string, readonly ProjectShotGroup[]>
> = {
  "HanziLearn: Mandarin Tutoring Management App": [
    {
      name: "Teacher side",
      note: "Demo data: fictional students. The app interface is in Indonesian.",
      shots: [
        {
          src: "/projects/hanzilearn/dashboard.webp",
          label: "Dashboard",
          caption:
            "Dashboard: today's lessons, active students and their HSK levels, homework waiting to be graded, and this month's invoices.",
          alt: "HanziLearn teacher dashboard with cards for active students, lessons today, unpaid invoices and income, above lists of today's lessons, students with HSK levels, homework to grade and invoices.",
        },
        {
          src: "/projects/hanzilearn/schedule.webp",
          label: "Schedule",
          caption:
            "Schedule: the week at a glance, with Remind on WhatsApp, Edit, Done and Cancel on each lesson, and a note of the material covered.",
          alt: "Weekly lesson schedule with day tabs and two lesson cards, each with buttons to remind on WhatsApp, edit, mark done or cancel.",
        },
        {
          src: "/projects/hanzilearn/progress-report.webp",
          label: "Progress report",
          caption:
            "Progress report: a monthly summary for one student, ready to copy or send to the student or parent on WhatsApp, with an optional note from the teacher.",
          alt: "Student detail panel with a monthly progress report showing lessons done, homework submitted with the average score, and practice, above a teacher note box and Copy and Send on WhatsApp buttons.",
        },
        {
          src: "/projects/hanzilearn/vocabulary-review.webp",
          label: "Vocabulary review",
          caption:
            "Vocabulary review: the teacher checks each word's Indonesian meaning, then marks it correct or edits it. Reviewed words get a green label.",
          alt: "HSK vocabulary list with draft and reviewed labels, a filter and search box, and Looks correct and Edit buttons on each word.",
        },
        {
          src: "/projects/hanzilearn/finance.webp",
          label: "Finance",
          caption:
            "Finance: lessons marked done are totalled per student for the month, issued as an invoice and sent with a WhatsApp message.",
          alt: "Finance page with monthly totals above a list of three students, each with an amount, an unissued status, and Issue and Send on WhatsApp buttons.",
        },
      ],
    },
    {
      name: "Student side",
      note: "Demo data: a fictional student. The app interface is in Indonesian.",
      shots: [
        {
          src: "/projects/hanzilearn/student-practice.webp",
          label: "Practice",
          caption:
            "Practice: flashcards, quizzes, writing, listening, word match and sentences for the student's HSK level.",
          alt: "Student self-study page with version and level pickers, six practice tabs and a flashcard showing a Chinese word.",
        },
        {
          src: "/projects/hanzilearn/student-homework.webp",
          label: "Homework",
          caption:
            "Homework: the student answers in text or with a photo and submits before the deadline.",
          alt: "Student homework page with two assignments, each with an answer box, an upload photo button and a submit button.",
        },
      ],
    },
  ],
  "Alter: AI Customer-Service Assistant": [
    {
      name: "Staff dashboard",
      note: "Demo data: a fictional cafe and fictional customers.",
      shots: [
        {
          src: "/projects/alter-assistant/orders.webp",
          label: "Orders",
          caption:
            "Orders: pickup orders taken by the assistant appear on a board by status. Moving one forward messages the customer automatically.",
          alt: "Alter dashboard with order cards in three columns, New, In progress and Ready for pickup, each showing items, total and pickup time, above summary cards for active orders and revenue.",
        },
        {
          src: "/projects/alter-assistant/followups.webp",
          label: "Follow-ups",
          caption:
            "Follow-ups: the urgent allergy report is on top in red, followed by a catering enquiry and a refund request the assistant passed to the team, each with the bot's reply.",
          alt: "Alter dashboard follow-up queue with an urgent allergy message from one customer and cards for a vegan question, a catering discount request and a refund request, each with Reply and Done buttons.",
        },
      ],
    },
  ],
  "Office Finance System": [
    {
      name: "Admin side",
      note: "All screenshots use test data.",
      shots: [
        {
          src: "/projects/office-finance/dashboard.webp",
          label: "Dashboard",
          caption:
            "Dashboard: total income, expenses, balance and a cash flow chart for the chosen month and year.",
          alt: "Finance dashboard with cards for total income, total expenses, period balance and number of transactions, above a cash flow chart.",
        },
        {
          src: "/projects/office-finance/approvals.webp",
          label: "Approvals",
          caption:
            "Approvals: transactions submitted by staff wait here until an admin approves or rejects them.",
          alt: "Transaction approval page listing pending income and expense entries, each with Approve and Reject buttons.",
        },
        {
          src: "/projects/office-finance/reports.webp",
          label: "Reports",
          caption:
            "Reports: filter transactions by month, date, type or keyword, then export to PDF or Excel.",
          alt: "Financial report page with date and type filters, summary cards and a table of transactions.",
        },
        {
          src: "/projects/office-finance/period-lock.webp",
          label: "Period lock",
          caption:
            "Period lock: closing a month stops any further changes to its transactions.",
          alt: "Period lock page with a form to lock a month and a list of locked periods, currently empty.",
        },
        {
          src: "/projects/office-finance/activity-log.webp",
          label: "Activity log",
          caption:
            "Activity log: sign-ins, approvals and voucher views are recorded with the user, time and IP address, and can be searched and filtered.",
          alt: "Activity log page with a search box and action filter above a table of recent events: logins, an approved expense and two voucher views, each with user, time and IP address.",
        },
      ],
    },
    {
      name: "Vouchers",
      note: "All screenshots use test data and a fictional company.",
      shots: [
        {
          src: "/projects/office-finance/voucher-pending.webp",
          label: "Pending",
          caption:
            "Voucher while waiting: a cash-out voucher with the company letterhead and the amount in words. A diagonal 'not yet approved' watermark keeps it from being used as proof.",
          alt: "Cash-out voucher with status Waiting for approval, payee, purpose, amount Rp 1,250,000 with the amount in words, signature boxes and a faint red watermark reading Belum disetujui.",
        },
        {
          src: "/projects/office-finance/voucher-approved.webp",
          label: "Approved",
          caption:
            "Voucher after approval: the watermark is gone, the status reads Approved, and the approver's name appears under the approval signature.",
          alt: "The same cash-out voucher with status Approved, no watermark, and the approver's name under the Approved by signature box.",
        },
      ],
    },
    {
      name: "Staff side",
      note: "All screenshots use test data.",
      shots: [
        {
          src: "/projects/office-finance/staff-income.webp",
          label: "Add income",
          caption:
            "Staff view: add income with category, department, payment method and a receipt photo or PDF. Staff entries wait for finance or admin approval.",
          alt: "Income page seen by a staff member, with a form for date, category, department, amount and receipt upload, a note that the entry awaits approval, and a list showing one pending entry.",
        },
        {
          src: "/projects/office-finance/staff-expenses.webp",
          label: "Add expense",
          caption:
            "Staff view: expenses are recorded the same way, and the list shows the staff member's own entries with their status, pending or approved.",
          alt: "Expense page seen by a staff member, with the same entry form above a list of two expenses, one pending and one approved, each with a print button.",
        },
      ],
    },
    {
      name: "Executive side",
      note: "All screenshots use test data.",
      shots: [
        {
          src: "/projects/office-finance/exec-dashboard.webp",
          label: "Dashboard",
          caption:
            "Executive view: the dashboard with totals and the cash flow chart. The menu has no approval or admin pages.",
          alt: "Dashboard seen by an executive account, with income, expense, balance and transaction cards above a cash flow chart.",
        },
        {
          src: "/projects/office-finance/exec-overview.webp",
          label: "Overview",
          caption:
            "Executive view, further down the dashboard: latest transactions, top expenses, and income and expenses by category.",
          alt: "Lower part of the dashboard with a list of latest transactions, the largest expenses, and bars for income and expenses by category.",
        },
        {
          src: "/projects/office-finance/exec-reports.webp",
          label: "Reports",
          caption:
            "Executive view: the financial report with filters, summary cards, subtotals and PDF or Excel export.",
          alt: "Financial report page with filters, summary cards for income, expenses and balance, and a detailed transaction table with subtotals.",
        },
        {
          src: "/projects/office-finance/exec-cashbook.webp",
          label: "Cash book",
          caption:
            "Cash book: a monthly ledger that starts from the opening balance and keeps a running balance, exportable to PDF or Excel.",
          alt: "Monthly cash book with opening balance, total in, total out and closing balance cards, above a ledger with a running balance column.",
        },
        {
          src: "/projects/office-finance/exec-budgets.webp",
          label: "Budgets",
          caption:
            "Budgets: each category's spending against its monthly budget, with the amount still left.",
          alt: "Budget page showing progress bars for two expense categories with the amount spent, the budget and the remaining balance.",
        },
      ],
    },
    {
      name: "Sign-in",
      note: "All screenshots use test data.",
      shots: [
        {
          src: "/projects/office-finance/login.webp",
          label: "Login",
          caption: "Login: each office user signs in with their own account.",
          alt: "Dark login screen with email and password fields for the FinanceApp office finance system.",
        },
        {
          src: "/projects/office-finance/two-step.webp",
          label: "Two-step check",
          caption:
            "Two-step check: a code from an authenticator app is required after the password.",
          alt: "Two-step verification screen asking for a six digit code from an authenticator app.",
        },
        {
          src: "/projects/office-finance/finance-two-step-required.webp",
          label: "2FA required",
          caption:
            "Mandatory two-factor: a finance account must set up an authenticator app before it can use the other pages.",
          alt: "Account security page with a warning that the finance role must use two-factor authentication, three setup steps and an Activate 2FA button.",
        },
      ],
    },
  ],
  "HerbalScan: Medicinal Leaf Identification Web App": [
    {
      name: "Screens",
      shots: [
        {
          src: "/projects/herbalscan/home.webp",
          label: "Home",
          caption:
            "Home: upload a leaf photo or capture one with the camera, then classify it with one click.",
          alt: "HerbalScan home page with Upload Image and Use Camera tabs, a drag and drop area for a leaf photo, and a classify button.",
        },
        {
          src: "/projects/herbalscan/result.webp",
          label: "Result",
          caption:
            "Result: the identified plant, how many of the 15 models voted for it, and what each architecture predicted.",
          alt: "Result for a kaffir lime leaf showing 11 of 15 votes, plus the prediction of each of the three model architectures.",
        },
        {
          src: "/projects/herbalscan/plant-info.webp",
          label: "Plant info",
          caption:
            "Plant information: Latin name, health benefits, active compounds, how to use it and precautions, below the vote distribution across all ten plants.",
          alt: "Vote distribution bars for ten medicinal plants above an information card with benefits, active compounds, how to use and precautions.",
        },
      ],
    },
  ],
  "Blockchain WFH Activity Monitoring System": [
    {
      name: "Screens",
      shots: [
        {
          src: "/projects/wfh-blockchain/employee.webp",
          label: "Employee view",
          caption:
            "Employee view: totals for activities, work hours, active employees and departments, above the recorded activities.",
          alt: "Dark dashboard titled WFH Activity Monitor with four summary cards and a table of recorded work-from-home activities.",
        },
        {
          src: "/projects/wfh-blockchain/admin.webp",
          label: "Admin view",
          caption:
            "Admin view: one summary card per employee and the full record list, marked read-only.",
          alt: "Admin dashboard with summary cards per employee and a table of blockchain records labelled read only.",
        },
        {
          src: "/projects/wfh-blockchain/system.webp",
          label: "System",
          caption:
            "System page: the REST API endpoints and a diagram of the PHP client, Node.js API and Hyperledger Fabric network.",
          alt: "Panels listing the REST API endpoints for activities and a text diagram of the PHP client, Node.js API and Hyperledger Fabric peers.",
        },
      ],
    },
  ],
  "Sales & Purchase Information System": [
    {
      name: "Customer side",
      shots: [
        {
          src: "/projects/fl-beauty/home.webp",
          label: "Home",
          caption:
            "Home: the store introduction with brand and product counts, and quick links to the catalog and WhatsApp chat.",
          alt: "FL Beauty store home page with a pink hero, a Lihat Katalog button and a WhatsApp chat button.",
        },
        {
          src: "/projects/fl-beauty/catalog.webp",
          label: "Catalog",
          caption:
            "Catalog: 43 skincare products you can search and filter by category or brand.",
          alt: "Skincare catalog with search, category and brand filters above a grid of product cards with prices.",
        },
        {
          src: "/projects/fl-beauty/product-detail.webp",
          label: "Product",
          caption:
            "Product detail: photos, description, size options with price and stock, and add to cart.",
          alt: "Product page for a facial cleanser with an image gallery, size options, price, quantity and an add to cart button.",
        },
        {
          src: "/projects/fl-beauty/cart.webp",
          label: "Cart",
          caption:
            "Cart: change quantities, choose which items to check out, and see the total.",
          alt: "Shopping cart with two products, quantity controls, and an order summary with the total and a checkout button.",
        },
      ],
    },
    {
      name: "Admin side",
      shots: [
        {
          src: "/projects/fl-beauty/admin-dashboard.webp",
          label: "Dashboard",
          caption:
            "Admin dashboard: active products, sales and purchase notes, pending items and suppliers at a glance.",
          alt: "Admin dashboard with cards for active products, sales notes, purchase notes, pending items and suppliers.",
        },
        {
          src: "/projects/fl-beauty/admin-products.webp",
          label: "Products",
          caption:
            "Manage products: add a product with images, category and brand, and see each product's batch and status.",
          alt: "Product management page with an add product form above a table of products with batch and status columns.",
        },
        {
          src: "/projects/fl-beauty/admin-sales-note.webp",
          label: "Sales note",
          caption:
            "Sales note: record an in-store or WhatsApp sale by picking products and quantities.",
          alt: "Sales note form with a choice of in-store visitor or WhatsApp order, a product search, and an items table with a total.",
        },
      ],
    },
  ],
};

// Public links per project, keyed by title. Add "code" (a GitHub repository) or "demo" (a live
// page or video) when it exists: the buttons appear on the project card by themselves.
export type ProjectLinks = { code?: string; demo?: string };
export const projectLinks: Readonly<Record<string, ProjectLinks>> = {
  "Alter: AI Customer-Service Assistant": {
    code: "https://github.com/bryanrumuy/alter-ai-assistant",
  },
  "Blockchain WFH Activity Monitoring System": {
    code: "https://github.com/bryanrumuy/blockchain-wfh-monitoring",
  },
};

// Skills and deliverables per project, shown as chips under the goals.
export const projectStacks: Readonly<Record<string, readonly string[]>> = {
  "HanziLearn: Mandarin Tutoring Management App": [
    "React",
    "Vite",
    "Supabase",
    "PostgreSQL",
    "Row Level Security",
    "Edge Functions",
    "Web Push",
    "Progressive Web App",
    "Cloudflare Workers",
    "Automated Testing",
  ],
  "Alter: AI Customer-Service Assistant": [
    "Node.js",
    "OpenAI API",
    "Function Calling",
    "Prompt Engineering",
    "SQLite",
    "Telegram Bot API",
    "REST API",
    "LLM Evaluation",
    "Security Hardening",
    "Automated Testing",
  ],
  "Office Finance System": [
    "PHP",
    "Laravel",
    "MySQL",
    "MariaDB",
    "Bootstrap",
    "Alpine.js",
    "Chart.js",
    "Role-based Access Control",
    "Two-factor Authentication",
    "PDF & Excel Reporting",
    "Security Hardening",
    "Audit Logging",
    "Automated Testing & CI",
    "Backup & Recovery",
  ],
  "Sales & Purchase Information System": ["PHP", "MySQL", "Bootstrap"],
  "HerbalScan: Medicinal Leaf Identification Web App": [
    "Python",
    "TensorFlow / Keras",
    "Flask",
    "JavaScript",
    "HTML / CSS",
  ],
  "Blockchain WFH Activity Monitoring System": [
    "Hyperledger Fabric",
    "Node.js",
    "PHP",
    "Blockchain",
    "REST API",
  ],
};
