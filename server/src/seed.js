import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Event from './models/Event.js';
import User from './models/User.js';

dotenv.config();

const daysFromNow = (days) => new Date(Date.now() + days * 24 * 60 * 60 * 1000);

const imageUrls = {
  blockchain1: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
  blockchain2: 'https://images.unsplash.com/photo-1640161704729-cbe966a08476',
  blockchain3: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0',
  web3: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9',
  finance: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307',
  conference: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b',
  business: 'https://images.unsplash.com/photo-1556761175-b413da4baf72',
  cloud: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
  frontend: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
  backend: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
  database: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d',
  design: 'https://images.unsplash.com/photo-1559028012-481c04fa702d',
  mobile: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
  security: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
  ai: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
  teamwork: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d'
};

const seed = async () => {
  await connectDB();

  await Promise.all([User.deleteMany({}), Event.deleteMany({})]);

  const [admin, user] = await User.create([
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin'
    },
    {
      name: 'Durgesh Vishwakarma',
      email: 'durgesh@example.com',
      password: 'password123',
      role: 'user'
    }
  ]);

  const events = [
    // First 10 Blockchain / Web3 events
    {
      title: 'Blockchain Developer Summit',
      description:
        'A technical summit covering blockchain fundamentals, decentralized applications, smart contracts, and real-world Web3 use cases.',
      category: 'Blockchain',
      location: 'Powai, Mumbai',
      startsAt: daysFromNow(3),
      capacity: 130,
      imageUrl: imageUrls.blockchain1,
      attendees: [{ user: user._id }]
    },
    {
      title: 'Smart Contract Security Workshop',
      description:
        'A hands-on workshop focused on smart contract vulnerabilities, audit basics, testing strategies, and secure Solidity patterns.',
      category: 'Blockchain',
      location: 'Online',
      startsAt: daysFromNow(5),
      capacity: 100,
      imageUrl: imageUrls.blockchain2,
      attendees: [{ user: user._id }]
    },
    {
      title: 'Web3 Product Builders Meetup',
      description:
        'A product-focused meetup for founders and developers building wallets, NFT platforms, DeFi tools, and blockchain products.',
      category: 'Web3',
      location: 'Bandra, Mumbai',
      startsAt: daysFromNow(7),
      capacity: 85,
      imageUrl: imageUrls.web3
    },
    {
      title: 'DeFi and Digital Assets Conference',
      description:
        'Explore decentralized finance, digital assets, liquidity protocols, token economics, and compliance considerations.',
      category: 'DeFi',
      location: 'Mumbai',
      startsAt: daysFromNow(9),
      capacity: 160,
      imageUrl: imageUrls.finance
    },
    {
      title: 'Ethereum DApp Development Bootcamp',
      description:
        'Build decentralized applications using Ethereum, Solidity, wallets, smart contracts, and modern frontend integration.',
      category: 'Ethereum',
      location: 'Online',
      startsAt: daysFromNow(11),
      capacity: 140,
      imageUrl: imageUrls.blockchain3,
      attendees: [{ user: user._id }]
    },
    {
      title: 'NFT Utility and Marketplace Session',
      description:
        'Understand NFT utility, marketplace architecture, ownership models, metadata storage, and practical business use cases.',
      category: 'NFT',
      location: 'Hyderabad',
      startsAt: daysFromNow(13),
      capacity: 95,
      imageUrl: imageUrls.web3
    },
    {
      title: 'Blockchain for Enterprise Systems',
      description:
        'A practical session on using blockchain in supply chain, finance, identity, enterprise workflows, and secure record keeping.',
      category: 'Blockchain',
      location: 'Delhi',
      startsAt: daysFromNow(15),
      capacity: 110,
      imageUrl: imageUrls.blockchain1
    },
    {
      title: 'Solidity Bootcamp for Beginners',
      description:
        'Learn Solidity basics, contract structure, deployment flow, testing, and common Web3 development patterns.',
      category: 'Blockchain',
      location: 'Online',
      startsAt: daysFromNow(17),
      capacity: 120,
      imageUrl: imageUrls.blockchain2,
      attendees: [{ user: user._id }]
    },
    {
      title: 'Crypto Wallet Integration Day',
      description:
        'A practical event on wallet connection, authentication, transaction signing, and secure user onboarding in Web3 apps.',
      category: 'Web3',
      location: 'Pune',
      startsAt: daysFromNow(19),
      capacity: 90,
      imageUrl: imageUrls.web3
    },
    {
      title: 'Tokenomics and Web3 Business Models',
      description:
        'Understand token utility, incentive design, governance models, user growth, and sustainable blockchain product strategy.',
      category: 'Web3',
      location: 'Online',
      startsAt: daysFromNow(21),
      capacity: 150,
      imageUrl: imageUrls.finance
    },

    // Remaining 30 mixed events
    {
      title: 'MERN Career Connect',
      description:
        'A practical networking event for developers, recruiters, and engineering teams working with the MERN stack.',
      category: 'Technology',
      location: 'Powai, Mumbai',
      startsAt: daysFromNow(23),
      capacity: 80,
      imageUrl: imageUrls.conference,
      attendees: [{ user: user._id }]
    },
    {
      title: 'Startup Product Workshop',
      description:
        'A hands-on session about planning, validating, and shipping user-focused startup products.',
      category: 'Business',
      location: 'Bengaluru',
      startsAt: daysFromNow(25),
      capacity: 50,
      imageUrl: imageUrls.business
    },
    {
      title: 'Cloud Deployment Bootcamp',
      description:
        'Learn deployment fundamentals for Node, React, Docker, reverse proxies, and AWS hosting workflows.',
      category: 'Cloud',
      location: 'Online',
      startsAt: daysFromNow(27),
      capacity: 150,
      imageUrl: imageUrls.cloud,
      attendees: [{ user: user._id }]
    },
    {
      title: 'React Frontend Masterclass',
      description:
        'A focused frontend event covering React components, hooks, routing, state management, and UI performance.',
      category: 'Frontend',
      location: 'Andheri, Mumbai',
      startsAt: daysFromNow(29),
      capacity: 60,
      imageUrl: imageUrls.frontend
    },
    {
      title: 'Node.js API Design Session',
      description:
        'A backend-focused session on REST API design, Express middleware, validation, authentication, and clean architecture.',
      category: 'Backend',
      location: 'Pune',
      startsAt: daysFromNow(31),
      capacity: 75,
      imageUrl: imageUrls.backend
    },
    {
      title: 'MongoDB Data Modeling Meetup',
      description:
        'A practical meetup about MongoDB schema design, indexes, relationships, aggregation, and performance optimization.',
      category: 'Database',
      location: 'Thane, Mumbai',
      startsAt: daysFromNow(33),
      capacity: 90,
      imageUrl: imageUrls.database
    },
    {
      title: 'UI/UX for Developers Workshop',
      description:
        'A design-friendly workshop for developers to improve layout, spacing, typography, responsive design, and user experience.',
      category: 'Design',
      location: 'Lower Parel, Mumbai',
      startsAt: daysFromNow(35),
      capacity: 45,
      imageUrl: imageUrls.design
    },
    {
      title: 'AWS Deployment Fundamentals',
      description:
        'A beginner-friendly AWS event covering EC2, S3, CloudFront, environment variables, deployment flow, and monitoring basics.',
      category: 'AWS',
      location: 'Online',
      startsAt: daysFromNow(37),
      capacity: 120,
      imageUrl: imageUrls.cloud
    },
    {
      title: 'Docker for MERN Projects',
      description:
        'Learn how to containerize React, Node.js, and MongoDB applications using Dockerfiles and Docker Compose.',
      category: 'DevOps',
      location: 'Navi Mumbai',
      startsAt: daysFromNow(39),
      capacity: 70,
      imageUrl: imageUrls.cloud
    },
    {
      title: 'Full Stack Interview Preparation',
      description:
        'A practical interview preparation event covering MERN projects, authentication, APIs, database design, and deployment questions.',
      category: 'Career',
      location: 'Goregaon, Mumbai',
      startsAt: daysFromNow(41),
      capacity: 100,
      imageUrl: imageUrls.teamwork,
      attendees: [{ user: user._id }]
    },
    {
      title: 'Next.js Production Patterns',
      description:
        'Learn practical Next.js patterns for routing, server rendering, API integration, performance, and production deployment.',
      category: 'Frontend',
      location: 'Online',
      startsAt: daysFromNow(43),
      capacity: 100,
      imageUrl: imageUrls.frontend
    },
    {
      title: 'System Design for Junior Developers',
      description:
        'A beginner-friendly system design session covering APIs, databases, caching, queues, scaling, and architecture basics.',
      category: 'Architecture',
      location: 'Mumbai',
      startsAt: daysFromNow(45),
      capacity: 90,
      imageUrl: imageUrls.teamwork
    },
    {
      title: 'AI Tools for Software Teams',
      description:
        'A practical event on using AI tools for debugging, documentation, code review, productivity, and development workflows.',
      category: 'AI',
      location: 'Online',
      startsAt: daysFromNow(47),
      capacity: 180,
      imageUrl: imageUrls.ai
    },
    {
      title: 'PostgreSQL Query Optimization',
      description:
        'Learn indexing, query planning, joins, transactions, normalization, and performance tuning for PostgreSQL applications.',
      category: 'Database',
      location: 'Pune',
      startsAt: daysFromNow(49),
      capacity: 65,
      imageUrl: imageUrls.database
    },
    {
      title: 'Microservices with Node.js',
      description:
        'A backend engineering event covering service boundaries, API gateways, queues, observability, and deployment strategies.',
      category: 'Backend',
      location: 'Bengaluru',
      startsAt: daysFromNow(51),
      capacity: 120,
      imageUrl: imageUrls.backend
    },
    {
      title: 'React Native App Development Day',
      description:
        'A mobile development workshop covering React Native screens, navigation, API integration, state management, and app releases.',
      category: 'Mobile',
      location: 'Andheri, Mumbai',
      startsAt: daysFromNow(53),
      capacity: 70,
      imageUrl: imageUrls.mobile
    },
    {
      title: 'Cybersecurity Basics for Developers',
      description:
        'Learn authentication risks, API security, secure headers, input validation, OWASP basics, and practical security checks.',
      category: 'Security',
      location: 'Online',
      startsAt: daysFromNow(55),
      capacity: 150,
      imageUrl: imageUrls.security
    },
    {
      title: 'Agile Engineering Practices',
      description:
        'A team-focused event about sprint planning, Git workflows, code reviews, testing, release planning, and collaboration.',
      category: 'Engineering',
      location: 'Navi Mumbai',
      startsAt: daysFromNow(57),
      capacity: 85,
      imageUrl: imageUrls.business,
      attendees: [{ user: user._id }]
    },
    {
      title: 'GraphQL API Development',
      description:
        'A practical session on GraphQL schemas, resolvers, queries, mutations, pagination, and API design patterns.',
      category: 'Backend',
      location: 'Online',
      startsAt: daysFromNow(59),
      capacity: 95,
      imageUrl: imageUrls.backend
    },
    {
      title: 'TypeScript for React Developers',
      description:
        'Learn TypeScript fundamentals, component props, custom hooks, API types, utility types, and frontend safety patterns.',
      category: 'Frontend',
      location: 'Mumbai',
      startsAt: daysFromNow(61),
      capacity: 100,
      imageUrl: imageUrls.frontend
    },
    {
      title: 'DevOps CI/CD Pipeline Workshop',
      description:
        'A workshop on GitHub Actions, automated builds, Docker pipelines, deployment checks, and release workflows.',
      category: 'DevOps',
      location: 'Online',
      startsAt: daysFromNow(63),
      capacity: 130,
      imageUrl: imageUrls.cloud
    },
    {
      title: 'SaaS Product Engineering Meetup',
      description:
        'Discuss SaaS architecture, subscriptions, dashboards, admin panels, user roles, and scalable product development.',
      category: 'Product',
      location: 'Bengaluru',
      startsAt: daysFromNow(65),
      capacity: 80,
      imageUrl: imageUrls.business
    },
    {
      title: 'REST API Testing with Postman',
      description:
        'Learn to test authentication, protected routes, CRUD endpoints, request validation, and API documentation using Postman.',
      category: 'Testing',
      location: 'Online',
      startsAt: daysFromNow(67),
      capacity: 110,
      imageUrl: imageUrls.backend
    },
    {
      title: 'MongoDB Aggregation Workshop',
      description:
        'A deeper MongoDB session covering aggregation pipelines, grouping, lookups, filters, and reporting use cases.',
      category: 'Database',
      location: 'Thane, Mumbai',
      startsAt: daysFromNow(69),
      capacity: 75,
      imageUrl: imageUrls.database
    },
    {
      title: 'Clean Code for MERN Developers',
      description:
        'Improve code structure, naming, reusable functions, controller patterns, error handling, and maintainable project design.',
      category: 'Engineering',
      location: 'Pune',
      startsAt: daysFromNow(71),
      capacity: 95,
      imageUrl: imageUrls.teamwork
    },
    {
      title: 'Authentication and JWT Deep Dive',
      description:
        'Understand JWT auth, refresh strategy, password hashing, protected routes, role checks, and frontend token handling.',
      category: 'Security',
      location: 'Online',
      startsAt: daysFromNow(73),
      capacity: 120,
      imageUrl: imageUrls.security
    },
    {
      title: 'Vite React Performance Day',
      description:
        'Learn code splitting, lazy loading, bundle checks, caching, image optimization, and practical React performance fixes.',
      category: 'Frontend',
      location: 'Online',
      startsAt: daysFromNow(75),
      capacity: 100,
      imageUrl: imageUrls.frontend
    },
    {
      title: 'Admin Dashboard Design Sprint',
      description:
        'A UI-focused event for building clean admin dashboards, metrics cards, tables, charts, and responsive layouts.',
      category: 'Design',
      location: 'Lower Parel, Mumbai',
      startsAt: daysFromNow(77),
      capacity: 60,
      imageUrl: imageUrls.design
    },
    {
      title: 'Cloud Monitoring and Logs Session',
      description:
        'Learn logging, metrics, health checks, uptime monitoring, alerting, and debugging deployed Node.js services.',
      category: 'Cloud',
      location: 'Online',
      startsAt: daysFromNow(79),
      capacity: 140,
      imageUrl: imageUrls.cloud
    },
    {
      title: 'Production Readiness Checklist',
      description:
        'A practical session on security, validation, environment configuration, build checks, documentation, and deployment readiness.',
      category: 'Engineering',
      location: 'Online',
      startsAt: daysFromNow(81),
      capacity: 125,
      imageUrl: imageUrls.security,
      attendees: [{ user: user._id }]
    }
  ];

  await Event.create(events.map((event) => ({ ...event, organizer: admin._id })));

  console.log('Seed complete');
  console.log('Created 40 events. First 10 events are Blockchain/Web3 related.');
  console.log('Admin: admin@example.com / password123');
  console.log('User: durgesh@example.com / password123');

  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});