import { GlossaryTerm } from '../types/ict';

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'ict',
    term: 'ICT (Information and Communication Technology)',
    category: 'Basics',
    definition: 'All electronic technologies used to handle, process, store, and transmit information and communication.',
    simpleExample: 'Computers, smartphones, internet routers, radio, and mobile money systems are all examples of ICT.'
  },
  {
    id: 'hardware',
    term: 'Hardware',
    category: 'Hardware',
    definition: 'The physical, tangible parts of a computer system that you can touch and see.',
    simpleExample: 'The monitor screen, keyboard, mouse, cables, and internal chips like the CPU.'
  },
  {
    id: 'software',
    term: 'Software',
    category: 'Software',
    definition: 'The invisible sets of instructions or computer programs that tell the hardware what to do.',
    simpleExample: 'Microsoft Word, Google Chrome, Windows 11, and educational games are software.'
  },
  {
    id: 'cpu',
    term: 'CPU (Central Processing Unit)',
    category: 'Hardware',
    definition: 'The "brain" of the computer that carries out calculations, processes data, and executes instructions.',
    simpleExample: 'When you click to add two numbers in a calculator app, the CPU performs the addition.'
  },
  {
    id: 'ram',
    term: 'RAM (Random Access Memory)',
    category: 'Hardware',
    definition: 'The temporary, high-speed memory where a computer keeps programs and files currently in use. It clears when powered off.',
    simpleExample: 'Like a student desk: whatever books and notebooks you have open right now are in RAM; when class ends (power off), the desk is cleared.'
  },
  {
    id: 'storage',
    term: 'Storage Device / Hard Drive',
    category: 'Hardware',
    definition: 'A permanent memory medium that preserves files, pictures, music, and software even when the computer is turned off.',
    simpleExample: 'Like a student backpack or school library shelf: your homework stays safe inside even when you go to sleep.'
  },
  {
    id: 'input-device',
    term: 'Input Device',
    category: 'Hardware',
    definition: 'Any piece of hardware used to enter data, commands, or signals into a computer.',
    simpleExample: 'Keyboard (typing words), Mouse (clicking options), Microphone (recording speech), Scanner (copying paper into files).'
  },
  {
    id: 'output-device',
    term: 'Output Device',
    category: 'Hardware',
    definition: 'Any piece of hardware used to display or present processed results from the computer to the user.',
    simpleExample: 'Monitor (showing pictures and text), Printer (putting ink on paper), Speakers (producing sound).'
  },
  {
    id: 'operating-system',
    term: 'Operating System (OS)',
    category: 'Software',
    definition: 'The master system software that manages computer hardware, memory, files, and runs user applications.',
    simpleExample: 'Microsoft Windows, macOS on Apple computers, Android on phones, and Linux.'
  },
  {
    id: 'file-extension',
    term: 'File Extension',
    category: 'Software',
    definition: 'The small letters following the dot at the end of a filename that tell the computer what type of file it is.',
    simpleExample: '.docx means Word document, .xlsx means Excel sheet, .mp3 means audio, .pdf means printable document.'
  },
  {
    id: 'word-processor',
    term: 'Word Processor',
    category: 'Office',
    definition: 'An application software used for typing, editing, formatting, and printing text documents.',
    simpleExample: 'Microsoft Word or Google Docs, used to write school essays, letters, tests, and resumes.'
  },
  {
    id: 'spreadsheet',
    term: 'Spreadsheet',
    category: 'Office',
    definition: 'An interactive grid of rows and columns used to organize numbers, calculate totals, and create charts.',
    simpleExample: 'Microsoft Excel, used by teachers to compute student exam grades and by shops to track sales.'
  },
  {
    id: 'presentation-software',
    term: 'Presentation Software',
    category: 'Office',
    definition: 'Software designed to create slideshows containing slides, text, pictures, diagrams, and speech notes.',
    simpleExample: 'Microsoft PowerPoint, used by teachers to deliver lessons and students to present class projects.'
  },
  {
    id: 'internet',
    term: 'Internet',
    category: 'Internet',
    definition: 'A global network of millions of interconnected computers and servers communicating using standard protocols.',
    simpleExample: 'The worldwide digital highway that lets a student in Kampala read a library book hosted in London.'
  },
  {
    id: 'browser',
    term: 'Web Browser',
    category: 'Internet',
    definition: 'A software application that allows users to access, navigate, view, and interact with websites on the World Wide Web.',
    simpleExample: 'Google Chrome, Mozilla Firefox, Microsoft Edge, and Apple Safari.'
  },
  {
    id: 'url',
    term: 'URL (Uniform Resource Locator)',
    category: 'Internet',
    definition: 'The exact web address used to find and open a specific website or webpage on the internet.',
    simpleExample: 'https://www.ictlearninghub.org is a web address that opens the learning homepage.'
  },
  {
    id: 'search-engine',
    term: 'Search Engine',
    category: 'Internet',
    definition: 'A web service that indexes billions of websites and helps you locate information by entering keywords.',
    simpleExample: 'Google Search, Bing, and DuckDuckGo.'
  },
  {
    id: 'email',
    term: 'Email (Electronic Mail)',
    category: 'Internet',
    definition: 'A digital communication system for sending and receiving text messages and file attachments across computer networks.',
    simpleExample: 'Sending a school admission letter to teacher@school.ac.ug instead of posting a physical envelope.'
  },
  {
    id: 'lan',
    term: 'LAN (Local Area Network)',
    category: 'Internet',
    definition: 'A network connecting computers and devices located in a small, localized physical area.',
    simpleExample: 'The school computer lab or a home Wi-Fi network where computers share one printer.'
  },
  {
    id: 'wifi',
    term: 'Wi-Fi (Wireless Fidelity)',
    category: 'Internet',
    definition: 'A technology that uses radio waves to connect computers, tablets, and phones to a local network and the internet without wires.',
    simpleExample: 'Connecting your laptop to the school library wireless router.'
  },
  {
    id: 'cybersecurity',
    term: 'Cybersecurity',
    category: 'Security',
    definition: 'The practice of protecting computers, smartphones, networks, programs, and private data from digital attacks or theft.',
    simpleExample: 'Using strong passwords, locking your screen, and not opening links from strangers.'
  },
  {
    id: 'phishing',
    term: 'Phishing',
    category: 'Security',
    definition: 'A deceptive social engineering scam where criminals pose as trusted companies or schools to steal passwords or banking data.',
    simpleExample: 'A fake email claiming "You won 10 million shillings! Click here and type your password to claim."'
  },
  {
    id: 'malware',
    term: 'Malware (Malicious Software)',
    category: 'Security',
    definition: 'Any software intentionally designed to cause damage to a computer, server, client, or computer network.',
    simpleExample: 'Viruses, worms, spyware, and ransomware.'
  },
  {
    id: 'firewall',
    term: 'Firewall',
    category: 'Security',
    definition: 'A security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules.',
    simpleExample: 'Like a security guard at the school gate deciding who is permitted to enter and who must stay out.'
  },
  {
    id: 'digital-citizenship',
    term: 'Digital Citizenship',
    category: 'Security',
    definition: 'The norms of appropriate, responsible, ethical, and safe technology use by humans.',
    simpleExample: 'Being polite in online chats, respecting copyright, avoiding cyberbullying, and keeping personal data private.'
  },
  {
    id: 'motherboard',
    term: 'Motherboard',
    category: 'Hardware',
    definition: 'The main printed circuit board in a computer that connects the CPU, memory, hard drives, and all peripherals together.',
    simpleExample: 'The central highway foundation of the computer tower.'
  },
  {
    id: 'cloud-computing',
    term: 'Cloud Computing',
    category: 'Internet',
    definition: 'The delivery of computing services—including servers, storage, databases, networking, and software—over the internet.',
    simpleExample: 'Saving photos to Google Drive or OneDrive so you can view them from any phone or computer.'
  },
  {
    id: 'backup',
    term: 'Data Backup',
    category: 'Basics',
    definition: 'The process of making duplicate copies of important files and storing them in a safe second location.',
    simpleExample: 'Copying your end-of-term school project onto a USB flash drive or cloud storage in case your laptop breaks.'
  }
];
