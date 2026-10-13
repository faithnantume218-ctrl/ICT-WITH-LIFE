import { Lesson, Module } from '../types/ict';

export const MODULES: Module[] = [
  {
    id: 'module-1',
    title: 'Foundations of ICT & Computer Systems',
    shortDescription: 'Discover what ICT means, how computers shaped our modern world, and the core parts of desktop computers.',
    iconName: 'Laptop',
    difficulty: 'Beginner',
    estimatedHours: 2,
    lessonIds: ['lesson-1', 'lesson-2', 'lesson-3', 'lesson-4'],
  },
  {
    id: 'module-2',
    title: 'Hardware, Software & Daily Operations',
    shortDescription: 'Understand physical hardware versus programs, master input/output devices, and learn mouse and keyboard skills.',
    iconName: 'Cpu',
    difficulty: 'Beginner',
    estimatedHours: 2.5,
    lessonIds: ['lesson-5', 'lesson-6', 'lesson-7'],
  },
  {
    id: 'module-3',
    title: 'Operating Systems & File Management',
    shortDescription: 'Navigate the Windows desktop, master folder organization, file extensions, and safe storage techniques.',
    iconName: 'FolderTree',
    difficulty: 'Beginner',
    estimatedHours: 2,
    lessonIds: ['lesson-8', 'lesson-9'],
  },
  {
    id: 'module-4',
    title: 'Microsoft Office Productivity Tools',
    shortDescription: 'Master essential documents in Word, calculate numbers in Excel, and design engaging slide presentations in PowerPoint.',
    iconName: 'FileSpreadsheet',
    difficulty: 'Intermediate',
    estimatedHours: 3.5,
    lessonIds: ['lesson-10', 'lesson-11', 'lesson-12'],
  },
  {
    id: 'module-5',
    title: 'Internet, Browsing & Global Networks',
    shortDescription: 'Explore the World Wide Web, web browsers, search techniques, professional email etiquette, and network connections.',
    iconName: 'Globe',
    difficulty: 'Beginner',
    estimatedHours: 2.5,
    lessonIds: ['lesson-13', 'lesson-14', 'lesson-15'],
  },
  {
    id: 'module-6',
    title: 'Cybersecurity & Digital Citizenship',
    shortDescription: 'Protect yourself against scams and viruses, secure passwords, and practice ethical, responsible digital citizenship.',
    iconName: 'ShieldCheck',
    difficulty: 'Intermediate',
    estimatedHours: 2,
    lessonIds: ['lesson-16', 'lesson-17'],
  },
];

export const LESSONS: Lesson[] = [
  // LESSON 1
  {
    id: 'lesson-1',
    moduleId: 'module-1',
    moduleName: 'Foundations of ICT & Computer Systems',
    order: 1,
    title: 'Meaning and Importance of ICT',
    shortDescription: 'Understand what ICT stands for, its vital role in modern life, schools, healthcare, and business.',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    iconName: 'BookOpen',
    learningObjectives: [
      'Define Information and Communication Technology (ICT) in clear, simple terms.',
      'Identify the three key components: Information, Communication, and Technology.',
      'Explain how ICT is used in education, healthcare, banking, agriculture, and government.',
      'Distinguish between manual and digital ways of doing everyday tasks.'
    ],
    introduction: 'Information and Communication Technology (ICT) touches almost everything we do today—from writing a school exam to checking doctor appointments, sending mobile money to a relative in another town, or reading the news on a digital phone.',
    keyConcepts: [
      {
        title: 'Breaking Down the Acronym "ICT"',
        content: 'ICT is made up of three powerful words: Information (data that has been processed and organized to have meaning, such as student grades or weather reports), Communication (the sharing or exchange of information between people or devices), and Technology (the tools, machines, electronic devices, and software used to solve problems and perform tasks).',
        analogy: 'Imagine a school bell: The sound is technology, the message "time for lunch" is communication, and knowing which class you have next is information.'
      },
      {
        title: 'Why ICT Matters Today',
        content: 'Before ICT, sending a letter from a village school in Gulu or Jinja to an education ministry office in Kampala took several days by post bus. Today, with email or a web portal, that same letter arrives in two seconds. ICT makes tasks faster, reduces physical paperwork, connects people across oceans, and enables automated calculations without human math errors.',
        subPoints: [
          'Speed: Real-time communication and instantaneous data transmission.',
          'Accuracy: Computers do not get tired or skip lines in a long math ledger.',
          'Storage: A tiny USB drive can store an entire school library of 10,000 books.',
          'Global Collaboration: Students can attend international online lectures from their home desk.'
        ]
      },
      {
        title: 'ICT Across Vital Sectors',
        content: 'ICT is not just for computer scientists. Farmers use mobile SMS apps to check market crop prices and rainfall forecasts before harvesting. Hospitals use ICT databases to keep patient health cards safe so doctors know allergic reactions instantly. Banks use automated teller machines (ATMs) and mobile payment apps so people do not need to carry bulky bags of cash.'
      }
    ],
    realLifeExample: {
      title: 'School Enrollment in Mukono District',
      scenario: 'At St. Jude Secondary School, teachers previously kept paper exercise books to track 800 students. When rain leaked into the office cabinet, half the records were destroyed. The school adopted a simple computer database with a solar backup battery. Now, marks are entered once, report cards are generated in seconds, and parents receive an SMS notification automatically.',
      lessonTakeaway: 'ICT transforms slow, fragile manual recordkeeping into durable, fast, and accessible digital systems.'
    },
    interactiveWidgetType: 'computer-parts',
    practicalActivity: {
      title: 'Spot ICT Around Your Community',
      instructions: [
        'Take a notebook or piece of paper and divide it into two columns: "Manual (Old Way)" and "ICT Method (Modern Way)".',
        'List at least 4 activities you see every week (e.g., Sending money, checking clinic records, listening to lessons, buying electricity tokens).',
        'Next to each, describe what technology enables the modern method (e.g., Mobile money USSD codes, Hospital database computer, FM radio / Zoom, Prepaid smart meter).'
      ],
      expectedResult: 'You will recognize that ICT is not just a desktop computer, but a network of tools touching everyday life.',
      tip: 'Notice how mobile phones, radios, barcode scanners in supermarkets, and traffic lights are all ICT tools!'
    },
    summaryPoints: [
      'ICT stands for Information and Communication Technology.',
      'Information is processed data; Communication is sending and receiving messages; Technology is the electronic tools used.',
      'ICT improves efficiency, speed, accuracy, and storage capacity across schools, hospitals, farms, and businesses.',
      'Understanding ICT is an essential life skill for modern 21st-century citizens.'
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'What does the abbreviation "ICT" stand for?',
        options: [
          'International Computer Tools',
          'Information and Communication Technology',
          'Internet Connection Terminal',
          'Integrated Computing Technique'
        ],
        correctAnswerIndex: 1,
        explanation: 'ICT stands for Information and Communication Technology, representing the tools and systems that handle data and communication.'
      },
      {
        id: 'q1-2',
        question: 'Which of the following is an example of raw data converted into information?',
        options: [
          'A pile of random letters and numbers',
          'A student report card showing final term grades and teacher remarks',
          'An unorganized list of dates with no names',
          'A broken computer cable'
        ],
        correctAnswerIndex: 1,
        explanation: 'Information is data that has been organized, calculated, or given context to be meaningful, like a student report card.'
      },
      {
        id: 'q1-3',
        question: 'How does ICT benefit a hospital or healthcare clinic?',
        options: [
          'It replaces the need for doctors and nurses entirely',
          'It allows fast retrieval of patient medical records and medication history',
          'It increases the cost of paper files',
          'It prevents electricity from being used'
        ],
        correctAnswerIndex: 1,
        explanation: 'Hospital databases enable healthcare staff to instantly look up medical histories, allergies, and lab results safely.'
      },
      {
        id: 'q1-4',
        question: 'Which sector uses ICT for mobile money transfers and online balance checks?',
        options: [
          'Banking and Finance',
          'Mining only',
          'Forestry only',
          'Manual bricklaying'
        ],
        correctAnswerIndex: 0,
        explanation: 'Banks and financial services rely heavily on ICT for digital transactions, ATMs, and mobile money services.'
      },
      {
        id: 'q1-5',
        question: 'What is a major advantage of storing files electronically rather than on paper alone?',
        options: [
          'Electronic files can never be read again',
          'Electronic files take up physical shelf space in every room',
          'Large quantities of data can be stored compactly and easily backed up',
          'Paper files are impossible to lose or damage'
        ],
        correctAnswerIndex: 2,
        explanation: 'Digital storage allows thousands of documents to fit onto tiny flash drives with easy backup and search capabilities.'
      }
    ],
    revisionQuestions: [
      'In your own words, explain the difference between data and information.',
      'Give two examples of how a school in your area uses ICT to help learners and teachers.',
      'Why is digital literacy (knowing how to use computers) becoming a requirement for job seekers?'
    ]
  },

  // LESSON 2
  {
    id: 'lesson-2',
    moduleId: 'module-1',
    moduleName: 'Foundations of ICT & Computer Systems',
    order: 2,
    title: 'Types of Computers',
    shortDescription: 'From giant supercomputers to portable laptops, smartphones, and embedded chips in cars.',
    difficulty: 'Beginner',
    estimatedMinutes: 18,
    iconName: 'Monitor',
    learningObjectives: [
      'Classify computers by size, power, and purpose: Supercomputers, Mainframes, Personal Computers, and Embedded.',
      'Distinguish between desktop computers, laptops, tablets, and smartphones.',
      'Understand what an embedded computer is inside household appliances.',
      'Choose the right type of computer for specific tasks.'
    ],
    introduction: 'When most people hear the word "computer", they think of a screen with a keyboard on a wooden school desk. But computers come in many shapes and sizes—from massive machines predicting tomorrow\'s hurricane to microchips controlling a modern microwave or digital wristwatch.',
    keyConcepts: [
      {
        title: '1. Supercomputers and Mainframes',
        content: 'Supercomputers are the fastest, most powerful machines in existence. They fill large air-conditioned rooms and perform trillions of calculations per second. They are used for complex weather forecasting, rocket launches, and vaccine research. Mainframe computers are massive computers used by huge organizations like national banks and revenue authorities to handle millions of simultaneous customer transactions.',
        analogy: 'A supercomputer is like an entire fleet of bullet trains working in unison.'
      },
      {
        title: '2. Personal Computers (PCs): Desktops vs. Laptops',
        content: 'Personal computers are designed to be used by one person at a time. Desktops stay in one place on a table, powered directly by wall electricity, with separate components (monitor, CPU tower, keyboard, mouse). Laptops are all-in-one portable computers with a built-in battery, screen, keyboard, and trackpad touchpad so you can study anywhere.',
        subPoints: [
          'Desktop: Durable, easy to repair and upgrade parts, cost-effective for school computer labs.',
          'Laptop: Highly portable, works during brief power cuts due to internal battery, lightweight.'
        ]
      },
      {
        title: '3. Mobile Devices: Tablets and Smartphones',
        content: 'Smartphones and tablets use touchscreens instead of physical keyboards. They run mobile operating systems (like Android and iOS) and can browse websites, play educational video lessons, take photos, and run educational apps.'
      },
      {
        title: '4. Embedded Computers',
        content: 'An embedded computer is a specialized tiny microchip built inside a specific device to perform one dedicated job. You find them inside digital washing machines, modern cars, ATM cash dispensers, smart TV sets, and hospital heart monitors.'
      }
    ],
    realLifeExample: {
      title: 'Choosing Computers for a Community Library',
      scenario: 'A community center in Entebbe received funding to set up a study corner. For the main study room, they bought 10 desktop computers because desktops are sturdy and parts can be replaced easily by students. For the field librarian visiting nearby rural schools, they bought two lightweight laptops with solar-chargeable battery packs.',
      lessonTakeaway: 'Different computer categories suit different working conditions, mobility needs, and environments.'
    },
    interactiveWidgetType: 'computer-parts',
    practicalActivity: {
      title: 'Identify Computer Types in Your Environment',
      instructions: [
        'Survey your home, school, or local shopping center.',
        'Write down 5 different objects that have a computer inside them.',
        'Identify which ones are Personal Computers (PCs), which are Mobile devices, and which are Embedded computers.'
      ],
      expectedResult: 'You will discover that cars, microwaves, smartphones, and solar inverters all contain computing processors.',
      tip: 'Look for anything with a digital display, buttons, or automatic settings—it probably has an embedded microcontroller!'
    },
    summaryPoints: [
      'Supercomputers are built for massive scientific computations like climate modeling.',
      'Mainframes manage high-volume transactional data for banks and airlines.',
      'Desktops are stationary personal computers ideal for school labs and offices.',
      'Laptops and mobile devices offer portability with built-in rechargeable batteries.',
      'Embedded computers are hidden microchips designed for specific machinery.'
    ],
    quiz: [
      {
        id: 'q2-1',
        question: 'Which type of computer is designed to sit permanently on a desk and has separate components?',
        options: [
          'Supercomputer',
          'Desktop Computer',
          'Smartwatch',
          'Embedded chip'
        ],
        correctAnswerIndex: 1,
        explanation: 'A desktop computer is a personal computer designed for stationary use on a desk with a separate monitor, case, and keyboard.'
      },
      {
        id: 'q2-2',
        question: 'What kind of computer is hidden inside an automatic washing machine or digital microwave?',
        options: [
          'Supercomputer',
          'Embedded computer',
          'Mainframe computer',
          'Desktop PC'
        ],
        correctAnswerIndex: 1,
        explanation: 'Embedded computers are specialized processors built into appliances to control specific hardware functions.'
      },
      {
        id: 'q2-3',
        question: 'Which feature makes laptops different from traditional desktop computers?',
        options: [
          'Laptops cannot connect to the internet',
          'Laptops have a built-in battery and are portable',
          'Laptops never use software',
          'Laptops only display numbers and no words'
        ],
        correctAnswerIndex: 1,
        explanation: 'Laptops combine the monitor, keyboard, touchpad, and rechargeable battery into one portable clamshell body.'
      },
      {
        id: 'q2-4',
        question: 'Who is most likely to use a supercomputer?',
        options: [
          'A student writing a 1-page school essay',
          'Meteorologists and space agencies predicting complex weather patterns',
          'A cashier scanning barcodes at a corner shop',
          'Someone sending a WhatsApp greeting'
        ],
        correctAnswerIndex: 1,
        explanation: 'Supercomputers are specialized scientific giants used for extreme number-crunching like climate simulation and space exploration.'
      },
      {
        id: 'q2-5',
        question: 'A smartphone is best classified as which type of computer?',
        options: [
          'Mainframe computer',
          'Mobile computer / handheld device',
          'Supercomputer',
          'Analog punch card machine'
        ],
        correctAnswerIndex: 1,
        explanation: 'Smartphones are handheld mobile computers with touchscreens, sensors, and full operating systems.'
      }
    ],
    revisionQuestions: [
      'Why are desktop computers often preferred over laptops for secondary school computer laboratories?',
      'Describe two differences between a tablet computer and a laptop computer.',
      'What is an embedded computer? Name three devices in your house or school that contain one.'
    ]
  },

  // LESSON 3
  {
    id: 'lesson-3',
    moduleId: 'module-1',
    moduleName: 'Foundations of ICT & Computer Systems',
    order: 3,
    title: 'Main Parts of a Computer',
    shortDescription: 'Explore the monitor, system unit, keyboard, mouse, power cables, and external connectors.',
    difficulty: 'Beginner',
    estimatedMinutes: 20,
    iconName: 'Cpu',
    learningObjectives: [
      'Identify and name the four essential physical parts of a desktop computer setup.',
      'Explain the core purpose of the Monitor, System Unit, Keyboard, and Mouse.',
      'Recognize common computer ports (USB, HDMI, VGA, Audio 3.5mm, Power).',
      'Understand how cables connect peripheral devices to the system unit.'
    ],
    introduction: 'A complete desktop computer is like an orchestra: several individual instruments must be connected together so they can perform in harmony. Let us look closely at each part of a typical computer workstation.',
    keyConcepts: [
      {
        title: 'The Four Core Parts of a Workstation',
        content: 'Every standard desktop computer setup requires four basic parts to be fully useful: 1) The System Unit (or Computer Tower/Case), 2) The Monitor (visual screen), 3) The Keyboard (text input), and 4) The Mouse (pointing device). Without the system unit, there is no brain to calculate; without the monitor, you cannot see what you are doing; without the mouse and keyboard, you cannot talk to the computer!',
        subPoints: [
          'System Unit / Case: The rectangular metal or plastic box holding the motherboard, processor, RAM, and hard drive.',
          'Monitor: The display screen that shows images, text, and videos generated by the computer.',
          'Keyboard: An arrangement of letter, number, and function keys used to type text and enter commands.',
          'Mouse: A handheld pointing device with left-click, right-click, and a scroll wheel used to move the on-screen cursor.'
        ]
      },
      {
        title: 'Essential Computer Ports & Cables',
        content: 'How do these parts talk to each other? Through connectors called ports on the front and back of the system unit: USB (Universal Serial Bus - for mice, keyboards, flash drives), HDMI / VGA (sends video signals from the tower to the monitor), Power Cable (plugs into the wall outlet or UPS), and Audio Jack (for headphones and speakers).'
      },
      {
        title: 'The Uninterruptible Power Supply (UPS)',
        content: 'In areas where electricity power cuts or sudden voltage surges occur, schools use a battery box called a UPS. When the main power goes off, the UPS beeps and gives you 10 to 20 minutes of battery life so you can save your work and turn off the computer safely without damaging the hard drive.'
      }
    ],
    realLifeExample: {
      title: 'Setting Up a New Computer in the Staff Room',
      scenario: 'Teacher Sarah unpacked a donated computer box. First, she placed the system unit on the desk floor and the monitor on top of the desk. She connected the blue VGA cable between monitor and tower, inserted the USB keyboard and mouse into the back ports, and plugged both power leads into a surge protector. Within minutes, the computer booted cleanly.',
      lessonTakeaway: 'Each computer cable has a specific shape and matches only its corresponding port; you should never force a cable into the wrong slot.'
    },
    interactiveWidgetType: 'computer-parts',
    practicalActivity: {
      title: 'Workstation Cable & Component Inspection',
      instructions: [
        'Look at the interactive computer workstation diagram below.',
        'Click on the Monitor, System Unit, Keyboard, Mouse, and Cables to read what each component does.',
        'Locate the power button on the front of the System Unit.',
        'Practice identifying where a USB flash drive would be plugged in.'
      ],
      expectedResult: 'You will clearly distinguish between the display (monitor) and the actual computing tower (system unit).',
      tip: 'Remember: The monitor is NOT the computer; the monitor is only a screen. The actual computer brains live inside the system unit!'
    },
    summaryPoints: [
      'The system unit houses the computer’s processing components and storage drives.',
      'The monitor displays visual information to the user.',
      'The keyboard and mouse are primary tools for entering text and navigating.',
      'Ports like USB, HDMI, and audio jacks connect external peripherals to the system unit.',
      'A UPS protects desktop computers from sudden power cuts and voltage fluctuations.'
    ],
    quiz: [
      {
        id: 'q3-1',
        question: 'Which part of a desktop computer contains the CPU, RAM, and motherboard?',
        options: [
          'The Monitor screen',
          'The System Unit (Computer Tower)',
          'The Mouse pad',
          'The Printer paper tray'
        ],
        correctAnswerIndex: 1,
        explanation: 'The system unit is the main box housing the motherboard, CPU, power supply, and internal storage.'
      },
      {
        id: 'q3-2',
        question: 'What is the primary function of the computer monitor?',
        options: [
          'To process mathematical calculations',
          'To visually display output, images, and text to the user',
          'To store files permanently when power is disconnected',
          'To type capital letters'
        ],
        correctAnswerIndex: 1,
        explanation: 'The monitor is an output device whose job is to display images, windows, and text generated by the computer.'
      },
      {
        id: 'q3-3',
        question: 'Which common port is used to plug in modern mice, keyboards, and USB flash memory drives?',
        options: [
          'USB port',
          'VGA port',
          'Audio 3.5mm microphone port',
          'Wall electricity plug'
        ],
        correctAnswerIndex: 0,
        explanation: 'USB (Universal Serial Bus) is the standard rectangular connector used for peripherals and flash drives.'
      },
      {
        id: 'q3-4',
        question: 'What does a UPS (Uninterruptible Power Supply) do for a desktop computer during a power blackout?',
        options: [
          'It destroys all open files instantly',
          'It provides temporary battery power allowing you to save work and shut down safely',
          'It makes the computer run 10 times faster forever',
          'It turns off the internet only'
        ],
        correctAnswerIndex: 1,
        explanation: 'A UPS supplies emergency battery power during an electrical outage, preventing data loss and hardware damage.'
      },
      {
        id: 'q3-5',
        question: 'True or False: Turning off the monitor screen completely turns off the desktop computer inside the system unit.',
        options: [
          'True, they are the exact same thing',
          'False, turning off the monitor only turns off the display; the computer is still running in the system unit',
          'True, because the keyboard is attached to the monitor',
          'Only true on weekends'
        ],
        correctAnswerIndex: 1,
        explanation: 'False. The monitor is merely an output screen. The computer runs inside the system unit until properly shut down via the operating system.'
      }
    ],
    revisionQuestions: [
      'Why is it incorrect to point at the computer screen and say "that is the computer"?',
      'What could happen to your unsaved work if the electricity goes off and your computer is not connected to a UPS?',
      'List three types of ports found on the back of a system unit and what plugs into each.'
    ]
  },

  // LESSON 4
  {
    id: 'lesson-4',
    moduleId: 'module-1',
    moduleName: 'Foundations of ICT & Computer Systems',
    order: 4,
    title: 'Computer Hardware',
    shortDescription: 'Deep dive into internal hardware: Motherboard, CPU (the brain), RAM (memory), and Storage drives.',
    difficulty: 'Beginner',
    estimatedMinutes: 22,
    iconName: 'HardDrive',
    learningObjectives: [
      'Define computer hardware and differentiate internal vs external hardware.',
      'Describe the role of the CPU, RAM, Motherboard, and Hard Drive / SSD.',
      'Understand the critical difference between temporary RAM and permanent Storage.',
      'Explain how clock speed (GHz) and storage capacity (GB/TB) are measured.'
    ],
    introduction: 'If a computer was a human body, hardware would be the skeleton, heart, muscles, and brain tissue. Every piece of hardware is tangible—meaning you can physically touch it. Let us look inside the system unit to see how these parts cooperate.',
    keyConcepts: [
      {
        title: 'The Motherboard: The Grand Circuit Highway',
        content: 'The motherboard is the large green or black circuit board resting at the base of the system unit. Every single component—the CPU, memory chips, power cables, graphic cards, and USB ports—plugs directly into it. It contains microscopic copper tracks that carry electrical signals between components.',
        analogy: 'The motherboard is like a town\'s road network connecting the post office, school, market, and hospital.'
      },
      {
        title: 'CPU: Central Processing Unit (The Brain)',
        content: 'The CPU is a small square silicon microchip covered by a metal heat sink and fan. It carries out every instruction, arithmetic calculation (+, -, *, /), and logical comparison (<, >, =). Speed is measured in Gigahertz (GHz), meaning billions of clock cycles per second.'
      },
      {
        title: 'RAM vs Storage: The Crucial Difference!',
        content: 'Many beginners confuse RAM and Storage because both are measured in Gigabytes (GB). Here is the golden rule: RAM (Random Access Memory) is fast, temporary memory that loses all data when power is turned off (volatile). Storage (HDD or SSD) is permanent storage that keeps your files forever until you delete them (non-volatile).',
        subPoints: [
          'RAM (e.g. 8 GB): Holds the apps and documents you are currently working on right now.',
          'Storage (e.g. 512 GB SSD): Holds your Windows operating system, installed software, and saved homework files.'
        ]
      },
      {
        title: 'HDD (Hard Disk Drive) vs. SSD (Solid State Drive)',
        content: 'Older computers used HDDs with spinning magnetic metal platters and a mechanical reading needle. Modern computers use SSDs, which have no moving parts and use high-speed flash chips. SSDs start up in seconds, are silent, and do not break when gently moved.'
      }
    ],
    realLifeExample: {
      title: 'The Student Desk Analogy in a Village School',
      scenario: 'Think of your study desk in class: The desk surface is RAM. You can only place 3 open notebooks on it at once. If you need a fourth notebook, you reach down into your school bag under the table—your school bag is the Hard Drive / SSD. The school bag holds all 20 of your textbooks safely, but to read one, you must pull it out and place it onto the desk (RAM).',
      lessonTakeaway: 'More RAM allows you to open more apps at the same time without the computer freezing or lagging.'
    },
    interactiveWidgetType: 'hardware-components',
    practicalActivity: {
      title: 'Check Your Own Computer Specifications',
      instructions: [
        'On a Windows computer, right-click on the "Start" button or the "This PC" icon.',
        'Select "Properties" or "About".',
        'Look for two key numbers: "Installed RAM" (e.g. 4.00 GB or 8.00 GB) and "Processor" (e.g. Intel Core i3 / i5 or AMD Ryzen).',
        'Note down your computer’s processor speed and RAM capacity in your notebook.'
      ],
      expectedResult: 'You will discover your computer’s hardware specs and understand what they mean.',
      tip: 'If an app says it requires 4GB of RAM and your computer only has 2GB, the app may run very slowly or crash.'
    },
    summaryPoints: [
      'Hardware represents the physical electronic parts of a computer.',
      'The CPU executes calculations and processes instructions.',
      'RAM is volatile temporary working memory; Storage (SSD/HDD) is non-volatile permanent file memory.',
      'The motherboard acts as the master circuit board connecting all parts.',
      'SSDs are faster, quieter, and more durable than older mechanical HDDs.'
    ],
    quiz: [
      {
        id: 'q4-1',
        question: 'Which component is widely known as the "brain" of the computer?',
        options: [
          'The CPU (Central Processing Unit)',
          'The Computer Mouse',
          'The Power Cable',
          'The Plastic Case'
        ],
        correctAnswerIndex: 0,
        explanation: 'The CPU processes instructions, performs arithmetic calculations, and controls the flow of operations.'
      },
      {
        id: 'q4-2',
        question: 'What happens to the data stored inside RAM when the computer is completely powered off?',
        options: [
          'It is permanently printed onto paper',
          'It is instantly cleared and lost (volatile)',
          'It turns into a desktop shortcut',
          'It gets copied into the monitor screen'
        ],
        correctAnswerIndex: 1,
        explanation: 'RAM is volatile memory. As soon as electrical power ceases, everything inside RAM is cleared.'
      },
      {
        id: 'q4-3',
        question: 'Why are modern Solid State Drives (SSDs) preferred over older Hard Disk Drives (HDDs)?',
        options: [
          'SSDs are much slower and louder',
          'SSDs have spinning mechanical discs that break easily',
          'SSDs have no moving parts, read files much faster, and consume less power',
          'SSDs can only store one single song'
        ],
        correctAnswerIndex: 2,
        explanation: 'SSDs use solid-state flash memory chips without moving parts, making them drastically faster and more durable than mechanical HDDs.'
      },
      {
        id: 'q4-4',
        question: 'What is the main role of the motherboard?',
        options: [
          'To clean dust off the keyboard keys',
          'To physically hold and electronically connect the CPU, RAM, and other components together',
          'To play radio music',
          'To shine colored lights onto the wall'
        ],
        correctAnswerIndex: 1,
        explanation: 'The motherboard is the primary printed circuit board that connects all internal hardware components.'
      },
      {
        id: 'q4-5',
        question: 'Which measurement represents approximately one billion bytes of computer data?',
        options: [
          '1 Kilobyte (KB)',
          '1 Megabyte (MB)',
          '1 Gigabyte (GB)',
          '1 Single Bit'
        ],
        correctAnswerIndex: 2,
        explanation: '1 Gigabyte (GB) equals approximately 1 billion bytes (1,024 Megabytes).'
      }
    ],
    revisionQuestions: [
      'Explain the difference between volatile memory and non-volatile storage using everyday words.',
      'Why does a computer need a cooling fan placed directly on top of the CPU?',
      'If your computer runs slowly when you open three programs at once, which hardware upgrade would likely help most: more RAM or a bigger monitor?'
    ]
  },

  // LESSON 5
  {
    id: 'lesson-5',
    moduleId: 'module-2',
    moduleName: 'Hardware, Software & Daily Operations',
    order: 5,
    title: 'Computer Software',
    shortDescription: 'Discover System software versus Application software, utilities, and how programs instruct hardware.',
    difficulty: 'Beginner',
    estimatedMinutes: 18,
    iconName: 'Code',
    learningObjectives: [
      'Define software and explain how it differs from physical hardware.',
      'Distinguish between System Software (Operating Systems) and Application Software.',
      'Identify Utility Software such as antivirus programs and disk cleaners.',
      'Understand the concept of software licenses (Open Source vs Commercial / Proprietary).'
    ],
    introduction: 'A brand-new computer fresh from the factory with zero software installed is just an expensive metal box with glowing lights. Software is the soul that brings hardware to life by providing logical commands, algorithms, and applications.',
    keyConcepts: [
      {
        title: 'Hardware vs Software: The Inseparable Partners',
        content: 'Hardware is anything you can physically touch (the screen, keyboard, CPU chip). Software is intangible: it is written code, instructions, and programs stored on your disk. Hardware cannot do anything without software telling it what to do, and software cannot execute without hardware to run upon.',
        analogy: 'Hardware is a book’s paper pages and black ink; Software is the story written inside. You need both to enjoy a novel!'
      },
      {
        title: '1. System Software (The Manager)',
        content: 'System software manages the computer hardware resources and provides a base platform for other programs to run. The chief system software is the Operating System (like Microsoft Windows, macOS, Android, and Ubuntu Linux). It also includes device drivers (special mini-programs that teach Windows how to talk to a specific printer or scanner).'
      },
      {
        title: '2. Application Software (The Tools)',
        content: 'Application software (apps) are programs designed to help users perform specific tasks or solve specific problems.',
        subPoints: [
          'Word Processors: Microsoft Word, Google Docs (for letters and essays).',
          'Spreadsheets: Microsoft Excel, Google Sheets (for financial budgets and grade books).',
          'Web Browsers: Google Chrome, Mozilla Firefox (for reading web pages).',
          'Media Players: VLC Player (for watching educational videos and listening to audio).'
        ]
      },
      {
        title: '3. Utility Software (The Maintenance Crew)',
        content: 'Utilities are helper programs that maintain computer health, performance, and security. Examples include Antivirus software (scanning and destroying viruses), file compression tools (like WinRAR or 7-Zip to shrink file size), and Disk Defragmenter.'
      }
    ],
    realLifeExample: {
      title: 'A School Secretary’s Toolkit in Jinja',
      scenario: 'Madam Joyce uses a desktop computer at school. Windows 11 (System Software) starts up the machine and shows her desktop. She opens Microsoft Word (Application Software) to type an end-of-term notice to parents. Meanwhile, Windows Defender (Utility Software) silently runs in the background to ensure no virus enters when a teacher inserts a flash drive.',
      lessonTakeaway: 'System software, applications, and utilities collaborate smoothly to create a safe, productive workspace.'
    },
    interactiveWidgetType: 'software-types',
    practicalActivity: {
      title: 'Classify Software on Your Device',
      instructions: [
        'Open your computer or phone app drawer.',
        'List 5 software applications you use most often.',
        'Next to each, indicate whether it is an Application (helps you do a task) or a Utility (protects or maintains the machine).'
      ],
      expectedResult: 'You will clearly see how different categories of software serve different roles.',
      tip: 'Remember: Your operating system (Android, iOS, Windows) is the System Software that hosts all other apps!'
    },
    summaryPoints: [
      'Software consists of instructions and programs that direct computer hardware.',
      'System software (Operating Systems) manages hardware and runs the computer.',
      'Application software allows users to accomplish specific tasks like typing, calculating, or browsing.',
      'Utility software protects, cleans, and optimizes computer performance.',
      'Hardware and software rely entirely on each other to be functional.'
    ],
    quiz: [
      {
        id: 'q5-1',
        question: 'Which of the following is considered computer software rather than hardware?',
        options: [
          'Computer mouse',
          'Web browser program (Google Chrome)',
          'RAM chip',
          'USB cable'
        ],
        correctAnswerIndex: 1,
        explanation: 'Google Chrome is an application program (software), whereas mice, RAM chips, and cables are physical hardware.'
      },
      {
        id: 'q5-2',
        question: 'What is the primary role of System Software such as Microsoft Windows or macOS?',
        options: [
          'To play MP3 songs only',
          'To manage computer hardware and provide a platform for user applications to run',
          'To format text into bold letters in a poem',
          'To physically clean the monitor screen'
        ],
        correctAnswerIndex: 1,
        explanation: 'System software manages the hardware, memory, files, and runs user applications.'
      },
      {
        id: 'q5-3',
        question: 'Microsoft Word and Microsoft Excel belong to which category of software?',
        options: [
          'Hardware components',
          'Application software',
          'Operating systems',
          'Electronic cables'
        ],
        correctAnswerIndex: 1,
        explanation: 'Word and Excel are application programs designed to assist users in specific productivity tasks.'
      },
      {
        id: 'q5-4',
        question: 'What type of software is an Antivirus program?',
        options: [
          'Game software',
          'Utility software',
          'Hardware controller',
          'Physical device'
        ],
        correctAnswerIndex: 1,
        explanation: 'Antivirus is utility software that protects the system from malware and maintains computer safety.'
      },
      {
        id: 'q5-5',
        question: 'Can computer software work without any computer hardware?',
        options: [
          'Yes, software floats in the air without any machines',
          'No, software requires physical hardware processors and memory to run and execute instructions',
          'Only when the computer has no battery',
          'Yes, if you write it with a pen'
        ],
        correctAnswerIndex: 1,
        explanation: 'Software cannot execute without hardware processors, memory, and circuitry to carry out instructions.'
      }
    ],
    revisionQuestions: [
      'Why is the relationship between hardware and software compared to the human body and mind?',
      'Give three examples of application software and state what each is used for.',
      'What would happen if you removed all system software from a laptop?'
    ]
  },

  // LESSON 6
  {
    id: 'lesson-6',
    moduleId: 'module-2',
    moduleName: 'Hardware, Software & Daily Operations',
    order: 6,
    title: 'Input, Output, and Storage Devices',
    shortDescription: 'Master how data enters the computer, how results are presented, and how files are saved permanently.',
    difficulty: 'Beginner',
    estimatedMinutes: 20,
    iconName: 'Layers',
    learningObjectives: [
      'Classify computer peripherals into Input, Output, and Storage devices.',
      'Explain how sensors, scanners, cameras, and barcode readers act as input devices.',
      'Understand how printers (inkjet vs laser) and projectors deliver output.',
      'Compare storage media: Flash drives, external hard drives, memory cards, and cloud storage.'
    ],
    introduction: 'Computers follow a simple universal model known as IPOS: Input -> Processing -> Output -> Storage. Information enters through input devices, the CPU processes it, the results appear on output devices, and the final work is stored safely.',
    keyConcepts: [
      {
        title: '1. Input Devices (Putting Data In)',
        content: 'An input device converts human actions, sounds, or visual images into digital electrical signals the computer can understand.',
        subPoints: [
          'Keyboard: Typing characters, numbers, and symbols.',
          'Mouse & Trackpad: Pointing, selecting, and clicking items on the screen.',
          'Microphone: Capturing human voice and audio recordings.',
          'Scanner & Web Camera: Capturing physical documents and live video faces.',
          'Barcode / QR Scanner: Reading product labels in supermarkets or event tickets.'
        ]
      },
      {
        title: '2. Output Devices (Getting Results Out)',
        content: 'An output device converts digital computer data into human-readable or audible formats.',
        subPoints: [
          'Monitor: Visual display of windows, text, and videos.',
          'Printer: Produces hard copy on physical paper (Laser printers use toner powder; Inkjet printers use liquid ink cartridges).',
          'Projector: Displays large images onto a classroom wall or screen for many students to see.',
          'Speakers and Headphones: Produce sound, music, and voice narration.'
        ]
      },
      {
        title: '3. Storage Devices (Preserving Data for Later)',
        content: 'Storage devices hold programs and data permanently even when powered off. Common portable media include USB Flash Drives, External Hard Drives, SD Memory Cards (in cameras and phones), and Cloud Storage (online servers accessed via internet like Google Drive or OneDrive).'
      }
    ],
    realLifeExample: {
      title: 'A Supermarket Checkout in Kampala',
      scenario: 'At the supermarket checkout counter: The cashier scans a box of soap using a Barcode Reader (Input). The computer looks up the price in the inventory database (Processing). The price shows on the customer screen and a receipt is printed (Output). The sale record is saved to the store’s hard drive (Storage).',
      lessonTakeaway: 'The IPOS cycle (Input, Processing, Output, Storage) happens in everyday business operations all around us.'
    },
    interactiveWidgetType: 'input-output-devices',
    practicalActivity: {
      title: 'Interactive Peripheral Sorter',
      instructions: [
        'Open the Interactive Practice lab in the top menu.',
        'Select the "Input vs Output vs Storage Sorter".',
        'Sort devices like Microphone, Barcode scanner, Monitor, Printer, Flash Drive, and Speakers into their correct buckets.',
        'Review your score and verify any tricky items like Touchscreens (which act as both input and output!).'
      ],
      expectedResult: 'You will quickly recognize any hardware device and its role in the IPOS cycle.',
      tip: 'Ask yourself: Does this device send information INTO the computer, or does it take information OUT of the computer to me?'
    },
    summaryPoints: [
      'Input devices feed data and commands into the computer.',
      'Output devices display or present processed results to humans.',
      'Storage devices hold data permanently for future retrieval.',
      'Touchscreens can act as both an input device (touch) and output device (display).',
      'The IPOS cycle (Input, Processing, Output, Storage) is the core operational principle of computing.'
    ],
    quiz: [
      {
        id: 'q6-1',
        question: 'Which of the following is strictly an INPUT device?',
        options: [
          'Printer',
          'Computer Monitor',
          'Microphone',
          'Audio Speaker'
        ],
        correctAnswerIndex: 2,
        explanation: 'A microphone sends sound waves from your voice into the computer as digital signals, making it an input device.'
      },
      {
        id: 'q6-2',
        question: 'Which output device is used by a teacher to project computer slides onto a large wall for the whole class?',
        options: [
          'Digital Projector',
          'Flatbed Scanner',
          'Keyboard',
          'Mouse pad'
        ],
        correctAnswerIndex: 0,
        explanation: 'A digital projector beams video output onto large screens or classroom walls for group viewing.'
      },
      {
        id: 'q6-3',
        question: 'A smartphone touchscreen is unique because it functions as:',
        options: [
          'Neither input nor output',
          'Both an input device (sensing finger touches) and an output device (displaying images)',
          'Only a storage device',
          'An internal power cable'
        ],
        correctAnswerIndex: 1,
        explanation: 'Touchscreens are hybrid devices: they detect touch gestures (input) while displaying visual content (output).'
      },
      {
        id: 'q6-4',
        question: 'Which device is a portable secondary STORAGE medium?',
        options: [
          'USB Flash Drive',
          'Computer Mouse',
          'Inkjet Printer',
          'Ethernet Cable'
        ],
        correctAnswerIndex: 0,
        explanation: 'A USB flash drive uses non-volatile flash memory to store and transfer files portably between computers.'
      },
      {
        id: 'q6-5',
        question: 'In the IPOS cycle of computing, what does the letter "P" stand for?',
        options: [
          'Printing',
          'Processing',
          'Powering',
          'Programming'
        ],
        correctAnswerIndex: 1,
        explanation: 'IPOS stands for Input, Processing, Output, and Storage.'
      }
    ],
    revisionQuestions: [
      'Explain how a barcode scanner works as an input device in a grocery shop.',
      'Name two differences between an inkjet printer and a laser printer.',
      'Why is cloud storage becoming more popular than carrying physical USB flash drives?'
    ]
  },

  // LESSON 7
  {
    id: 'lesson-7',
    moduleId: 'module-2',
    moduleName: 'Hardware, Software & Daily Operations',
    order: 7,
    title: 'Basic Computer Operations',
    shortDescription: 'Master turning a computer on and off safely, mouse skills (click, drag, right-click), and keyboard shortcuts.',
    difficulty: 'Beginner',
    estimatedMinutes: 20,
    iconName: 'MousePointer',
    learningObjectives: [
      'Learn the safe startup (booting) and proper shutdown procedure.',
      'Master the five core mouse actions: Click, Double-click, Right-click, Drag-and-drop, and Scroll.',
      'Understand keyboard layout: Spacebar, Enter, Backspace, Delete, Shift, and Caps Lock.',
      'Use essential keyboard shortcuts: Ctrl+C (Copy), Ctrl+V (Paste), Ctrl+Z (Undo), and Ctrl+S (Save).'
    ],
    introduction: 'Every confident computer user started by learning how to hold a mouse and press keys without anxiety. Operating a computer safely prevents hardware damage and saves countless hours of frustration.',
    keyConcepts: [
      {
        title: 'Safe Startup (Booting) and Shutdown',
        content: 'To turn on a computer, press the Power button on the system unit (and the monitor button if off). The computer runs a Power-On Self Test (POST) and loads the operating system—a process called booting. When finished, NEVER just yank out the wall plug! Doing so can corrupt files and damage the hard drive. Always click Start -> Power -> Shut Down.',
        analogy: 'Pulling the plug is like slamming the brakes while speeding at 100km/h; shutting down properly is parking smoothly in a garage.'
      },
      {
        title: 'Mastering the Mouse',
        content: 'Rest your right hand lightly on the mouse with your index finger over the left button and middle finger over the right button.',
        subPoints: [
          'Left-click (Single click): Selects an item or icon.',
          'Double-click: Two rapid clicks with the left button to open an app or file.',
          'Right-click: Opens a context menu showing useful options (Cut, Copy, Rename, Properties).',
          'Drag and Drop: Click and hold down the left button, slide the mouse across the pad, then release to move an icon or file.',
          'Scroll Wheel: Spin the wheel up or down between the buttons to move through long documents or web pages.'
        ]
      },
      {
        title: 'Essential Keyboard Shortcuts',
        content: 'Keyboard shortcuts save time because you do not have to move your hand between keyboard and mouse.',
        subPoints: [
          'Ctrl + S: Save your document immediately (press this often!).',
          'Ctrl + C: Copy the highlighted text or item.',
          'Ctrl + V: Paste the copied item in the new location.',
          'Ctrl + Z: Undo your last action (the lifesaver when you make a mistake!).',
          'Ctrl + A: Select everything on the page.'
        ]
      }
    ],
    realLifeExample: {
      title: 'The Accidentally Deleted Homework',
      scenario: 'Ronald was typing his biology assignment. He accidentally hit a button and his whole paragraph vanished! He panicked, thinking two hours of typing were lost. The teacher told him: "Don\'t panic, press Ctrl and Z together." Ronald pressed Ctrl+Z, and the entire paragraph reappeared instantly.',
      lessonTakeaway: 'Ctrl+Z (Undo) is one of the most reassuring tools a beginner can learn.'
    },
    interactiveWidgetType: 'operating-systems',
    practicalActivity: {
      title: 'Practice Keyboard Shortcuts and Mouse Clicks',
      instructions: [
        'Open any text area or text editor.',
        'Type your full name and your favorite school subject.',
        'Select the text with your mouse, press Ctrl+C, move the cursor down two lines, and press Ctrl+V to paste.',
        'Press Backspace to delete a word, then press Ctrl+Z to undo and watch it return.'
      ],
      expectedResult: 'You will build muscle memory for the essential Copy, Paste, and Undo shortcuts.',
      tip: 'Hold down the "Ctrl" key first with your pinky finger, tap the second letter key once with your index finger, then release both.'
    },
    summaryPoints: [
      'Always shut down a computer via Start -> Power -> Shut down to prevent data corruption.',
      'Double-click opens files; Right-click opens context menus; Drag-and-drop moves items.',
      'Backspace deletes letters to the left of the cursor; Delete removes letters to the right.',
      'Ctrl+S saves, Ctrl+C copies, Ctrl+V pastes, and Ctrl+Z undoes accidental mistakes.'
    ],
    quiz: [
      {
        id: 'q7-1',
        question: 'What is the correct way to turn off a desktop computer safely?',
        options: [
          'Pull out the power cord from the wall immediately',
          'Click Start, select the Power icon, and choose "Shut Down"',
          'Press the monitor button and leave the room',
          'Flip the main circuit breaker of the house'
        ],
        correctAnswerIndex: 1,
        explanation: 'Selecting "Shut Down" from the operating system menu allows open programs and disk caches to save and close safely.'
      },
      {
        id: 'q7-2',
        question: 'Which mouse action displays a context menu of options like Cut, Copy, and Rename?',
        options: [
          'Left-click once',
          'Right-click once',
          'Spinning the mouse on the table',
          'Triple clicking the spacebar'
        ],
        correctAnswerIndex: 1,
        explanation: 'Right-clicking opens a context menu specific to the item you clicked.'
      },
      {
        id: 'q7-3',
        question: 'Which keyboard shortcut is used to UNDO an accidental mistake?',
        options: [
          'Ctrl + Z',
          'Ctrl + P',
          'Alt + F4',
          'Shift + Enter'
        ],
        correctAnswerIndex: 0,
        explanation: 'Ctrl + Z reverses your most recent action, undoing mistakes.'
      },
      {
        id: 'q7-4',
        question: 'What is the difference between the Backspace key and the Delete key?',
        options: [
          'There is no difference; they are duplicate keys',
          'Backspace erases characters to the left of the cursor; Delete erases characters to the right',
          'Backspace prints letters; Delete saves files',
          'Backspace turns off the monitor'
        ],
        correctAnswerIndex: 1,
        explanation: 'Backspace erases backwards (to the left), while Delete removes characters forward (to the right of the cursor).'
      },
      {
        id: 'q7-5',
        question: 'Which shortcut key combination should you press frequently while typing to avoid losing your work?',
        options: [
          'Ctrl + S (Save)',
          'Ctrl + W',
          'Ctrl + Alt + Delete',
          'Esc'
        ],
        correctAnswerIndex: 0,
        explanation: 'Ctrl + S triggers the Save command, protecting your recent progress against unexpected power loss or crashes.'
      }
    ],
    revisionQuestions: [
      'Why is switching off a computer by unplugging the wall socket dangerous for the computer?',
      'List four mouse operations and describe what each one is used for.',
      'Write down the shortcuts for Copy, Cut, Paste, and Undo.'
    ]
  },

  // LESSON 8
  {
    id: 'lesson-8',
    moduleId: 'module-3',
    moduleName: 'Operating Systems & File Management',
    order: 8,
    title: 'Operating Systems',
    shortDescription: 'Explore Windows, macOS, Linux, and Android: The desktop, taskbar, start menu, and GUI.',
    difficulty: 'Beginner',
    estimatedMinutes: 20,
    iconName: 'Layout',
    learningObjectives: [
      'Explain the core responsibilities of an Operating System (OS).',
      'Understand the Graphical User Interface (GUI): Windows, Icons, Menus, Pointer (WIMP).',
      'Explore the main components of the Windows desktop: Taskbar, Start Menu, System Tray, and Notification center.',
      'Compare popular operating systems: Windows, Android, macOS, and Linux.'
    ],
    introduction: 'Imagine a busy airport: without air traffic controllers, planes would crash on the runway. An Operating System is the air traffic controller of your computer. It coordinates the hardware, memory, files, and running programs so everything operates smoothly.',
    keyConcepts: [
      {
        title: 'What Does an Operating System Do?',
        content: 'The OS has three chief duties: 1) Hardware Management (allocating RAM, scheduling the CPU, communicating with printers), 2) File Management (organizing files and folders on your storage drive), and 3) User Interface (providing the visual screen that allows humans to interact easily with the machine).',
        analogy: 'The OS is like the principal of a school managing teachers, students, classrooms, and timetables.'
      },
      {
        title: 'The GUI Revolution (Graphical User Interface)',
        content: 'Early computers in the 1970s used Command Line Interfaces where users had to memorize and type cryptic text commands on black screens. Today, modern operating systems use a Graphical User Interface (GUI) built around WIMP: Windows (rectangular work areas), Icons (small pictures representing files and apps), Menus (lists of selectable commands), and Pointers (the on-screen arrow).'
      },
      {
        title: 'Key Desktop Elements in Windows',
        content: 'When a Windows computer starts up, you arrive at the Desktop:',
        subPoints: [
          'Desktop Background: The main workspace screen where files and shortcuts sit.',
          'Start Button / Menu: Located on the taskbar; clicking it lets you search and open all installed programs.',
          'Taskbar: The horizontal bar running along the bottom showing open apps, pinned shortcuts, and the search bar.',
          'System Tray (Notification Area): The bottom-right corner displaying the current clock, Wi-Fi signal, speaker volume, and battery percentage.'
        ]
      },
      {
        title: 'Popular Operating Systems Around the World',
        content: 'Microsoft Windows is the most common OS on office and school laptops. Android is the open-source OS powering billions of smartphones and tablets. Apple macOS runs on Mac computers, and iOS runs on iPhones. Linux is an open-source, free OS used heavily on internet servers, scientific labs, and lightweight educational computers.'
      }
    ],
    realLifeExample: {
      title: 'Switching from an Android Phone to a Windows Laptop',
      scenario: 'Amina was proficient at using her mother\'s Android phone but felt nervous when sitting at a Windows computer in her secondary school library. Her teacher showed her: "Look, the Windows Start Menu is just like the Apps Drawer on your phone, and the Taskbar clock at the bottom right is just like the phone’s status bar at the top." Amina quickly felt comfortable navigating both.',
      lessonTakeaway: 'Modern operating systems share similar GUI principles across phones, tablets, and computers.'
    },
    interactiveWidgetType: 'operating-systems',
    practicalActivity: {
      title: 'Explore the Windows Desktop Interface',
      instructions: [
        'Hover your mouse cursor over the taskbar at the bottom of the screen.',
        'Click the Start button to open the application menu, type "Calculator", and press Enter to launch it.',
        'Locate the minimize button (dash "-"), maximize button (square), and close button ("X") in the top-right corner of the window.',
        'Practice minimizing and restoring the window.'
      ],
      expectedResult: 'You will confidently navigate the desktop, taskbar, and standard window control buttons.',
      tip: 'The close button ("X") quits the program; the minimize button ("-") hides it quietly onto the taskbar without closing it.'
    },
    summaryPoints: [
      'The operating system is the master software coordinating all computer operations.',
      'A GUI (Graphical User Interface) uses windows, icons, menus, and pointers (WIMP).',
      'The Windows taskbar shows currently running programs, pinned shortcuts, clock, and network status.',
      'Prominent operating systems include Windows, Android, macOS, and Linux.'
    ],
    quiz: [
      {
        id: 'q8-1',
        question: 'Which of the following is an Operating System?',
        options: [
          'Microsoft Windows',
          'Microsoft Word',
          'VLC Media Player',
          'Google Chrome'
        ],
        correctAnswerIndex: 0,
        explanation: 'Microsoft Windows is an operating system that manages hardware and hosts applications like Word and Chrome.'
      },
      {
        id: 'q8-2',
        question: 'What does the abbreviation "GUI" stand for in computer systems?',
        options: [
          'Global Unit Identifier',
          'Graphical User Interface',
          'General Utility Instruction',
          'Gigabyte Upload Indicator'
        ],
        correctAnswerIndex: 1,
        explanation: 'GUI stands for Graphical User Interface, allowing users to interact with visual icons rather than typing terminal code.'
      },
      {
        id: 'q8-3',
        question: 'What is the bar running along the bottom of the Windows desktop screen called?',
        options: [
          'The Scrollbar',
          'The Taskbar',
          'The Title Bar',
          'The Address Bar'
        ],
        correctAnswerIndex: 1,
        explanation: 'The Taskbar sits at the bottom of the desktop and houses the Start button, running apps, and the system clock.'
      },
      {
        id: 'q8-4',
        question: 'Which window button in the top-right corner hides a window onto the taskbar without closing it?',
        options: [
          'The Close button (X)',
          'The Minimize button (-)',
          'The Maximize button (Square)',
          'The Power button'
        ],
        correctAnswerIndex: 1,
        explanation: 'The Minimize button (-) temporarily hides the window to the taskbar, keeping the application active.'
      },
      {
        id: 'q8-5',
        question: 'Which operating system powers the vast majority of non-Apple smartphones worldwide?',
        options: [
          'Android',
          'Windows 95',
          'DOS',
          'macOS'
        ],
        correctAnswerIndex: 0,
        explanation: 'Android is the mobile operating system developed by Google that powers billions of smartphones and tablets.'
      }
    ],
    revisionQuestions: [
      'Why was the invention of the Graphical User Interface (GUI) so important for beginners?',
      'Describe three functions performed by an operating system.',
      'Explain what the three buttons in the top right corner of every window (-, square, X) do.'
    ]
  },

  // LESSON 9
  {
    id: 'lesson-9',
    moduleId: 'module-3',
    moduleName: 'Operating Systems & File Management',
    order: 9,
    title: 'Files and Folders',
    shortDescription: 'Master hierarchical organization, creating folders, file extensions (.docx, .pdf), copy vs cut, and backups.',
    difficulty: 'Beginner',
    estimatedMinutes: 22,
    iconName: 'FolderTree',
    learningObjectives: [
      'Understand the difference between a File (data container) and a Folder (storage directory).',
      'Create, rename, move, copy, and delete files and folders.',
      'Identify common file extensions (.docx, .xlsx, .pdf, .jpg, .mp3) and their purposes.',
      'Learn good file organization habits and the 3-2-1 backup rule.'
    ],
    introduction: 'If you tossed all your school papers, tests, receipts, and photos into one giant pile in the middle of your room, finding your history notes would take hours. Computers use files and folders to keep millions of documents organized and instantly searchable.',
    keyConcepts: [
      {
        title: 'Files vs Folders: The Filing Cabinet Model',
        content: 'A File is a specific item of data with a name and extension (like an essay or a photo). A Folder (or directory) is a digital container used to group and hold related files or subfolders together. Folders do not have file extensions.',
        analogy: 'A file is a single sheet of paper with your essay; a folder is the labeled manila envelope holding 20 related essays together.'
      },
      {
        title: 'Understanding File Extensions',
        content: 'Every file has two parts: its name and its extension, separated by a dot (e.g., `Science_Notes.docx`). The extension tells the operating system what software is needed to open the file.',
        subPoints: [
          '.docx: Microsoft Word document (text, letters, essays).',
          '.xlsx: Microsoft Excel spreadsheet (tables, numbers, formulas).',
          '.pptx: Microsoft PowerPoint presentation (slides).',
          '.pdf: Portable Document Format (fixed document that looks identical on all phones, printers, and computers).',
          '.jpg / .png: Digital picture or photograph.',
          '.mp3 / .wav: Audio song or voice recording.',
          '.mp4: Video movie or recording.'
        ]
      },
      {
        title: 'Copy vs Cut vs Delete',
        content: 'When moving items: Copy (Ctrl+C) leaves the original in place and duplicates it elsewhere. Cut (Ctrl+X) removes the item from its current place and moves it to the new location when you Paste (Ctrl+V). When you Delete a file on Windows, it goes to the Recycle Bin first, allowing you to restore it if deleted by accident.'
      },
      {
        title: 'The Golden Rule of Backups (3-2-1 Rule)',
        content: 'Always keep at least 3 copies of important work: 2 on different storage media (e.g. your computer hard drive and a USB flash drive), with 1 copy stored offsite or in cloud storage (Google Drive). Hardware can fail or be stolen at any time!'
      }
    ],
    realLifeExample: {
      title: 'Organizing School Term Notes',
      scenario: 'Brian saved every file to his computer Desktop. After six months, his screen had 140 messy icons named "Doc1", "NewDoc", and "Essay". When studying for his UNEB examinations, he couldn\'t find his Chemistry revision. His friend showed him how to create a folder called "Senior_4_Notes", with subfolders for "Chemistry", "Mathematics", and "English", and rename files with dates. Suddenly, finding any topic took 3 seconds.',
      lessonTakeaway: 'Good file naming and folder hierarchy save hours of stress before exams and deadlines.'
    },
    interactiveWidgetType: 'file-folders',
    practicalActivity: {
      title: 'Build a Neat Folder Structure',
      instructions: [
        'Try our interactive File Explorer Simulator in the Practice section.',
        'Create a main folder called "My_School_Work".',
        'Inside it, create two subfolders: "Term_1_Assignments" and "Personal_Projects".',
        'Create a sample text file called "Term_Goals.docx" and move it into "Term_1_Assignments".'
      ],
      expectedResult: 'You will see firsthand how nested hierarchical folders create orderly digital workspaces.',
      tip: 'Never name a file just "document" or "homework". Use descriptive names like `Biology_Heart_Diagram_Oct2026.docx`.'
    },
    summaryPoints: [
      'A file holds actual data; a folder is an organizational container that stores files and subfolders.',
      'File extensions (.docx, .xlsx, .pdf, .jpg) identify file formats and default programs.',
      'Copy duplicates files; Cut relocates files; Delete sends them to the Recycle Bin.',
      'The 3-2-1 backup strategy protects valuable school and work files from accidental loss.'
    ],
    quiz: [
      {
        id: 'q9-1',
        question: 'What is the main purpose of a computer folder?',
        options: [
          'To type text documents',
          'To organize and store related files and subfolders in one place',
          'To speed up the internet connection',
          'To recharge the laptop battery'
        ],
        correctAnswerIndex: 1,
        explanation: 'Folders are digital directories used to group and organize related files systematically.'
      },
      {
        id: 'q9-2',
        question: 'Which file extension indicates a document created in Microsoft Word?',
        options: [
          '.mp3',
          '.docx',
          '.xlsx',
          '.jpg'
        ],
        correctAnswerIndex: 1,
        explanation: '.docx is the standard file format extension for Microsoft Word documents.'
      },
      {
        id: 'q9-3',
        question: 'What is the difference between "Copy" and "Cut" when managing files?',
        options: [
          'There is no difference',
          'Copy duplicates the file leaving the original intact; Cut removes the original to move it elsewhere',
          'Copy deletes the file forever',
          'Cut sends the file to the printer'
        ],
        correctAnswerIndex: 1,
        explanation: 'Copy duplicates data; Cut moves it by deleting the source version once pasted into the destination.'
      },
      {
        id: 'q9-4',
        question: 'Where do deleted files on a Windows desktop go initially, allowing them to be restored?',
        options: [
          'To the Internet Cloud',
          'To the Recycle Bin',
          'Directly into the CPU fan',
          'To the Keyboard memory'
        ],
        correctAnswerIndex: 1,
        explanation: 'The Recycle Bin holds deleted files temporarily so users can restore files deleted by mistake.'
      },
      {
        id: 'q9-5',
        question: 'Why is the .PDF (Portable Document Format) popular for sharing certificates and official forms?',
        options: [
          'It preserves the exact layout, fonts, and images across any device or operating system',
          'It is only readable on Apple iPhones',
          'It cannot be opened on computers',
          'It automatically deletes after 24 hours'
        ],
        correctAnswerIndex: 0,
        explanation: 'PDF files look identical on every screen and printer, preserving exact document formatting.'
      }
    ],
    revisionQuestions: [
      'Why is it important to use clear, descriptive filenames instead of "Untitled1"?',
      'Explain what the 3-2-1 rule of backing up data means.',
      'List five common file extensions and identify what each one is used for.'
    ]
  },

  // LESSON 10
  {
    id: 'lesson-10',
    moduleId: 'module-4',
    moduleName: 'Microsoft Office Productivity Tools',
    order: 10,
    title: 'Microsoft Word Basics',
    shortDescription: 'Explore the Ribbon interface, typing, font formatting (Bold, Italic, Size), margins, and saving documents.',
    difficulty: 'Intermediate',
    estimatedMinutes: 25,
    iconName: 'FileText',
    learningObjectives: [
      'Navigate the Microsoft Word Ribbon (Home, Insert, Layout, Review).',
      'Format text: Font type, font size, Bold (Ctrl+B), Italic (Ctrl+I), Underline (Ctrl+U), and font color.',
      'Control paragraph alignment (Left, Center, Right, Justify) and line spacing.',
      'Insert bullet points, numbered lists, and images.',
      'Save, export to PDF, and prepare documents for printing.'
    ],
    introduction: 'Whether writing a formal job application letter, a school debate speech, or a scientific report, Microsoft Word is the world’s most trusted word processor. Learning its core features will make your school and office work look sharp and professional.',
    keyConcepts: [
      {
        title: 'The Word Ribbon Interface',
        content: 'At the top of Microsoft Word sits the Ribbon, organized into tabs:',
        subPoints: [
          'Home Tab: Font styling, text sizes, paragraph alignment, bullet points, and clipboard tools.',
          'Insert Tab: Adding pictures, shapes, tables, page numbers, and headers/footers.',
          'Layout Tab: Page orientation (Portrait vs Landscape), margins, and paper size (A4 / Letter).',
          'Review Tab: Spell checker and word count tool.'
        ]
      },
      {
        title: 'Font Formatting and Styling',
        content: 'To change any text in Word, you must first select (highlight) it with your mouse. Then apply styling: Bold makes headings stand out; Italic is used for titles of books or emphasis; Underline draws attention to key terms; Font Size (e.g. 12pt for body, 16pt for headings) establishes clear hierarchy.'
      },
      {
        title: 'Paragraph Alignment Options',
        content: 'Word gives you four ways to align paragraphs:',
        subPoints: [
          'Align Left: Standard for letters and notes (even on the left side).',
          'Center: Used for main titles and document headings.',
          'Align Right: Used for sender addresses and dates at the top of formal letters.',
          'Justify: Stretches text so both the left and right margins form clean straight lines (like newspaper columns).'
        ]
      },
      {
        title: 'Bullets and Numbered Lists',
        content: 'Use Numbered lists when steps must follow a strict order (like a recipe or science lab step 1, 2, 3). Use Bullet lists when the order does not matter (like a shopping list or ingredients).'
      }
    ],
    realLifeExample: {
      title: 'Typing an Official Application Letter',
      scenario: 'Florence wanted to apply for a holiday internship at a local bank in Masaka. Before typing, her letters looked messy with random font sizes. Following Word best practices, she aligned her address to the right, centered the subject heading "RE: APPLICATION FOR INTERNSHIP", justified the letter body, checked spelling with F7, and exported as a clean PDF. The manager called her for an interview the very next day.',
      lessonTakeaway: 'Clean document formatting conveys professionalism, attention to detail, and credibility.'
    },
    interactiveWidgetType: 'word-ribbon',
    practicalActivity: {
      title: 'Format a Sample Letter in Word',
      instructions: [
        'Open Microsoft Word or use our interactive Word Ribbon practice widget.',
        'Type a heading: "ICT Club Constitution 2026".',
        'Highlight the heading, make it Bold, Font Size 18, and Center-aligned.',
        'Below it, type 3 bulleted club rules using the Bullet List button in the Ribbon.',
        'Save the document with the name `ICT_Club_Rules.docx`.'
      ],
      expectedResult: 'You will master text selection, ribbon formatting commands, and proper document saving.',
      tip: 'Remember the shortcut trio: Ctrl+B for Bold, Ctrl+I for Italic, and Ctrl+U for Underline!'
    },
    summaryPoints: [
      'The Ribbon contains tabs (Home, Insert, Layout) with grouped formatting tools.',
      'Always highlight text before clicking a formatting tool or pressing a shortcut.',
      'Justified text aligns cleanly on both margins, giving a polished appearance.',
      'F7 launches the spell checker to catch typographical and grammar errors.',
      'Documents can be saved as editable .docx files or exported as read-only .pdf documents.'
    ],
    quiz: [
      {
        id: 'q10-1',
        question: 'Which tab on the Microsoft Word Ribbon contains font choices, text size, and paragraph alignment?',
        options: [
          'The Home tab',
          'The Review tab',
          'The Help tab',
          'The Formula tab'
        ],
        correctAnswerIndex: 0,
        explanation: 'The Home tab houses the primary font, paragraph, and editing formatting controls.'
      },
      {
        id: 'q10-2',
        question: 'Which keyboard shortcut applies BOLD styling to selected text in Microsoft Word?',
        options: [
          'Ctrl + B',
          'Ctrl + X',
          'Ctrl + P',
          'Ctrl + Shift + Q'
        ],
        correctAnswerIndex: 0,
        explanation: 'Ctrl + B toggles Bold formatting on highlighted text.'
      },
      {
        id: 'q10-3',
        question: 'Which paragraph alignment creates straight, even edges along BOTH the left and right margins?',
        options: [
          'Align Left',
          'Align Right',
          'Center',
          'Justify'
        ],
        correctAnswerIndex: 3,
        explanation: 'Justify adjusts spacing between words so text aligns flush against both left and right margins.'
      },
      {
        id: 'q10-4',
        question: 'Before changing the font size or color of a sentence in Word, what MUST you do first?',
        options: [
          'Restart the computer',
          'Select (highlight) the sentence with the mouse cursor',
          'Print the document onto paper',
          'Close the program'
        ],
        correctAnswerIndex: 1,
        explanation: 'Formatting only applies to the specific text that has been highlighted/selected.'
      },
      {
        id: 'q10-5',
        question: 'Which key can you press in Word to immediately run the Spell Check tool?',
        options: [
          'F7',
          'Esc',
          'Spacebar',
          'Backspace'
        ],
        correctAnswerIndex: 0,
        explanation: 'Pressing the F7 function key launches the Spelling and Grammar check dialog.'
      }
    ],
    revisionQuestions: [
      'What is the difference between Portrait and Landscape page orientation, and when would you use each?',
      'Why is it helpful to save a completed document as a PDF before sending it to someone else?',
      'Explain how you would insert a picture into a Word document and adjust its position.'
    ]
  },

  // LESSON 11
  {
    id: 'lesson-11',
    moduleId: 'module-4',
    moduleName: 'Microsoft Office Productivity Tools',
    order: 11,
    title: 'Microsoft Excel Basics',
    shortDescription: 'Understand rows, columns, cells, cell addresses (A1, B5), basic formulas (=SUM, =AVERAGE), and charts.',
    difficulty: 'Intermediate',
    estimatedMinutes: 25,
    iconName: 'FileSpreadsheet',
    learningObjectives: [
      'Understand spreadsheet terminology: Workbook, Worksheet, Column (letters), Row (numbers), and Cell (address).',
      'Enter labels (text) and values (numbers) into cells.',
      'Write basic mathematical formulas using the equals sign (`=`).',
      'Use built-in functions: `=SUM()`, `=AVERAGE()`, `=MAX()`, and `=MIN()`.',
      'Create a simple column or pie chart to visualize data.'
    ],
    introduction: 'Imagine having to calculate the average exam score of 400 secondary school students using pen and paper—one wrong addition could spoil the entire report. Microsoft Excel turns hours of tedious mathematics into instantaneous, error-free calculations.',
    keyConcepts: [
      {
        title: 'The Anatomy of a Spreadsheet Grid',
        content: 'An Excel worksheet is an immense grid composed of vertical Columns (labeled with letters: A, B, C, D...) and horizontal Rows (labeled with numbers: 1, 2, 3, 4...). The intersection of a column and a row is called a Cell. Each cell has a unique Cell Address.',
        analogy: 'Like locating a house on a map: Street B and Avenue 4 intersect at address B4.'
      },
      {
        title: 'The Golden Rule of Excel Formulas: Start with =',
        content: 'Whenever you want Excel to calculate anything, you MUST begin by typing the equals sign (`=`). If you type `5+5`, Excel treats it as plain text. But if you type `=5+5`, Excel immediately evaluates it and displays `10`!',
        subPoints: [
          'Addition: `=A1 + B1`',
          'Subtraction: `=A1 - B1`',
          'Multiplication: `=A1 * B1` (use asterisk `*`)',
          'Division: `=A1 / B1` (use forward slash `/`)'
        ]
      },
      {
        title: 'Powerful Built-in Functions',
        content: 'Functions are pre-built math shortcuts that calculate ranges of cells without typing every single plus sign:',
        subPoints: [
          '=SUM(B2:B10): Adds up all numbers from cell B2 through B10 instantly.',
          '=AVERAGE(C2:C20): Calculates the mean average of the scores.',
          '=MAX(D2:D50): Finds the highest number in the list.',
          '=MIN(D2:D50): Finds the lowest number in the list.'
        ]
      },
      {
        title: 'Creating Charts and Graphs',
        content: 'Numbers in rows can be hard to interpret. By highlighting a table and clicking Insert -> Bar Chart or Pie Chart, Excel transforms columns of numbers into colorful visual graphs that anyone can understand at a glance.'
      }
    ],
    realLifeExample: {
      title: 'Managing School Canteen Inventory in Gulu',
      scenario: 'A school canteen manager tracks snack sales. Column A lists the item (Bread, Juice, Milk), Column B lists Quantity Sold, and Column C lists Unit Price. In Column D, she typed `=B2*C2` and dragged the formula handle down. At the bottom, she typed `=SUM(D2:D15)`. Whenever she updates milk sales, the grand total updates automatically in real-time!',
      lessonTakeaway: 'Formulas make spreadsheets dynamic: when input numbers change, calculations recalculate automatically.'
    },
    interactiveWidgetType: 'excel-grid',
    practicalActivity: {
      title: 'Build a Student Marksheet in Excel',
      instructions: [
        'Open Microsoft Excel or our interactive Excel calculator in the Practice section.',
        'In Cell A1 type "Student", in B1 type "Math", in C1 type "Science", in D1 type "Total".',
        'Enter names and scores for 3 students in rows 2, 3, and 4.',
        'In Cell D2, type `=SUM(B2:C2)` and press Enter to calculate the first total.',
        'In Cell B5, type `=AVERAGE(B2:B4)` to find the average Math score.'
      ],
      expectedResult: 'You will experience the speed and automation of spreadsheet formulas.',
      tip: 'The colon `:` in `=SUM(B2:B10)` means "through" (all cells from B2 to B10 inclusive).'
    },
    summaryPoints: [
      'A cell is the intersection of a column (letter) and a row (number), e.g. C5.',
      'All calculations and formulas in Excel must begin with an equals sign (`=`).',
      'Use `=SUM()` to add, `=AVERAGE()` for means, and `=MAX()`/`=MIN()` for extremes.',
      'The asterisk `*` multiplies and the forward slash `/` divides.',
      'Charts transform raw rows of numbers into easy-to-read visual stories.'
    ],
    quiz: [
      {
        id: 'q11-1',
        question: 'What character MUST every formula in Microsoft Excel begin with?',
        options: [
          'The plus sign (+)',
          'The equals sign (=)',
          'The hashtag (#)',
          'The at symbol (@)'
        ],
        correctAnswerIndex: 1,
        explanation: 'Every Excel formula must start with an equals sign (=) so Excel knows to compute rather than treat text literally.'
      },
      {
        id: 'q11-2',
        question: 'What is the correct cell address for the cell at Column D and Row 8?',
        options: [
          '8D',
          'D8',
          'Cell-D-Row-8',
          'D:8'
        ],
        correctAnswerIndex: 1,
        explanation: 'Cell addresses always state the column letter first followed by the row number (e.g., D8).'
      },
      {
        id: 'q11-3',
        question: 'Which Excel function adds together all values in cells A1 through A10?',
        options: [
          '=ADD(A1:A10)',
          '=SUM(A1:A10)',
          '=TOTAL(A1:A10)',
          '=COUNT(A1:A10)'
        ],
        correctAnswerIndex: 1,
        explanation: '=SUM(A1:A10) is the standard function used to sum a range of numbers.'
      },
      {
        id: 'q11-4',
        question: 'Which mathematical operator is used to MULTIPLY two cell values in Excel?',
        options: [
          'The letter "x"',
          'The asterisk (*)',
          'The ampersand (&)',
          'The percent symbol (%)'
        ],
        correctAnswerIndex: 1,
        explanation: 'The asterisk symbol (*) is the standard multiplication operator in spreadsheets (e.g., =A1*B1).'
      },
      {
        id: 'q11-5',
        question: 'What happens to formula results when you edit one of the original numbers in a referenced cell?',
        options: [
          'The spreadsheet crashes immediately',
          'The formula result updates automatically to reflect the new number',
          'Nothing updates until next year',
          'The font color turns red'
        ],
        correctAnswerIndex: 1,
        explanation: 'Excel automatically recalculates formula results whenever dependent cell values change.'
      }
    ],
    revisionQuestions: [
      'What is the difference between a cell address and a cell range (like B2:B20)?',
      'Explain how a farmer or storekeeper could use Excel to track profit and loss.',
      'Why do we use the `=AVERAGE()` function instead of manually writing `=(A1+A2+A3)/3`?'
    ]
  },

  // LESSON 12
  {
    id: 'lesson-12',
    moduleId: 'module-4',
    moduleName: 'Microsoft Office Productivity Tools',
    order: 12,
    title: 'Microsoft PowerPoint Basics',
    shortDescription: 'Design engaging slide presentations, choose layouts, insert visuals, and apply tasteful transitions.',
    difficulty: 'Intermediate',
    estimatedMinutes: 20,
    iconName: 'Presentation',
    learningObjectives: [
      'Understand the slide-based structure of PowerPoint presentations.',
      'Choose slide layouts (Title Slide, Title and Content, Two Content).',
      'Apply slide designs and readable color themes.',
      'Add images, icons, and diagrams to enhance communication.',
      'Understand slide transitions vs object animations, and present using Slide Show mode (F5).'
    ],
    introduction: 'Giving a speech or lesson with just plain talk can make people lose attention. PowerPoint lets you present ideas with visual impact—combining bold headings, bullet summaries, charts, and diagrams into a structured slideshow.',
    keyConcepts: [
      {
        title: 'Slides and Layouts',
        content: 'A PowerPoint file is made of individual pages called Slides. You can add new slides by clicking Home -> New Slide. PowerPoint provides pre-set layouts to keep things tidy: Title Slide (for your presentation cover), Title and Content (for bullet points and diagrams), or Two Content (for side-by-side comparisons).'
      },
      {
        title: 'The 6x6 Rule of Great Presentations',
        content: 'The most common beginner mistake is pasting an entire book chapter onto one slide! Audience members cannot read tiny paragraphs while listening to a speaker. Follow the 6x6 rule: No more than 6 bullet points per slide, and no more than 6 words per bullet. Use slides for key reminders, not speech transcripts!'
      },
      {
        title: 'Transitions vs Animations',
        content: 'Know the difference: A Transition is the visual effect that happens when moving from one slide to the next slide (e.g. Fade, Push). An Animation is the motion effect applied to a specific object ON the slide (e.g. Making a picture fly in after you finish speaking). Keep effects subtle so they do not distract from your message.'
      },
      {
        title: 'Delivering the Slide Show',
        content: 'To start presenting full-screen to an audience or class projector, press the F5 key on your keyboard. Use the Spacebar, Right Arrow, or mouse click to advance to the next slide, and press Esc to exit back to edit mode.'
      }
    ],
    realLifeExample: {
      title: 'School Sanitation Awareness Presentation',
      scenario: 'Joseph was chosen to represent his class in a community health competition. Instead of reading handwritten notes, he prepared a 5-slide PowerPoint: Slide 1 had the title and school badge, Slide 2 had 4 clean bullet points on water boiling, Slide 3 showed a diagram of clean handwashing, and Slide 4 showed school club statistics. The judges commended him for clear, confident delivery.',
      lessonTakeaway: 'Good slides complement the speaker, engaging the audience with clarity and visual structure.'
    },
    interactiveWidgetType: 'powerpoint-slides',
    practicalActivity: {
      title: 'Create a 3-Slide Introduction to ICT',
      instructions: [
        'Open PowerPoint or our slide design simulator.',
        'Slide 1: Title "Welcome to ICT Learning", Subtitle "Presented by [Your Name]".',
        'Slide 2: Insert a "Title and Content" layout with title "What You Will Learn", adding 3 bullet points.',
        'Slide 3: Title "Thank You - Any Questions?".',
        'Press the F5 key to test your presentation in full-screen Slide Show mode.'
      ],
      expectedResult: 'You will understand slide creation, bullet organization, and how to launch full-screen slideshows.',
      tip: 'Use dark text on light backgrounds or white text on dark navy backgrounds for clear projector readability.'
    },
    summaryPoints: [
      'PowerPoint organizes presentations into visual pages called slides.',
      'Use the 6x6 rule: keep bullet points brief and legible from the back of the room.',
      'Transitions occur between slides; Animations move elements within a slide.',
      'Press F5 to start the full-screen Slide Show; press Esc to exit.',
      'High contrast between text and background ensures accessibility on school projectors.'
    ],
    quiz: [
      {
        id: 'q12-1',
        question: 'What is an individual page called in a PowerPoint presentation file?',
        options: [
          'A Sheet',
          'A Slide',
          'A Cell',
          'A Paragraph'
        ],
        correctAnswerIndex: 1,
        explanation: 'Individual pages in a presentation are called slides.'
      },
      {
        id: 'q12-2',
        question: 'Which function key launches the full-screen Slide Show from the beginning in PowerPoint?',
        options: [
          'F1',
          'F5',
          'F12',
          'Ctrl + Esc'
        ],
        correctAnswerIndex: 1,
        explanation: 'Pressing F5 starts the PowerPoint slideshow in full-screen presentation mode from Slide 1.'
      },
      {
        id: 'q12-3',
        question: 'What is the visual effect called when one slide transitions to the next slide during a presentation?',
        options: [
          'A Slide Transition',
          'An Audio Driver',
          'A Word Macro',
          'A Cell Formula'
        ],
        correctAnswerIndex: 0,
        explanation: 'A Transition controls how one slide dissolves, pushes, or fades into the next slide.'
      },
      {
        id: 'q12-4',
        question: 'According to good presentation design, what is the best approach for slide text?',
        options: [
          'Copy and paste whole book pages in tiny font size 8',
          'Keep text concise with short, clear bullet points and high contrast',
          'Use 15 different bright rainbow colors on every sentence',
          'Never include any titles'
        ],
        correctAnswerIndex: 1,
        explanation: 'Effective slides use short, focused bullet points with readable fonts so the audience can easily follow.'
      },
      {
        id: 'q12-5',
        question: 'Which key do you press to exit out of a full-screen Slide Show and return to editing mode?',
        options: [
          'Esc (Escape)',
          'Spacebar',
          'Enter',
          'Tab'
        ],
        correctAnswerIndex: 0,
        explanation: 'Pressing the Esc (Escape) key exits full-screen Slide Show mode immediately.'
      }
    ],
    revisionQuestions: [
      'Why is it bad practice to write long paragraphs on a presentation slide?',
      'Explain the difference between a slide transition and an object animation.',
      'How does choosing an appropriate slide design theme help your audience understand your message?'
    ]
  },

  // LESSON 13
  {
    id: 'lesson-13',
    moduleId: 'module-5',
    moduleName: 'Internet, Browsing & Global Networks',
    order: 13,
    title: 'Internet and Web Browsers',
    shortDescription: 'Understand the World Wide Web, web browsers, URLs, search engines, bookmarks, and safe browsing.',
    difficulty: 'Beginner',
    estimatedMinutes: 22,
    iconName: 'Globe',
    learningObjectives: [
      'Define the Internet and distinguish it from the World Wide Web (WWW).',
      'Understand how web browsers (Chrome, Firefox, Edge, Safari) work.',
      'Deconstruct a URL address (https://, domain name, extensions like .org, .edu, .com).',
      'Use search engines effectively with smart keywords.',
      'Save bookmarks and recognize secure websites (HTTPS padlock).'
    ],
    introduction: 'The Internet is the largest human-made information network in history. It connects billions of computers, phones, libraries, and servers worldwide. Navigating it with confidence and safety is a superpower for students and professionals.',
    keyConcepts: [
      {
        title: 'Internet vs. World Wide Web (WWW)',
        content: 'People often use these words interchangeably, but they are different! The Internet is the physical global highway system of cables, satellites, and routers connecting computers. The World Wide Web (WWW) is the collection of websites, web pages, and documents traveling along that highway.',
        analogy: 'The Internet is the network of paved roads and bridges; the World Wide Web is the cars, trucks, and buses driving on them.'
      },
      {
        title: 'What is a Web Browser?',
        content: 'A web browser is the software application you use to visit and view websites. Popular web browsers include Google Chrome, Mozilla Firefox, Microsoft Edge, and Apple Safari. When you type a web address, your browser requests the HTML code from a remote server across the world and renders it into words, images, and buttons.'
      },
      {
        title: 'Anatomy of a Web Address (URL)',
        content: 'A URL (Uniform Resource Locator) is like a postal address for a specific page:',
        subPoints: [
          'Protocol (`https://`): Hypertext Transfer Protocol Secure. The "S" means encrypted and safe!',
          'Domain Name (`www.ictlearninghub.org`): The unique name of the website.',
          'Top-Level Domain (`.org` for non-profit organizations, `.edu` / `.ac.ug` for schools and universities, `.gov` for governments, `.com` for commercial businesses).'
        ]
      },
      {
        title: 'Smart Search Engine Techniques',
        content: 'Search engines (like Google) index billions of pages. To find answers fast, use specific keywords rather than long sentences. Use quotation marks like `"computer hardware basics"` to search for exact phrases, and look for reputable educational sources.'
      }
    ],
    realLifeExample: {
      title: 'Researching for a Science Project in Arua',
      scenario: 'Esther needed to write an essay on renewable solar energy in East Africa. Instead of typing "tell me everything about solar energy please", she typed `"solar energy" Uganda schools statistics .pdf` in Google. Her browser instantly returned official research papers and ministry reports, saving her hours of scrolling through irrelevant ads.',
      lessonTakeaway: 'Using smart search keywords and domain filters turns the vast internet into your personal research library.'
    },
    interactiveWidgetType: 'internet-browsing',
    practicalActivity: {
      title: 'Inspect a Web Browser Interface',
      instructions: [
        'Open your web browser (Chrome, Edge, or Firefox).',
        'Locate the Address Bar (where you type URLs) at the top of the browser window.',
        'Check for the padlock icon or "https://" at the beginning of the address bar.',
        'Practice using the Back button (<-), Forward button (->), and Refresh button (circular arrow).',
        'Press Ctrl+D to bookmark your favorite educational website.'
      ],
      expectedResult: 'You will master browser navigation controls and know how to verify website security.',
      tip: 'The address bar is also a search bar! You can type a full website address OR search terms directly into it.'
    },
    summaryPoints: [
      'The Internet is the global network infrastructure; the Web is the collection of websites and documents on it.',
      'Web browsers (Chrome, Edge, Firefox) translate internet code into interactive webpages.',
      'A URL specifies protocol (https://), domain name, and page path.',
      'The "S" in HTTPS indicates secure, encrypted communication between your browser and the website.',
      'Ctrl+D bookmarks useful pages for quick access in the future.'
    ],
    quiz: [
      {
        id: 'q13-1',
        question: 'Which of the following is an application used to view and navigate web pages on the internet?',
        options: [
          'A Web Browser (e.g. Google Chrome, Edge)',
          'A Power Supply Unit',
          'A Spreadsheet formula',
          'A Computer Motherboard'
        ],
        correctAnswerIndex: 0,
        explanation: 'Web browsers are software applications that fetch and render web pages.'
      },
      {
        id: 'q13-2',
        question: 'What does the "S" stand for in the web protocol "HTTPS"?',
        options: [
          'Simple',
          'Secure',
          'Standard',
          'Speed'
        ],
        correctAnswerIndex: 1,
        explanation: 'HTTPS stands for Hypertext Transfer Protocol Secure, meaning data transferred is encrypted.'
      },
      {
        id: 'q13-3',
        question: 'Which top-level domain (TLD) is typically reserved for academic institutions and universities?',
        options: [
          '.com',
          '.edu or .ac',
          '.biz',
          '.shop'
        ],
        correctAnswerIndex: 1,
        explanation: '.edu and .ac (like .ac.ug) are reserved for accredited educational and academic institutions.'
      },
      {
        id: 'q13-4',
        question: 'What does the Refresh / Reload button (circular arrow) on a web browser do?',
        options: [
          'It turns off the computer',
          'It re-downloads and updates the current webpage with the latest content',
          'It clears all files on your hard drive',
          'It cancels your internet bill'
        ],
        correctAnswerIndex: 1,
        explanation: 'The Reload button fetches the latest version of the active page from the web server.'
      },
      {
        id: 'q13-5',
        question: 'Which keyboard shortcut quickly saves a webpage to your browser Bookmarks or Favorites?',
        options: [
          'Ctrl + D',
          'Ctrl + P',
          'Alt + F4',
          'Ctrl + Q'
        ],
        correctAnswerIndex: 0,
        explanation: 'Pressing Ctrl + D creates a bookmark for the current page in all major web browsers.'
      }
    ],
    revisionQuestions: [
      'In your own words, explain how the Internet differs from the World Wide Web.',
      'Why is it risky to enter passwords on a website that only uses "http://" instead of "https://"?',
      'What are bookmarks in a web browser, and why are they helpful for students?'
    ]
  },

  // LESSON 14
  {
    id: 'lesson-14',
    moduleId: 'module-5',
    moduleName: 'Internet, Browsing & Global Networks',
    order: 14,
    title: 'Email Communication',
    shortDescription: 'Master composing emails, To vs Cc vs Bcc, subject lines, etiquette, and sending file attachments.',
    difficulty: 'Beginner',
    estimatedMinutes: 20,
    iconName: 'Mail',
    learningObjectives: [
      'Understand how Electronic Mail (Email) works.',
      'Identify the anatomy of an email address: `username@domain.com`.',
      'Distinguish between To, Cc (Carbon Copy), and Bcc (Blind Carbon Copy).',
      'Write effective, polite subject lines and professional email greetings.',
      'Attach files (homework, PDFs, photos) safely without exceeding size limits.'
    ],
    introduction: 'Before email, sending an official letter required paper, envelopes, postage stamps, and days of postal delivery. Email delivers messages and file attachments across the globe in seconds. Knowing professional email etiquette is a vital skill for secondary school, university, and jobs.',
    keyConcepts: [
      {
        title: 'Anatomy of an Email Address',
        content: 'An email address has three parts: the User Name (your chosen name, e.g. `sarah.namubiru`), the "@" symbol (meaning "at"), and the Mail Server Domain (e.g. `school.ac.ug` or `gmail.com`). Notice there are NEVER spaces inside an email address!'
      },
      {
        title: 'To, Cc, and Bcc: Who Receives What?',
        content: 'When writing an email, you have three recipient boxes:',
        subPoints: [
          'To: The primary person who needs to read and reply to your message.',
          'Cc (Carbon Copy): People who need to be kept informed (FYI), but are not expected to reply.',
          'Bcc (Blind Carbon Copy): Recipients who receive the email privately—their email addresses are completely hidden from all other recipients! Great for sending announcements to 50 parents without leaking their private email addresses to each other.'
        ]
      },
      {
        title: 'Professional Email Etiquette (Netiquette)',
        content: 'A good email includes: 1) A clear Subject Line (e.g., `Term 3 Homework Submission - [Your Name]`), 2) A respectful Salutation (`Dear Mr. Okello,`), 3) A concise message body, 4) A polite Sign-off (`Kind regards, [Your Name]`). NEVER write entire messages in CAPITAL LETTERS—in digital etiquette, ALL CAPS is considered shouting!'
      },
      {
        title: 'Sending Attachments Safely',
        content: 'Click the paperclip icon to attach homework files, photos, or documents. Keep attachments under 25MB. Never open attachments with extensions like `.exe` or `.vbs` sent by unknown strangers, as they could contain dangerous viruses.'
      }
    ],
    realLifeExample: {
      title: 'Applying for a University Bursary via Email',
      scenario: 'Emmanuel sent an email to the university bursary committee with subject line "hey". His email body had no greeting and just said "give me scholarship". The committee ignored it. His teacher coached him to write: Subject: "Application for STEM Bursary 2026 - Emmanuel K.", followed by a polite formal letter and a clean PDF attachment of his academic marks. The committee reviewed his request promptly.',
      lessonTakeaway: 'The tone, structure, and subject line of an email directly influence how seriously you are taken.'
    },
    interactiveWidgetType: 'email-compose',
    practicalActivity: {
      title: 'Draft a Formal School Email',
      instructions: [
        'Use our interactive Email Composer in the Practice section.',
        'Enter your teacher’s email in the "To" field.',
        'Write an accurate subject line: "Apology for Absence Due to Illness".',
        'Draft a 3-sentence message using proper salutation, respectful body, and signature.',
        'Click the attachment paperclip icon to simulate attaching your doctor’s medical note.'
      ],
      expectedResult: 'You will master the components of professional digital communication.',
      tip: 'Always re-read your email before pressing "Send" to catch spelling mistakes and verify the recipient address!'
    },
    summaryPoints: [
      'Email addresses consist of `username@domain` with no spaces.',
      'To is for direct action; Cc is for keeping people informed; Bcc hides recipient email addresses.',
      'Always include a concise, informative subject line.',
      'Avoid ALL CAPS writing, which is considered online shouting.',
      'Use the paperclip icon to attach documents, checking file safety before sending.'
    ],
    quiz: [
      {
        id: 'q14-1',
        question: 'What is the purpose of the "Bcc" (Blind Carbon Copy) field in an email?',
        options: [
          'It sends the email to the Recycle Bin',
          'It sends copies to recipients while keeping their email addresses hidden from everyone else',
          'It makes the font size bold',
          'It automatically translates the email into French'
        ],
        correctAnswerIndex: 1,
        explanation: 'Bcc hides recipient email addresses from other recipients on the email, protecting privacy.'
      },
      {
        id: 'q14-2',
        question: 'Which icon is universally used in email apps to attach a file or document to a message?',
        options: [
          'A paperclip icon',
          'A scissors icon',
          'A trash can icon',
          'A lightbulb icon'
        ],
        correctAnswerIndex: 0,
        explanation: 'The paperclip icon represents adding an attachment to an email message.'
      },
      {
        id: 'q14-3',
        question: 'In digital communication etiquette (netiquette), what does typing in ALL CAPITAL LETTERS signify?',
        options: [
          'Polite whispering',
          'SHOUTING or being angry',
          'A secret password',
          'Fast internet speed'
        ],
        correctAnswerIndex: 1,
        explanation: 'Writing in all capital letters is widely interpreted as shouting and is considered poor etiquette.'
      },
      {
        id: 'q14-4',
        question: 'Which of the following is a well-crafted email subject line?',
        options: [
          'HELP ME NOW PLEASE!!!!!',
          'Biology Project Submission - David Kato S4',
          '(leaving the subject line blank)',
          'asdfghjk'
        ],
        correctAnswerIndex: 1,
        explanation: 'A descriptive subject line with topic and sender details immediately informs the recipient what the email is about.'
      },
      {
        id: 'q14-5',
        question: 'What should you do if an unknown sender emails you an attachment named "Claim_Prize.exe"?',
        options: [
          'Open it immediately to win money',
          'Do not open or download it; delete or report it as suspicious spam',
          'Forward it to all your classmates',
          'Save it to your desktop'
        ],
        correctAnswerIndex: 1,
        explanation: 'Unsolicited executable files (.exe) from unknown senders are high-risk malware carriers and should be deleted immediately.'
      }
    ],
    revisionQuestions: [
      'Explain when you would put a recipient in "Cc" versus "Bcc".',
      'Why should you never send an email with an empty subject line?',
      'List three rules of professional email etiquette.'
    ]
  },

  // LESSON 15
  {
    id: 'lesson-15',
    moduleId: 'module-5',
    moduleName: 'Internet, Browsing & Global Networks',
    order: 15,
    title: 'Computer Networks',
    shortDescription: 'Explore LAN, WAN, Wi-Fi, routers, switches, network cables, and how computers communicate.',
    difficulty: 'Intermediate',
    estimatedMinutes: 22,
    iconName: 'Network',
    learningObjectives: [
      'Define a computer network and explain its benefits (resource sharing, communication).',
      'Differentiate between LAN (Local Area Network) and WAN (Wide Area Network).',
      'Understand wired connections (Ethernet cables) vs wireless connections (Wi-Fi).',
      'Explain the roles of network hardware: Modem, Router, and Switch.',
      'Understand client-server architecture in simple terms.'
    ],
    introduction: 'A computer sitting alone in a room can only do so much. But when two or more computers are linked together, they form a Computer Network. Networks allow computers to share files, share one printer among 40 students, and communicate across the planet.',
    keyConcepts: [
      {
        title: 'Why Do We Network Computers?',
        content: 'Networks provide three major advantages: 1) Hardware Sharing (all computers in a school lab can print through one shared network printer, saving millions in equipment costs), 2) Data Sharing (students access the school library server from any computer), and 3) Communication (instant messages, video calls, and email).',
        analogy: 'Imagine if every house in a village had to dig its own well versus sharing a clean community water tap connected by pipes.'
      },
      {
        title: 'LAN vs. WAN: Scale of Networks',
        content: 'Networks are categorized by geographical size:',
        subPoints: [
          'LAN (Local Area Network): Confined to a single room, school building, or office. Fast, secure, and privately owned.',
          'WAN (Wide Area Network): Spans across cities, entire countries, or the globe. The Internet is the world’s largest WAN, connecting millions of smaller LANs together.'
        ]
      },
      {
        title: 'Wired (Ethernet) vs. Wireless (Wi-Fi)',
        content: 'Wired networks use blue or gray Ethernet cables with plastic clips (RJ-45) plugged into the computer. Ethernet is fast, immune to radio interference, and very reliable. Wireless networks use Wi-Fi radio frequencies, giving laptops and phones the freedom to move around without physical cables.'
      },
      {
        title: 'Network Hardware Heroes',
        content: 'How do network devices cooperate?',
        subPoints: [
          'Modem (Modulator-Demodulator): Converts internet signals from your telephone line, optical fiber, or 4G antenna into digital data.',
          'Router: The traffic director that routes internet packets between your home/school network and the outside world.',
          'Switch: Connects multiple wired computers inside the same room so they can talk directly to one another.'
        ]
      }
    ],
    realLifeExample: {
      title: 'The School Computer Lab Setup in Mbarara',
      scenario: 'Bishop Stuart High School has 35 desktop computers in its lab. Instead of buying 35 separate printers and 35 separate internet modems, the school technician plugged all computers into a central Network Switch and connected one high-speed Laser Printer and one Wi-Fi Router. Every student can print their homework and access Wikipedia from their individual desk.',
      lessonTakeaway: 'Computer networks maximize resources, dramatically reduce costs, and simplify administration.'
    },
    interactiveWidgetType: 'computer-networks',
    practicalActivity: {
      title: 'Trace Network Devices Around You',
      instructions: [
        'Check the back of a school or office desktop computer for an Ethernet cable with an RJ-45 plastic clip.',
        'Notice the blinking green and amber lights next to the cable port—those indicate data transmission packets!',
        'Locate the wireless Wi-Fi router in the building, observing its power, internet, and Wi-Fi indicator lights.'
      ],
      expectedResult: 'You will visually recognize physical network cabling and wireless transmission equipment.',
      tip: 'If Wi-Fi feels slow, an Ethernet cable provides a much more stable and speedy connection for school exams.'
    },
    summaryPoints: [
      'A network connects two or more computers to share hardware, software, and data.',
      'A LAN covers a localized area like a school lab; a WAN spans countries and continents.',
      'Wired Ethernet cables provide stable high speeds; Wi-Fi provides portable wireless convenience.',
      'Routers direct internet traffic; switches connect multiple local devices together.',
      'The Internet is the ultimate example of a global Wide Area Network (WAN).'
    ],
    quiz: [
      {
        id: 'q15-1',
        question: 'What type of network connects computers within a single school room or building?',
        options: [
          'LAN (Local Area Network)',
          'WAN (Wide Area Network)',
          'MAN (Metropolitan Area Network)',
          'CAN (Country Area Network)'
        ],
        correctAnswerIndex: 0,
        explanation: 'A LAN (Local Area Network) covers a localized geographical footprint like a home, lab, or office building.'
      },
      {
        id: 'q15-2',
        question: 'What is the largest example of a Wide Area Network (WAN) in the world today?',
        options: [
          'A school computer lab',
          'The Internet',
          'A Bluetooth speaker connection',
          'A single USB flash drive'
        ],
        correctAnswerIndex: 1,
        explanation: 'The Internet is a massive, interconnected global Wide Area Network.'
      },
      {
        id: 'q15-3',
        question: 'Which device directs network traffic between your local home/school network and the external internet?',
        options: [
          'A Router',
          'A Mouse pad',
          'A Computer monitor',
          'A Scanner'
        ],
        correctAnswerIndex: 0,
        explanation: 'A router directs data packets between different networks, connecting local devices to the internet.'
      },
      {
        id: 'q15-4',
        question: 'What is a major advantage of connecting 30 computers together in a school laboratory network?',
        options: [
          'Computers can share one network printer and shared internet connection',
          'It eliminates the need for electricity',
          'It makes computers run without monitors',
          'It deletes homework automatically'
        ],
        correctAnswerIndex: 0,
        explanation: 'Networks allow expensive resources like high-capacity printers and internet bandwidth to be shared across many users.'
      },
      {
        id: 'q15-5',
        question: 'What technology allows computers, tablets, and phones to connect to a network using radio waves without physical wires?',
        options: [
          'Wi-Fi',
          'Ethernet Cable',
          'Floppy Disk',
          'VGA Port'
        ],
        correctAnswerIndex: 0,
        explanation: 'Wi-Fi uses radio frequency signals to transmit data wirelessly between devices and routers.'
      }
    ],
    revisionQuestions: [
      'Compare a Local Area Network (LAN) and a Wide Area Network (WAN) in terms of coverage and speed.',
      'Explain two financial benefits of setting up a network in a school with 50 computers.',
      'What is the difference between a network switch and a network router?'
    ]
  },

  // LESSON 16
  {
    id: 'lesson-16',
    moduleId: 'module-6',
    moduleName: 'Cybersecurity & Digital Citizenship',
    order: 16,
    title: 'Cybersecurity',
    shortDescription: 'Defend against viruses, malware, phishing emails, fake websites, and build unbreakable passwords.',
    difficulty: 'Intermediate',
    estimatedMinutes: 25,
    iconName: 'ShieldCheck',
    learningObjectives: [
      'Understand common cyber threats: Malware, Viruses, Trojans, and Ransomware.',
      'Recognize Phishing scams in emails, SMS, and fake login links.',
      'Create robust, memorable passwords and understand Two-Factor Authentication (2FA).',
      'Protect school and personal computers using antivirus software and firewalls.',
      'Respond safely if you suspect your account has been compromised.'
    ],
    introduction: 'In the physical world, you lock the doors of your house and keep your school bag zipped to keep thieves away. In the digital world, cybercriminals use deceptive tricks and malicious software to steal passwords, money, and personal data. Cybersecurity is your digital shield.',
    keyConcepts: [
      {
        title: 'Types of Malware (Malicious Software)',
        content: 'Malware is any program engineered to harm, spy on, or exploit a computer:',
        subPoints: [
          'Virus: Attaches to clean files and replicates when those files are opened, corrupting data.',
          'Trojan Horse: Disguises itself as something attractive (like a free game or cracked software), but silently opens a back door for hackers.',
          'Spyware: Silently monitors keystrokes, capturing passwords and browsing activity.',
          'Ransomware: Encrypts all your school files with a secret lock code and demands money to unlock them.'
        ]
      },
      {
        title: 'Spotting Phishing Scams',
        content: 'Phishing is a social engineering attack where criminals pretend to be a trusted authority (your school, bank, or WhatsApp) to trick you into revealing your password or PIN. Red flags include: 1) Artificial urgency ("Your account will be deleted in 2 hours!"), 2) Spelling mistakes in the sender address (e.g. `support@paypa1-security.com`), 3) Suspicious links asking you to enter login credentials, and 4) Unbelievable prizes ("You won 5 million shillings!").'
      },
      {
        title: 'Creating Unbreakable Passwords',
        content: 'Weak passwords like `123456`, `password`, or your birthday can be cracked by automated computer programs in less than one second! A strong password should be at least 12 characters long, mixing uppercase letters, lowercase letters, numbers, and symbols (`#`, `!`, `&`). Better yet, use a Passphrase made of four random memorable words, like `Purple$Giraffe#Reads*Books!9`.'
      },
      {
        title: 'Two-Factor Authentication (2FA)',
        content: 'Two-Factor Authentication adds a second security layer: Even if a thief steals your password, they still cannot log in without the temporary 6-digit verification code sent to your physical mobile phone.'
      }
    ],
    realLifeExample: {
      title: 'The Fake Mobile Money SMS Scam',
      scenario: 'Grace received an SMS: "AIRTEL MONEY: You have received UGX 350,000 from Kato David. Balance: UGX 362,000." One minute later, a stranger called crying: "Madam, I accidentally sent school fees to your phone, please send it back immediately!" Grace remembered her ICT cybersecurity lesson: she checked her official Airtel app balance—no money had entered. The caller had sent a fake fake text from a regular phone number. Grace blocked the caller and avoided losing her own savings.',
      lessonTakeaway: 'Always verify unexpected transactions and urgent claims through official channels before acting.'
    },
    interactiveWidgetType: 'cyber-phishing',
    practicalActivity: {
      title: 'Interactive Phishing Detective Lab',
      instructions: [
        'Open the Phishing Detective Simulator in the Practice section.',
        'Inspect 3 sample emails: a fake bank notice, an official school newsletter, and a suspicious prize winner message.',
        'Identify the suspicious sender domain, deceptive hyperlinks, and urgent threatening language.',
        'Mark each message as "Safe" or "Phishing" and check your detective score.'
      ],
      expectedResult: 'You will build acute awareness for social engineering tricks and fraudulent digital messages.',
      tip: 'Never click links inside unexpected messages. Instead, open your browser and navigate directly to the official website.'
    },
    summaryPoints: [
      'Malware encompasses viruses, trojans, spyware, and ransomware.',
      'Phishing uses deceptive emails and messages to steal passwords and financial credentials.',
      'Strong passwords combine uppercase, lowercase, numbers, symbols, or passphrases.',
      'Two-Factor Authentication (2FA) protects accounts even if passwords leak.',
      'Always verify urgent or suspicious financial requests through official channels.'
    ],
    quiz: [
      {
        id: 'q16-1',
        question: 'What is "Phishing" in the context of computer security?',
        options: [
          'Catching fish using electronic fishing rods',
          'A cyber scam where attackers trick victims into revealing passwords or sensitive information',
          'Cleaning dust out of a computer fan',
          'Speeding up an internet router'
        ],
        correctAnswerIndex: 1,
        explanation: 'Phishing is a deceptive social engineering attack designed to steal credentials by impersonating legitimate entities.'
      },
      {
        id: 'q16-2',
        question: 'Which of the following represents the STRONGEST password?',
        options: [
          'password123',
          'qwerty',
          'Tr@1n#St@ti0n_2026!',
          'uganda'
        ],
        correctAnswerIndex: 2,
        explanation: 'Tr@1n#St@ti0n_2026! is long, complex, and combines uppercase, lowercase, numbers, and special symbols.'
      },
      {
        id: 'q16-3',
        question: 'What does Two-Factor Authentication (2FA) require to log into an account?',
        options: [
          'Two different computer monitors',
          'Your password PLUS a second verification step such as a code sent to your phone',
          'Paying money twice',
          'Typing your password twice very fast'
        ],
        correctAnswerIndex: 1,
        explanation: '2FA requires two separate pieces of evidence (knowledge factor like password + possession factor like a phone code).'
      },
      {
        id: 'q16-4',
        question: 'What type of malware locks and encrypts a victim\'s personal files, demanding payment to restore them?',
        options: [
          'Ransomware',
          'Spreadsheet software',
          'System driver',
          'Ethernet protocol'
        ],
        correctAnswerIndex: 0,
        explanation: 'Ransomware holds victim files hostage via encryption until an extortion fee is paid.'
      },
      {
        id: 'q16-5',
        question: 'Why should you avoid using the same password for your school email, bank account, and social media?',
        options: [
          'It is illegal by law',
          'If one service suffers a security breach, hackers can unlock all your other accounts too',
          'The keyboard buttons wear out faster',
          'It slows down your monitor display'
        ],
        correctAnswerIndex: 1,
        explanation: 'Credential stuffing occurs when hackers take passwords leaked from one website to unlock your other accounts.'
      }
    ],
    revisionQuestions: [
      'List three red flags that reveal an email might be a phishing scam.',
      'Explain how a Trojan horse computer program gets its name from ancient history.',
      'Why is Two-Factor Authentication (2FA) much safer than relying on passwords alone?'
    ]
  },

  // LESSON 17
  {
    id: 'lesson-17',
    moduleId: 'module-6',
    moduleName: 'Cybersecurity & Digital Citizenship',
    order: 17,
    title: 'Online Privacy and Responsible Internet Use',
    shortDescription: 'Master digital footprints, netiquette, online safety, preventing cyberbullying, and respecting copyright.',
    difficulty: 'Beginner',
    estimatedMinutes: 20,
    iconName: 'Users',
    learningObjectives: [
      'Understand the concept of a Digital Footprint and why it is permanent.',
      'Protect personal identifiable information (PII) on social platforms.',
      'Practice healthy Netiquette (polite digital communication) and oppose cyberbullying.',
      'Understand Copyright, Plagiarism, and Fair Use when writing school assignments.',
      'Recognize the importance of digital well-being and screen time balance.'
    ],
    introduction: 'The internet is a public town square. Everything you post, share, comment, or search contributes to your digital reputation. Being a good digital citizen means using technology ethically, respectfully, and safely to uplift yourself and your community.',
    keyConcepts: [
      {
        title: 'Your Digital Footprint',
        content: 'Every time you browse a website, post on social media, upload a photo, or leave a comment, you leave behind digital breadcrumbs known as your Digital Footprint. Once something is posted online, others can take screenshots and share it forever, even if you delete the original post. Future university admissions officers and employers frequently review digital footprints before hiring!'
      },
      {
        title: 'Guarding Personally Identifiable Information (PII)',
        content: 'Never post sensitive personal details publicly: your home address, exact daily school travel route, national ID card numbers, or parent financial slips. Strangers and predators can piece together harmless-looking posts to track your whereabouts.'
      },
      {
        title: 'Netiquette and Standing Up to Cyberbullying',
        content: 'Netiquette is the code of respectful behavior expected online. Remember there is a real human being with feelings behind every screen. Cyberbullying—harassing, teasing, spreading rumors, or humiliating someone online—causes severe mental distress. If you see cyberbullying: do not participate, take screenshots as evidence, block the bully, and report it to a trusted teacher or parent.'
      },
      {
        title: 'Copyright vs Plagiarism',
        content: 'When writing school homework, copying and pasting sentences directly from Wikipedia or a website without crediting the author is Plagiarism (intellectual theft). Respect Copyright: summarize concepts in your own words, and list references showing where you gathered your research.'
      }
    ],
    realLifeExample: {
      title: 'A School Prefect Election in Jinja',
      scenario: 'During school prefect campaigns, a student posted mean rumors and embarrassing edited photos of an opponent on a WhatsApp group. The school disciplinary committee traced the posts back to his phone. He was disqualified from the election and suspended. Meanwhile, his opponent ran an inspiring campaign sharing educational study tips, winning the election with overwhelming student support.',
      lessonTakeaway: 'Respectful, constructive digital citizenship earns lasting trust and respect in schools and careers.'
    },
    interactiveWidgetType: 'digital-safety',
    practicalActivity: {
      title: 'Audit Your Digital Privacy Settings',
      instructions: [
        'Think about the apps or websites you use (or imagine your future accounts).',
        'Check who can see your profile: is it set to "Public to Everyone" or "Friends / Private"?',
        'Review your password security and verify that your profile picture does not display your school uniform badge or home house number.',
        'Write a personal "Digital Pledge": 3 rules you will follow to be a kind, safe digital citizen.'
      ],
      expectedResult: 'You will develop conscious habits for managing your online reputation and personal privacy.',
      tip: 'Before clicking "Post" or "Send", ask yourself the THINK test: Is it True? Helpful? Inspiring? Necessary? Kind?'
    },
    summaryPoints: [
      'Your digital footprint is the permanent trail of data left by your online activities.',
      'Keep personally identifiable information (PII) private to protect against identity theft.',
      'Netiquette means treating others with kindness and dignity in digital spaces.',
      'Plagiarism is using another person’s creative work without citation; always acknowledge sources.',
      'Practice digital balance to ensure screen time does not interfere with sleep, study, and family.'
    ],
    quiz: [
      {
        id: 'q17-1',
        question: 'What is a "Digital Footprint"?',
        options: [
          'The size of a laptop computer case in inches',
          'The permanent trail of information, posts, photos, and records left behind by your online activity',
          'A fingerprint scanner on an expensive phone',
          'A virus that infects shoes'
        ],
        correctAnswerIndex: 1,
        explanation: 'A digital footprint is the permanent trail of data generated by an individual\'s internet activity and posts.'
      },
      {
        id: 'q17-2',
        question: 'Which of the following pieces of personal information should you NEVER post publicly on social media?',
        options: [
          'Your favorite color',
          'Your home address and national identification number',
          'Your favorite musical artist',
          'The title of a book you enjoyed reading'
        ],
        correctAnswerIndex: 1,
        explanation: 'Sensitive Personally Identifiable Information (PII) like home addresses and ID numbers should remain strictly confidential.'
      },
      {
        id: 'q17-3',
        question: 'What is "Plagiarism" in academic and school work?',
        options: [
          'Drawing a clean diagram using a ruler',
          'Copying someone else\'s text, research, or ideas and pretending it is your own original work',
          'Submitting an assignment two days before the deadline',
          'Borrowing a library book legally'
        ],
        correctAnswerIndex: 1,
        explanation: 'Plagiarism is the unethical act of presenting another person\'s work or words as your own without proper citation.'
      },
      {
        id: 'q17-4',
        question: 'What should you do if someone is sending harassing or cruel messages to you or a classmate online (cyberbullying)?',
        options: [
          'Forward the cruel messages to everyone in your school',
          'Save evidence (screenshots), block the sender, and report the behavior to a trusted parent or teacher',
          'Post even worse insults in public comments',
          'Throw your laptop out of the window'
        ],
        correctAnswerIndex: 1,
        explanation: 'The safest, most constructive response to cyberbullying is preserving evidence, blocking the abuser, and reporting to trusted guardians.'
      },
      {
        id: 'q17-5',
        question: 'The THINK acronym encourages learners to ask which questions before posting online?',
        options: [
          'Is it Temporary, Hard, Insulting, Noisy, Gross?',
          'Is it True, Helpful, Inspiring, Necessary, Kind?',
          'Is it Tall, Heavy, Inexpensive, New, Known?',
          'Is it Technology, Hardware, Internet, Network, Keyboard?'
        ],
        correctAnswerIndex: 1,
        explanation: 'THINK stands for: Is it True? Helpful? Inspiring? Necessary? Kind?'
      }
    ],
    revisionQuestions: [
      'Why is it said that "the internet never forgets" even if you delete a post?',
      'Describe how cyberbullying affects students, and what bystanders can do to support victims.',
      'Explain how a student can properly cite an internet source when writing a term paper.'
    ]
  }
];
