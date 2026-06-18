import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Event from './models/Event.js';
import User from './models/User.js';

dotenv.config();

const daysFromNow = (days) => new Date(Date.now() + days * 24 * 60 * 60 * 1000);

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

  await Event.create([
    {
      title: 'Blockchain Developer Summit',
      description:
        'A technical summit covering blockchain fundamentals, decentralized applications, smart contracts, and real-world Web3 use cases.',
      category: 'Blockchain',
      location: 'Powai, Mumbai',
      startsAt: daysFromNow(3),
      capacity: 130,
      imageUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
      organizer: admin._id,
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
      imageUrl: 'https://images.unsplash.com/photo-1640161704729-cbe966a08476',
      organizer: admin._id,
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
      imageUrl: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9',
      organizer: admin._id
    },
    {
      title: 'DeFi and Digital Assets Conference',
      description:
        'Explore decentralized finance, digital assets, liquidity protocols, token economics, and compliance considerations.',
      category: 'Blockchain',
      location: 'Mumbai',
      startsAt: daysFromNow(9),
      capacity: 160,
      imageUrl: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307',
      organizer: admin._id
    },
    {
      title: 'Ethereum DApp Development Bootcamp',
      description:
        'Build decentralized applications using Ethereum, Solidity, wallets, smart contracts, and modern frontend integration.',
      category: 'Blockchain',
      location: 'Online',
      startsAt: daysFromNow(11),
      capacity: 140,
      imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0',
      organizer: admin._id,
      attendees: [{ user: user._id }]
    },
    {
      title: 'NFT Utility and Marketplace Session',
      description:
        'Understand NFT utility, marketplace architecture, ownership models, metadata storage, and practical business use cases.',
      category: 'Web3',
      location: 'Hyderabad',
      startsAt: daysFromNow(13),
      capacity: 95,
      imageUrl: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9',
      organizer: admin._id
    },
    {
      title: 'Blockchain for Enterprise Systems',
      description:
        'A practical session on using blockchain in supply chain, finance, identity, enterprise workflows, and secure record keeping.',
      category: 'Blockchain',
      location: 'Delhi',
      startsAt: daysFromNow(15),
      capacity: 110,
      imageUrl: 'https://images.unsplash.com/photo-1640161704729-cbe966a08476',
      organizer: admin._id
    },

    {
      title: 'MERN Career Connect',
      description:
        'A practical networking event for developers, recruiters, and engineering teams working with the MERN stack.',
      category: 'Technology',
      location: 'Powai, Mumbai',
      startsAt: daysFromNow(18),
      capacity: 80,
      imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b',
      organizer: admin._id,
      attendees: [{ user: user._id }]
    },
    {
      title: 'Startup Product Workshop',
      description:
        'A hands-on session about planning, validating, and shipping user-focused startup products.',
      category: 'Business',
      location: 'Bengaluru',
      startsAt: daysFromNow(21),
      capacity: 50,
      imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72',
      organizer: admin._id
    },
    {
      title: 'Cloud Deployment Bootcamp',
      description:
        'Learn deployment fundamentals for Node, React, Docker, reverse proxies, and AWS hosting workflows.',
      category: 'Cloud',
      location: 'Online',
      startsAt: daysFromNow(24),
      capacity: 150,
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
      organizer: admin._id,
      attendees: [{ user: user._id }]
    },
    {
      title: 'React Frontend Masterclass',
      description:
        'A focused frontend event covering React components, hooks, routing, state management, and UI performance.',
      category: 'Frontend',
      location: 'Andheri, Mumbai',
      startsAt: daysFromNow(27),
      capacity: 60,
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
      organizer: admin._id
    },
    {
      title: 'Node.js API Design Session',
      description:
        'A backend-focused session on REST API design, Express middleware, validation, authentication, and clean architecture.',
      category: 'Backend',
      location: 'Pune',
      startsAt: daysFromNow(30),
      capacity: 75,
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
      organizer: admin._id
    },
    {
      title: 'MongoDB Data Modeling Meetup',
      description:
        'A practical meetup about MongoDB schema design, indexes, relationships, aggregation, and performance optimization.',
      category: 'Database',
      location: 'Thane, Mumbai',
      startsAt: daysFromNow(33),
      capacity: 90,
      imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d',
      organizer: admin._id
    },
    {
      title: 'UI/UX for Developers Workshop',
      description:
        'A design-friendly workshop for developers to improve layout, spacing, typography, responsive design, and user experience.',
      category: 'Design',
      location: 'Lower Parel, Mumbai',
      startsAt: daysFromNow(36),
      capacity: 45,
      imageUrl: 'https://images.unsplash.com/photo-1559028012-481c04fa702d',
      organizer: admin._id
    },
    {
      title: 'AWS Deployment Fundamentals',
      description:
        'A beginner-friendly AWS event covering EC2, S3, CloudFront, environment variables, deployment flow, and monitoring basics.',
      category: 'AWS',
      location: 'Online',
      startsAt: daysFromNow(39),
      capacity: 120,
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
      organizer: admin._id
    },
    {
      title: 'Docker for MERN Projects',
      description:
        'Learn how to containerize React, Node.js, and MongoDB applications using Dockerfiles and Docker Compose.',
      category: 'DevOps',
      location: 'Navi Mumbai',
      startsAt: daysFromNow(42),
      capacity: 70,
      imageUrl: 'https://images.unsplash.com/photo-1605745341112-85968b19335b',
      organizer: admin._id
    },
    {
      title: 'Full Stack Interview Preparation',
      description:
        'A practical interview preparation event covering MERN projects, authentication, APIs, database design, and deployment questions.',
      category: 'Career',
      location: 'Goregaon, Mumbai',
      startsAt: daysFromNow(45),
      capacity: 100,
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
      organizer: admin._id,
      attendees: [{ user: user._id }]
    },
    {
      title: 'Next.js Production Patterns',
      description:
        'Learn practical Next.js patterns for routing, server rendering, API integration, performance, and production deployment.',
      category: 'Frontend',
      location: 'Online',
      startsAt: daysFromNow(48),
      capacity: 100,
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
      organizer: admin._id
    },
    {
      title: 'System Design for Junior Developers',
      description:
        'A beginner-friendly system design session covering APIs, databases, caching, queues, scaling, and architecture basics.',
      category: 'Architecture',
      location: 'Mumbai',
      startsAt: daysFromNow(51),
      capacity: 90,
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
      organizer: admin._id
    },
    {
      title: 'AI Tools for Software Teams',
      description:
        'A practical event on using AI tools for debugging, documentation, code review, productivity, and development workflows.',
      category: 'AI',
      location: 'Online',
      startsAt: daysFromNow(54),
      capacity: 180,
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
      organizer: admin._id
    },
    {
      title: 'PostgreSQL Query Optimization',
      description:
        'Learn indexing, query planning, joins, transactions, normalization, and performance tuning for PostgreSQL applications.',
      category: 'Database',
      location: 'Pune',
      startsAt: daysFromNow(57),
      capacity: 65,
      imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d',
      organizer: admin._id
    },
    {
      title: 'Microservices with Node.js',
      description:
        'A backend engineering event covering service boundaries, API gateways, queues, observability, and deployment strategies.',
      category: 'Backend',
      location: 'Bengaluru',
      startsAt: daysFromNow(60),
      capacity: 120,
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
      organizer: admin._id
    },
    {
      title: 'React Native App Development Day',
      description:
        'A mobile development workshop covering React Native screens, navigation, API integration, state management, and app releases.',
      category: 'Mobile',
      location: 'Andheri, Mumbai',
      startsAt: daysFromNow(63),
      capacity: 70,
      imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
      organizer: admin._id
    },
    {
      title: 'Cybersecurity Basics for Developers',
      description:
        'Learn authentication risks, API security, secure headers, input validation, OWASP basics, and practical security checks.',
      category: 'Security',
      location: 'Online',
      startsAt: daysFromNow(66),
      capacity: 150,
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
      organizer: admin._id
    },
    {
      title: 'Agile Engineering Practices',
      description:
        'A team-focused event about sprint planning, Git workflows, code reviews, testing, release planning, and collaboration.',
      category: 'Engineering',
      location: 'Navi Mumbai',
      startsAt: daysFromNow(69),
      capacity: 85,
      imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72',
      organizer: admin._id,
      attendees: [{ user: user._id }]
    }
  ]);

  console.log('Seed complete');
  console.log('Created 25 events. First 7 events are Blockchain/Web3 related.');
  console.log('Admin: admin@example.com / password123');
  console.log('User: durgesh@example.com / password123');

  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});