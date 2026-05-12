export const caseStudiesData = {
  fiteats: {
    title: 'FitEats',
    subtitle: 'Fitness Food Delivery App',
    heroImage: '/images/fiteats.png',
    overview: 'FitEats is a mobile food delivery app that helps fitness-focused users quickly discover, customize, and order healthy meals that match their dietary goals—such as keto, high-protein, or low-carb diets. The app also shows macronutrient details, prep time, and calorie info so users can make smart decisions on the go.',
    role: 'UI/UX Designer',
    duration: '1 month',
    problem: 'Most food delivery apps prioritize variety and convenience but do not offer quick access to truly healthy, goal-based meals. Fitness-focused users often struggle to filter out unhealthy choices, check nutritional value, or reorder clean meals with ease.',
    targetAudience: 'Health-conscious individuals in the age group of 25-40 years old with a busy lifestyle—such as gym-goers, working professionals, and fitness enthusiasts—who want to eat clean but don’t have time to cook or shop. They value high-protein, low-carb, and diet-specific options.',
    goals: [
      'Help users find healthy meals faster with smart filters & personalization',
      'Improve order retention by offering meal plans and reorders',
      'Create a clean, intuitive, and mobile-first UI for easy food selection',
      'Enable users to filter meals by macros, diets, and prep time'
    ],
    designProcess: ['Empathize', 'Define', 'Ideate', 'Prototype', 'Test'],
    research: {
      methodology: 'Conducted offline surveys with 10 participants and brief user interviews to understand food ordering habits, health preferences, and expectations. Analyzed competitors like Zomato, Swiggy, and EatClub to identify gaps such as lack of structured meal plans and clear nutritional information.',
      insights: [
        'Users struggle with too many unhealthy options (80% biggest frustration)',
        'Lack of clear nutritional information like calories/protein causes confusion (90% want caloric/macro info)',
        'Time-consuming ordering process for busy professionals',
        'Strong desire for weekly subscription plans tailored to diet/fitness goals (80% want weekly subscription)',
        'Most users want customizable meals (60%) over readymade meals (30%)'
      ],
      painPoints: [
        'Too many unhealthy options making it hard to find clean meals quickly.',
        'Time-consuming ordering process every day.',
        'No weekly meal subscription options.',
        'Lack of clear nutritional information (calories, macros, ingredients).',
        'Limited personalization for diet/fitness goals.'
      ]
    },
    personas: [
      {
        name: 'Ayesha Singh',
        age: '28 Years old',
        occupation: 'Marketing Manager',
        location: 'Pune',
        image: '/Fiteats/Frame 1261154416.png',
        description: 'Ayesha leads a busy lifestyle and follows a disciplined fitness routine (gym 5x a week). Her hectic schedule leaves her little time to cook, but she wants to eat clean and maintain her fitness goals.',
        goals: ['Maintain a balanced and nutritious diet', 'Find ready-to-eat healthy meals', 'Save time on cooking/planning'],
        frustrations: ['Too many unhealthy options on food apps', 'Nutrition info missing', 'Time-consuming daily planning']
      },
      {
        name: 'Rohan Mehta',
        age: '32 Years old',
        occupation: 'Sr Software Developer',
        location: 'Pune',
        image: '/Fiteats/Frame 1261154417.png',
        description: 'Rohan has a sedentary job but recently committed to fitness. He wants to track macros and eat clean, preferring simplicity and repeat convenience over browsing.',
        goals: ['Lose weight and build lean muscle', 'Find high-protein, low-carb meals easily', 'Avoid the hassle of deciding every day'],
        frustrations: ['Overwhelmed by choices', 'No fitness-tailored personalization', 'Decision fatigue from daily ordering']
      }
    ],
    empathyMaps: [{
      avatar: '/Fiteats/female-avatar.png',
      says: [
        '"I wish I could get healthy food without spending 20 minutes scrolling." Uses food delivery apps during lunch breaks',
        '"Calories and protein info should be clearly mentioned."',
        '"I\'m too busy to plan meals every day."'
      ],
      thinks: [
        'I want to eat healthy but I can\'t waste time browsing through junk.',
        'A weekly meal plan would save me so much time and effort'
      ],
      does: [
        'Goes to the gym 5x a week, follows intermittent fasting',
        '"I\'m too busy to plan meals every day."',
        'Skips cooking on weekdays, orders mostly from apps'
      ],
      feels: [
        'Feels guilty when she ends up ordering unhealthy food',
        'Feels motivated to maintain her fitness and diet, but overwhelmed by choices'
      ]
    }, {
      avatar: '/Fiteats/male-avatar.png',
      says: [
        '"I wish I could get healthy food without spending 20 minutes scrolling." Uses food delivery apps during lunch breaks',
        '"Calories and protein info should be clearly mentioned."',
        '"I\'m too busy to plan meals every day."'
      ],
      thinks: [
        'I want to eat healthy but I can\'t waste time browsing through junk.',
        'A weekly meal plan would save me so much time and effort'
      ],
      does: [
        'Goes to the gym 5x a week, follows intermittent fasting',
        '"I\'m too busy to plan meals every day."',
        'Skips cooking on weekdays, orders mostly from apps'
      ],
      feels: [
        'Feels guilty when he ends up ordering unhealthy food',
        'Feels motivated to maintain his fitness and diet, but overwhelmed by choices'
      ]
    }],
    journeyMap: [
      { step: 'Decide what to eat', feelings: 'Hopeful', painPoints: 'No time for cooking, unsure where to find clean meals' },
      { step: 'Search apps', feelings: 'Overwhelmed', painPoints: 'Unclear labels, no consistent nutrition info' },
      { step: 'Compare items', feelings: 'Frustrated', painPoints: 'Time-consuming, lacks confidence in choices' },
      { step: 'Eat & Track', feelings: 'Neutral/Tired', painPoints: 'No meal tracking, can\'t assess diet progress' }
    ],
    journeyMapImage: '/Fiteats/Frame 1261154701.png',
    competitiveAnalysis: 'Analyzed Zomato, Swiggy, and EatClub. Key gaps identified: lack of structured meal plans, missing clear nutritional/ingredient information, and lack of healthy food filters/personalization.',
    competitiveAnalysisImage: '/Fiteats/Frame 1261154412.png',
    features: [
      'Personalized Diet Recommendations',
      'Macro & Calorie Filters (Keto, Vegan, High-Protein)',
      'Weekly Meal Subscriptions',
      'Easy Re-ordering',
      'Detailed Nutritional & Ingredient Information'
    ],
    testing: 'Ran usability testing and found some minor UI corrections which were implemented based on feedback (e.g., increasing the size of the checkbox while saving card details for better touch targets).',
    learnings: 'Through this project, I learned that personalization plays a key role in improving user engagement, as people connect more with experiences tailored to their health goals and food preferences. Convenience emerged as another important factor, especially for working professionals, where features like weekly subscriptions and quick re-ordering save valuable time. I also realized how much clear and simple design impacts usability — even small improvements, like resizing a checkbox or ensuring proper contrast, can reduce friction. Highlighting healthy options such as high-protein, vegan, or keto meals made decision-making easier for users, while secure payments and reliable delivery proved essential in building trust. \n However, there are still a lot of inputs & features that could be added with proper testing and identifying the problem with the help of  large real-time user data.',
    thankYouImage: '/Fiteats/frame11.jpg',
    visuals: {
      colors: ['#F0236A', '#000000', '#686868', '#D9D9D9', '#FFFFFF'],
      typography: 'Poppins (Regular, Medium, Semibold)'
    },
    colorPaletteImage: '/Fiteats/frame10.jpg',
    imageGroups: [
      {
        title: 'Mobile Application Screens',
        description: 'Core screens designed for the FitEats mobile app experience.',
        images: [
          '/Fiteats/frame1.jpg',
          '/Fiteats/frame2.jpg',
          '/Fiteats/frame3.jpg',
          '/Fiteats/frame4.jpg',
          '/Fiteats/frame5.jpg',
          '/Fiteats/frame6.jpg',
          '/Fiteats/frame7.jpg'
        ]
      },
      {
        title: 'Light & Dark Mode',
        description: 'The app supports both light and dark themes for user comfort.',
        images: [
          '/Fiteats/frame9.png',
          '/Fiteats/frame8.png'
        ]
      },

      {
        title: 'Usability Testing',
        description: 'Evaluating a digital product by testing it with real users to uncover design flaws and measure how easily they can complete tasks',
        images: [
          '/Fiteats/frame12.jpg'
        ]
      },
    ]
  },
  retirewell: {
    title: 'Retirewell',
    subtitle: 'Retirement Calculator Web App',
    heroImage: '/retirewell/Mockup_03.png',
    overview: 'Retirewell is a web app designed to simplify retirement planning for young professionals and middle-aged individuals in India. It uses interactive calculators, sliders, and visual charts to help users estimate their future savings and expenses with ease. By offering clear insights and personalized recommendations, the app makes financial planning approachable for people without a finance background.',
    role: 'UI/UX Designer',
    duration: '1 Month',
    problem: 'Most people in India, especially young professionals and middle-aged individuals, find retirement planning confusing and overwhelming. Existing retirement calculators and financial apps are either too technical, filled with complex financial terms, or lack personalized insights. As a result, users struggle to estimate how much they need to save, what plans to choose, and how to secure their financial future in a simple, guided way.',
    targetAudience: 'Working professionals in India between the ages of 25 and 50 who want to secure their financial future but often find retirement planning confusing.',
    goals: [
      'Simplify retirement calculations',
      'Provide personalized insights',
      'Encourage early planning',
      'Build trust and confidence',
      'Deliver a smooth user experience'
    ],
    designProcess: ['Empathize', 'Define', 'Ideate', 'Design', 'Test'],
    research: {
      methodology: 'Qualitative research approach combining secondary research and user surveys/interviews (10 working professionals aged 25-50 surveyed, 5 interviews). Reviewed existing apps like PensionBox and Tata Moneyfy.',
      insights: [
        'Most users don\'t clearly understand how much they need to save.',
        'Users struggle with "how much to save" and get confused by financial jargon.',
        '50% prefer graphs and charts over text-heavy explanations.',
        'High willingness to adopt if the app makes it simple and guided (40% very likely, 30% somewhat likely).'
      ],
      painPoints: [
        'Confusing financial jargon (ROI, annuity, corpus).',
        'Lack of clear, step-by-step answers on how much to save.',
        'Generic results not personalized to age, lifestyle, or income.',
        'Overwhelming interfaces with too much data.',
        'Low trust factor (fear of biased product pushing).',
        'Limited guidance for beginners.'
      ],
      image: '/retirewell/researchSurvey.png'
    },
    personas: [
      {
        name: 'Rakesh Mishra',
        age: '28 Years old',
        occupation: 'Marketing Executive',
        location: 'Pune',
        image: '/retirewell/user-persona2.png',
        description: 'Rakesh just started earning well and wants to save smartly while enjoying life. Tech-savvy but lacks long-term financial knowledge.',
        goals: ['Save systematically', 'Understand investment needed for early retirement', 'Use simple tech-based solutions'],
        frustrations: ['Finance apps filled with jargon', 'Doesn\'t know how much is "enough"', 'Product-push apps confuse him']
      },
      {
        name: 'Neha Patel',
        age: '40 Years old',
        occupation: 'Senior Professor',
        location: 'Pune',
        image: '/retirewell/user-persona1.png',
        description: 'Neha is financially aware but busy. Has scattered investments and lacks a consolidated view of her retirement savings.',
        goals: ['Track all investments in one place', 'Get clear visual projections', 'Receive trustworthy, unbiased guidance'],
        frustrations: ['Using multiple apps to check investments', 'No "what-if" scenarios', 'Apps sell products instead of giving clarity']
      }
    ],
    empathyMapImages: [
      '/retirewell/empthy-map.png',
      '/retirewell/empthy-map2.png'
    ],
    journeyMap: [
      { step: 'Onboarding & Sign up', feelings: 'Curious but anxious', painPoints: 'Long forms, jargon-heavy inputs' },
      { step: 'Sets age & expenses', feelings: 'Confused by finance terms', painPoints: 'No explanation of ROI, Corpus, Inflation' },
      { step: 'Views charts/projections', feelings: 'Interested but uncertain', painPoints: 'Charts look technical, hard to relate' },
      { step: 'Explores scenarios', feelings: 'Overwhelmed by choices', painPoints: 'Too many options, no personalization' }
    ],
    journeyMapImage: '/retirewell/user-journy-map.png',
    competitiveAnalysis: 'Analyzed PensionBox, Tata Moneyfy, and Groww. Gaps found: lack of step-by-step guided planning, personalized lifestyle inputs, and jargon-free explanations.',
    competitiveAnalysisImage: '/retirewell/cometetive-enalysis.png',
    features: [
      'Interactive Goal-Based & Contribution-Based Calculators',
      'Visual Growth Breakdown Charts',
      '"What If" Scenario Comparisons',
      'Risk Assessment Questionnaire',
      'Personalized Plan Generation (Conservative, Balanced, Aggressive)',
      'Glossary for Jargon-free understanding',
      'Progress Tracking against Goals'
    ],
    testing: 'Usability study revealed non-finance users struggled with terms like ROI, Corpus, and Inflation rate. Added a glossary section based on this feedback to enhance UX.',
    userFlowImage: '/retirewell/userflow.png',
    learnings: 'Working on this project taught me the importance of designing for clarity, trust, and empathy—especially in domains like finance where users often feel overwhelmed. I realized that good design isn’t just about creating attractive interfaces, but about simplifying complexity and giving users the confidence to make informed decisions. This project also helped me refine my process of combining user research, competitor analysis, and iterative design to build solutions that are both practical and user-friendly. Most importantly, I learned how crucial it is to keep the user’s emotions and mindset at the center of every design decision.',
    visuals: {
      colors: ['#0074D9', '#1ABC9C', '#f5f5f5', '#000000', '#FFFFFF'],
      typography: 'Nunito (Regular, Medium, Semibold)'
    },
    colorPaletteImage: '/retirewell/color-palatte.png',
    imageGroups: [
      {
        title: 'Onboarding Experience',
        description: 'Guided screens helping users set up their profile and preferences.',
        images: [
          '/retirewell/onboarding-screen1.png',
          '/retirewell/onboarding-screen-2.png',
          '/retirewell/onboarding-screen-3.png'
        ]
      },
      {
        title: 'Authentication',
        description: 'Login and Sign-up flow for secure access.',
        images: [
          '/retirewell/screen-1.png',
          '/retirewell/screen-2.png'
        ]
      },
      {
        title: 'Web Application Screens',
        description: 'Core screens designed for the Retirewell web application including dashboards, calculators, and plans.',
        images: [
          '/retirewell/screen1.png',
          '/retirewell/screen2.png',
          '/retirewell/screen3.png',
          '/retirewell/screen8.png',
          '/retirewell/screen9.png',
          '/retirewell/screen10.png',
          '/retirewell/screen11.png',
          '/retirewell/screen12.png',
          '/retirewell/screen13.png',
          '/retirewell/screen14.png',
          '/retirewell/screen15.png',
          '/retirewell/screen16.png',
          '/retirewell/screen17.png',
          '/retirewell/screen18.png',
          '/retirewell/screen19.png',
          '/retirewell/screen20.png'
        ]
      },
      {
        title: ' Dark Mode',
        description: 'The app supports both light and dark themes for user comfort.',
        images: [
          '/retirewell/dark.jpg'
        ]
      },
      {
        title: 'Usability Testing',
        description: 'Evaluating a digital product by testing it with real users to uncover design flaws and measure how easily they can complete tasks',
        images: [
          '/retirewell/usability testing.jpg'
        ]
      },
    ]
  },
  talenlio: {
    title: 'Talenlio Career Roadmap',
    subtitle: 'Career Planning & Tracking Feature',
    heroImage: '/talenlio/Mockup_02.jpg',
    overview: 'The Career Roadmap feature is designed to help users discover, plan, and track their professional journey across various career paths such as UX Design, Data Science, Product Management, and Marketing. The goal was to create an interactive and data-backed experience that guides users through every stage of their career - from beginner to expert.',
    role: 'Product Designer',
    duration: 'Not specified',
    problem: 'Many learners and early professionals struggle to plan their career growth effectively. They often feel unsure about where to start, which skills to prioritize, and how to stay consistent while learning. Existing platforms fail to present the journey clearly, leaving users without a sense of direction or measurable progress.',
    targetAudience: 'Learners and early professionals seeking structured guidance and career advancement.',
    goals: [
      'Provide clear insights on essential skills, tools, and courses',
      'Show salary ranges, job demand, and growth potential',
      'Integrate self-assessments for personalized recommendations',
      'Make career planning structured, motivating, and user-friendly via progress tracking and badges'
    ],
    designProcess: ['Research', 'Wireframes', 'Hi-fi Designs', 'User Flow'],
    research: {
      methodology: 'Primary research via short user interviews with learners. Secondary research analyzing LinkedIn Learning, Coursera, Udemy, Glassdoor, and Naukri to identify career paths, skills, salaries, and demand.',
      insights: [
        'Users feel unsure where to start and what skills to prioritize.',
        'Users struggle to stay consistent with learning.',
        'Popular career paths follow a structured Beginner -> Expert journey, but platforms don\'t visualize this well.'
      ],
      painPoints: [
        'Lack of structured guidance in existing platforms.',
        'No measurable progress tracking.',
        'Loss of motivation during long learning paths.'
      ]
    },
    features: [
      'Career Dashboard with multiple paths (UX Design, Dev, Marketing, Data Science)',
      '4-Stage Roadmap (Beginner, Intermediate, Advanced, Expert)',
      'Stage details: Duration, Skills, Tools, Recommended Courses',
      'Career Overview metrics: Salary (India & Global), Job Growth',
      'Gamification: Progress tracking, Badges, Motivational messaging',
      'Skill Assessments to validate learning and provide next-step recommendations',
      'Save for Later functionality for courses'
    ],
    learnings: 'The Career Roadmap feature was designed with a clear focus on guiding users through a structured, motivational learning journey. The UX logic emphasizes simplicity, clarity, and engagement. Starting from the Career Dashboard, users can easily explore various paths and select one that matches their interest - for example, UI/UX Design. \n Once inside the chosen career, the roadmap is broken into four progressive stages (Beginner → Expert), allowing learners to visualize their growth path. Each stage highlights duration, key skills, tools, and recommended external courses, giving users both direction and flexibility. The inclusion of “Mark as Completed” and a progress bar supports a sense of accomplishment and progress tracking. \n The interface follows a minimal and clean visual design, using a calm, modern color palette with accent highlights to maintain focus and consistency. Motivational micro-interactions such as badges, encouraging messages (“You’re doing amazing — keep the momentum going!”) and stage completion highlights were added to increase user engagement and retention. \nAfter completing all stages, users are guided to a final assessment , reinforcing readiness and offering next-step clarity. The “Save for Later” option ensures flexibility — allowing users to revisit postponed courses directly within the same roadmap without breaking their learning continuity. \n The combination of simple UI, visual hierarchy, and motivational elements ensures that learning feels intuitive, achievable, and rewarding throughout the user’s journey.',
    visuals: {
      colors: [],
      typography: 'Modern Sans Serif'
    },
    imageGroups: [
      {
        title: 'Low Fidelity Wireframes',
        description: 'Supporting flow screens and empty states.',
        images: [
          '/talenlio/Desktop - 1.png',
          '/talenlio/Desktop - 2.png',
          '/talenlio/Desktop - 3.png',
          '/talenlio/Desktop - 4.png',
          '/talenlio/Desktop - 5.png',
        ]
      },
      {
        title: 'High Fidelity Wireframes',
        description: 'Core screens guiding the user from onboarding to their personalized career dashboard.',
        images: [
          '/talenlio/Desktop - 37.png',
          '/talenlio/Desktop - 38.png',
          '/talenlio/Desktop - 39.png',
        ]
      },
      {
        title: 'Roadmap & Progress',
        description: 'Detailed stage-by-stage learning paths and progress tracking.',
        images: [
          '/talenlio/Desktop - 40.png',
          '/talenlio/Desktop - 41.png',
          '/talenlio/Desktop - 42.png',
        ]
      },
      {
        title: 'Assessments & Recommendations',
        description: 'Skill assessments leading to tailored course recommendations.',
        images: [
          '/talenlio/Desktop - 48.png',
          '/talenlio/Desktop - 49.png',
          '/talenlio/Desktop - 50.png',
        ]
      }
    ]
  },
  eployrs: {
    title: 'Eployrs',
    subtitle: 'AI Hiring, Redesigned',
    heroImage: '/eployrs/candidate/Home Page.jpg',
    overview: 'Eployrs is an AI-powered workforce management and recruitment platform built to simplify hiring, boost team productivity, and optimize the entire employee lifecycle. Designed for modern teams, it connects job seekers with employers intelligently, cutting time-to-hire while improving candidate quality through smart AI matching.',
    role: 'UI/UX Designer',
    duration: '4 Months',
    problem: 'Existing job platforms are slow, generic, and lack AI-driven personalization — frustrating both recruiters and job seekers.',
    targetAudience: 'HR managers, recruiters, and job seekers in India\'s growing digital economy — aged 22–45, tech-comfortable.',
    goals: [
      'Smart resume ranking and candidate scoring to surface relevant profiles instantly',
      'Eliminate back-and-forth with automated interview scheduling and calendar integration',
      'Provide dashboards for team productivity and recruitment funnel analytics',
      'Seamlessly integrate into existing HR tools and communication stacks'
    ],
    designProcess: ['Empathise', 'Define', 'Ideate', 'Design', 'Test'],
    research: {
      methodology: 'Conducted surveys and informal user interviews with 12 participants — a mix of HR professionals and active job seekers across Jaipur, Pune, and Bangalore.',
      insights: [
        '78% found current job platforms too slow or generic.',
        '85% of recruiters want automated candidate ranking.',
        '72% of job seekers don\'t get relevant job recommendations.',
        '90% want integrated interview scheduling in the same platform.'
      ],
      painPoints: [
        'Manual, time-consuming screening. Relevant candidates get buried without AI ranking.',
        'Back-and-forth scheduling chaos relying on email threads and calls.',
        'No personalised job discovery. Job seekers are shown generic listings.',
        'Zero visibility into the hiring funnel. Recruiters lack real-time data.'
      ]
    },
    researchStats: [
      { label: 'AI-powered resume matching', percent: 85 },
      { label: 'Automated interview scheduling', percent: 90 },
      { label: 'Personalised job recommendations', percent: 80 },
      { label: 'One-click application tracking', percent: 75 },
      { label: 'Analytics & hiring dashboards', percent: 70 }
    ],
    personas: [
      {
        name: 'Priya Rathore',
        age: '34 Years',
        occupation: 'HR Manager',
        location: 'Jaipur',
        description: 'Priya works at a fast-growing SaaS startup. She needs to hire 10+ quality candidates per quarter and build a repeatable recruitment process.',
        goals: ['Hire 10+ quality candidates per quarter', 'Reduce time-to-hire below 3 weeks', 'Build a repeatable, data-driven recruitment process'],
        frustrations: ['Drowns in CVs with no intelligent filtering', 'Scheduling interviews eats up 30% of her week', 'No visibility on where candidates are in the pipeline']
      },
      {
        name: 'Arjun Mehra',
        age: '26 Years',
        occupation: 'Software Developer',
        location: 'Bangalore',
        description: 'Arjun is an active job seeker aiming to land a senior developer role. He wants his tech stack to be accurately matched to job opportunities.',
        goals: ['Land a senior developer role at a product company', 'Find jobs matched to his actual tech stack', 'Track all his applications in one place'],
        frustrations: ['Job boards recommend roles that don\'t match his skills', 'No feedback after applying — applications disappear', 'Has to upload his CV to every platform separately']
      }
    ],
    empathyMap: {
      avatar: '/eployrs/eployrs-avatar.png',
      says: [
        '"I need to hire fast but I can\'t compromise on quality."',
        '"Why does everything still require so many manual steps?"'
      ],
      thinks: [
        'Worries she might be passing on great candidates lost in the CV pile.',
        'Believes AI can genuinely improve hiring if it\'s easy to trust and use.'
      ],
      does: [
        'Manually scrolls through 50+ profiles every morning.',
        'Coordinates interviews via WhatsApp, email, and phone calls.',
        'Maintains a spreadsheet to track candidates and stages.'
      ],
      feels: [
        'Overwhelmed by repetitive tasks that feel like they should be automated.',
        'Pressured by hiring deadlines from management.',
        'Hopeful that smarter tools could free her to focus on culture fit and team building.'
      ]
    },
    competitiveAnalysis: 'Analysed leading recruitment platforms like Naukri.com, LinkedIn, and Internshala. Identified critical gaps in advanced AI resume matching, automated scheduling, and hiring analytics dashboards, which Eployrs uniquely addresses.',
    competitiveAnalysisImage: '/eployrs/competative.png',
    designSystemImage: '/eployrs/typography.jpg',
    features: [
      'AI Resume Matching and Candidate Fit Score',
      'Automated Interview Scheduling',
      'Hiring Analytics Dashboard',
      'HR Tool Integration',
      'Unified Application Tracker for Job Seekers',
      'Creative AI-first Role Discovery'
    ],
    testing: 'Usability testing revealed users were skeptical of the raw "87% match" score. Added a match breakdown tooltip (skills, experience, location) to build trust. Moved the "Schedule Interview" CTA to a sticky bottom bar on candidate profiles to increase visibility and task completion.',
    userFlowDescription: 'Mapped core flows for both user types. Recruiter Flow: Sign up → Post job with AI assist → Review AI-ranked candidates → One-click schedule interview → View analytics. Job Seeker Flow: Build smart profile → Get AI recommendations → View fit score & apply → Track application status.',
    learnings: 'Designing a dual-sided platform required separate mental models. Key takeaways: AI needs transparency to earn trust. Visibility reduces job-seeker anxiety. Automation must feel controllable for recruiters. Small UI details like sticky CTAs matter enormously.',
    visuals: {
      colors: ['#1A56FF', '#0A0A0A', '#EEF1FF', '#0ABF6F', '#7A7A7A', '#FFFFFF'],
      typography: 'Syne (Headings), DM Sans (Body/UI)'
    },
    imageGroups: [
      {
        title: 'Job Seeker Experience',
        description: 'Candidate flows, showing smart profile building, AI job recommendations, and centralized application tracking.',
        images: [
          '/eployrs/candidate/Home Page.jpg',
          '/eployrs/candidate/Log In Page Candidate.jpg',
          '/eployrs/candidate/Jobseeker Dashboard.jpg',
          '/eployrs/candidate/Explore Jobs.jpg',
          '/eployrs/candidate/Application Tracker.jpg',
          '/eployrs/candidate/Interview Scheduled.jpg',
          '/eployrs/candidate/My Profile.jpg',
          '/eployrs/candidate/Settings.jpg'
        ]
      },
      {
        title: 'Recruiter Experience',
        description: 'Tools for employers including AI-assisted job posts, resume match ranking, and comprehensive hiring pipelines.',
        images: [
          '/eployrs/recruiter/Sign Up Precruiter 1.jpg',
          '/eployrs/recruiter/Dashboard Recruiter.jpg',
          '/eployrs/recruiter/Job Description Talent Outreach.jpg',
          '/eployrs/recruiter/User [Profile].jpg',
          '/eployrs/recruiter/Hiring Pipeline.png',
          '/eployrs/recruiter/Interview Scheduled.jpg',
          '/eployrs/recruiter/Admin Management.jpg',
          '/eployrs/recruiter/Settings.jpg'
        ]
      }
    ],
    liveLink: 'https://eployrs.com'
  },
  lamaedge: {
    title: 'LamaEdge',
    subtitle: 'Landing Page Design',
    heroImage: '/lamaEdge/LamaEdge.jpg',
    overview: 'Lama Edge is a strategic business platform where companies of all stages connect, collaborate, and grow through integrated media, networking, and branding solutions.',
    role: 'UI/UX Designer',
    duration: '15 Days',
    problem: 'Creating a landing page that effectively communicates the value of a strategic business platform while maintaining a high conversion rate and building trust.',
    targetAudience: 'Companies of all stages seeking networking, branding, and growth solutions.',
    goals: [
      'Design a high-conversion layout',
      'Incorporate compelling data visualization',
      'Build trust and credibility for the platform'
    ],
    designProcess: ['Wireframing', 'Visual Design'],
    userFlow: false,
    liveLink: 'https://lamaedge.com'
  }
};
