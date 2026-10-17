/**
 * Clarke Family Reunion 2026 — Core Application Engine & Shared State
 * Global Namespace: window.ClarkeApp
 */

(function (window) {
  'use strict';

  var STORAGE_KEY = 'clarke26_v3_state';
  var CHANNEL_NAME = 'clarke26_channel';
  var CMD_KEY = 'clarke26_cmd';

  // Helper to generate clean SVG Data URIs for offline heritage photos
  function createSvgPhoto(title, subtitle, color1, color2, iconType) {
    var iconSvg = '';
    if (iconType === 'crest') {
      iconSvg = '<rect x="280" y="160" width="240" height="280" rx="12" fill="#253528" stroke="#dfd3b8" stroke-width="4"/>' +
                '<circle cx="340" cy="220" r="22" fill="#dfd3b8"/>' +
                '<circle cx="400" cy="220" r="22" fill="#dfd3b8"/>' +
                '<circle cx="460" cy="220" r="22" fill="#dfd3b8"/>' +
                '<path d="M400,280 A25,25 0 0,0 400,330 A20,20 0 0,1 400,280" fill="#dfd3b8"/>' +
                '<text x="400" y="390" font-family="Georgia, serif" font-size="15" fill="#dfd3b8" text-anchor="middle" font-style="italic">ye shall drink of the brook by the way</text>';
    } else if (iconType === 'papanui') {
      iconSvg = '<polygon points="400,200 220,320 580,320" fill="#3b5a42"/>' +
                '<rect x="250" y="320" width="300" height="200" fill="#253528" stroke="#dfd3b8" stroke-width="2"/>' +
                '<rect x="360" y="400" width="80" height="120" fill="#dfd3b8"/>' +
                '<rect x="280" y="350" width="50" height="50" fill="#1b281e" stroke="#dfd3b8"/>' +
                '<rect x="470" y="350" width="50" height="50" fill="#1b281e" stroke="#dfd3b8"/>' +
                '<text x="400" y="290" font-family="sans-serif" font-size="16" fill="#f4eee1" text-anchor="middle" font-weight="bold">PAPANUI CLUB • CHRISTCHURCH</text>';
    } else if (iconType === 'homestead') {
      iconSvg = '<polygon points="400,220 230,340 570,340" fill="#6ca177"/>' +
                '<rect x="260" y="340" width="280" height="190" fill="#253528" stroke="#dfd3b8" stroke-width="2"/>' +
                '<rect x="370" y="420" width="60" height="110" fill="#b84a39"/>' +
                '<circle cx="400" cy="280" r="24" fill="#dfd3b8"/>';
    } else {
      iconSvg = '<circle cx="400" cy="320" r="80" fill="#3b5a42" stroke="#dfd3b8" stroke-width="3"/>' +
                '<text x="400" y="330" font-family="Georgia, serif" font-size="36" fill="#f4eee1" text-anchor="middle" font-weight="bold">C</text>';
    }

    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">' +
      '<defs>' +
      '<linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" stop-color="' + color1 + '"/>' +
      '<stop offset="100%" stop-color="' + color2 + '"/>' +
      '</linearGradient>' +
      '</defs>' +
      '<rect width="800" height="600" fill="url(#g1)"/>' +
      '<rect x="20" y="20" width="760" height="560" fill="none" stroke="#dfd3b8" stroke-width="2" stroke-dasharray="8 4"/>' +
      iconSvg +
      '<rect x="40" y="500" width="720" height="65" rx="8" fill="rgba(27,40,30,0.92)" stroke="#dfd3b8" stroke-width="1"/>' +
      '<text x="60" y="528" font-family="Georgia, serif" font-size="20" font-weight="bold" fill="#f4eee1">' + title + '</text>' +
      '<text x="60" y="550" font-family="-apple-system, sans-serif" font-size="13" fill="#dfd3b8">' + subtitle + '</text>' +
      '</svg>';

    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  var DEFAULT_STATE = {
    eventInfo: {
      title: "Clarke Family Reunion",
      titleMi: "Te Huihuinga Whānau o Clarke",
      crestTitle: "Clarkes of Chipley, Somersetshire",
      motto: "Ye shall drink of the brook by the way",
      subtitle: "Join us for an evening of good company, great conversation, and plenty of laughter.",
      subtitleMi: "Kia Whakatōmuri Te Haere Whakamua — Good company, great conversation, and plenty of laughter.",
      dateISO: "2026-10-17T19:30:00+13:00",
      dateDisplay: "Oct 17 2026 • From 7:30pm",
      location: "Papanui Club, 310 Sawyers Arms Road, Bishopdale, Christchurch 8053",
      registrationFeeNote: "To help cover event costs, there will be a registration fee for all attendees.",
      rsvpDeadline: "31 July 2026",
      rsvpEmail: "ashleycroons@yahoo.com",
      rsvpPhone: "027 584 4663",
      wifiSsid: "PapanuiClub_Guest",
      wifiPass: "Clarke2026",
      sharedAlbumUrl: "https://photos.app.goo.gl/6fGko2NUqKfQp7866",
      sharedAlbumTitle: "2026 -CLARKE FAMILY REUNION",
      emergencyNotice: ""
    },
    settings: {
      useTeReo: false, // Default: English (OFF)
      slideDurationSec: 10,
      isPaused: false,
      isLocked: false
    },
    schedule: [
      {
        dayNumber: 1,
        dayName: "Evening Reunion Celebration",
        dayNameMi: "Hākari Whakawhanaunga",
        dateString: "Saturday, 17 October 2026",
        items: [
          { time: "19:00", title: "Doors Open & Guest Check-In", location: "Papanui Club Main Entrance", lead: "Ashley Croons & Reception" },
          { time: "19:30", title: "Reunion Commences — Welcome & Drinks", location: "Lounge & Banquet Hall", lead: "Host Committee" },
          { time: "20:00", title: "Official Welcome & Chipley Crest Presentation", location: "Main Stage", lead: "Family Historians" },
          { time: "20:30", title: "Reunion Buffet Dinner & Conversations", location: "Dining Hall", lead: "Papanui Club Catering" },
          { time: "21:30", title: "Family Roll Call & Heritage Showcase", location: "Main Stage", lead: "Branch Coordinators" },
          { time: "22:30", title: "Evening Toast & Official Photographs", location: "Banquet Hall", lead: "All Clarke Descendants" }
        ]
      },
      {
        dayNumber: 2,
        dayName: "Sunday Whānau Gathering",
        dayNameMi: "Hui Whakakapi o te Rātapu",
        dateString: "Sunday, 18 October 2026",
        items: [
          { time: "10:30", title: "Morning Tea & Coffee Mingling", location: "Bishopdale Park Cafe", lead: "Canterbury Branch" },
          { time: "12:00", title: "Historic Canterbury Pioneer Walking Tour", location: "Christchurch Landmarks", lead: "Local Heritage Guides" },
          { time: "14:00", title: "Farewell Afternoon Tea & 2028 Planning", location: "Papanui Club Pavilion", lead: "Organizing Committee" }
        ]
      }
    ],
    rsvps: [
      { id: "rsvp-01", name: "Ashley Croons", branch: "Christchurch & Canterbury Branch", adults: 2, kids: 1, dietary: "None", status: "Confirmed", checkedIn: true, timestamp: "2026-06-10T09:15:00Z" },
      { id: "rsvp-02", name: "David & Margaret Clarke", branch: "Chipley Somerset Line", adults: 2, kids: 0, dietary: "Gluten-Free (1)", status: "Confirmed", checkedIn: true, timestamp: "2026-06-12T11:20:00Z" },
      { id: "rsvp-03", name: "James Clarke", branch: "Christchurch & Canterbury Branch", adults: 2, kids: 2, dietary: "None", status: "Confirmed", checkedIn: true, timestamp: "2026-06-15T14:40:00Z" },
      { id: "rsvp-04", name: "Sarah & Robert Macfarlane", branch: "North Canterbury Branch", adults: 2, kids: 1, dietary: "Vegetarian", status: "Confirmed", checkedIn: false, timestamp: "2026-06-18T10:05:00Z" },
      { id: "rsvp-05", name: "Alistair Clarke", branch: "Otago & Southern Line", adults: 1, kids: 0, dietary: "None", status: "Confirmed", checkedIn: true, timestamp: "2026-06-20T16:30:00Z" },
      { id: "rsvp-06", name: "Dr. Elizabeth Clarke-Hall", branch: "North Island Clarke Branch", adults: 2, kids: 2, dietary: "Nut Allergy", status: "Confirmed", checkedIn: false, timestamp: "2026-06-25T08:50:00Z" },
      { id: "rsvp-07", name: "Peter & Wendy Clarke", branch: "Christchurch & Canterbury Branch", adults: 2, kids: 0, dietary: "None", status: "Confirmed", checkedIn: true, timestamp: "2026-07-02T13:15:00Z" },
      { id: "rsvp-08", name: "Hannah Clarke & Partner", branch: "North Canterbury Branch", adults: 2, kids: 2, dietary: "Dairy-Free", status: "Confirmed", checkedIn: false, timestamp: "2026-07-05T17:45:00Z" },
      { id: "rsvp-09", name: "Colin Clarke", branch: "Otago & Southern Line", adults: 2, kids: 1, dietary: "None", status: "Confirmed", checkedIn: true, timestamp: "2026-07-10T12:00:00Z" },
      { id: "rsvp-10", name: "Michael & Brenda Clarke", branch: "Chipley Somerset Line", adults: 2, kids: 0, dietary: "Diabetic Friendly", status: "Confirmed", checkedIn: true, timestamp: "2026-07-15T09:30:00Z" },
      { id: "rsvp-11", name: "Richard Clarke", branch: "North Island Clarke Branch", adults: 1, kids: 0, dietary: "None", status: "Confirmed", checkedIn: false, timestamp: "2026-07-18T15:10:00Z" },
      { id: "rsvp-12", name: "Thomas & Emma Clarke", branch: "Christchurch & Canterbury Branch", adults: 2, kids: 3, dietary: "None", status: "Confirmed", checkedIn: true, timestamp: "2026-07-22T11:45:00Z" },
      { id: "rsvp-13", name: "Graeme & Lynette Clarke", branch: "North Canterbury Branch", adults: 2, kids: 0, dietary: "None", status: "Confirmed", checkedIn: false, timestamp: "2026-07-25T14:20:00Z" },
      { id: "rsvp-14", name: "Stuart Clarke", branch: "Chipley Somerset Line", adults: 2, kids: 2, dietary: "Gluten-Free", status: "Confirmed", checkedIn: true, timestamp: "2026-07-28T16:00:00Z" },
      { id: "rsvp-15", name: "Victoria Clarke", branch: "Otago & Southern Line", adults: 1, kids: 1, dietary: "Pescatarian", status: "Confirmed", checkedIn: false, timestamp: "2026-07-30T10:30:00Z" }
    ],
    photos: [
      {
        id: "p0",
        title: "2026 -CLARKE FAMILY REUNION Official Album",
        year: 2026,
        branch: "All Branches",
        caption: "Google Photos Shared Album • Scan QR code to view & upload your family photos.",
        url: "https://lh3.googleusercontent.com/pw/AP1GczPX_28XDjgr8KnIoeqqZgKsmFZKgnRZO7jzbES67iKOUlhJZXsvUMvXsF8uSJhxl9JWs1nD_ExTLGKgHg8gp_z4hnWSp1ilYQI2kXPylpJB7L3oPJ_l=w1200"
      },
      {
        id: "p1",
        title: "Official Clarke Family Reunion Invitation",
        year: 2026,
        branch: "All Branches",
        caption: "Join us at Papanui Club, 310 Sawyers Arms Road, Bishopdale, Christchurch on Oct 17 2026 from 7:30pm.",
        url: "clarke_invitation.jpg"
      },
      {
        id: "p2",
        title: "Clarkes of Chipley, Somersetshire Crest",
        year: 1680,
        branch: "Chipley Somerset Line",
        caption: "Three escallop shells and crescent with motto: 'Ye shall drink of the brook by the way'.",
        url: "clarke_crest.jpg"
      },
      {
        id: "p3",
        title: "Historic Canterbury Pioneer Homestead",
        year: 1878,
        branch: "Christchurch & Canterbury Branch",
        caption: "Early Canterbury Clarke settlers homestead and orchard in Bishopdale.",
        url: createSvgPhoto("Canterbury Pioneer Homestead (1878)", "Bishopdale Settlers Estate", "#1b281e", "#3b5a42", "homestead")
      },
      {
        id: "p4",
        title: "Papanui Club Venue & Pavilion",
        year: 2026,
        branch: "All Branches",
        caption: "Venue for our evening celebration • 310 Sawyers Arms Road, Bishopdale, Christchurch.",
        url: createSvgPhoto("Papanui Club Venue (2026)", "Bishopdale, Christchurch", "#253528", "#6ca177", "papanui")
      },
      {
        id: "p5",
        title: "Clarke Family Heritage Gathering",
        year: 1954,
        branch: "North Canterbury Branch",
        caption: "Generations gathered at Rangiora for the golden jubilee family reunion.",
        url: createSvgPhoto("Heritage Gathering at Rangiora (1954)", "North Canterbury Jubilee", "#1b281e", "#2f4233", "homestead")
      },
      {
        id: "p6",
        title: "Next Generation of Clarke Descendants",
        year: 2024,
        branch: "All Branches",
        caption: "Tamariki and youth carrying the Clarke lineage forward with pride.",
        url: createSvgPhoto("Next Generation Descendants (2024)", "Canterbury Youth & Families", "#253528", "#3b5a42", "crest")
      }
    ],
    familyTree: {
      founders: "Clarkes of Chipley, Somersetshire & Canterbury Pioneers",
      branches: [
        {
          id: "branch-1",
          name: "Chipley Somerset Line",
          ancestor: "Edward Clarke of Chipley (1650–1710)",
          era: "Somersetshire Ancestral Seat",
          motto: "Ye shall drink of the brook by the way",
          membersCount: 112,
          highlights: "Ancient Somersetshire estate, Member of Parliament, friend of philosopher John Locke",
          keyMembers: ["David Clarke", "Michael Clarke", "Stuart Clarke"]
        },
        {
          id: "branch-2",
          name: "Christchurch & Canterbury Branch",
          ancestor: "Thomas & Elizabeth Clarke (arr. Lyttelton 1862)",
          era: "Canterbury Pioneers",
          motto: "Forward with courage and industrious hands",
          membersCount: 94,
          highlights: "Bishopdale orchards, Papanui builders, Canterbury merchants & civic leaders",
          keyMembers: ["Ashley Croons", "James Clarke", "Peter Clarke"]
        },
        {
          id: "branch-3",
          name: "North Canterbury Branch",
          ancestor: "William Henry Clarke (1868–1941)",
          era: "Rangiora & Hurunui Settlers",
          motto: "Strength in soil and community",
          membersCount: 65,
          highlights: "Agricultural pioneers, pastoral estates, Rangiora community builders",
          keyMembers: ["Sarah Macfarlane", "Hannah Clarke", "Graeme Clarke"]
        },
        {
          id: "branch-4",
          name: "Otago & Southern Line",
          ancestor: "George & Sarah Clarke (1874–1953)",
          era: "Dunedin & Southland Line",
          motto: "Unyielding through southern seasons",
          membersCount: 58,
          highlights: "Education, legal scholars, southern engineers, Dunedin educators",
          keyMembers: ["Alistair Clarke", "Colin Clarke", "Victoria Clarke"]
        },
        {
          id: "branch-5",
          name: "North Island Clarke Branch",
          ancestor: "Arthur & Margaret Clarke (1880–1960)",
          era: "Wellington & Auckland Line",
          motto: "Connecting past traditions to future horizons",
          membersCount: 76,
          highlights: "Maritime trade, public service, healthcare leaders",
          keyMembers: ["Dr. Elizabeth Clarke-Hall", "Richard Clarke"]
        }
      ]
    },
    memoriam: [
      {
        id: "mem-1",
        name: "Arthur Thomas Clarke",
        years: "1928 – 2021",
        branch: "Christchurch & Canterbury Branch",
        tribute: "Cherished patriarch, lifelong Bishopdale resident, keeper of the Canterbury family records.",
        role: "Family Elder & Historian"
      },
      {
        id: "mem-2",
        name: "Margaret Eleanor Clarke (née Wood)",
        years: "1932 – 2023",
        branch: "Chipley Somerset Line",
        tribute: "Beloved matriarch whose warmth, devotion, and hospitality brought every branch together.",
        role: "Matriarch"
      },
      {
        id: "mem-3",
        name: "William 'Bill' Henry Clarke Jr.",
        years: "1935 – 2024",
        branch: "North Canterbury Branch",
        tribute: "Respected Hurunui farmer, generous community servant, and champion of rural sports.",
        role: "Community Leader"
      },
      {
        id: "mem-4",
        name: "Dorothy 'Dot' Clarke-Sinclair",
        years: "1940 – 2025",
        branch: "Otago & Southern Line",
        tribute: "Dedicated Dunedin teacher, loving grandmother, and passionate genealogist.",
        role: "Genealogist & Educator"
      },
      {
        id: "mem-5",
        name: "Edward John Clarke",
        years: "1945 – 2022",
        branch: "North Island Clarke Branch",
        tribute: "Engineer, mentor, and beloved uncle whose infectious laughter filled every family reunion.",
        role: "Youth Mentor"
      }
    ],
    announcements: [
      {
        id: "ann-1",
        title: "Please RSVP by 31 July 2026",
        body: "Kindly RSVP by 31 July to Ashley Croons at ashleycroons@yahoo.com or text/call 027 584 4663 with your guest counts.",
        priority: "high",
        time: "RSVP Deadline: 31 July",
        author: "Ashley Croons",
        pinned: true
      },
      {
        id: "ann-2",
        title: "Registration Fee Notice",
        body: "To help cover event costs, there will be a registration fee for all attendees. Details will be provided upon RSVP.",
        priority: "high",
        time: "Event Cost Notice",
        author: "Reunion Committee",
        pinned: true
      },
      {
        id: "ann-3",
        title: "Venue & Parking at Papanui Club",
        body: "Celebration begins 7:30 PM at Papanui Club, 310 Sawyers Arms Road, Bishopdale. Plentiful free off-street parking.",
        priority: "normal",
        time: "Oct 17 • From 7:30 PM",
        author: "Papanui Club Coordination",
        pinned: false
      },
      {
        id: "ann-4",
        title: "Heritage Photographs & Archival Display",
        body: "Please bring vintage prints, album photos, or email digital scans to display on our archival slideshow screen.",
        priority: "normal",
        time: "Bring along Oct 17",
        author: "Heritage Committee",
        pinned: false
      }
    ],
    potluck: [
      { id: "pot-1", item: "Savory Party Platters & Canapés", category: "Supper", neededQty: "4 Platters", claimedBy: "Ashley Croons", branch: "Christchurch & Canterbury Branch", status: "Claimed" },
      { id: "pot-2", item: "Celebration Reunion Cake", category: "Baking", neededQty: "1 Large Cake", claimedBy: "Sarah Macfarlane", branch: "North Canterbury Branch", status: "Claimed" },
      { id: "pot-3", item: "Artisan Cheese & Cracker Boards", category: "Finger Food", neededQty: "3 Boards", claimedBy: "David & Margaret Clarke", branch: "Chipley Somerset Line", status: "Claimed" },
      { id: "pot-4", item: "Fresh Berry & Pavlova Dessert", category: "Desserts", neededQty: "2 Platters", claimedBy: "Peter Clarke", branch: "Christchurch & Canterbury Branch", status: "Claimed" },
      { id: "pot-5", item: "Sparkling Toast & Non-Alcoholic Punch", category: "Beverages", neededQty: "5 Decanters", claimedBy: "Alistair Clarke", branch: "Otago & Southern Line", status: "Claimed" },
      { id: "pot-6", item: "Gluten-Free Sweet Bites", category: "Baking", neededQty: "2 Boxes", claimedBy: "Stuart Clarke", branch: "Chipley Somerset Line", status: "Claimed" },
      { id: "pot-7", item: "Gourmet Slider Buns", category: "Supper", neededQty: "40 Sliders", claimedBy: "Unclaimed", branch: "Open to Any", status: "Needed" },
      { id: "pot-8", item: "Fruit Skewers & Grapes Platter", category: "Fresh Produce", neededQty: "3 Platters", claimedBy: "Unclaimed", branch: "Open to Any", status: "Needed" }
    ],
    trivia: [
      {
        id: "triv-1",
        question: "What is the historic English ancestral home of our Clarke lineage depicted on the crest?",
        options: ["Clarkes of Chipley, Somersetshire", "Clarkes of Yorkshire", "Clarkes of Cornwall", "Clarkes of Kent"],
        answerIndex: 0,
        fact: "The Clarkes of Chipley originated in Somersetshire, England with ancestral roots dating back to the 17th century.",
        points: 50
      },
      {
        id: "triv-2",
        question: "What three heraldic symbols are depicted on the upper third of the Clarke shield?",
        options: ["Three Oak Leaves", "Three Scallop Shells (Escallops)", "Three Golden Stars", "Three Silver Lions"],
        answerIndex: 1,
        fact: "The three scallop shells traditionally symbolize pilgrimage, journey across waters, and enduring family lineage.",
        points: 50
      },
      {
        id: "triv-3",
        question: "What is the ancestral family motto written on the banner of the Clarke crest?",
        options: ["Fortis et Fidelis", "Ye shall drink of the brook by the way", "To the stars through hardship", "Unity is our strength"],
        answerIndex: 1,
        fact: "Taken from Psalm 110:7, 'Ye shall drink of the brook by the way' signifies refreshment, resilience, and sustenance along life's journey.",
        points: 50
      },
      {
        id: "triv-4",
        question: "Where is the 2026 Clarke Family Reunion being hosted on Saturday, 17 October?",
        options: ["Christchurch Town Hall", "Papanui Club, 310 Sawyers Arms Road, Bishopdale", "Riccarton House Grounds", "Sumner Surf Life Saving Club"],
        answerIndex: 1,
        fact: "The reunion celebration takes place from 7:30pm at Papanui Club, 310 Sawyers Arms Road, Bishopdale, Christchurch.",
        points: 50
      },
      {
        id: "triv-5",
        question: "By what date are family attendees requested to RSVP to Ashley Croons?",
        options: ["30 June 2026", "31 July 2026", "31 August 2026", "30 September 2026"],
        answerIndex: 1,
        fact: "RSVPs close on 31 July 2026 via ashleycroons@yahoo.com or 027 584 4663 to confirm venue arrangements.",
        points: 50
      }
    ],
    branchScores: {
      "Chipley Somerset Line": 210,
      "Christchurch & Canterbury Branch": 195,
      "North Canterbury Branch": 170,
      "Otago & Southern Line": 160,
      "North Island Clarke Branch": 185
    }
  };

  // Safe deep clone
  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  // Storage and State Operations
  function getState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        var initial = clone(DEFAULT_STATE);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
        return initial;
      }
      var parsed = JSON.parse(raw);
      // Ensure missing keys are merged from default
      for (var key in DEFAULT_STATE) {
        if (!parsed.hasOwnProperty(key)) {
          parsed[key] = clone(DEFAULT_STATE[key]);
        }
      }
      return parsed;
    } catch (e) {
      console.warn('ClarkeApp: Failed reading localStorage, using DEFAULT_STATE', e);
      return clone(DEFAULT_STATE);
    }
  }

  function saveState(newState) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      broadcast({ type: 'STATE_UPDATED', state: newState });
      return true;
    } catch (e) {
      console.error('ClarkeApp: saveState failed', e);
      return false;
    }
  }

  function resetState() {
    var fresh = clone(DEFAULT_STATE);
    saveState(fresh);
    return fresh;
  }

  // Te Reo Māori Localization Helpers
  function t(enStr, miStr) {
    try {
      var s = getState();
      if (s && s.settings && s.settings.useTeReo && miStr) {
        return miStr;
      }
    } catch (e) {}
    return enStr;
  }

  function toggleTeReo(val) {
    var s = getState();
    if (!s.settings) s.settings = {};
    if (typeof val === 'boolean') {
      s.settings.useTeReo = val;
    } else {
      s.settings.useTeReo = !s.settings.useTeReo;
    }
    saveState(s);
    sendCommand('toggleTeReo', s.settings.useTeReo);
    return s.settings.useTeReo;
  }

  // Real-time Communication (BroadcastChannel + storage event fallback)
  var channel = null;
  try {
    if (typeof window.BroadcastChannel === 'function') {
      channel = new window.BroadcastChannel(CHANNEL_NAME);
    }
  } catch (e) {
    console.warn('ClarkeApp: BroadcastChannel unavailable', e);
  }

  function broadcast(msg) {
    if (channel) {
      try {
        channel.postMessage(msg);
      } catch (err) {
        console.warn('ClarkeApp: Broadcast error', err);
      }
    }
  }

  function sendCommand(cmd, payload) {
    var message = {
      cmd: cmd,
      payload: payload || null,
      timestamp: Date.now()
    };
    broadcast({ type: 'COMMAND', data: message });
    try {
      localStorage.setItem(CMD_KEY, JSON.stringify(message));
    } catch (e) {
      // ignore
    }
  }

  function onStateChange(callback) {
    if (channel) {
      channel.addEventListener('message', function (ev) {
        if (ev.data && ev.data.type === 'STATE_UPDATED') {
          callback(ev.data.state);
        }
      });
    }
    window.addEventListener('storage', function (ev) {
      if (ev.key === STORAGE_KEY && ev.newValue) {
        try {
          callback(JSON.parse(ev.newValue));
        } catch (e) {}
      }
    });
  }

  function onCommand(callback) {
    if (channel) {
      channel.addEventListener('message', function (ev) {
        if (ev.data && ev.data.type === 'COMMAND') {
          callback(ev.data.data);
        }
      });
    }
    window.addEventListener('storage', function (ev) {
      if (ev.key === CMD_KEY && ev.newValue) {
        try {
          callback(JSON.parse(ev.newValue));
        } catch (e) {}
      }
    });
  }

  // Formatting & Clock Utilities
  function formatClockWithBlinkingColons(date) {
    var d = date || new Date();
    var hours = String(d.getHours()).padStart(2, '0');
    var mins = String(d.getMinutes()).padStart(2, '0');
    var secs = String(d.getSeconds()).padStart(2, '0');
    return hours + '<span class="blink-colon">:</span>' + mins + '<span class="blink-colon">:</span>' + secs;
  }

  function getCountdownParts(targetISO) {
    var target = new Date(targetISO).getTime();
    var now = Date.now();
    var diffMs = target - now;
    if (diffMs <= 0) {
      return { days: 0, hours: 0, mins: 0, secs: 0, isPassed: true, totalSec: 0 };
    }
    var totalSec = Math.floor(diffMs / 1000);
    var days = Math.floor(totalSec / 86400);
    var hours = Math.floor((totalSec % 86400) / 3600);
    var mins = Math.floor((totalSec % 3600) / 60);
    var secs = totalSec % 60;
    return {
      days: days,
      hours: hours,
      mins: mins,
      secs: secs,
      isPassed: false,
      totalSec: totalSec
    };
  }

  // JSON / CSV Export & Import Utilities
  function exportJSON() {
    var data = getState();
    var jsonStr = JSON.stringify(data, null, 2);
    var blob = new Blob([jsonStr], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'clarke26_state_backup_' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function importJSON(jsonStr) {
    try {
      var parsed = JSON.parse(jsonStr);
      if (!parsed || typeof parsed !== 'object') {
        throw new Error('Invalid JSON structure');
      }
      saveState(parsed);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  function exportRSVPsCSV() {
    var state = getState();
    var list = state.rsvps || [];
    var headers = ['ID', 'Name', 'Branch', 'Adults', 'Kids', 'Dietary', 'Status', 'CheckedIn', 'Timestamp'];
    var rows = list.map(function (r) {
      return [
        r.id || '',
        '"' + (r.name || '').replace(/"/g, '""') + '"',
        '"' + (r.branch || '').replace(/"/g, '""') + '"',
        r.adults || 0,
        r.kids || 0,
        '"' + (r.dietary || '').replace(/"/g, '""') + '"',
        r.status || 'Confirmed',
        r.checkedIn ? 'YES' : 'NO',
        r.timestamp || ''
      ].join(',');
    });
    var csvContent = headers.join(',') + '\n' + rows.join('\n');
    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'clarke26_rsvps_' + new Date().toISOString().slice(0, 10) + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Expose API
  window.ClarkeApp = {
    STORAGE_KEY: STORAGE_KEY,
    CHANNEL_NAME: CHANNEL_NAME,
    CMD_KEY: CMD_KEY,
    DEFAULT_STATE: DEFAULT_STATE,
    getState: getState,
    saveState: saveState,
    resetState: resetState,
    t: t,
    toggleTeReo: toggleTeReo,
    sendCommand: sendCommand,
    onStateChange: onStateChange,
    onCommand: onCommand,
    formatClockWithBlinkingColons: formatClockWithBlinkingColons,
    getCountdownParts: getCountdownParts,
    exportJSON: exportJSON,
    importJSON: importJSON,
    exportRSVPsCSV: exportRSVPsCSV,
    createSvgPhoto: createSvgPhoto
  };

})(window);
