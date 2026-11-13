/*
  SITE SETTINGS — edit this one file to brand the site for a community.
  Every page reads names, phone numbers and links from here.
  Links left as "#" show a "Link coming soon" note instead of opening.
*/
window.SITE = {
  // Names
  nation: "Silver Creek Landing",                       // e.g. "Example First Nation"
  community: "Silver Creek Landing",                 // e.g. the village or reserve name
  siteName: "Maintenance Management",            // shown after the community name

  // BRAND COLOURS: pick two colours from the Nation's logo and the whole site follows.
  // primary = dark colour for buttons, header text and footer (keep it dark)
  // accent  = highlight colour for links, icons and badges
  // Lighter and darker shades are worked out automatically, and text is kept readable.
  brand: {
    primary: "#1d3557",
    accent: "#e07a2f"
  },

  // Logo: put the Nation's logo in /images and set its path here, e.g. "images/logo.png".
  // Leave as "" to show the "Nation's logo" placeholder.
  logo: "images/logo.png",

  // DEMO MODE: shows a small "Demo site" tag in the footer. Set to false for a real community.
  demo: true,
  demoNote: "Sample community and content for demonstration.",

  // Optional greeting in the Nation's language, shown above the home headline.
  // Leave as "" to hide it.
  greeting: "[Greeting in the Nation's language]",

  // Notice banner across the top of every page (water shutoffs, closures, etc.).
  // level: "info" (green), "warning" (amber) or "alert" (red). Set show: false to hide.
  notice: {
    show: true,
    level: "info",        // info (blue-grey), warning (amber) or alert (red)
    text: "Water shut-off on Harbour Road, Tuesday 9 am to 1 pm, for valve replacement. Please store water beforehand.",
    link: "",              // optional URL for "More details"
    id: "notice-1"         // change this when you post a new notice so people who closed the old one see it
  },

  // Footer details
  about: "This portal is run by the Maintenance Department. It connects community members and staff to the reporting form, dashboards and records used to look after community buildings, homes and equipment.",
  lastUpdated: "November 2026",

  // Contacts
  officeLabel: "Maintenance Office",
  officePhone: "000-000-0000",
  emergencyPhone: "000-000-0000",
  officeEmail: "maintenance@example.org",
  officeHours: "Monday to Friday, 8:30 am – 4:30 pm",

  // Help for staff who can't get into the tools (shown at the bottom of the Staff page)
  staffHelp: {
    name: "the Maintenance Coordinator",
    email: "admin@example.org",
    manualUrl: "#"          // link to the system manual or Module 4
  },

  // Public report form (e.g. a public Survey123 link). No sign-in needed.
  reportUrl: "https://arcg.is/1HOL443",

  // Staff tools. Each mode shows as a tab on its card. Add, remove or rename freely.
  services: [
    {
      id: "general",
      icon: "wrench",           // wrench, house, lifebuoy, box, book, truck, water, bolt or tree
      title: "General Maintenance",
      blurb: "Work orders, assignments and progress for buildings, grounds and community assets.",
      modes: [
        { label: "Dashboard", text: "Live map and charts of open and closed work orders.", url: "#" },
        { label: "Survey", text: "Log a new deficiency or update a work order in the field.", url: "#" },
        { label: "Report", text: "Printable summary of work completed this period.", url: "#" },
        { label: "Dataset", text: "The underlying records, for filtering and export.", url: "#" }
      ]
    },
    {
      id: "housing",
      icon: "house",           // wrench, house, lifebuoy, box, book, truck, water, bolt or tree
      title: "Housing Maintenance",
      blurb: "House condition, inspection status and housing work orders in one view.",
      modes: [
        { label: "Dashboard", text: "Condition, inspection and work order status by unit.", url: "#" },
        { label: "Survey", text: "Record a housing inspection or repair.", url: "#" },
        { label: "Report", text: "Housing summary for planning and funding reports.", url: "#" },
        { label: "Dataset", text: "Unit records and inspection history.", url: "#" },
        { label: "Files", text: "House records and documents in shared storage.", url: "#" }
      ]
    },
    {
      id: "inventory",
      icon: "box",           // wrench, house, lifebuoy, box, book, truck, water, bolt or tree
      title: "Inventory Tracker",
      blurb: "Parts, materials and tools: what is on hand and what has moved.",
      modes: [
        { label: "Stock Levels", text: "What is on the shelf and what is running low.", url: "#" },
        { label: "Transactions", text: "Items signed in and out, by date and person.", url: "#" },
        { label: "Survey", text: "Record stock received or used.", url: "#" },
        { label: "Dataset", text: "The full inventory table.", url: "#" }
      ]
    },
    {
      id: "modules",
      icon: "book",           // wrench, house, lifebuoy, box, book, truck, water, bolt or tree
      title: "Modules",
      blurb: "Reference modules for the maintenance system: how it works, how to use it, and how work is planned and reviewed.",
      // label = short tab name, title = button text, icon = optional (book by default for modules)
      modes: [
        { label: "Introduction", title: "Module 1: Introduction", icon: "book", text: "Purpose of the plan and how to use these modules.", url: "#" },
        { label: "Asset Inventory", title: "Module 2: Asset Inventory", icon: "book", text: "What the community owns and where it is.", url: "#" },
        { label: "Condition & Risk", title: "Module 3: Condition & Risk", icon: "book", text: "How assets are rated and which risks come first.", url: "#" },
        { label: "The System", title: "Module 4: Asset Management System", icon: "book", text: "How the dashboards, surveys and records fit together.", url: "#" },
        { label: "Planning", title: "Module 5: Maintenance Planning", icon: "book", text: "Scheduling, review and monitoring of maintenance work.", url: "#" }
      ]
    }
  ],

  // Seasonal maintenance tips (Home page). The current season is highlighted automatically.
  seasons: [
    { name: "Spring", months: [3, 4, 5], tips: [
      "Check roofs and gutters for winter damage",
      "Look for leaks under sinks and around windows",
      "Clear drainage ditches and culverts"
    ]},
    { name: "Summer", months: [6, 7, 8], tips: [
      "Clear brush and dry material away from buildings",
      "Check decks, stairs and railings",
      "Book exterior painting and repairs"
    ]},
    { name: "Fall", months: [9, 10, 11], tips: [
      "Change furnace filters and test heating",
      "Clean gutters and downspouts before the rain",
      "Check weatherstripping on doors and windows"
    ]},
    { name: "Winter", months: [12, 1, 2], tips: [
      "Keep vents and chimneys clear of snow",
      "Let taps drip in deep cold to stop frozen pipes",
      "Keep walkways sanded and salted"
    ]}
  ],

  // Frequently asked questions (Community page)
  faq: [
    { q: "What should I report?",
      a: "Anything broken, leaking, unsafe or not working in community buildings, homes, roads, walkways or equipment. If you're not sure, report it and staff will decide." },
    { q: "Is it an emergency?",
      a: "If anyone is in danger, call 911 first. For urgent problems like no heat in winter, a burst pipe or a power hazard, call the after-hours line rather than using the form." },
    { q: "Who fixes what in my home?",
      a: "This depends on your housing agreement. In general, the Maintenance Department looks after the structure, heating, plumbing and electrical systems in community-owned housing. Contact the office if you're unsure." },
    { q: "How long will a repair take?",
      a: "Safety problems come first. Other work is scheduled by priority, staff availability and whether parts or materials need to be ordered." },
    { q: "Can I check on a report I've made?",
      a: "Yes. Call or email the Maintenance Office and they can tell you where things stand." },
    { q: "Who sees my report?",
      a: "Only the maintenance team. Reports are not shown publicly, and your contact details are only used to follow up with you." },
    { q: "Can I report for someone else?",
      a: "Yes. You can report a problem on behalf of an Elder, a neighbour or a family member. Add their location and the best way to reach them." }
  ],

  // PHOTOS: where each photo is centred when it's cropped to fit (focus: "left% top%"),
  // and the short field-log caption shown on it. "50% 50%" is the centre; "30% 40%" moves
  // the crop left and up. Change these whenever you swap a photo.
  photos: {
    "hero-1": { focus: "35% 45%", caption: "Waterfront homes" },
    "hero-2": { focus: "65% 35%", caption: "Framing a new build" },
    "hero-3": { focus: "50% 55%", caption: "Roofing materials" },
    "hero-4": { focus: "55% 62%", caption: "Village from above" },
    "hero-5": { focus: "45% 32%", caption: "Field inspection" },
    "community": { focus: "50% 58%" },
    "staff": { focus: "42% 40%" },
    "community-header": { focus: "40% 45%", caption: "Residential street" },
    "staff-header": { focus: "60% 55%", caption: "Materials store" }
  },

  // Rotating safety tips (home hero and Community page)
  safetyTips: [
    "Report broken steps, railings or lights as soon as you see them.",
    "Keep exits, stairways and hallways clear.",
    "Test your smoke alarm monthly and change batteries twice a year.",
    "Never touch downed power lines. Stay back and call for help.",
    "Clear ice and snow from walkways and use salt or sand.",
    "Report water leaks early to prevent mould and rot."
  ]
};
