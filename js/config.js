/*
  SITE SETTINGS — edit this one file to brand the site for a community.
  Every page reads names, phone numbers and links from here.
  Links left as "#" show a "Link coming soon" note instead of opening.
*/
window.SITE = {
  // Names
  nation: "[Nation Name]",                       // e.g. "Example First Nation"
  community: "[Community Name]",                 // e.g. the village or reserve name
  siteName: "Maintenance Management",            // shown after the community name

  // Logo: put the Nation's logo in /images and set its path here, e.g. "images/logo.png".
  // Leave as "" to show the "Nation's logo" placeholder.
  logo: "",

  // Optional greeting in the Nation's language, shown above the home headline.
  // Leave as "" to hide it.
  greeting: "[Greeting in the Nation's language]",

  // Notice banner across the top of every page (water shutoffs, closures, etc.).
  // level: "info" (green), "warning" (amber) or "alert" (red). Set show: false to hide.
  notice: {
    show: true,
    level: "info",
    text: "Example notice: the Maintenance Office is closed on Friday. Urgent problems can still be reported online.",
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

  // Public report form (e.g. a public Survey123 link). No sign-in needed.
  reportUrl: "#",

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
      id: "modules",
      icon: "book",           // wrench, house, lifebuoy, box, book, truck, water, bolt or tree
      title: "Modules",
      blurb: "Reference modules for the maintenance system: how it works, how to use it, and how work is planned and reviewed.",
      modes: [
        { label: "Module 1", text: "[Module 1 title]: a short description of what it covers.", url: "#" },
        { label: "Module 2", text: "[Module 2 title]: a short description of what it covers.", url: "#" },
        { label: "Module 3", text: "[Module 3 title]: a short description of what it covers.", url: "#" },
        { label: "Module 4", text: "[Module 4 title]: a short description of what it covers.", url: "#" },
        { label: "Module 5", text: "[Module 5 title]: a short description of what it covers.", url: "#" }
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
    }
  ],

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
