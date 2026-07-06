// Mock data for Sutra - The AI Business Copilot

export const BUSINESS_PROFILES = [
  { id: 'cafe', name: 'The Daily Grind Cafe', owner: 'Rahul', type: 'Cafe' },
  { id: 'salon', name: 'Aura Premium Salon', owner: 'Rahul', type: 'Salon' },
  { id: 'gym', name: 'Pulse Fitness Studio', owner: 'Rahul', type: 'Gym' },
  { id: 'retail', name: 'Urban Threads Boutique', owner: 'Rahul', type: 'Retail Store' }
];

export const MOCK_DATA = {
  cafe: {
    healthScore: 94,
    revenueToday: '₹14,500',
    pendingRevenue: '₹22,000',
    pendingLeads: 8,
    unreadMessages: 12,
    missedFollowUps: 3,
    customerSat: '4.8/5.0',
    aiSummary: {
      enquiries: 28,
      hotLeads: 5,
      negativeReviews: 1,
      estimatedRevenue: '₹22,000',
      bullets: [
        '28 new enquiries today, mostly weekend table reservations and catering quotes.',
        '5 hot leads identified with >85% buying intent for corporate catering packages.',
        '1 negative Google Review regarding wait time during Sunday brunch peak hours.',
        'Estimated pending catering pipeline value of ₹22,000.'
      ]
    },
    suggestedActions: [
      {
        id: 'action-1',
        title: 'Call Rahul Mehta',
        description: 'Confirm corporate lunch catering package for 50 people. High buying intent (94%).',
        type: 'call',
        targetId: 'cust-1'
      },
      {
        id: 'action-2',
        title: 'Reply to Priya Sharma',
        description: 'Provide gluten-free cake options for anniversary party quote on WhatsApp.',
        type: 'reply',
        targetId: 'cust-2'
      },
      {
        id: 'action-3',
        title: 'Launch Weekend Offer',
        description: 'AI suggests: 15% off Brunch Combo to recover 8 drop-offs from last week.',
        type: 'campaign',
        targetId: 'camp-1'
      }
    ],
    customers: [
      {
        id: 'cust-1',
        name: 'Rahul Mehta',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
        email: 'rahul.mehta@gmail.com',
        phone: '+91 98765 43210',
        leadScore: 92,
        buyingIntent: 94,
        sentiment: 'positive',
        revenue: '₹18,500',
        productsViewed: ['Corporate Lunch Menu', 'Custom Dessert Box'],
        ordersCount: 4,
        orders: [
          { id: 'ORD-8821', date: 'Jun 12, 2026', total: '₹5,200', status: 'Completed' },
          { id: 'ORD-8940', date: 'Jun 28, 2026', total: '₹6,800', status: 'Completed' }
        ],
        aiSummary: 'Interested in Corporate Catering. Asked pricing twice. Waiting for finalized proposal. Purchase probability 94%.',
        notes: 'Likes high-protein lunch options. Prefers WhatsApp communication.',
        timeline: [
          { time: '10:15 AM', type: 'message_received', channel: 'whatsapp', content: 'Can we finalize the menu for 50 pax by today? Need invoice template.' },
          { time: 'Yesterday', type: 'action_completed', content: 'Sent custom corporate menu brochure via email.' },
          { time: '3 days ago', type: 'visit', content: 'Viewed Corporate Catering page on website (Duration: 8m 42s).' }
        ]
      },
      {
        id: 'cust-2',
        name: 'Priya Sharma',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
        email: 'priya.s@outlook.com',
        phone: '+91 91234 56789',
        leadScore: 85,
        buyingIntent: 89,
        sentiment: 'neutral',
        revenue: '₹3,200',
        productsViewed: ['Gluten-Free Cakes', 'Vegan Pastry Platter'],
        ordersCount: 1,
        orders: [
          { id: 'ORD-8451', date: 'May 04, 2026', total: '₹3,200', status: 'Completed' }
        ],
        aiSummary: 'Enquired about gluten-free chocolate cake for birthday. Replied once, waiting for deposit confirmation.',
        notes: 'Severe nut allergy. Prefers afternoon delivery.',
        timeline: [
          { time: '09:40 AM', type: 'message_received', channel: 'instagram', content: 'Do you have gluten-free cake options for an anniversary this Saturday?' },
          { time: 'May 04, 2026', type: 'order', content: 'Ordered Vegan Pastry Box.' }
        ]
      },
      {
        id: 'cust-3',
        name: 'Amit Patel',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
        email: 'amitpatel@yahoo.com',
        phone: '+91 99887 76655',
        leadScore: 35,
        buyingIntent: 40,
        sentiment: 'negative',
        revenue: '₹12,400',
        productsViewed: ['Weekend Brunch Buffet'],
        ordersCount: 12,
        orders: [
          { id: 'ORD-8991', date: 'Jul 04, 2026', total: '₹1,500', status: 'Completed' }
        ],
        aiSummary: 'Regular customer. Left negative review regarding 35 min brunch wait time. Churn risk: High.',
        notes: 'Usually visits with family on Sundays. Enjoys filter coffee.',
        timeline: [
          { time: 'Yesterday', type: 'review_received', channel: 'reviews', content: 'Food is amazing but the waiting time during Sundays is unbearable. Stood outside for 35 mins without any water offered.', rating: 2 },
          { time: 'Jul 04, 2026', type: 'visit', content: 'Visited cafe (checked-in via loyalty QR).' }
        ]
      },
      {
        id: 'cust-4',
        name: 'Sneha Reddy',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
        email: 'sneha.r@gmail.com',
        phone: '+91 88776 65544',
        leadScore: 78,
        buyingIntent: 82,
        sentiment: 'positive',
        revenue: '₹6,700',
        productsViewed: ['Cold Brew Subscriptions', 'AeroPress Maker'],
        ordersCount: 5,
        orders: [
          { id: 'ORD-8711', date: 'May 20, 2026', total: '₹1,200', status: 'Completed' }
        ],
        aiSummary: 'Interested in Cold Brew Subscription. Visited pricing page twice. High chance of purchasing recurring package.',
        notes: 'Loves Ethiopian single-origin coffee. Uses manual dripper.',
        timeline: [
          { time: '2 hours ago', type: 'message_received', channel: 'website', content: 'Is the cold brew monthly subscription delivered fresh every week?' },
          { time: 'Yesterday', type: 'visit', content: 'Viewed Cold Brew Subscription Plan page.' }
        ]
      }
    ],
    conversations: [
      {
        id: 'conv-1',
        customerId: 'cust-1',
        customerName: 'Rahul Mehta',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
        channel: 'whatsapp',
        unread: true,
        priority: 'high',
        intent: 'Catering Enquiry',
        sentiment: 'positive',
        snippet: 'Can we finalize the menu for 50 pax by today? Need invoice template.',
        lastMsgTime: '10:15 AM',
        aiSuggestedReply: 'Hi Rahul! Yes, absolutely. I have drafted the finalized menu and invoice template. You can click here to approve the ₹22,000 proposal, and we will secure the date for your corporate event on July 10th.',
        messages: [
          { id: 'm1', sender: 'customer', content: 'Hi, I saw your corporate catering options online. Do you cater for office lunches?', time: 'Yesterday, 3:00 PM' },
          { id: 'm2', sender: 'agent', content: 'Hello Rahul! Yes, we do custom corporate catering. We offer buffets, boxes, and custom dessert setups. For how many people are you planning?', time: 'Yesterday, 3:05 PM' },
          { id: 'm3', sender: 'customer', content: 'It will be around 50 people. The date is July 10th. Can you share a menu proposal under ₹400 per plate?', time: 'Yesterday, 3:12 PM' },
          { id: 'm4', sender: 'agent', content: 'Definitely. I will email you our Premium Executive Lunch menu options (within ₹380/plate) and a custom quote details sheet right away.', time: 'Yesterday, 3:20 PM' },
          { id: 'm5', sender: 'customer', content: 'Can we finalize the menu for 50 pax by today? Need invoice template.', time: '10:15 AM' }
        ]
      },
      {
        id: 'conv-2',
        customerId: 'cust-2',
        customerName: 'Priya Sharma',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
        channel: 'instagram',
        unread: true,
        priority: 'high',
        intent: 'Custom Cake Order',
        sentiment: 'neutral',
        snippet: 'Do you have gluten-free cake options for an anniversary this Saturday?',
        lastMsgTime: '09:40 AM',
        aiSuggestedReply: 'Hi Priya! Yes, we specialize in Gluten-Free and Sugar-Free cakes! For this Saturday, we can offer our Signature Dark Chocolate Ganache or Fresh Raspberry Mousse. Would you like to see our designs and pricing?',
        messages: [
          { id: 'm6', sender: 'customer', content: 'Do you have gluten-free cake options for an anniversary this Saturday?', time: '09:40 AM' }
        ]
      },
      {
        id: 'conv-3',
        customerId: 'cust-4',
        customerName: 'Sneha Reddy',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
        channel: 'website',
        unread: false,
        priority: 'waiting',
        intent: 'Subscription Info',
        sentiment: 'positive',
        snippet: 'Is the cold brew monthly subscription delivered fresh every week?',
        lastMsgTime: '2 hours ago',
        aiSuggestedReply: 'Hi Sneha! Yes, our Cold Brew monthly subscription is brewed fresh and delivered every Tuesday morning in insulated bottles. You can pause or cancel anytime. Would you like me to send the sign-up link?',
        messages: [
          { id: 'm7', sender: 'customer', content: 'Hi there, quick question about your coffee beans. Are they roasted in-house?', time: 'Yesterday' },
          { id: 'm8', sender: 'agent', content: 'Yes, Sneha! We roast our specialty single-origin coffee beans every Tuesday and Thursday in micro-batches.', time: 'Yesterday' },
          { id: 'm9', sender: 'customer', content: 'Is the cold brew monthly subscription delivered fresh every week?', time: '2 hours ago' }
        ]
      },
      {
        id: 'conv-4',
        customerId: 'cust-3',
        customerName: 'Amit Patel',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
        channel: 'reviews',
        unread: true,
        priority: 'urgent',
        intent: 'Negative Review Resolution',
        sentiment: 'negative',
        snippet: 'Food is amazing but the waiting time during Sundays is unbearable...',
        lastMsgTime: 'Yesterday',
        aiSuggestedReply: 'Dear Amit, thank you for being a loyal customer and for sharing your honest feedback. We are sincerely sorry for the 35-minute wait during Sunday brunch and that water wasn\'t offered. We are adding an outdoor cooling station and reservation system this week. I\'d love to send you a ₹500 voucher for your next family visit. May I send it to your email?',
        messages: [
          { id: 'm10', sender: 'customer', content: '[Google Review - 2 Stars] Food is amazing but the waiting time during Sundays is unbearable. Stood outside for 35 mins without any water offered.', time: 'Yesterday' }
        ]
      }
    ],
    reviews: [
      { id: 'rev-1', author: 'Amit Patel', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120', rating: 2, content: 'Food is amazing but the waiting time during Sundays is unbearable. Stood outside for 35 mins without any water offered.', date: 'Yesterday', sentiment: 'negative', urgent: true, replied: false },
      { id: 'rev-2', author: 'Meera Sen', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120', rating: 5, content: 'Absolutely loved the Avocado Sourdough toast and their cold brews! The staff is super friendly, and the AI checkout was fast.', date: '3 days ago', sentiment: 'positive', urgent: false, replied: true, replyText: 'Thank you Meera! We are thrilled you enjoyed the sourdough and cold brew. See you again soon!' },
      { id: 'rev-3', author: 'Vikram Singh', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120', rating: 4, content: 'Nice ambient lighting and great workspace vibes. WiFi is very fast. Coffee is good, but desserts are slightly overpriced.', date: '1 week ago', sentiment: 'neutral', urgent: false, replied: false }
    ],
    automations: [
      { id: 'auto-1', name: 'Follow up after 24 hours', trigger: 'Inquiry without response > 24 hours', action: 'Send automated WhatsApp checking if they need further details', active: true },
      { id: 'auto-2', name: 'Send Birthday Wishes', trigger: 'Customer Birthdate matches Today', action: 'Send WhatsApp/Email with 15% discount coupon', active: true },
      { id: 'auto-3', name: 'Thank Customers', trigger: 'Order Completed', action: 'Send review link and thank you note 2 hours later', active: false },
      { id: 'auto-4', name: 'Recover Abandoned Enquiries', trigger: 'Customer viewed subscription pricing but left website chat', action: 'Send 10% discount subscription link after 3 hours', active: true },
      { id: 'auto-5', name: 'Notify on Negative Review', trigger: 'Google Review rating < 3 stars', action: 'Alert owner via SMS/Email and auto-generate draft response', active: true }
    ],
    analytics: {
      timeline: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      revenue: [12000, 15400, 11200, 14800, 19200, 24500, 14500],
      leads: [15, 22, 18, 25, 34, 45, 28],
      conversions: [4, 6, 5, 8, 12, 18, 9],
      responseTime: [14, 12, 15, 10, 8, 9, 7], // in minutes
      satisfaction: [4.6, 4.7, 4.5, 4.8, 4.8, 4.9, 4.8],
      topProducts: [
        { name: 'Cold Brew Subscription', value: 45, percentage: 38 },
        { name: 'Brunch Buffet Platter', value: 38, percentage: 32 },
        { name: 'Gluten-Free Cakes', value: 22, percentage: 18 },
        { name: 'Specialty Coffee Beans', value: 14, percentage: 12 }
      ],
      marketingPerformance: {
        whatsapp: 42,
        instagram: 28,
        email: 18,
        websiteChat: 12
      }
    }
  },
  salon: {
    healthScore: 97,
    revenueToday: '₹28,400',
    pendingRevenue: '₹18,000',
    pendingLeads: 5,
    unreadMessages: 8,
    missedFollowUps: 1,
    customerSat: '4.9/5.0',
    aiSummary: {
      enquiries: 18,
      hotLeads: 3,
      negativeReviews: 0,
      estimatedRevenue: '₹18,000',
      bullets: [
        '18 booking requests processed, major bookings for wedding parties next month.',
        '3 hot leads ready to purchase Bridal Grooming Packages.',
        'Perfect satisfaction ratings today. Response times averaged 4.2 minutes.'
      ]
    },
    suggestedActions: [
      {
        id: 'action-s1',
        title: 'Confirm Bridal Slot',
        description: 'Tanya Sen requested custom hair extension & styling packages. High intent.',
        type: 'reply',
        targetId: 'cust-s1'
      }
    ],
    customers: [
      {
        id: 'cust-s1',
        name: 'Tanya Sen',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
        email: 'tanya.sen@gmail.com',
        phone: '+91 95432 10987',
        leadScore: 95,
        buyingIntent: 96,
        sentiment: 'positive',
        revenue: '₹15,000',
        productsViewed: ['Bridal Makeover', 'Keratin Therapy'],
        ordersCount: 3,
        orders: [
          { id: 'ORD-3011', date: 'May 15, 2026', total: '₹5,000', status: 'Completed' }
        ],
        aiSummary: 'Bride-to-be booking for August wedding. Prefers custom styling package.',
        notes: 'Prefers quiet sessions. Scalp sensitivity identified.',
        timeline: [
          { time: '11:00 AM', type: 'message_received', channel: 'whatsapp', content: 'Hey, I want to book the Bridal Package for August 15th. Do you have slots for trials?' }
        ]
      }
    ],
    conversations: [
      {
        id: 'conv-s1',
        customerId: 'cust-s1',
        customerName: 'Tanya Sen',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
        channel: 'whatsapp',
        unread: true,
        priority: 'high',
        intent: 'Bridal Booking',
        sentiment: 'positive',
        snippet: 'Hey, I want to book the Bridal Package for August 15th...',
        lastMsgTime: '11:00 AM',
        aiSuggestedReply: 'Hi Tanya! Hearty congratulations on your wedding! Yes, we have trial slots open this Saturday at 2:00 PM and 4:30 PM with our senior stylist. Would you like me to book one for you?',
        messages: [
          { id: 'ms1', sender: 'customer', content: 'Hey, I want to book the Bridal Package for August 15th. Do you have slots for trials?', time: '11:00 AM' }
        ]
      }
    ],
    reviews: [
      { id: 'rev-s1', author: 'Rohan Gupta', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120', rating: 5, content: 'Incredible haircut. Very professional stylists. Clean equipment. Highly recommend the hair spa.', date: '2 days ago', sentiment: 'positive', urgent: false, replied: true, replyText: 'Thank you Rohan! We are glad you enjoyed the hair spa.' }
    ],
    automations: [
      { id: 'auto-s1', name: 'Refill Alert', trigger: '60 days since last Hair Spa/Keratin treatment', action: 'Send automated WhatsApp offering 10% off maintenance session', active: true }
    ],
    analytics: {
      timeline: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      revenue: [21000, 24000, 20500, 28000, 32000, 48000, 28400],
      leads: [8, 12, 9, 14, 20, 35, 18],
      conversions: [3, 5, 4, 7, 10, 22, 12],
      responseTime: [5, 4, 6, 5, 4, 4, 4],
      satisfaction: [4.8, 4.9, 4.8, 4.9, 4.9, 5.0, 4.9],
      topProducts: [
        { name: 'Bridal Makeover Package', value: 65, percentage: 50 },
        { name: 'Keratin Hair Smoothing', value: 35, percentage: 27 },
        { name: 'Global Hair Coloring', value: 20, percentage: 15 },
        { name: 'Premium Hair Spa', value: 10, percentage: 8 }
      ],
      marketingPerformance: {
        whatsapp: 55,
        instagram: 35,
        email: 5,
        websiteChat: 5
      }
    }
  },
  gym: {
    healthScore: 89,
    revenueToday: '₹32,000',
    pendingRevenue: '₹45,000',
    pendingLeads: 12,
    unreadMessages: 18,
    missedFollowUps: 5,
    customerSat: '4.6/5.0',
    aiSummary: {
      enquiries: 35,
      hotLeads: 8,
      negativeReviews: 0,
      estimatedRevenue: '₹45,000',
      bullets: [
        '35 gym membership enquiries from Google Maps and Web Chat.',
        '8 hot leads showing high intent to purchase Annual Personal Training plans.',
        '5 members flagged as high-churn-risk due to zero attendance in the last 20 days.'
      ]
    },
    suggestedActions: [
      {
        id: 'action-g1',
        title: 'Re-engage Churn Risk Members',
        description: 'Send AI-customized encouragement WhatsApp and offer free nutritionist session.',
        type: 'campaign',
        targetId: 'camp-g1'
      }
    ],
    customers: [
      {
        id: 'cust-g1',
        name: 'Karan Malhotra',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
        email: 'karan.m@gmail.com',
        phone: '+91 97766 55443',
        leadScore: 40,
        buyingIntent: 25,
        sentiment: 'neutral',
        revenue: '₹12,000',
        productsViewed: ['Annual VIP Membership'],
        ordersCount: 1,
        orders: [
          { id: 'ORD-2009', date: 'Jan 10, 2026', total: '₹12,000', status: 'Completed' }
        ],
        aiSummary: 'Inactive for 25 days. Purchased annual membership but attendance dropped. High Churn Risk (85%).',
        notes: 'Goal: Weight loss & muscle gain. Had lower back injury in March.',
        timeline: [
          { time: '20 days ago', type: 'visit', content: 'Last checked-in at front desk.' }
        ]
      }
    ],
    conversations: [
      {
        id: 'conv-g1',
        customerId: 'cust-g1',
        customerName: 'Karan Malhotra',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
        channel: 'whatsapp',
        unread: false,
        priority: 'high',
        intent: 'Re-engagement',
        sentiment: 'neutral',
        snippet: 'Inactive for 25 days. Re-engagement needed.',
        lastMsgTime: '3 days ago',
        aiSuggestedReply: 'Hey Karan! We missed you at Pulse Fitness! We noticed you haven\'t checked in recently. We want to help you stay on track, so we\'ve set up a free 1-on-1 Nutrition and Goal checkup with Coach Vikram this week. Would you like to reserve a 30-min slot?',
        messages: [
          { id: 'mg1', sender: 'agent', content: 'Hey Karan! Hope you are doing great. We missed you at Pulse Fitness!', time: '3 days ago' }
        ]
      }
    ],
    reviews: [
      { id: 'rev-g1', author: 'Divya Rao', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120', rating: 5, content: 'Excellent range of strength equipment. The coaches are certified and actually guide you. Clean locker rooms.', date: '4 days ago', sentiment: 'positive', urgent: false, replied: false }
    ],
    automations: [
      { id: 'auto-g1', name: 'Churn Prevention Campaign', trigger: 'Gym member absent > 14 days', action: 'Send motivational check-in text and schedule coach review', active: true }
    ],
    analytics: {
      timeline: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      revenue: [18000, 22000, 19000, 21000, 25000, 38000, 32000],
      leads: [22, 28, 20, 24, 30, 48, 35],
      conversions: [5, 7, 4, 6, 8, 15, 11],
      responseTime: [18, 15, 16, 14, 12, 15, 18],
      satisfaction: [4.5, 4.6, 4.5, 4.7, 4.6, 4.6, 4.6],
      topProducts: [
        { name: '12-Month Membership', value: 55, percentage: 46 },
        { name: '1-on-1 Personal Training', value: 45, percentage: 38 },
        { name: 'Diet & Nutrition Plan', value: 12, percentage: 10 },
        { name: 'Gym Merchandise/Supplements', value: 8, percentage: 6 }
      ],
      marketingPerformance: {
        whatsapp: 25,
        instagram: 45,
        email: 15,
        websiteChat: 15
      }
    }
  },
  retail: {
    healthScore: 92,
    revenueToday: '₹41,200',
    pendingRevenue: '₹28,500',
    pendingLeads: 14,
    unreadMessages: 15,
    missedFollowUps: 4,
    customerSat: '4.7/5.0',
    aiSummary: {
      enquiries: 42,
      hotLeads: 6,
      negativeReviews: 2,
      estimatedRevenue: '₹38,000',
      bullets: [
        '42 new enquiries regarding sizes, color variants, and stock availability.',
        '6 hot leads seeking customized party-wear consultations.',
        '2 negative Google reviews concerning delayed exchanges and customer support queues.'
      ]
    },
    suggestedActions: [
      {
        id: 'action-r1',
        title: 'Approve Sneha\'s Return',
        description: 'Sneha requested exchange for silk dress sizing. AI suggests approval to avoid churn.',
        type: 'reply',
        targetId: 'cust-r1'
      }
    ],
    customers: [
      {
        id: 'cust-r1',
        name: 'Sneha Reddy',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
        email: 'sneha.reddy@gmail.com',
        phone: '+91 99887 76611',
        leadScore: 89,
        buyingIntent: 92,
        sentiment: 'negative',
        revenue: '₹22,400',
        productsViewed: ['Silk Summer Dress', 'Denim Jacket M'],
        ordersCount: 8,
        orders: [
          { id: 'ORD-4091', date: 'Jun 20, 2026', total: '₹4,800', status: 'Completed' },
          { id: 'ORD-4210', date: 'Jul 01, 2026', total: '₹5,500', status: 'Completed' }
        ],
        aiSummary: 'Interested in Blue Sneakers & Silk Dress. Asked pricing twice. Return request pending. Intent 92%.',
        notes: 'Prefers sustainable fabrics. Sizing: Medium.',
        timeline: [
          { time: '1 hour ago', type: 'message_received', channel: 'whatsapp', content: 'Hey, I wanted to exchange the Silk Dress I got yesterday. The size M feels a bit tight. Do you have L in stock?' }
        ]
      }
    ],
    conversations: [
      {
        id: 'conv-r1',
        customerId: 'cust-r1',
        customerName: 'Sneha Reddy',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
        channel: 'whatsapp',
        unread: true,
        priority: 'high',
        intent: 'Product Exchange',
        sentiment: 'negative',
        snippet: 'Wanted to exchange the Silk Dress. Size M feels tight...',
        lastMsgTime: '1 hour ago',
        aiSuggestedReply: 'Hi Sneha! Absolutely, we can exchange that for you. I checked our inventory: we do have the Silk Dress in Size L in stock! I have reserved it for you. Would you like us to schedule a free home pick-up and replacement delivery tomorrow?',
        messages: [
          { id: 'mr1', sender: 'customer', content: 'Hey, I wanted to exchange the Silk Dress I got yesterday. The size M feels a bit tight. Do you have L in stock?', time: '1 hour ago' }
        ]
      }
    ],
    reviews: [
      { id: 'rev-r1', author: 'Ritu Jain', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120', rating: 2, content: 'Called the support number twice for exchange and got no reply. The dress quality is good but service is lacking.', date: 'Yesterday', sentiment: 'negative', urgent: true, replied: false }
    ],
    automations: [
      { id: 'auto-r1', name: 'Abandoned Cart Follow-up', trigger: 'Customer drops off checkout page', action: 'Send 5% discount checkout link after 1 hour on WhatsApp', active: true }
    ],
    analytics: {
      timeline: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      revenue: [28000, 32000, 31000, 35000, 42000, 68000, 41200],
      leads: [25, 32, 28, 30, 45, 78, 42],
      conversions: [8, 12, 10, 11, 16, 32, 18],
      responseTime: [12, 10, 11, 9, 8, 9, 8],
      satisfaction: [4.6, 4.7, 4.6, 4.7, 4.8, 4.8, 4.7],
      topProducts: [
        { name: 'Silk Summer Dress', value: 85, percentage: 42 },
        { name: 'Classic Blue Denim Jacket', value: 60, percentage: 30 },
        { name: 'Premium Leather Boots', value: 40, percentage: 20 },
        { name: 'Eco-Cotton Tees', value: 16, percentage: 8 }
      ],
      marketingPerformance: {
        whatsapp: 30,
        instagram: 50,
        email: 12,
        websiteChat: 8
      }
    }
  }
};

export const INTEGRATIONS = [
  { id: 'whatsapp', name: 'WhatsApp Business', icon: 'MessageSquare', status: 'connected', description: 'Sync customer chats, send templates and broadcasts.' },
  { id: 'instagram', name: 'Instagram Direct', icon: 'Instagram', status: 'connected', description: 'Auto-import DMs, comments and story mentions.' },
  { id: 'google_reviews', name: 'Google Business', icon: 'Star', status: 'connected', description: 'Monitor Google reviews, ratings and map check-ins.' },
  { id: 'gmail', name: 'Gmail Account', icon: 'Mail', status: 'connected', description: 'Import enquiries from your business email address.' },
  { id: 'website', name: 'Website Chat Widget', icon: 'Globe', status: 'connected', description: 'Intelligent live chatbot for your direct website visitors.' },
  { id: 'shopify', name: 'Shopify Store', icon: 'ShoppingBag', status: 'disconnected', description: 'Pull products, stock and customer order histories.' },
  { id: 'stripe', name: 'Stripe Payments', icon: 'CreditCard', status: 'connected', description: 'Track invoicing, payments and subscription metrics.' },
  { id: 'razorpay', name: 'Razorpay', icon: 'Pocket', status: 'connected', description: 'Collect domestic payments and invoice links.' },
  { id: 'meta', name: 'Meta Ads Manager', icon: 'Share2', status: 'disconnected', description: 'Track lead forms and customer acquisition cost.' },
  { id: 'calendar', name: 'Google Calendar', icon: 'Calendar', status: 'connected', description: 'Sync appointment bookings and consultation slots.' }
];

export const MARKETING_CAMPAIGNS = {
  cafe: [
    { id: 'camp-1', type: 'Weekend Offer', channel: 'whatsapp', audience: 'All Local Customers', prompt: 'Create 15% discount for Sunday brunch combos', subject: 'Weekend Brunch Delights!', content: 'Hey there! ☕ Planning your Sunday brunch? Skip the queue and enjoy 15% off our signature cold brew & sourdough combo. Show this message at The Daily Grind Cafe. Valid this Sunday only!' },
    { id: 'camp-2', type: 'Festival Special', channel: 'instagram', audience: 'IG Followers', prompt: 'Monsoon special chocolate brownie post', subject: 'Monsoon Brownies', content: 'Rainy days call for warm fudgy brownies! 🌧️🍫 Crafted with premium single-origin cocoa, served with fresh whipped cream. Tap the link in bio to order now or drop by!' },
    { id: 'camp-3', type: 'Newsletter', channel: 'email', audience: 'Newsletter Subscribers', prompt: 'Monthly coffee subscription newsletter', subject: 'July Brew: Ethiopia Single Origin & Free Home Delivery!', content: 'Hi there Coffee Lover,\n\nThis month, we are highlighting our Ethiopian Yirgacheffe medium roast. Notes of bergamot, lemon peel, and jasmine. Brewed fresh, roasted in-house. Subscribe to our monthly plan and get free home delivery every Tuesday.\n\nBest,\nRahul' }
  ],
  salon: [
    { id: 'camp-s1', type: 'Festive Pack', channel: 'whatsapp', audience: 'All Ladies List', prompt: 'Wedding season bridal trial special discount', subject: 'Bridal Trial Offer', content: 'Hello gorgeous! 🌸 Planning your wedding looks? Book a complete bridal hair & makeup trial with our senior stylists this weekend and get a complimentary Hair Spa session. Reply YES to book.' }
  ],
  gym: [
    { id: 'camp-g1', type: 'Re-engage Campaign', channel: 'whatsapp', audience: 'Inactive Members', prompt: 'Absent members re-engagement free nutrition coach session', subject: 'We Miss You!', content: 'Hey Champ! We noticed you haven\'t been in the gym lately. Let\'s get back on track together! Reply to this message to book a free 30-min goal setting and nutrition review with Coach Vikram. Let\'s crush it!' }
  ],
  retail: [
    { id: 'camp-r1', type: 'New Arrivals', channel: 'instagram', audience: 'All Customers', prompt: 'Summer silk dress new stock launch post', subject: 'Summer Silk Edition', content: 'Effortless elegance. ✨ Our Silk Summer Dress is finally back in stock in emerald, coral, and midnight blue. Tailored fit, breathable premium silk. Visit our boutique or tap the link in bio to shop now before it sells out again!' }
  ]
};
