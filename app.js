/**
 * Clarke Whānau Reunion 2026 — Core Application Engine & Shared State
 * Global Namespace: window.ClarkeApp
 */

(function (window) {
  'use strict';

  var STORAGE_KEY = 'clarke26_state';
  var CHANNEL_NAME = 'clarke26_channel';
  var CMD_KEY = 'clarke26_cmd';

  // Helper to generate clean SVG Data URIs for offline heritage photos
  function createSvgPhoto(title, subtitle, color1, color2, iconType) {
    var iconSvg = '';
    if (iconType === 'homestead') {
      iconSvg = '<polygon points="400,240 240,360 560,360" fill="#f3cc56" opacity="0.85"/>' +
                '<rect x="270" y="360" width="260" height="200" fill="#f0f6fc" opacity="0.9"/>' +
                '<rect x="370" y="440" width="60" height="120" fill="#c93b2b"/>' +
                '<rect x="300" y="390" width="50" height="50" fill="#161b22"/>' +
                '<rect x="450" y="390" width="50" height="50" fill="#161b22"/>';
    } else if (iconType === 'waka') {
      iconSvg = '<path d="M180,480 Q400,530 620,480 Q560,420 400,430 Q240,420 180,480 Z" fill="#d4af37"/>' +
                '<line x1="280" y1="380" x2="280" y2="440" stroke="#f0f6fc" stroke-width="4"/>' +
                '<line x1="360" y1="360" x2="360" y2="440" stroke="#f0f6fc" stroke-width="4"/>' +
                '<line x1="440" y1="360" x2="440" y2="440" stroke="#f0f6fc" stroke-width="4"/>' +
                '<line x1="520" y1="380" x2="520" y2="440" stroke="#f0f6fc" stroke-width="4"/>' +
                '<polygon points="400,280 400,430 480,360" fill="#c93b2b" opacity="0.9"/>';
    } else if (iconType === 'tupuna') {
      iconSvg = '<circle cx="400" cy="340" r="70" fill="#f3cc56" opacity="0.85"/>' +
                '<circle cx="375" cy="330" r="8" fill="#161b22"/>' +
                '<circle cx="425" cy="330" r="8" fill="#161b22"/>' +
                '<path d="M375,370 Q400,390 425,370" stroke="#161b22" stroke-width="4" fill="none"/>' +
                '<path d="M260,540 Q400,440 540,540 Z" fill="#c93b2b" opacity="0.9"/>' +
                '<line x1="400" y1="410" x2="400" y2="480" stroke="#f3cc56" stroke-width="6"/>';
    } else if (iconType === 'marae') {
      iconSvg = '<polygon points="400,220 200,340 600,340" fill="#c93b2b"/>' +
                '<rect x="240" y="340" width="320" height="220" fill="#1f6f50"/>' +
                '<polygon points="400,190 380,240 420,240" fill="#d4af37"/>' +
                '<rect x="360" y="420" width="80" height="140" fill="#d4af37"/>' +
                '<line x1="200" y1="340" x2="600" y2="340" stroke="#f3cc56" stroke-width="8"/>';
    } else {
      iconSvg = '<circle cx="400" cy="380" r="90" fill="#d4af37" opacity="0.6"/>' +
                '<polygon points="400,260 430,340 515,340 445,390 475,470 400,420 325,470 355,390 285,340 370,340" fill="#f3cc56"/>';
    }

    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">' +
      '<defs>' +
      '<linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" stop-color="' + color1 + '"/>' +
      '<stop offset="100%" stop-color="' + color2 + '"/>' +
      '</linearGradient>' +
      '<pattern id="kowhaiwhai" width="40" height="40" patternUnits="userSpaceOnUse">' +
      '<path d="M0,20 Q20,0 40,20 Q20,40 0,20" fill="none" stroke="rgba(212,175,55,0.08)" stroke-width="2"/>' +
      '</pattern>' +
      '</defs>' +
      '<rect width="800" height="600" fill="url(#grad)"/>' +
      '<rect width="800" height="600" fill="url(#kowhaiwhai)"/>' +
      iconSvg +
      '<rect x="40" y="500" width="720" height="70" rx="8" fill="rgba(13,17,23,0.85)" stroke="#d4af37" stroke-width="1"/>' +
      '<text x="60" y="534" font-family="-apple-system, sans-serif" font-size="20" font-weight="bold" fill="#f0f6fc">' + title + '</text>' +
      '<text x="60" y="556" font-family="-apple-system, sans-serif" font-size="14" fill="#d4af37">' + subtitle + '</text>' +
      '</svg>';

    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  var DEFAULT_STATE = {
    eventInfo: {
      title: "CLARKE WHĀNAU REUNION 2026",
      subtitle: "Kia Whakatōmuri Te Haere Whakamua — Honouring Our Past, Building Our Future",
      dateISO: "2026-12-26T10:00:00+13:00",
      location: "Waitangi Treaty Grounds & Clarke Homestead, Bay of Islands",
      wifiSsid: "ClarkeReunion2026",
      wifiPass: "Whanau2026",
      emergencyNotice: ""
    },
    settings: {
      slideDurationSec: 10,
      isPaused: false,
      isLocked: false
    },
    schedule: [
      {
        dayNumber: 1,
        dayName: "Day 1 — Welcome & Mihimihi",
        dateString: "Friday, 26 December 2026",
        items: [
          { time: "09:30", title: "Registration & Welcome Tea", location: "Marquee A, Treaty Grounds", lead: "Arrivals Committee" },
          { time: "10:30", title: "Official Pōwhiri & Mihimihi", location: "Te Whare Rūnanga (Waitangi)", lead: "Kaumātua & Kuia" },
          { time: "12:30", title: "Whakawhanaungatanga Light Kai", location: "Wharekai Grounds", lead: "Te Ariki Branch" },
          { time: "14:00", title: "Whānau Generation Photo Session", location: "Treaty Grounds Flagstaff", lead: "Wiremu Clarke Line" },
          { time: "16:30", title: "Welcome Hākari Dinner & Waiata", location: "Main Dining Hall", lead: "All Branches" }
        ]
      },
      {
        dayNumber: 2,
        dayName: "Day 2 — Whakapapa & Games",
        dateString: "Saturday, 27 December 2026",
        items: [
          { time: "09:00", title: "Whakapapa Workshop & Oral Archives", location: "Heritage Marquee", lead: "Aroha & Rawiri Branch" },
          { time: "11:00", title: "Whānau Olympics & Kī-o-Rahi", location: "Waitangi Sports Field", lead: "Youth Committee" },
          { time: "13:00", title: "Grand Hāngī Lifting & Feast", location: "Clarke Homestead Paddock", lead: "Hāngī Pit Masters" },
          { time: "15:30", title: "Historic Clarke Homestead Walking Tour", location: "Homestead & Orchard", lead: "Hemi & Mere Branch" },
          { time: "19:00", title: "Archival Photo Night & Whānau Got Talent", location: "Main Stage Marquee", lead: "Kahu Southern Line" }
        ]
      },
      {
        dayNumber: 3,
        dayName: "Day 3 — Memorial & Poroporoaki",
        dateString: "Sunday, 28 December 2026",
        items: [
          { time: "09:30", title: "Memorial Service (He Whakamaumaharatanga)", location: "Waitangi Memorial Garden", lead: "Whānau Kaumātua" },
          { time: "11:30", title: "Whānau Trust AGM & 2030 Handover", location: "Te Whare Rūnanga Annex", lead: "Executive Committee" },
          { time: "13:00", title: "Poroporoaki Farewell & Kai Oti", location: "Marquee A", lead: "All Branches" },
          { time: "15:00", title: "Safe Travels Whānau Karakia", location: "Main Gate Grounds", lead: "Kaumātua Tane" }
        ]
      }
    ],
    rsvps: [
      { id: "rsvp-01", name: "Tane Clarke", branch: "Te Ariki Branch", adults: 2, kids: 2, dietary: "None", status: "Confirmed", checkedIn: true, timestamp: "2026-10-15T09:12:00Z" },
      { id: "rsvp-02", name: "Moana Clarke-Smith", branch: "Wiremu Clarke Line", adults: 3, kids: 1, dietary: "Gluten-Free", status: "Confirmed", checkedIn: true, timestamp: "2026-10-15T10:45:00Z" },
      { id: "rsvp-03", name: "Rawiri & Aroha Clarke", branch: "Aroha & Rawiri Branch", adults: 2, kids: 0, dietary: "Diabetic Friendly", status: "Confirmed", checkedIn: true, timestamp: "2026-10-15T11:20:00Z" },
      { id: "rsvp-04", name: "Keanu & Sarah Clarke", branch: "Hemi & Mere Branch", adults: 2, kids: 3, dietary: "Vegetarian (1)", status: "Confirmed", checkedIn: false, timestamp: "2026-10-15T14:02:00Z" },
      { id: "rsvp-05", name: "Hine Kahu", branch: "Kahu Southern Line", adults: 1, kids: 0, dietary: "None", status: "Confirmed", checkedIn: true, timestamp: "2026-10-15T15:30:00Z" },
      { id: "rsvp-06", name: "Wiremu Clarke Jr.", branch: "Wiremu Clarke Line", adults: 2, kids: 2, dietary: "Nut Allergy", status: "Confirmed", checkedIn: false, timestamp: "2026-10-15T16:15:00Z" },
      { id: "rsvp-07", name: "Dr. Ngaire Clarke", branch: "Te Ariki Branch", adults: 1, kids: 1, dietary: "Pescatarian", status: "Confirmed", checkedIn: true, timestamp: "2026-10-16T08:30:00Z" },
      { id: "rsvp-08", name: "Rewi & Maraea Davis", branch: "Hemi & Mere Branch", adults: 4, kids: 2, dietary: "None", status: "Confirmed", checkedIn: false, timestamp: "2026-10-16T09:40:00Z" },
      { id: "rsvp-09", name: "Tama & Chloe Clarke", branch: "Kahu Southern Line", adults: 2, kids: 2, dietary: "Dairy-Free", status: "Confirmed", checkedIn: true, timestamp: "2026-10-16T11:05:00Z" },
      { id: "rsvp-10", name: "Marama Henare (Clarke)", branch: "Aroha & Rawiri Branch", adults: 2, kids: 1, dietary: "None", status: "Confirmed", checkedIn: true, timestamp: "2026-10-16T13:20:00Z" },
      { id: "rsvp-11", name: "Nikau & Zoe Clarke", branch: "Te Ariki Branch", adults: 2, kids: 3, dietary: "None", status: "Confirmed", checkedIn: false, timestamp: "2026-10-16T15:10:00Z" },
      { id: "rsvp-12", name: "Pania Clarke", branch: "Wiremu Clarke Line", adults: 1, kids: 0, dietary: "Vegan", status: "Confirmed", checkedIn: true, timestamp: "2026-10-16T17:00:00Z" },
      { id: "rsvp-13", name: "Ariki Clarke III", branch: "Te Ariki Branch", adults: 2, kids: 2, dietary: "None", status: "Confirmed", checkedIn: false, timestamp: "2026-10-17T08:15:00Z" },
      { id: "rsvp-14", name: "Anaru & Chelsea Clarke", branch: "Hemi & Mere Branch", adults: 2, kids: 1, dietary: "Gluten-Free (1)", status: "Confirmed", checkedIn: true, timestamp: "2026-10-17T09:00:00Z" },
      { id: "rsvp-15", name: "Kiriwai Southern-Clarke", branch: "Kahu Southern Line", adults: 2, kids: 0, dietary: "None", status: "Confirmed", checkedIn: false, timestamp: "2026-10-17T10:10:00Z" }
    ],
    photos: [
      {
        id: "p1",
        title: "Samuel & Mereana Clarke at Hokianga",
        year: 1912,
        branch: "Founders",
        caption: "Original portrait of whānau founders outside the Hokianga homestead.",
        url: createSvgPhoto("Samuel & Mereana Clarke (1912)", "Whānau Founders at Hokianga Harbour", "#161b22", "#21262d", "tupuna")
      },
      {
        id: "p2",
        title: "Clarke Homestead Orchard Harvest",
        year: 1935,
        branch: "Te Ariki Branch",
        caption: "Gathering the summer fruit harvest at the Bay of Islands family orchard.",
        url: createSvgPhoto("Homestead Orchard Harvest (1935)", "Bay of Islands Estate & Fruit Packing", "#144934", "#1f6f50", "homestead")
      },
      {
        id: "p3",
        title: "Waitangi Whānau Waka Launch",
        year: 1954,
        branch: "Wiremu Clarke Line",
        caption: "Wiremu and his sons taking part in the royal ceremonial waka escort.",
        url: createSvgPhoto("Waitangi Ceremonial Waka (1954)", "Wiremu Clarke Line at Waitangi Inlet", "#161b22", "#1f6feb", "waka")
      },
      {
        id: "p4",
        title: "Opening of Te Whare Hui",
        year: 1978,
        branch: "Hemi & Mere Branch",
        caption: "Hemi Clarke speaking on behalf of northern descendants during whare opening.",
        url: createSvgPhoto("Whare Hui Opening (1978)", "Hemi & Mere Branch Representation", "#8c2317", "#c93b2b", "marae")
      },
      {
        id: "p5",
        title: "Centennial Reunion at Paihia",
        year: 1998,
        branch: "All Branches",
        caption: "Over 280 whānau members gathered to celebrate 100 years of marriage.",
        url: createSvgPhoto("Centennial Reunion Gathering (1998)", "Paihia Centennial Celebration", "#21262d", "#aa8522", "homestead")
      },
      {
        id: "p6",
        title: "Rangatahi Kī-o-Rahi Championship",
        year: 2016,
        branch: "Youth Committee",
        caption: "Clarke descendants winning the Northland regional Whānau Kī-o-Rahi shield.",
        url: createSvgPhoto("Kī-o-Rahi Championship (2016)", "Clarke Rangatahi Victory at Kaikohe", "#144934", "#2da44e", "star")
      }
    ],
    familyTree: {
      founders: "Samuel & Mereana Clarke (m. 1898, Hokianga)",
      branches: [
        {
          id: "branch-1",
          name: "Te Ariki Branch",
          ancestor: "Te Ariki Samuel Clarke (1900–1974)",
          era: "Eldest Son Lineage",
          motto: "Kia mau ki te mana me te tika (Hold steadfast to integrity and justice)",
          membersCount: 84,
          highlights: "Caretakers of ancestral land title, Marae trustees, orchard heritage",
          keyMembers: ["Dr. Ngaire Clarke", "Ariki Clarke III", "Nikau Clarke"]
        },
        {
          id: "branch-2",
          name: "Hemi & Mere Branch",
          ancestor: "Hemi 'Jim' Clarke (1903–1981)",
          era: "Paihia & Whangarei Line",
          motto: "He kete whakairo, he mahi tahi (A carved basket made by unity)",
          membersCount: 68,
          highlights: "Tradition of Master Carvers, boat builders, teachers",
          keyMembers: ["Keanu Clarke", "Rewi Davis", "Anaru Clarke"]
        },
        {
          id: "branch-3",
          name: "Wiremu Clarke Line",
          ancestor: "Wiremu Kingi Clarke (1906–1989)",
          era: "Waitangi & Coast Line",
          motto: "Ko te Moana to tatou oranga (The ocean is our livelihood)",
          membersCount: 72,
          highlights: "Maritime pilots, waka captains, fisheries conservation leaders",
          keyMembers: ["Moana Clarke-Smith", "Wiremu Clarke Jr.", "Pania Clarke"]
        },
        {
          id: "branch-4",
          name: "Aroha & Rawiri Branch",
          ancestor: "Aroha Clarke-Reid (1910–1995)",
          era: "Auckland & Rotorua Line",
          motto: "Manaaki tangata, manaaki whenua (Uplift the people, care for the land)",
          membersCount: 59,
          highlights: "Nurses, educators, healthcare pioneers, waiata composers",
          keyMembers: ["Rawiri Clarke", "Marama Henare", "Aroha Clarke"]
        },
        {
          id: "branch-5",
          name: "Kahu Southern Line",
          ancestor: "Kahu 'Sam' Clarke (1914–2001)",
          era: "Wellington & South Island Line",
          motto: "E tu ki te tonga (Stand resolute in the south)",
          membersCount: 51,
          highlights: "Engineers, civil service, music conductors, Antarctic researchers",
          keyMembers: ["Hine Kahu", "Tama Clarke", "Kiriwai Southern-Clarke"]
        }
      ]
    },
    memoriam: [
      {
        id: "mem-1",
        name: "Uncle Hoani 'John' Clarke",
        years: "1932 – 2022",
        branch: "Te Ariki Branch",
        tribute: "Cherished Kaumātua, master of whaikōrero, keeper of genealogical records.",
        role: "Whānau Historian"
      },
      {
        id: "mem-2",
        name: "Aunty Mereana Clarke-Pita",
        years: "1938 – 2023",
        branch: "Hemi & Mere Branch",
        tribute: "Beloved matriarch whose warm smile and legendary hāngī puddings united every generation.",
        role: "Wharekai Guardian"
      },
      {
        id: "mem-3",
        name: "Captain Wiremu 'Bill' Clarke",
        years: "1940 – 2024",
        branch: "Wiremu Clarke Line",
        tribute: "Master Navigator of the Bay of Islands, respected sailor, and mentor to generations of young mariners.",
        role: "Waka Navigator"
      },
      {
        id: "mem-4",
        name: "Aroha 'Rose' Clarke-Davies",
        years: "1944 – 2025",
        branch: "Aroha & Rawiri Branch",
        tribute: "Dedicated nurse leader who served the communities of Northland and Rotorua with unwavering love.",
        role: "Community Healer"
      },
      {
        id: "mem-5",
        name: "Kahu Samuel Clarke Jr.",
        years: "1949 – 2021",
        branch: "Kahu Southern Line",
        tribute: "Pioneering mechanical engineer, whānau sports coach, and gentle soul whose laughter filled every hall.",
        role: "Youth Sports Mentor"
      }
    ],
    announcements: [
      {
        id: "ann-1",
        title: "Whānau Group Photo Scheduled",
        body: "All five branches gather at Waitangi Flagstaff at 2:00 PM Friday. Branch coordinators please assemble your lines.",
        priority: "high",
        time: "Friday 2:00 PM",
        author: "Event Committee",
        pinned: true
      },
      {
        id: "ann-2",
        title: "Hāngī Preparation Volunteers",
        body: "Pit masters start fire prep at 5:00 AM Saturday at the Homestead. Wood chopping & basket prep team needed.",
        priority: "normal",
        time: "Saturday 5:00 AM",
        author: "Hāngī Pit Crew",
        pinned: true
      },
      {
        id: "ann-3",
        title: "Shuttle Van Between Motels & Grounds",
        body: "Free whānau shuttle runs every 30 minutes between Paihia Waterfront Motels and Waitangi Treaty Grounds entrance.",
        priority: "normal",
        time: "Continuous Daily",
        author: "Transport Team",
        pinned: false
      },
      {
        id: "ann-4",
        title: "Sunblock & Water Stations Active",
        body: "Complimentary SPF50 sunblock and filtered chilled water bottles available at Marquee A and Main Gate.",
        priority: "normal",
        time: "All Weekend",
        author: "Health & Safety",
        pinned: false
      }
    ],
    potluck: [
      { id: "pot-1", item: "Gourmet Potato Salad (x2 large tubs)", category: "Salads", neededQty: "2 Trays", claimedBy: "Moana Clarke-Smith", branch: "Wiremu Clarke Line", status: "Claimed" },
      { id: "pot-2", item: "Creamed Pāua & Fried Bread", category: "Kaimoana", neededQty: "4 Trays", claimedBy: "Te Ariki Kitchen Crew", branch: "Te Ariki Branch", status: "Claimed" },
      { id: "pot-3", item: "Steamed Golden Syrup Sponge Pudding", category: "Desserts", neededQty: "3 Puddings", claimedBy: "Chelsea Clarke", branch: "Hemi & Mere Branch", status: "Claimed" },
      { id: "pot-4", item: "Fresh Sweet Corn on the Cob", category: "Sides", neededQty: "60 Cobs", claimedBy: "Rewi Davis", branch: "Hemi & Mere Branch", status: "Claimed" },
      { id: "pot-5", item: "Chilled Sweet Watermelons", category: "Fruit", neededQty: "10 Melons", claimedBy: "Rawiri & Aroha Clarke", branch: "Aroha & Rawiri Branch", status: "Claimed" },
      { id: "pot-6", item: "Gluten-Free Chocolate Brownies", category: "Baking", neededQty: "3 Tins", claimedBy: "Hine Kahu", branch: "Kahu Southern Line", status: "Claimed" },
      { id: "pot-7", item: "Trifle with Peaches & Jelly", category: "Desserts", neededQty: "2 Large Bowls", claimedBy: "Unclaimed", branch: "Open to Any", status: "Needed" },
      { id: "pot-8", item: "Artisan Sourdough Loaves & Butter", category: "Bakery", neededQty: "8 Loaves", claimedBy: "Unclaimed", branch: "Open to Any", status: "Needed" }
    ],
    trivia: [
      {
        id: "triv-1",
        question: "In what year did Samuel and Mereana Clarke marry at Hokianga Harbour?",
        options: ["1892", "1898", "1904", "1912"],
        answerIndex: 1,
        fact: "Samuel and Mereana married on 24 November 1898 at Rawene, establishing our Northland roots.",
        points: 50
      },
      {
        id: "triv-2",
        question: "Which Clarke brother served as a master waka pilot during the 1954 Royal Visit to Waitangi?",
        options: ["Te Ariki Clarke", "Hemi Clarke", "Wiremu Kingi Clarke", "Kahu Clarke"],
        answerIndex: 2,
        fact: "Wiremu Kingi Clarke steered the 80-foot ceremonial waka across the inlet in front of 30,000 spectators.",
        points: 50
      },
      {
        id: "triv-3",
        question: "How many total registered branches make up the Clarke Whānau lineage today?",
        options: ["3 Branches", "4 Branches", "5 Branches", "7 Branches"],
        answerIndex: 2,
        fact: "The five branches descend from the five surviving adult children of Samuel & Mereana.",
        points: 50
      },
      {
        id: "triv-4",
        question: "What famous fruit was primarily grown in the Clarke Homestead orchard in the 1930s?",
        options: ["Avocados", "Meyer Lemons & Oranges", "Feijoas", "Boysenberries"],
        answerIndex: 1,
        fact: "The Clarke citrus orchard supplied fresh oranges and lemons by steamship to Auckland markets.",
        points: 50
      }
    ],
    branchScores: {
      "Te Ariki Branch": 190,
      "Hemi & Mere Branch": 165,
      "Wiremu Clarke Line": 210,
      "Aroha & Rawiri Branch": 140,
      "Kahu Southern Line": 180
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
