import { Workflow, AddOnService } from "./types";

// Standard high-value add-ons that can be toggled inside any service selection popup
export const defaultAddOns: AddOnService[] = [
  {
    id: "express",
    name: "VIP Express Fast-Track Processing",
    description: "Accelerate government workflow queues with priority submission (reduces timeline from 4-5 days to 24-48 hours).",
    price: 250,
  },
  {
    id: "courier",
    name: "VIP Premium Door-to-Door Courier",
    description: "Secure, insured desk pickup and delivery of physical original passports, birth certificates, and Emirates ID cards.",
    price: 50,
  },
  {
    id: "sms",
    name: "Real-time SMS & WhatsApp Status Updates",
    description: "Instant notification tracking alerts directly to your phone as status moves through government systems.",
    price: 20,
  },
];

export const workflows: Workflow[] = [
  {
    id: "family_visa",
    title: "Family Visa Setup",
    icon: "Users2",
    description: "Apply for residency sponsorship for spouse, children, or dependents in the UAE under Abu Dhabi/Dubai regulations.",
    services: [
      {
        id: "f1",
        name: "Marriage Certificate Attestation",
        price: 450,
        description: "Requires official MOFA (Ministry of Foreign Affairs) and home country Embassy attestation. This validates your marriage contract for UAE residency rules.",
      },
      {
        id: "f2",
        name: "Legal Arabic Translation",
        price: 150,
        description: "Certified legal translation of original certificates from english/home languages into Arabic as requested by immigration typing authorities.",
      },
      {
        id: "f3",
        name: "Sponsor File Opening",
        price: 350,
        description: "Initiation and registration of your sponsor identity profile database inside the Federal ICP system.",
        additionalInfo: "if the person didn’t sponsored family before",
      },
      {
        id: "f4",
        name: "Entry Permit Issuance",
        price: 650,
        description: "Submission for the electronic visa permit slip which officially licenses the family member to legally arrive or change status in the UAE.",
      },
      {
        id: "f5",
        name: "Change of Status Processing",
        price: 650,
        description: "Adjusting legal immigration status inside the country without requiring exit and reentry through airport boundaries.",
        additionalInfo: "if they are new here",
      },
      {
        id: "f6",
        name: "Medical Fitness Examination",
        price: 320,
        description: "Scheduled blood screening and full chest X-ray at a certified DHA/MOHAP government center to clear safety prerequisites.",
      },
      {
        id: "f7",
        name: "Health Insurance Plan",
        price: 850,
        description: "Standard statutory basic medical security card alignment required for processing residency clearances.",
      },
      {
        id: "f8",
        name: "Emirates ID & Residency Alignment",
        price: 500,
        description: "Final documentation setup, biomatric capture appointment scheduling, and issuing of the visual Emirates ID.",
      }
    ]
  },
  {
    id: "family_visa_renewal",
    title: "Family Visa Renewal",
    icon: "RotateCw",
    description: "Renew status for existing sponsored family members prior to expiration to prevent government fines.",
    services: [
      {
        id: "fr1",
        name: "Emirates ID & Residency Extension Package",
        price: 750,
        description: "Complete renewal processing of residency file, ICA typing, health insurance policy linkage, and production of updated Emirates ID card.",
      }
    ]
  },
  {
    id: "employment_visa",
    title: "Employment Visa Setup",
    icon: "Briefcase",
    description: "Hire personnel or sponsor standard team members for your corporate establishment under Mohre / Immigration.",
    services: [
      {
        id: "e1",
        name: "Work Permit Package (Offer & Contract)",
        price: 800,
        description: "Issuing MOHRE labor quota, drafting formal bilingual Arabic-English offer letter terms and obtaining worker signature approval.",
      },
      {
        id: "e2",
        name: "Dubai Insurance / Work Policy Setup",
        price: 250,
        description: "Securing mandatory corporate staff insurance protection backing employee benefits according to federal ministries.",
      },
      {
        id: "e3",
        name: "Government Administrative Fee Payment",
        price: 900,
        description: "Handling direct governmental quota clearances, labor deposit waivers, and state-owned service processing fees.",
      },
      {
        id: "e4",
        name: "Entry Permit Processing",
        price: 600,
        description: "Generating secure in-country or entry-only permit vouchers for the prospective employee to legally execute duties.",
      },
      {
        id: "e5",
        name: "Change of Status Processing",
        price: 650,
        description: "Adjustment of visa permit parameters on the federal database without requiring the employee to leave the UAE.",
        additionalInfo: "if they are new here",
      },
      {
        id: "e6",
        name: "Health Insurance Alignment",
        price: 850,
        description: "Linking compliant employer-funded healthcare plan, required for residency activation.",
      },
      {
        id: "e7",
        name: "Medical Test Screening",
        price: 320,
        description: "Government medical assessment for work visa approvals.",
      },
      {
        id: "e8",
        name: "Emirates ID Registration & Residency",
        price: 550,
        description: "Filing Emirates ID typing card and final approval processing of residence residency record.",
      }
    ]
  },
  {
    id: "renew_employment_visa",
    title: "Renew Employment Visa",
    icon: "FileCheck",
    description: "Extend validity of staff work contracts, labor cards, and residency permissions for active personnel.",
    services: [
      {
        id: "re1",
        name: "Echannel System Renewal",
        price: 300,
        description: "Renewal of the company's active user connection on the digital immigration channels platform.",
      },
      {
        id: "re2",
        name: "Labor Contract Renewal Processing",
        price: 400,
        description: "Recalculating MOHRE parameters, uploading revised work durations, and printing unified employment contracts.",
      },
      {
        id: "re3",
        name: "Insurance Premium Renewal",
        price: 250,
        description: "Renewing employee insurance pool reserves under the central security scheme.",
      },
      {
        id: "re4",
        name: "Contract Submission to MOHRE",
        price: 200,
        description: "Paying typing fees and formalizing digital agreements under MOHRE server channels.",
      },
      {
        id: "re5",
        name: "Emirates ID Card & Residency Renewal",
        price: 600,
        description: "Combined typing of replacement 2-year Emirates ID application and residency validation.",
      }
    ]
  },
  {
    id: "domestic_visa",
    title: "Domestic Helper Visa",
    icon: "Home",
    description: "Sponsor maids, nannies, cooks, drivers, or gardeners for your residence in accordance with local regulations.",
    services: [
      {
        id: "d1",
        name: "Domestic Insurance Coverage",
        price: 350,
        description: "Sponsoring emergency healthcare coverage and repatriation protection program designated for domestic staff.",
      },
      {
        id: "d2",
        name: "Entry Permit File Generation",
        price: 500,
        description: "Submitting formal typing application to Tadbeer or Immigration portals to authorize visa entrance.",
      },
      {
        id: "d3",
        name: "Change of Status Processing",
        price: 650,
        description: "Amending active tourist or entry status into the domestic residency file without exit borders.",
        additionalInfo: "if they are new here",
      },
      {
        id: "d4",
        name: "Health Insurance Binding",
        price: 700,
        description: "Filing local mandatory health policy for the domestic worker.",
      },
      {
        id: "d5",
        name: "Medical Fitness Screening",
        price: 320,
        description: "Mandatory blood and health assessments for household registry workers.",
      },
      {
        id: "d6",
        name: "Emirates ID Biometric Application",
        price: 450,
        description: "Scheduling biometrics appointment and executing the digital cards filing loop.",
      },
      {
        id: "d7",
        name: "Residency Issuance & Validation",
        price: 400,
        description: "Concluding immigration stamp clearances and completing official household residency status.",
      }
    ]
  },
  {
    id: "renew_domestic_visa",
    title: "Renew Domestic Helper Visa",
    icon: "Undo2",
    description: "Extend residency and labor contracts for domestic helpers to maintain compliance.",
    services: [
      {
        id: "rd1",
        name: "Medical Assessment Screening",
        price: 320,
        description: "Renewal medical checks requested for domestic workforce clearances.",
      },
      {
        id: "rd2",
        name: "Domestic Labor Contract Renewal",
        price: 350,
        description: "Renewing work declarations under ministry databases for domestic helpers.",
      },
      {
        id: "rd3",
        name: "Emirates ID Extension Submission",
        price: 450,
        description: "Typing and updating federal identification database fields.",
      },
      {
        id: "rd4",
        name: "Insurance Continuation Base",
        price: 350,
        description: "Extending insurance coverage protection.",
      },
      {
        id: "rd5",
        name: "Residency Status Renewal",
        price: 400,
        description: "Submitting the final residency folder extension on the ICA system.",
      }
    ]
  },
  {
    id: "trade_license",
    title: "Trade License Setup",
    icon: "Building2",
    description: "Launch a brand new business entity in mainland or free zone with commercial, professional, or industrial licenses.",
    services: [
      {
        id: "tl1",
        name: "Economic Name Reservation & Approval",
        price: 1200,
        description: "Registering trade name and securing Initial Approval certificate from the Department of Economic Development (DED).",
      },
      {
        id: "tl2",
        name: "LLC Corporate Agreement & MOA Submission",
        price: 2500,
        description: "Notarizing Memorandum of Association (MOA) and securing local ownership or service relationships.",
      },
      {
        id: "tl3",
        name: "Tenancy (Ejari / Tawtheeq) Compliance",
        price: 600,
        description: "Registering commercial lease/office contract on municipal servers as a core location prerequisite.",
      },
      {
        id: "tl4",
        name: "Official Commercial License Issuance",
        price: 4500,
        description: "DED licensing and issuance of the company's active corporate certificate.",
      },
      {
        id: "tl5",
        name: "Ultimate Real Beneficiary (UBO) Registration",
        price: 400,
        description: "Completing mandatory company transparency declarations and registering actual directors details in federal systems.",
      },
      {
        id: "tl6",
        name: "Echannel Immigration Platform Registration",
        price: 2100,
        description: "Creating the company's official corporate database file under ICA to enable staff visa sponsorships.",
      }
    ]
  },
  {
    id: "investor_visa",
    title: "Investor / Partner Visa",
    icon: "UserCheck",
    description: "Secure long-term residency (Partner/Investor Visa) linked to company ownership shareholdings.",
    services: [
      {
        id: "iv1",
        name: "Partner Entry Permit Generation",
        price: 1250,
        description: "Typing the first entry approval to initiate partner residency status based on trade shares.",
      },
      {
        id: "iv2",
        name: "Change of Status Processing",
        price: 650,
        description: "Executing in-country visa activation routines without border cross-overs.",
        additionalInfo: "if they are new here",
      },
      {
        id: "iv3",
        name: "Comprehensive Medical Insurance Policy",
        price: 1200,
        description: "Mandatory corporate investor health policy integration.",
      },
      {
        id: "iv4",
        name: "Medical Fitness Clearance",
        price: 320,
        description: "Specialized physical assessment screening required for investors/partners.",
      },
      {
        id: "iv5",
        name: "Emirates ID Filing & Partner Residency",
        price: 850,
        description: "Completing long-term card typing and official residency stamps.",
      }
    ]
  },
  {
    id: "trade_license_amendment",
    title: "License Amendment",
    icon: "FileEdit",
    description: "Modify current partner composition, change trade names, add business activities, or adjust corporate structure.",
    services: [
      {
        id: "tla1",
        name: "Trade Name Amendment Reservation",
        price: 1000,
        description: "Filing name adjustment queries and locking down alternative commercial nomenclature.",
      },
      {
        id: "tla2",
        name: "Legal Newspaper Notice Publication",
        price: 600,
        description: "Compiling and issuing state public prints required for corporate changes (exit of partners, name change).",
      },
      {
        id: "tla3",
        name: "MOA Addendum Generation & Filing",
        price: 1500,
        description: "Drafting, executing, and registering revised Memorandum of Association details under government courts.",
      },
      {
        id: "tla4",
        name: "Amended License Government Adjustments",
        price: 2000,
        description: "Securing updated commercial sheets reflecting modern share structures, allocations, or locations.",
      },
      {
        id: "tla5",
        name: "License Integration Profile Update (ICP)",
        price: 350,
        description: "Mandatory profile modifications on immigration panels to ensure synchronicity.",
      },
      {
        id: "tla6",
        name: "License Integration Profile Update (MOHRE)",
        price: 350,
        description: "Updating state employment registries to align company metadata.",
      }
    ]
  },
  {
    id: "trade_license_renewal",
    title: "License Renewal",
    icon: "Coins",
    description: "Renew mainland trade permissions, corporate Ejari, and associated immigration channels.",
    services: [
      {
        id: "tlr1",
        name: "Commercial Trade License Renewal",
        price: 3500,
        description: "Renewing active DED commercial licenses, including municipal, waste, and chamber registration.",
      },
      {
        id: "tlr2",
        name: "Echannel Gate System Renewal",
        price: 1150,
        description: "Renewing company's digital gateway with federal immigration channels.",
      },
      {
        id: "tlr3",
        name: "ICP Registry License Base Update",
        price: 350,
        description: "Formally registering renewal parameters on general immigration directories.",
      },
      {
        id: "tlr4",
        name: "MOHRE Registry License Base Update",
        price: 350,
        description: "Confirming state active company status under ministry database fields.",
      }
    ]
  },
  {
    id: "tajir_abudhabi",
    title: "Tajir Abu Dhabi License",
    icon: "MapPin",
    description: "Launch simplified micro-business licensing in Abu Dhabi, perfect for home operations/consultants.",
    services: [
      {
        id: "tab1",
        name: "Economic Name Reservation (Abu Dhabi)",
        price: 800,
        description: "Securing Abu Dhabi DED trade name reservations.",
      },
      {
        id: "tab2",
        name: "DED Initial Approval Certificate",
        price: 1000,
        description: "Securing preliminary operational validation from ADAID/DED.",
      },
      {
        id: "tab3",
        name: "Real Beneficiary (UBO) Compliance Filing",
        price: 400,
        description: "Filing regulatory controller listings on digital registries.",
      },
      {
        id: "tab4",
        name: "Tajir License Formal Issuance Fees",
        price: 2500,
        description: "Securing active digital Abu Dhabi Tajir commercial license.",
      },
      {
        id: "tab5",
        name: "Echannel Immigration Platform Link",
        price: 2100,
        description: "Affiliating Tajir entities with federal immigration structures to enable future residency sponsorships.",
      }
    ]
  },
  {
    id: "tax",
    title: "Corporate Tax & VAT",
    icon: "Percent",
    description: "Register corporate tax registries and federal VAT details to align with modern UAE tax laws.",
    services: [
      {
        id: "tx1",
        name: "Corporate Tax Account Setup & Registration",
        price: 1200,
        description: "Creating tax files and registering your company under General Corporate Tax pathways with Federal Tax Authority.",
      },
      {
        id: "tx2",
        name: "Value Added Tax (VAT) Full Registration",
        price: 800,
        description: "Establishing standard corporate VAT registration, generating your dedicated federal Tax Registration Number (TRN).",
      }
    ]
  },
  {
    id: "driving_license_golden_chance",
    title: "Driving License (Golden Chance)",
    icon: "Award",
    description: "Skip full driving classes and clear the UAE practical driving test in a single-attempt (Golden Chance).",
    services: [
      {
        id: "dlg1",
        name: "Certified Optometric Eye Test",
        price: 180,
        description: "Mandatory visual testing recorded live via state authorized optometry center linked to RTA/DED files.",
      },
      {
        id: "dlg2",
        name: "Traffic File Setup & Native License Translation",
        price: 450,
        description: "Translating international licenses and lodging formal traffic profiles on police servers.",
      },
      {
        id: "dlg3",
        name: "Theory Training & Exam Block",
        price: 850,
        description: "Accessing digital theory systems, booking testing dates, and sitting key examinations.",
      },
      {
        id: "dlg4",
        name: "Road Test Date Booking & Learning Permit",
        price: 600,
        description: "Reserving your single Golden Chance practical road assessment date.",
      },
      {
        id: "dlg5",
        name: "Direct Practical Assessment Drive Class",
        price: 300,
        description: "Practical assessment session and refresher course.",
      },
      {
        id: "dlg6",
        name: "Passing Certificate Generation Check",
        price: 150,
        description: "Administrative verification and passing confirmation processing.",
      },
      {
        id: "dlg7",
        name: "Official UAE Driving Card Issuance",
        price: 600,
        description: "Printing and dispatching your formal UAE driver card.",
      }
    ]
  },
  {
    id: "driving_license_normal",
    title: "Driving License (Standard)",
    icon: "Car",
    description: "Complete full driving classes, internal parking assessments, and practical road testing pipeline.",
    services: [
      {
        id: "dln1",
        name: "Certified Optometric Eye Test",
        price: 180,
        description: "Standard approved eye evaluation.",
      },
      {
        id: "dln2",
        name: "Standard Traffic File Registration Check",
        price: 300,
        description: "Initiating digital driving traffic file profile.",
      },
      {
        id: "dln3",
        name: "Theory Classes, Simulator & Exam Booking",
        price: 850,
        description: "Complete theory training course and certification check.",
      },
      {
        id: "dln4",
        name: "Internal Parking Assessment Matrix & Testing",
        price: 650,
        description: "Undertaking specialized yard controls testing (slopes, emergency, parallel, bridge parking).",
      },
      {
        id: "dln5",
        name: "Road Test Date Booking & Learning Permit",
        price: 600,
        description: "Reserving assessment date and issuing learning clearance card.",
      },
      {
        id: "dln6",
        name: "Mandatory Public Road Practical Drive Classes",
        price: 1800,
        description: "Mandatory 20 hours hands-on driving sessions in public roads with certified vehicles.",
      },
      {
        id: "dln7",
        name: "Passing Certificate Processing",
        price: 150,
        description: "Formal digital system completion registry validations.",
      },
      {
        id: "dln8",
        name: "Official UAE Driving Card Issuance",
        price: 600,
        description: "Final printing of your legal UAE drivers physical license.",
      }
    ]
  }
];
