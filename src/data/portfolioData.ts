import { Project, SkillCategory, EducationItem, LeadershipItem, ScholarshipItem, CertificateItem } from '../types';

export const personalInfo = {
  name: "Soth Vannak RothChansokhomal",
  shortName: "SothSokhomal",
  title: "Software Developer Intern",
  subtitle: "React | JavaScript | Node.js",
  location: "Phnom Penh, Cambodia",
  phone: "085 257 728",
  email: "soth.vannakrothchansokhomal@gmail.com",
  github: "https://github.com/SothSokhomal",
  portfolio: "https://sothsokhomal.github.io/SothSokhomal_portfolio/",
  linkedin: "https://www.linkedin.com/in/sothvannakrothchansokhomal/",
  instagram: "https://www.instagram.com/soth.vannakrothchansokhomal/",
  facebook: "https://www.facebook.com/rose.555901",
  bio: "Motivated Software Engineering student with hands-on experience developing web applications using JavaScript, React, Node.js, and REST APIs. Passionate about building practical software solutions, learning new technologies, and collaborating in team environments. A fast learner with strong problem-solving skills seeking to grow as a Software Developer Intern and contribute to impactful technology projects."
};

export const skillsData: SkillCategory[] = [
  {
    category: "Web Development",
    items: ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Web Design", "Bootstrap"],
    iconName: "Globe"
  },
  
  {
    category: "Frontend",
    items: ["React.js", "Tailwind CSS", "Bootstrap", "Component Architecture"],
    iconName: "Layout"
  },
  {
    category: "APIs & Backend",
    items: ["Node.js", "Express.js", "REST API Basics"],
    iconName: "Server"
  },
  {
    category: "Databases",
    items: ["MySQL", "PostgreSQL"],
    iconName: "Database"
  },
  {
    category: "Languages",
    items: ["JavaScript", "Python", "C/C++", "Java"],
    iconName: "Code"
  },
  {
    category: "Development Tools",
    items: ["Git", "GitHub", "Postman", "Trello"],
    iconName: "Cpu"
  },
  {
    category: "Design Tools",
    items: ["Figma", "Canva"],
    iconName: "Palette"
  },
  {
    category: "Python Libraries",
    items: ["Pygame", "Turtle", "OpenCV"],
    iconName: "Layers"
  },
  {
    category: "Soft Skills",
    items: ["Teamwork & Contribution", "Creative Problem Solving", "Public Speaking", "Cross-cultural Communication"],
    iconName: "Users"
  }
];

export const projectsData: Project[] = [
  {
    id: 1,
    title: "AI-Powered Weather Chatbot",
    category: "AI & Full-Stack",
    technologies: ["React.js", "Node.js", "Dialogflow", "OpenWeatherMap API"],
    description: "An intelligent chatbot that answers weather-related questions using natural language processing (NLP). Features real-time weather retrieval with fluid conversational turns.",
    problem: "Traditional weather apps require multiple taps and offer stale configurations, lacking an engaging conversational format.",
    features: ["Natural Language Processing (NLP) conversation interface", "Real-time weather query parsing via API", "Responsive messaging UI on React"],
    contribution: "Designed and developed the entire React frontend and integrated Node.js backend logic to securely route credentials to Dialogflow and OpenWeatherMap APIs.",
    challenges: "Handling conversational fallback loops when the model encountered highly abstract or multi-city requests.",
    lessons: "Deepened engineering expertise in async/await API communications, RESTful response handling, and custom messaging animations.",
    github: "https://github.com/SothSokhomal/Weather-Bot-App"
  },
  {
    id: 2,
    title: "Personal Portfolio Website",
    category: "Frontend Design",
    technologies: ["HTML", "CSS", "JavaScript", "React"],
    description: "A gorgeous, responsive portfolio representing Soth Vannak RothChansokhomal's professional development journey, academic achievements, and projects.",
    problem: "Employers need a centralized, premium digital hub that clearly communicates technical proficiencies and displays project histories in an instantly legible manner.",
    features: ["Sleek modern user interface with dark & light high-contrast layout options", "Responsive mobile-first grid", "Direct downloadable resume, clean contact controls"],
    contribution: "Crafted the layout structures, responsive grids, geometric backgrounds, and unified typing presentation.",
    challenges: "Achieving complex, fluid geometric curves and floating blobs that scale perfectly across mobile viewports without blocking interactions.",
    lessons: "Acquired a rigorous mental model of component boundaries, custom interactive hover state styles, and accessibility pairings.",
    github: "https://github.com/SothSokhomal/SothSokhomal_portfolio",
    live: "https://sothsokhomal.github.io/SothSokhomal_portfolio/"
  },
  {
    id: 3,
    title: "Expense Tracker Web Application",
    category: "Web App (CRUD)",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    description: "A fast, lightweight daily financial tracker. Enables users to maintain records, visualize spending, and manage transactions in real-time.",
    problem: "Standard financial logs are heavy, require persistent authentication, and contain cluttered visual components.",
    features: ["Add, Read, Update, and Delete transactions easily", "Dynamic table updating without full-page reloads", "Data input validation and total expense indicator"],
    contribution: "Built the entire front-end view, set up local memory state synchronization, and programmed the modal triggers.",
    challenges: "Enabling in-line updating where specific elements switch to input fields seamlessly and maintain formatting upon saving.",
    lessons: "Gained structural expertise in native DOM manipulations, JavaScript form object handlers, and event delegation patterns.",
    github: "https://github.com/SothSokhomal/expenseapp",
    live: "https://expenseapp-2usy127qy-sothsokhomals-projects.vercel.app/"
  },
  {
    id: 4,
    title: "Spotify UI Clone",
    category: "UI Cloning",
    technologies: ["HTML", "CSS", "JavaScript"],
    description: "A highly faithful, fully responsive front-end replication of the Spotify web player experience, prioritizing navigation structure and media cards.",
    problem: "Replicating complex multi-panel desktop layouts on standard browser windows while keeping grid ratios aesthetic.",
    features: ["Perfect dark-mode replication of modern sidebar, content, and player interfaces", "Hover interactions for playlist covers", "Responsive menu behavior"],
    contribution: "Sole designer and coder. Crafted custom layout scroll behaviors, typography settings, and player slider interactions.",
    challenges: "Managing overlapping fixed elements and setting appropriate overflow properties so specific containers scroll independently.",
    lessons: "Mastered deep CSS styling protocols including flex alignments, advanced CSS grids, custom scrollbars, and fluid scaling.",
    github: "https://github.com/SothSokhomal/song_soundie",
    live: "https://sothsokhomal.github.io/song_soundie/"
  },
  {
    id: 5,
    title: "Face Recognition Pipeline",
    category: "Computer Vision",
    technologies: ["Python", "OpenCV"],
    description: "An end-to-end computer vision program integrated with real-time webcams to detect individual faces, compute bounding coordinates, and verify identity labels.",
    problem: "Real-time video frame parsing is intensive and often causes performance stutters or delayed recognition loops.",
    features: ["Real-time webcam stream input processing", "Accurate bounding boxes on multiple faces", "Identified label tagging with instant name overlay"],
    contribution: "Programmed the camera collection pipeline, integrated the pre-trained cascade parameters, and managed training structures.",
    challenges: "Minimizing false positives under variable illumination and maintaining consistent 30 FPS playback rates on standard laptop hardware.",
    lessons: "Understood computer vision fundamentals: image matrices, grayscale transformations, classification thresholds, and real-time threading.",
    github: "https://github.com/SothSokhomal/Face_Recognition"
  },
  {
    id: 6,
    title: "Classic Snake Game",
    category: "Game Dev",
    technologies: ["Python", "Pygame"],
    description: "An elegant recreation of the retro arcade classic. Features intuitive directional inputs, scoring systems, and progressive velocity parameters.",
    problem: "Ensuring game-loop synchronization across different hardware speeds while tracking continuous coordinate loops.",
    features: ["Smooth control response mechanics", "Dynamic coordinate generation for randomized food spawns", "Continuous velocity multipliers to ramp difficulty"],
    contribution: "Designed game loop matrices, programmed cell collision logic, and implemented key press event listener handlers.",
    challenges: "Solving sudden edge-collision bugs where immediate double-taps on opposing directions triggered instant self-collision.",
    lessons: "Obtained a deep mathematical understanding of continuous game state rendering, input polling, bounding check loops, and visual layers.",
    github: "https://github.com/SothSokhomal/SnakeGame"
  }
];

export const educationData: EducationItem[] = [
  {
    school: "Cambodia University of Technology and Science (CamTech)",
    degree: "Bachelor’s Degree in Software Engineering (Double Major: Software Engineering & Business Information Systems)",
    period: "2024 – Present"
  },
  {
    school: "Australian Center for Education (ACE)",
    degree: "General English Program",
    period: "2016 – 2023"
  },
  {
    school: "Phsar Derm Ktov High School",
    degree: "High School Diploma (Graduated)",
    period: "Graduated: 2024"
  },

  {
    school: "Champion Coders Australia",
    degree: "Kid for code club",
    period: "Graduated: 2024"
  }
];

export const leadershipData: LeadershipItem[] = [
  {
    title: "Sisters of Code Ambassador",
    organization: "Sisters of Code",
    period: "2026",
    description: "Promoted technology education and encouraged youth, especially women, to participate in STEM and computer programming through workshops, leadership sessions, and outreach."
  },

  {
    title: "SEA Sponge City Innovation Challenge",
    organization: "Sponge City Challenge",
    period: "May - June 2025",
    description: "Led and contributed to a team project selected as a Top 5 Finalist nationally for developing sustainable urban flood solutions, focusing on technical feasibility and environmental sustainability."
  },
  {
    title: "TVET Volunteer – Registration Assistant",
    organization: "Technical and Vocational Education and Training (TVET)",
    period: "June 2025",
    description: "Supported event operations, coordinated registrations, and managed participant orientations for Technical and Vocational Education and Training initiatives."
  },
  {
    title: "E-Gen Innovation Program",
    organization: "Ministry of Education, Youth and Sport (MoEYS)",
    period: "December 2025 - February 2026",
    description: "Collaborated with a cross-functional team to conceptualize and develop an innovative project, securing First Runner-Up recognition (Top 5) in a national program host by MoEYS."
  },
  {
    title: "Cambodian Delegate - eMpowering Youths Across ASEAN Cohort 6",
    organization: "ASEAN Foundation",
    period: "May 2026 - Present",
    description: "Representing Cambodia in a hybrid ASEAN youth empowerment program, focusing on regional collaboration, leadership, and cross-cultural technology initiatives."
  },
  {
    title: "Prosob Festival Youth Volunteer",
    organization: "Prosob Festival",
    period: "December 2025 - April 2026",
    description: "Assisted in regional event organization, crowd dynamics coordination, and sustainable festival management operations."
  },
  {
    title: "Leadership Conference Competition",
    organization: "National Conference Group",
    period: "2025",
    description: "Participated and competed in problem-solving pitches centering community coordination and business innovation strategies."
  },
  {
    title: "CancerCo Video Competition",
    organization: "CancerCo Initiative",
    period: "October 2020",
    description: "Created and submitted a health advocacy video under the theme 'Breast Cancer' to spread community-level diagnostic awareness."
  }
];

export const scholarshipsData: ScholarshipItem[] = [
  { name: "75% Academic Scholarship", provider: "Cambodia University of Technology and Science (CamTech)" },
  { name: "100% Academic Scholarship", provider: "TUX Global Institute" },
  { name: "100% Academic Scholarship", provider: "Center of Science and Technology Advanced Development" },
  { name: "100% Academic Scholarship", provider: "Paññasastra University of Cambodia (AMT)" }
];

export const certificatesData: CertificateItem[] = [
  {
    name: "Scrum Master Certification – Agile Enterprise Coach",
    provider: "Agile Enterprise Coach, London",
    year: "Jun 2026",
    credentialId: "1006580",
    link: "https://www.linkedin.com/in/sothvannakrothchansokhomal/",
    file: new URL("../img/Soth Vannak Rothchansokhomal - Scrum Master Certification - Certificate.pdf", import.meta.url).href
  },
  { name: "UX/UI Design Short Course", provider: "Future.Bit Academy", year: "2025" },
  { name: "Introduction to Dynamic Web Development (HTML, CSS, JS)", provider: "Champion Coders", year: "2024" },
  { name: "Python Programming for Intermediates", provider: "Champion Coders", year: "2022" },
  { name: "Public Speaking Course", provider: "National Program", year: "2023" },
  { name: "General English Program (GEP)", provider: "Australian Center for Education (ACE)", year: "2016 - 2023" }
];

export const languagesData = [
  { language: "Khmer", proficiency: "Native" },
  { language: "English", proficiency: "Fluent" }
];
