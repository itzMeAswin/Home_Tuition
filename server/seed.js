const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');
const Tutor = require('./models/Tutor');
const Course = require('./models/Course');
const Booking = require('./models/Booking');
const Inquiry = require('./models/Inquiry');
const Quiz = require('./models/Quiz');
const DailyChallenge = require('./models/DailyChallenge');
const LessonPlan = require('./models/LessonPlan');
const TrainingModule = require('./models/TrainingModule');
const DigitalGuide = require('./models/DigitalGuide');
const Testimonial = require('./models/Testimonial');
const Assignment = require('./models/Assignment');

const seedData = async () => {
  try {
    console.log('[SEED] Clearing old collections...');
    await Promise.all([
      User.deleteMany({}),
      Tutor.deleteMany({}),
      Course.deleteMany({}),
      Booking.deleteMany({}),
      Inquiry.deleteMany({}),
      Quiz.deleteMany({}),
      DailyChallenge.deleteMany({}),
      LessonPlan.deleteMany({}),
      TrainingModule.deleteMany({}),
      DigitalGuide.deleteMany({}),
      Testimonial.deleteMany({}),
      Assignment.deleteMany({})
    ]);

    console.log('[SEED] Creating Users...');
    // Demo accounts
    const adminUser = await User.create({
      name: 'Academic Administrator',
      email: 'admin@tutioncenter.com',
      password: 'admin123',
      role: 'admin',
      phone: '+91 9345793979',
      avatar: ''
    });

    const tutorUser = await User.create({
      name: 'Mrs. Sandhya Subbaraman',
      email: 'sandhya@aksharasacademy.com',
      password: 'tutor123',
      role: 'tutor',
      phone: '+91 9345793979',
      avatar: '',
      qualification: 'M.Com, M.Phil, MBA, SET Qualified',
      bio: 'Visionary Founder of Aksharas Academy, Trichy. 15+ years of pedagogical excellence in Commerce, Accountancy, Economics & Business Studies.',
      subjects: ['Accountancy', 'Economics', 'Business Studies', 'Management Studies']
    });

    const studentUser = await User.create({
      name: 'Aarav Sharma',
      displayName: 'Aarav (Commerce Star)',
      email: 'student@tutioncenter.com',
      password: 'student123',
      role: 'student',
      grade: 'Class 12',
      curriculum: 'CBSE',
      phone: '+91 9876543210',
      points: 480,
      streak: 5,
      lastStreakDate: new Date().toISOString().split('T')[0],
      avatar: '',
      badges: [
        { id: 'first_step', name: 'First Step', icon: 'Footprints', description: 'Joined the Online Home Tution Center family!' },
        { id: 'quick_learner', name: 'Quick Learner', icon: 'Zap', description: 'Completed first knowledge verification quiz!' },
        { id: 'consistent_star', name: 'Consistent Star', icon: 'Flame', description: 'Maintained a 5-day active learning streak!' },
        { id: 'quiz_champion', name: 'Quiz Champion', icon: 'Trophy', description: 'Scored 90%+ in CBSE Accountancy Diagnostic Quiz!' }
      ]
    });

    const student2 = await User.create({
      name: 'Ms. Aadarshana',
      displayName: 'Aadarshana Centum',
      email: 'aadarshana@student.com',
      password: 'student123',
      role: 'student',
      grade: 'Class 12',
      curriculum: 'CBSE',
      points: 750,
      streak: 12,
      avatar: '',
      badges: [
        { id: 'learning_master', name: 'Learning Master', icon: 'Crown', description: 'Scored 100/100 Centum in Accountancy Board exams!' }
      ]
    });

    const student3 = await User.create({
      name: 'Ms. Vishhalini Venthan',
      displayName: 'Vishhalini V.',
      email: 'vishhalini@student.com',
      password: 'student123',
      role: 'student',
      grade: 'Class 12',
      points: 620,
      streak: 9,
      avatar: ''
    });

    const student4 = await User.create({
      name: 'Mr. Gurumoorthy',
      displayName: 'Gurumoorthy G.',
      email: 'gurumoorthy@student.com',
      password: 'student123',
      role: 'student',
      grade: 'Class 12',
      points: 510,
      streak: 6,
      avatar: ''
    });

    const parentUser = await User.create({
      name: 'Mrs. Kavitha Sharma',
      email: 'parent@tutioncenter.com',
      password: 'parent123',
      role: 'parent',
      phone: '+91 9876543211',
      linkedChildEmail: 'student@tutioncenter.com',
      avatar: ''
    });

    console.log('[SEED] Creating Tutors...');
    await Tutor.create([
      {
        name: 'Mrs. Sandhya Subbaraman',
        email: 'sandhya@aksharasacademy.com',
        phone: '+91 9345793979',
        photo: '',
        qualification: 'M.Com, M.Phil, MBA, SET Qualified',
        experienceYears: 15,
        isFounder: true,
        rating: 5.0,
        studentsTaught: 500,
        badge: 'Founder & Senior Lead Educator',
        bio: 'Accomplished commerce educator with over 15 years of teaching experience. Specialized in blending academic rigor with intuitive real-world examples in Accountancy, Economics, and Business Studies. YouTube educator since 2022 with hundreds of video lessons.',
        teachingPhilosophy: 'Every student has the potential to master commerce when concepts are unraveled with logic rather than memorized through formulas.',
        teachingStyle: 'Concept-Oriented, Socratic & Problem-Solving Centered',
        subjects: ['Accountancy', 'Economics', 'Business Studies', 'Management Studies', 'CA/CMA Foundation'],
        grades: ['Class 11', 'Class 12', 'CA/CMA Foundation', 'UG/PG', 'NET/SET'],
        curriculums: ['CBSE', 'State Board', 'Foundation'],
        languages: ['English', 'Tamil', 'Bilingual'],
        timingOptions: ['Morning (6:00 - 9:00 AM)', 'Evening (5:00 - 9:00 PM)', 'Weekends'],
        learningDifficultiesHandled: ['Concept Building', 'Board Exam Revision', 'Problem Solving Speed', 'Foundation Gaps'],
        youtubeUrl: 'https://youtube.com'
      },
      {
        name: 'Dr. K. Ramanathan',
        email: 'ramanathan@tutioncenter.com',
        phone: '+91 9345793980',
        photo: '',
        qualification: 'Ph.D. in Applied Mathematics, M.Sc.',
        experienceYears: 12,
        rating: 4.9,
        studentsTaught: 340,
        badge: 'Senior Mathematics Specialist',
        bio: 'Passionate mathematician devoted to demystifying calculus, probability, and algebra. Renowned for stepwise breakdown and visual geometry proofs.',
        teachingPhilosophy: 'Math is a language of patterns; once the pattern clicks, fear turns into confidence.',
        teachingStyle: 'Visual-Spatial & Step-by-Step Proof Methods',
        subjects: ['Mathematics', 'Applied Mathematics', 'Quantitative Aptitude'],
        grades: ['Class 9', 'Class 10', 'Class 11', 'Class 12', 'CA/CMA Foundation'],
        curriculums: ['CBSE', 'ICSE', 'State Board'],
        languages: ['English', 'Tamil'],
        timingOptions: ['Evening (5:00 - 9:00 PM)', 'Weekends'],
        learningDifficultiesHandled: ['Math Anxiety', 'Calculus Mastery', 'Problem Solving Speed']
      },
      {
        name: 'Prof. Sneha Iyer',
        email: 'sneha@tutioncenter.com',
        phone: '+91 9345793981',
        photo: '',
        qualification: 'M.Sc. Physics (Gold Medalist), B.Ed',
        experienceYears: 8,
        rating: 4.88,
        studentsTaught: 210,
        badge: 'Science Foundations Mentor',
        bio: 'Specialist in Physics and Integrated Science with extensive coaching for CBSE Class 9 to 12. Connects textbook physics with tangible real-life phenomena.',
        teachingPhilosophy: 'Hands-on inquiry sparks lifelong scientific curiosity.',
        teachingStyle: 'Inquiry-Based & Real-World Experimentation',
        subjects: ['Science', 'Physics', 'Chemistry Foundations'],
        grades: ['Class 9', 'Class 10', 'Class 11', 'Class 12'],
        curriculums: ['CBSE', 'State Board'],
        languages: ['English', 'Tamil'],
        timingOptions: ['Morning (6:00 - 9:00 AM)', 'Evening (5:00 - 9:00 PM)'],
        learningDifficultiesHandled: ['Numerical Problems', 'Concept Building', 'Diagram & Circuit Analysis']
      },
      {
        name: 'Mr. Rajesh V.',
        email: 'rajesh@tutioncenter.com',
        phone: '+91 9345793982',
        photo: '',
        qualification: 'Chartered Accountant (CA), B.Com',
        experienceYears: 9,
        rating: 4.95,
        studentsTaught: 280,
        badge: 'CA / CMA Foundation Mentor',
        bio: 'Practicing Chartered Accountant with a zeal for teaching. Mentors aspirants through the rigorous CA & CMA Foundation curriculum with practical auditing insights.',
        teachingPhilosophy: 'Professional exams require crystal-clear fundamentals and methodical exam discipline.',
        teachingStyle: 'Analytical, Case-Study Driven & Exam Oriented',
        subjects: ['Accountancy', 'Business Laws', 'Business Mathematics', 'CA/CMA Foundation'],
        grades: ['Class 12', 'CA/CMA Foundation', 'UG/PG'],
        curriculums: ['CBSE', 'ICAI Foundation', 'ICMAI Foundation'],
        languages: ['English', 'Bilingual'],
        timingOptions: ['Evening (5:00 - 9:00 PM)', 'Weekends'],
        learningDifficultiesHandled: ['Professional Exam Technique', 'Time Management', 'Case Laws']
      }
    ]);

    console.log('[SEED] Creating Courses...');
    await Course.create([
      {
        title: 'CBSE Class 11 & 12 Accountancy (Comprehensive Program)',
        slug: 'cbse-class-11-12-accountancy',
        subject: 'Accountancy',
        category: 'Commerce Stream',
        grades: ['Class 11', 'Class 12'],
        curriculum: ['CBSE', 'State Board'],
        mode: 'Online',
        description: 'Master Accounting fundamentals, Partnership firms, Company Accounts, Cash Flow Statements, and Financial Analysis. Taught with TS Grewal and NCERT thorough workout and previous board papers.',
        highlights: [
          'Full TS Grewal & NCERT step-by-step problem solutions',
          'Weekly board exam-oriented timed tests',
          'Paper presentation techniques that secure 95%+ marks',
          '1-on-1 personalized doubt clearance sessions'
        ],
        learningOutcomes: [
          'Master Partnership Deed, Goodwill valuation, and Dissolution accounting',
          'Effortlessly compute Issue and Forfeiture of Shares & Debentures',
          'Solve complex Cash Flow statement adjustments with confidence'
        ],
        syllabus: [
          { unit: 'Unit 1: Accounting for Partnership Firms', topics: ['Fundamentals & Goodwill', 'Admission of Partner', 'Retirement & Death', 'Dissolution'] },
          { unit: 'Unit 2: Accounting for Companies', topics: ['Issue of Shares', 'Forfeiture & Re-issue', 'Issue of Debentures'] },
          { unit: 'Unit 3: Analysis of Financial Statements', topics: ['Ratio Analysis', 'Cash Flow Statement', 'Tools of Financial Analysis'] }
        ],
        duration: 'Academic Year Program (10 Months)',
        sessionsPerWeek: '4 Sessions / Week (60 mins each)',
        tutorName: 'Mrs. Sandhya Subbaraman',
        image: '',
        isFeatured: true
      },
      {
        title: 'CBSE Class 11 & 12 Economics (Micro, Macro & Indian Economic Development)',
        slug: 'cbse-class-11-12-economics',
        subject: 'Economics',
        category: 'Commerce Stream',
        grades: ['Class 11', 'Class 12'],
        curriculum: ['CBSE', 'State Board'],
        mode: 'Online',
        description: 'Comprehensive coaching covering Introductory Microeconomics, Macroeconomics, and Indian Economic Development with analytical reasoning, real-world case studies, and numerical mastery.',
        highlights: [
          'Visual diagrams, flowcharts, and formula mnemonics',
          'National income numericals mastery with 0% error rate',
          'Structured answer drafting for 6-mark evaluative questions',
          'Daily quick quizzes and real-time revision'
        ],
        learningOutcomes: [
          'Master National Income Accounting methods (Value Added, Income, Expenditure)',
          'Understand RBI monetary policy, Banking, and Government Budget',
          'Analyze trends in Indian economic development with critical data backing'
        ],
        duration: 'Academic Year Program (10 Months)',
        sessionsPerWeek: '3 Sessions / Week',
        tutorName: 'Mrs. Sandhya Subbaraman',
        image: '',
        isFeatured: true
      },
      {
        title: 'CBSE Class 11 & 12 Business Studies (Case Study Masterclass)',
        slug: 'cbse-class-11-12-business-studies',
        subject: 'Business Studies',
        category: 'Commerce Stream',
        grades: ['Class 11', 'Class 12'],
        curriculum: ['CBSE', 'State Board'],
        mode: 'Online',
        description: 'Transform Business Studies from rote memorization into intuitive business leadership. Specially focused on dissecting tricky CBSE case studies and scoring maximum marks.',
        highlights: [
          'Case study decoding framework with keyword highlighting',
          'Detailed coverage of Principles of Management and Business Finance',
          'Mind maps and audio-visual summary snippets',
          'Mock board examinations with line-by-line teacher evaluation'
        ],
        learningOutcomes: [
          'Identify Taylor and Fayol principles in real corporate scenarios',
          'Decode financial management, working capital, and capital structure',
          'Draft high-scoring structured answers with subheadings'
        ],
        duration: 'Academic Year Program (8 Months)',
        sessionsPerWeek: '3 Sessions / Week',
        tutorName: 'Mrs. Sandhya Subbaraman',
        image: '',
        isFeatured: true
      },
      {
        title: 'CA / CMA Foundation (Online & Hybrid Fast-Track)',
        slug: 'ca-cma-foundation',
        subject: 'CA/CMA Foundation',
        category: 'Professional Programs',
        grades: ['CA/CMA Foundation', 'Class 12'],
        curriculum: ['Foundation', 'ICAI', 'ICMAI'],
        mode: 'Hybrid',
        description: 'Structured preparation designed to simplify core professional subjects: Principles and Practice of Accounting, Business Laws, and Quantitative Aptitude for first-attempt success.',
        highlights: [
          'Extensive practice of past RTPs, MTPs, and ICAI exam papers',
          'Guidance from practicing Chartered Accountants and senior academicians',
          'Comprehensive module-by-module chapter tests'
        ],
        learningOutcomes: [
          'Complete mastery of Foundation accounting standards & mechanics',
          'Legal drafting technique for Indian Contract Act and Sale of Goods Act',
          'Time-efficient mathematical calculations for aptitude papers'
        ],
        duration: '6 Months Intensive',
        sessionsPerWeek: '5 Sessions / Week',
        tutorName: 'Mrs. Sandhya Subbaraman & CA Rajesh V.',
        image: '',
        isFeatured: true
      },
      {
        title: 'UG & PG Commerce Mentorship (B.Com, M.Com, MBA)',
        slug: 'ug-pg-commerce',
        subject: 'Undergraduate & Postgraduate',
        category: 'Higher Education',
        grades: ['UG/PG'],
        curriculum: ['University Syllabus'],
        mode: 'Online',
        description: 'Comprehensive academic support for advanced Financial Accounting, Cost & Management Accounting, Financial Management, and Business Taxation for college students.',
        highlights: [
          'Custom syllabus alignment to your university curriculum',
          'Concept clarity for advanced financial management formulas',
          'Flexible evening schedules fitting college commitments'
        ],
        duration: 'Semester Basis',
        sessionsPerWeek: '3 Sessions / Week',
        tutorName: 'Mrs. Sandhya Subbaraman',
        image: '',
        isFeatured: false
      },
      {
        title: 'NET / SET (Commerce & Management) Result-Oriented Coaching',
        slug: 'net-set-commerce',
        subject: 'NET/SET',
        category: 'Competitive & Teacher Eligibility',
        grades: ['NET/SET', 'Postgraduate'],
        curriculum: ['UGC NET', 'TNSET'],
        mode: 'Online',
        description: 'Result-oriented coaching led by SET qualified faculty. Conceptual depth, previous year paper analysis, mock tests, and exam-focused strategies for Paper 1 & Paper 2.',
        highlights: [
          'Led by SET-qualified educator Mrs. Sandhya Subbaraman',
          'Over 1,000 previous year questions categorized topic-wise',
          'Speed tricks for Paper 1 Data Interpretation and Teaching Aptitude'
        ],
        duration: '4 Months Crash / 8 Months Regular',
        sessionsPerWeek: '4 Sessions / Week',
        tutorName: 'Mrs. Sandhya Subbaraman',
        image: '',
        isFeatured: false
      }
    ]);

    console.log('[SEED] Creating Testimonials...');
    await Testimonial.create([
      {
        name: 'Ms. Aadarshana',
        district: 'Idukki / Kerala',
        grade: 'Class 12',
        batch: 'CBSE 2024-25 (Online Batch)',
        subject: 'Accountancy',
        image: '',
        score: 'Centum 100/100',
        quote: 'I was a student of Aksharas Academy in 2024-25. Sandhya mam\'s classes were really effective and I understood every concept in the first go. I scored 100/100 on my Accountancy board paper! I truly credit these classes for my success.',
        parentQuote: 'We were in Kerala and worried about online coaching quality, but Sandhya Ma\'am gave our daughter personal attention every day.',
        rating: 5,
        featured: true
      },
      {
        name: 'Ms. Vishhalini Venthan',
        district: 'Trichy',
        grade: 'Class 12',
        batch: 'CBSE 2024 (Offline & Hybrid)',
        subject: 'Accountancy',
        image: '',
        score: '95/100',
        quote: 'I studied 12th Accountancy at Aksharas Academy. I scored 95/100, and the credit truly goes to Sandhya ma\'am. Her way of teaching is very clear, structured, and easy to understand, which made Accountancy feel much simpler.',
        rating: 5,
        featured: true
      },
      {
        name: 'Ms. Madhuleka',
        district: 'Cuddalore',
        grade: 'Class 12',
        batch: 'Online Batch',
        subject: 'Accountancy & Economics',
        image: '',
        score: '94/100',
        quote: 'I\'ve been learning since the beginning of Grade 12. Accountancy used to feel really difficult, but the way she explains things makes it so simple and easy. Her YouTube videos for Business Studies and Economics were super helpful during exams.',
        rating: 5,
        featured: true
      },
      {
        name: 'Ms. Akshara Ayappan',
        district: 'Trichy',
        grade: 'Class 12',
        batch: 'Class 12 Batch',
        subject: 'Commerce & Economics',
        image: '',
        score: 'Above 90',
        quote: 'Sandhya Mam\'s classes were highly effective. One of her greatest strengths is her clarity in explanation, step-by-step using practical examples. She maintained a friendly learning environment where students felt comfortable asking doubts without hesitation.',
        rating: 5,
        featured: true
      },
      {
        name: 'Mr. Gurumoorthy',
        district: 'Trichy',
        grade: 'Class 12',
        batch: 'CBSE Board',
        subject: 'Accountancy',
        image: '',
        score: 'Above 90',
        quote: 'Just four months before my board exams, I couldn\'t find any tuition center willing to take me. Aksharas Academy gave me that opportunity. Ma\'am quickly covered the entire syllabus and guided me well for my CBSE Accountancy exam.',
        rating: 5,
        featured: true
      },
      {
        name: 'Ms. Harini',
        district: 'Trichy',
        grade: 'Class 12',
        batch: 'Class 12 Batch',
        subject: 'Accountancy',
        image: '',
        score: 'Above 90',
        quote: 'Sandhya ma\'am put in more than 200% effort to ensure all our concepts were clear. We practiced numerous sums across different patterns before the exams, which really built my confidence.',
        rating: 5,
        featured: true
      }
    ]);

    console.log('[SEED] Creating Interactive Quizzes...');
    await Quiz.create([
      {
        title: 'CBSE Class 12: Partnership Fundamentals & Profit Sharing',
        subject: 'Accountancy',
        grade: 'Class 12',
        topic: 'Partnership Fundamentals',
        difficulty: 'Intermediate',
        timeLimitMinutes: 10,
        pointsAwarded: 60,
        description: 'Test your understanding of Partnership Deed, Interest on Capital, Interest on Drawings, and P&L Appropriation adjustments.',
        questions: [
          {
            questionText: 'In the absence of a Partnership Deed, what is the rate of interest allowed on a partner’s loan to the firm?',
            options: ['6% per annum', '12% per annum', 'No interest is allowed', 'At the prevailing bank rate'],
            correctIndex: 0,
            explanation: 'Under Section 13(d) of the Indian Partnership Act, 1932, in the absence of an agreement, a partner is entitled to interest at the rate of 6% p.a. on advances/loans made to the firm.',
            topic: 'Partnership Deed Provisions'
          },
          {
            questionText: 'Interest on drawings is calculated for how many months when drawings are made in the middle of each month throughout the year?',
            options: ['6.5 months', '6 months', '5.5 months', '12 months'],
            correctIndex: 1,
            explanation: 'When fixed amounts are drawn in the middle of each month, the average period is (11.5 + 0.5) / 2 = 6 months.',
            topic: 'Interest on Drawings'
          },
          {
            questionText: 'Which of the following is treated as a charge against profit rather than an appropriation of profit?',
            options: ['Salary to partner', 'Interest on partner’s capital', 'Rent paid to a partner for premise used', 'Transfer to General Reserve'],
            correctIndex: 2,
            explanation: 'Rent paid to a partner and interest on partner loan are charges against profits and debited to Profit & Loss Account, not P&L Appropriation.',
            topic: 'Charges vs Appropriation'
          },
          {
            questionText: 'Sacrificing Ratio is calculated as:',
            options: ['New Ratio - Old Ratio', 'Old Ratio - New Ratio', 'Old Ratio + New Ratio', 'Gaining Ratio - Old Ratio'],
            correctIndex: 1,
            explanation: 'Sacrificing Ratio = Old Profit Sharing Ratio - New Profit Sharing Ratio.',
            topic: 'Ratio Calculations'
          },
          {
            questionText: 'Goodwill of a firm is evaluated using Capitalization of Super Profits method. If Super Profit = ₹50,000 and Normal Rate of Return = 10%, the value of Goodwill is:',
            options: ['₹5,000', '₹50,000', '₹5,00,000', '₹50,00,000'],
            correctIndex: 2,
            explanation: 'Goodwill = Super Profit × (100 / Normal Rate) = 50,000 × (100 / 10) = ₹5,00,000.',
            topic: 'Valuation of Goodwill'
          }
        ]
      },
      {
        title: 'CBSE Class 12 Economics: Macroeconomics & National Income',
        subject: 'Economics',
        grade: 'Class 12',
        topic: 'National Income Accounting',
        difficulty: 'Intermediate',
        timeLimitMinutes: 10,
        pointsAwarded: 50,
        description: 'Verify your grasp over GDP deflator, Value Added, Net Factor Income from Abroad, and Keynesian multiplier.',
        questions: [
          {
            questionText: 'Which of the following is NOT included in the estimation of National Income?',
            options: ['Brokerage on sale of second-hand goods', 'Old age pensions', 'Value of self-consumed agricultural produce', 'Imputed rent of owner-occupied house'],
            correctIndex: 1,
            explanation: 'Old age pensions are transfer payments (unearned income) and are therefore excluded from National Income calculations.',
            topic: 'Transfer Payments vs Factor Income'
          },
          {
            questionText: 'If Nominal GDP is ₹1200 crore and the GDP Deflator is 120, what is the Real GDP?',
            options: ['₹1000 crore', '₹1440 crore', '₹1100 crore', '₹900 crore'],
            correctIndex: 0,
            explanation: 'Real GDP = (Nominal GDP / GDP Deflator) × 100 = (1200 / 120) × 100 = ₹1000 crore.',
            topic: 'Real vs Nominal GDP'
          },
          {
            questionText: 'When Marginal Propensity to Consume (MPC) is 0.8, the value of the investment multiplier (k) is:',
            options: ['1.25', '4', '5', '8'],
            correctIndex: 2,
            explanation: 'Multiplier k = 1 / (1 - MPC) = 1 / (1 - 0.8) = 1 / 0.2 = 5.',
            topic: 'Investment Multiplier'
          },
          {
            questionText: 'Net Domestic Product at Factor Cost (NDP_FC) is commonly known as:',
            options: ['National Income', 'Domestic Income', 'Personal Disposable Income', 'Private Income'],
            correctIndex: 1,
            explanation: 'NDP_FC represents Domestic Income. NNP_FC represents National Income.',
            topic: 'Macro Aggregates'
          }
        ]
      },
      {
        title: 'Class 10/11: Mathematics & Aptitude Booster',
        subject: 'Mathematics',
        grade: 'Class 10',
        topic: 'Algebra & Quadratic Equations',
        difficulty: 'Beginner',
        timeLimitMinutes: 8,
        pointsAwarded: 40,
        description: 'Rapid-fire quadratic equations, discriminant checks, and sequence puzzles.',
        questions: [
          {
            questionText: 'For a quadratic equation ax² + bx + c = 0 to have two distinct real roots, the discriminant D must be:',
            options: ['D > 0', 'D = 0', 'D < 0', 'D ≤ 0'],
            correctIndex: 0,
            explanation: 'When Discriminant D = b² - 4ac > 0, the equation has two distinct real roots.',
            topic: 'Quadratic Discriminant'
          },
          {
            questionText: 'What is the 10th term of the Arithmetic Progression 3, 7, 11, 15, ...?',
            options: ['35', '39', '43', '37'],
            correctIndex: 1,
            explanation: 'a = 3, d = 4. 10th term a_10 = a + (10 - 1)d = 3 + 9(4) = 3 + 36 = 39.',
            topic: 'Arithmetic Progressions'
          },
          {
            questionText: 'If the sum of roots of 2x² - 8x + 5 = 0 is S, then S equals:',
            options: ['-4', '4', '2.5', '8'],
            correctIndex: 1,
            explanation: 'Sum of roots = -b/a = -(-8)/2 = 8/2 = 4.',
            topic: 'Relation between Roots & Coefficients'
          }
        ]
      }
    ]);

    console.log('[SEED] Creating Daily Challenges...');
    const todayStr = new Date().toISOString().split('T')[0];
    const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    await DailyChallenge.create([
      {
        dateString: todayStr,
        dayNumber: 1,
        title: 'The Partnership Profit Riddle',
        category: 'Commerce & Economics',
        question: 'A and B start a business with capital ₹40,000 and ₹60,000. Profit at year-end is ₹25,000. If their deed specifies a 10% interest on capital before remaining profit is shared equally, how much does B receive in total?',
        options: ['₹10,500', '₹13,500', '₹15,000', '₹12,000'],
        correctIndex: 1,
        hint: 'Calculate Interest on Capital first: A gets 4,000 and B gets 6,000 (total ₹10,000). Deduct this from ₹25,000 and divide remainder equally!',
        explanation: 'Total Interest on Capital = ₹4,000 + ₹6,000 = ₹10,000. Divisible profit = ₹25,000 - ₹10,000 = ₹15,000. Each partner gets half = ₹7,500. Total for B = ₹6,000 (IOC) + ₹7,500 (profit share) = ₹13,500.',
        points: 30,
        participantsCount: 42
      },
      {
        dateString: tomorrowStr,
        dayNumber: 2,
        title: 'Logical Sequence Challenge',
        category: 'Logical Reasoning',
        question: 'Find the missing number in the sequence: 4, 9, 25, 49, 121, ___',
        options: ['144', '169', '196', '225'],
        correctIndex: 1,
        hint: 'Look closely at the square roots: 2, 3, 5, 7, 11...',
        explanation: 'The sequence consists of squares of prime numbers: 2²=4, 3²=9, 5²=25, 7²=49, 11²=121. The next prime number is 13, and 13² = 169.',
        points: 25,
        participantsCount: 18
      }
    ]);

    console.log('[SEED] Creating Teacher Development Modules (Pedagogical Training Hub)...');
    await TrainingModule.create([
      {
        title: 'Active Learning & Socratic Inquiry in Online Classrooms',
        slug: 'active-learning-socratic-inquiry',
        category: 'Active Learning',
        description: 'How to shift from 60 minutes of passive lecturing to vibrant peer discussion, thought-provoking Socratic prompts, and rapid formative polling.',
        level: 'Foundational',
        durationMinutes: 35,
        icon: 'Sparkles',
        keyTakeaways: [
          'Replace 10-minute monologues with 3-minute concept bursts followed by targeted questions',
          'Use Socratic questioning: ask "Why do you think debit must equal credit?" instead of quoting rules',
          'Utilize live chat polling to keep 100% of students actively engaged'
        ],
        steps: [
          {
            order: 1,
            stepTitle: 'The Problem with Passive Screen Time',
            content: 'Research shows student attention wanes dramatically after 7 minutes of unprompted lecture in a digital environment. To combat cognitive fatigue, teachers must introduce interaction beats.',
            practicalTip: 'Set a visual timer: every 6 minutes, pause and ask every student to type a 1-word reflection in chat.'
          },
          {
            order: 2,
            stepTitle: 'Formulating Deep Socratic Questions',
            content: 'Instead of yes/no queries, ask open-ended conceptual inquiries: "If a company increases debt, who bears the greatest financial risk and why?"',
            practicalTip: 'Give students 30 seconds of quiet thinking time before asking for hands.'
          }
        ],
        checkQuestions: [
          {
            questionText: 'What is the primary benefit of Socratic questioning in an online tutorial?',
            options: ['Saves the teacher from preparing slides', 'Encourages critical reasoning and self-discovery', 'Reduces class time', 'Guarantees 100% marks without homework'],
            correctIndex: 1,
            explanation: 'Socratic dialogue prompts students to examine their logic and construct conceptual meaning actively.'
          }
        ]
      },
      {
        title: 'Differentiated Lesson Architecture & Mixed-Ability Coaching',
        slug: 'differentiated-lesson-architecture',
        category: 'Lesson Architecture',
        description: 'Techniques to simultaneously support struggling students needing basic foundations while keeping high-achievers challenged.',
        level: 'Intermediate',
        durationMinutes: 40,
        icon: 'Layers',
        keyTakeaways: [
          'Layered problem tiers: Bronze (Basic formulas), Silver (Board exam pattern), Gold (HOTS / Olympiad)',
          'Scaffolded guided practice: "I do, We do, You do"',
          'Positive reinforcement techniques that build academic confidence'
        ],
        steps: [
          {
            order: 1,
            stepTitle: 'Tiered Problem Design',
            content: 'When introducing a topic like Partnership Dissolution, prepare 3 problem variants so all learners experience successful completion and growth.',
            practicalTip: 'Always start with a Bronze sum where numbers are whole and clean to anchor the accounting ledger logic.'
          }
        ]
      },
      {
        title: 'Formative Digital Assessments & Real-Time Remediation',
        slug: 'formative-digital-assessments',
        category: 'Formative Assessment',
        description: 'Using instant quizzes, exit tickets, and diagnostic micro-tests to catch misconceptions before they compound into exam anxiety.',
        level: 'Foundational',
        durationMinutes: 30,
        icon: 'CheckCircle2',
        keyTakeaways: [
          'Exit ticket methodology: 2-question quiz at the end of every live class',
          'Analyzing error patterns rather than just marking right/wrong',
          'Designing actionable next-day revision micro-sessions'
        ]
      }
    ]);

    console.log('[SEED] Creating Digital Literacy Guides (Digital Learning Made Simple)...');
    await DigitalGuide.create([
      {
        title: 'How to Join Online Live Classes Effortlessly',
        slug: 'how-to-join-online-classes',
        category: 'Joining Online Classes',
        targetAudience: 'Students & Parents',
        difficulty: 'Absolute Beginner',
        estimatedMinutes: 5,
        summary: 'A friendly step-by-step walkthrough showing students and parents how to join class links, test audio, and get ready 5 minutes early.',
        steps: [
          {
            stepNumber: 1,
            title: 'Locate Your Class Invitation',
            instruction: 'Open your student dashboard or WhatsApp reminder message. Click the provided Google Meet or Zoom class link.',
            tip: 'Always join 5 minutes before the scheduled time so you can test your microphone peacefully.'
          },
          {
            stepNumber: 2,
            title: 'Check Audio and Camera Preview',
            instruction: 'Before clicking "Join Now", look at the camera preview box. Ensure your webcam shows your workspace with adequate lighting and your microphone meter moves when you speak.',
            tip: 'Position your laptop or phone on a stable surface at eye level.'
          },
          {
            stepNumber: 3,
            title: 'Click "Ask to Join" / "Join Now"',
            instruction: 'Click the green "Join Now" button. Your tutor will admit you immediately into the virtual classroom.',
            tip: 'Keep your notebook and pen ready beside your keyboard before entering.'
          }
        ],
        quickQuiz: {
          question: 'What should you do 5 minutes before your scheduled online tuition class?',
          options: ['Click the link, test camera/microphone, and have your notebook ready', 'Wait for the tutor to call your phone', 'Download 5 new video apps', 'Keep your microphone on full volume with music'],
          correctIndex: 0,
          explanation: 'Joining 5 minutes early guarantees technical peace of mind and zero missed lesson time.'
        }
      },
      {
        title: 'Mastering Video Conferencing Controls (Mic, Camera & Screen Sharing)',
        slug: 'mastering-video-conferencing-controls',
        category: 'Video Conferencing Controls',
        targetAudience: 'Students & Parents',
        difficulty: 'Easy',
        estimatedMinutes: 7,
        summary: 'Learn the essential in-call buttons: how to mute/unmute, raise your hand politely, send questions in chat, and present your screen.',
        steps: [
          {
            stepNumber: 1,
            title: 'The Mute & Unmute Microphone Button',
            instruction: 'Click the Microphone icon at the bottom of the screen to unmute when speaking. Mute yourself when the tutor or another student is explaining to prevent room echo.',
            tip: 'Shortcut: Press Spacebar on your keyboard in Google Meet or Zoom to unmute temporarily!'
          },
          {
            stepNumber: 2,
            title: 'Using the "Raise Hand" Icon',
            instruction: 'If you have a question while the teacher is lecturing, click the Hand icon (✋). This alerts the teacher gently without talking over them.',
            tip: 'The tutor will pause at a natural break and invite you to ask your doubt.'
          },
          {
            stepNumber: 3,
            title: 'Using the In-Call Chat for Fast Answers',
            instruction: 'Click the speech bubble icon on the bottom right. You can type quick numbers, answers to quiz prompts, or doubts.',
            tip: 'Chat is great for pasting formulas or requesting the teacher to repeat a step.'
          }
        ]
      },
      {
        title: 'How to Submit Written Homework & Upload Clear PDF Worksheets',
        slug: 'how-to-submit-homework-pdf',
        category: 'Submitting Assignments',
        targetAudience: 'Students & Parents',
        difficulty: 'Easy',
        estimatedMinutes: 6,
        summary: 'Clear handwriting makes evaluation easy. Learn how to photograph your notes with your phone, combine into a single PDF, and upload in 60 seconds.',
        steps: [
          {
            stepNumber: 1,
            title: 'Take Well-Lit Photos of Your Homework',
            instruction: 'Place your notebook under good overhead lighting. Hold your phone parallel to the page so all margins and page numbers are visible.',
            tip: 'Avoid casting hand shadows over the working notes or totals!'
          },
          {
            stepNumber: 2,
            title: 'Convert Photos to a Single PDF',
            instruction: 'Use free scanner apps like Adobe Scan, CamScanner, or Google Drive scan to compile all pages in order into one file.',
            tip: 'Name the file with your name and chapter (e.g. Aarav_Partnership_HW1.pdf).'
          },
          {
            stepNumber: 3,
            title: 'Upload to Student Dashboard',
            instruction: 'Navigate to "My Learning Space" -> "Assignments", click "Submit Assignment", select your PDF file, and click Submit.',
            tip: 'You will receive immediate visual confirmation and points added to your streak!'
          }
        ]
      },
      {
        title: 'Digital Safety & Respectful Online Classroom Etiquette',
        slug: 'digital-safety-classroom-etiquette',
        category: 'Online Safety & Etiquette',
        targetAudience: 'Students & Parents',
        difficulty: 'Absolute Beginner',
        estimatedMinutes: 5,
        summary: 'Essential online safety rules: protecting passwords, webcam privacy, respectful peer interactions, and maintaining digital discipline.',
        steps: [
          {
            stepNumber: 1,
            title: 'Protect Your Meeting Links & Passwords',
            instruction: 'Never post your private tuition meeting links on public social media groups or forums.',
            tip: 'Keep your login credentials strictly private within your family.'
          },
          {
            stepNumber: 2,
            title: 'Mindful Camera Background',
            instruction: 'Ensure your study background is quiet and neutral. Use a virtual background or blur if needed for privacy.',
            tip: 'Wear proper study attire during live video calls to cultivate an academic mindset.'
          }
        ]
      }
    ]);

    console.log('[SEED] Creating Sample Lesson Plans (Teacher Development Hub)...');
    await LessonPlan.create([
      {
        tutor: tutorUser._id,
        tutorName: 'Mrs. Sandhya Subbaraman',
        title: 'Profit & Loss Appropriation Account & Partner Remuneration',
        subject: 'Accountancy',
        grade: 'Class 12',
        topic: 'Partnership Fundamentals',
        durationMinutes: 60,
        learningObjective: 'Students will independently formulate a complete P&L Appropriation Account and distinguish charges against profit from appropriations with 100% accuracy.',
        teachingMethod: 'Scaffolded Guided Practice',
        activities: [
          { time: '0 - 10 mins', title: 'Conceptual Bridge', description: 'Review why Net Profit from P&L Account must be transferred and examine Section 13 provisions.' },
          { time: '10 - 25 mins', title: 'Interactive Ledgers', description: 'Step-by-step demonstration of Interest on Capital vs Salary to working partners.' },
          { time: '25 - 45 mins', title: 'Guided Problem Solving', description: 'Students solve TS Grewal illustration 14 on shared digital whiteboard simultaneously.' },
          { time: '45 - 60 mins', title: 'Exit Ticket Quiz', description: '3-question lightning round on interest on drawings average period formula.' }
        ],
        materialsNeeded: ['TS Grewal Class 12 Vol 1', 'Digital Whiteboard / JamBoard', 'Financial Calculator demo'],
        assessmentMethod: 'Exit Ticket Quiz & Independent Working Ledger Check',
        homeworkAssignment: 'Complete Unsolved Sums 18 & 21 from Chapter 2; highlight any discrepancy in capital balances.',
        isPublicTemplate: true
      },
      {
        tutor: tutorUser._id,
        tutorName: 'Mrs. Sandhya Subbaraman',
        title: 'National Income Accounting: Real vs Nominal GDP & Price Deflator',
        subject: 'Economics',
        grade: 'Class 12',
        topic: 'National Income and Related Aggregates',
        durationMinutes: 55,
        learningObjective: 'Students will be able to compute Real GDP using the price index and explain why Real GDP is the true indicator of economic welfare.',
        teachingMethod: 'Case Study & Problem Solving',
        activities: [
          { time: '0 - 12 mins', title: 'The Inflation Illusion Case', description: 'Show how a country produces the same 100 cars but GDP doubles due to price rise.' },
          { time: '12 - 35 mins', title: 'Formula Derivation & Numericals', description: 'Real GDP = (Nominal / Deflator) * 100 worked examples.' },
          { time: '35 - 55 mins', title: 'Evaluation Debate', description: 'Is GDP an adequate indicator of welfare? Discuss externalities and income distribution.' }
        ],
        materialsNeeded: ['NCERT Macroeconomics Chapter 2', 'Sample Board exam 6-mark questions'],
        assessmentMethod: 'Live numerical calculation race & 6-mark draft rubric',
        isPublicTemplate: true
      }
    ]);

    console.log('[SEED] Creating Demo Bookings & Inquiries...');
    await Booking.create([
      {
        bookingRef: 'OHT-884129',
        studentName: 'Rohan Mehra',
        parentName: 'Sanjay Mehra',
        email: 'rohan.mehra@example.com',
        phone: '+91 9840123456',
        grade: 'Class 12',
        subject: 'Accountancy',
        curriculum: 'CBSE',
        preferredDate: '2026-10-05',
        preferredTime: '5:00 PM - 6:00 PM',
        mode: 'Online',
        message: 'Student needs urgent revision in Company Accounts and Cash Flow adjustments before pre-board exams.',
        learningGoals: 'Targeting 90%+ in CBSE Commerce Board exams',
        status: 'Confirmed',
        assignedTutor: 'Mrs. Sandhya Subbaraman',
        meetingLink: 'https://meet.google.com/oht-demo-class'
      },
      {
        bookingRef: 'OHT-912443',
        studentName: 'Deepika Raman',
        parentName: 'Ramanathan G.',
        email: 'deepika.raman@example.com',
        phone: '+91 9443198765',
        grade: 'Class 11',
        subject: 'Economics',
        curriculum: 'CBSE',
        preferredDate: '2026-10-06',
        preferredTime: '6:30 PM - 7:30 PM',
        mode: 'Online',
        message: 'Looking for conceptual foundation in Microeconomics and statistics.',
        learningGoals: 'Strong concept foundations from Grade 11',
        status: 'Pending',
        assignedTutor: 'Mrs. Sandhya Subbaraman'
      }
    ]);

    await Inquiry.create([
      {
        name: 'Venkatesh Prasad',
        email: 'venkat.prasad@example.com',
        phone: '+91 9841029384',
        subject: 'CA Foundation Coaching',
        grade: 'Foundation',
        message: 'Hello, we would like to understand the schedule and fee structure for the upcoming CA Foundation batch starting next month.',
        source: 'Website Contact Form',
        status: 'New'
      },
      {
        name: 'Lakshmi Narayanan',
        email: 'lakshmi.n@example.com',
        phone: '+91 9791028374',
        subject: 'Class 12 Commerce All Subjects',
        grade: 'Class 12',
        message: 'Looking for integrated tuition covering Accountancy, Business Studies, and Economics with weekend doubt sessions.',
        source: 'WhatsApp Inquiry',
        status: 'Contacted',
        notes: 'Called parent; demo class scheduled for Saturday.'
      }
    ]);

    console.log('[SEED] Creating Demo Assignments...');
    await Assignment.create([
      {
        title: 'TS Grewal Worksheet: Partnership Admission Adjustments',
        subject: 'Accountancy',
        grade: 'Class 12',
        tutorName: 'Mrs. Sandhya Subbaraman',
        description: 'Complete Revaluation Account and Partner Capital Account adjustments for Illustration 32 and Question 45.',
        totalMarks: 25,
        dueDate: '2026-10-08',
        submissions: [
          {
            student: studentUser._id,
            studentName: 'Aarav Sharma',
            submissionText: 'Completed all working notes with neat ledger formats.',
            marksAwarded: 24,
            feedback: 'Excellent ledger presentation. Take note of goodwill treatment in cash.',
            status: 'Graded'
          }
        ]
      }
    ]);

    console.log('[SEED] Seed successfully completed!');
  } catch (error) {
    console.error('[SEED] Error during seeding:', error);
    throw error;
  }
};

if (require.main === module) {
  const { connectDB, closeDB } = require('./config/db');
  connectDB().then(async () => {
    await seedData();
    await closeDB();
    process.exit(0);
  }).catch(e => {
    console.error(e);
    process.exit(1);
  });
}

module.exports = { seedData };
