/**
 * Clarke Family Reunion 2026 — Core Application Engine & Shared State
 * Global Namespace: window.ClarkeApp
 */

(function (window) {
  'use strict';

  var STORAGE_KEY = 'clarke26_clean_v1';
  var CHANNEL_NAME = 'clarke26_channel';
  var CMD_KEY = 'clarke26_cmd';

  // Purge legacy mock-data storage keys on load
  try {
    ['clarke26_state', 'clarke26_v2_state', 'clarke26_v3_state', 'clarke26_v4_state'].forEach(function (k) {
      localStorage.removeItem(k);
    });
  } catch (e) {}

  var DEFAULT_STATE = {
    eventInfo: {
      title: "Clarke Family Reunion",
      titleMi: "Te Huihuinga Whānau o Clarke",
      crestTitle: "Clarkes of Chipley, Somersetshire",
      motto: "Ye shall drink of the brook by the way",
      subtitle: "Join us for an evening of good company, great conversation, and plenty of laughter.",
      subtitleMi: "Join us for an evening of good company, great conversation, and plenty of laughter.",
      dateISO: "2026-10-17T19:30:00+13:00",
      dateDisplay: "Oct 17 2026 • From 7:30pm",
      location: "Papanui Club, 310 Sawyers Arms Road, Bishopdale, Christchurch 8053",
      registrationFeeNote: "To help cover event costs, there will be a registration fee for all attendees.",
      rsvpDeadline: "31 July 2026",
      rsvpEmail: "ashleycroons@yahoo.com",
      rsvpPhone: "027 584 4663",
      wifiSsid: "",
      wifiPass: "",
      sharedAlbumUrl: "https://photos.app.goo.gl/6fGko2NUqKfQp7866",
      sharedAlbumTitle: "2026 -CLARKE FAMILY REUNION",
      qrCodeImage: "clarke_qr.png",
      emergencyNotice: ""
    },
    settings: {
      useTeReo: false,
      slideDurationSec: 10,
      isPaused: false,
      isLocked: false
    },
    schedule: [
      {
        dayNumber: 1,
        dayName: "Clarke Family Reunion Evening",
        dayNameMi: "Te Pō Huihuinga Whānau o Clarke",
        dateString: "Saturday, 17 October 2026",
        items: [
          {
            time: "19:30",
            title: "Clarke Family Reunion — Evening of Good Company, Great Conversation & Plenty of Laughter",
            location: "Papanui Club, 310 Sawyers Arms Road, Bishopdale, Christchurch 8053",
            lead: "Clarke Family Reunion"
          }
        ]
      }
    ],
    rsvps: [],
    photos: [
      {
        id: "p0",
        title: "2026 -CLARKE FAMILY REUNION Shared Album",
        year: 2026,
        branch: "Clarke Family",
        caption: "Official Google Photos Shared Album • Scan QR code to view & upload family photos.",
        url: "https://lh3.googleusercontent.com/pw/AP1GczPX_28XDjgr8KnIoeqqZgKsmFZKgnRZO7jzbES67iKOUlhJZXsvUMvXsF8uSJhxl9JWs1nD_ExTLGKgHg8gp_z4hnWSp1ilYQI2kXPylpJB7L3oPJ_l=w1200"
      },
      {
        id: "p1",
        title: "Official Clarke Family Reunion Invitation",
        year: 2026,
        branch: "Clarke Family",
        caption: "Oct 17 2026 • From 7:30pm @ Papanui Club, 310 Sawyers Arms Road, Bishopdale, Christchurch 8053.",
        url: "clarke_invitation.jpg"
      },
      {
        id: "p2",
        title: "Clarkes of Chipley, Somersetshire Crest",
        year: 2026,
        branch: "Clarkes of Chipley",
        caption: "Motto: 'Ye shall drink of the brook by the way'.",
        url: "clarke_crest.jpg"
      }
    ],
    familyTree: {
      founders: "Clarkes of Chipley, Somersetshire",
      branches: []
    },
    memoriam: [],
    announcements: [
      {
        id: "ann-1",
        title: "Please RSVP by 31 July",
        body: "Please RSVP by 31 July to ashleycroons@yahoo.com or 027 584 4663.",
        priority: "high",
        time: "RSVP by 31 July",
        author: "Ashley Croons",
        pinned: true
      },
      {
        id: "ann-2",
        title: "Registration Fee",
        body: "To help cover event costs, there will be a registration fee for all attendees.",
        priority: "normal",
        time: "Event Notice",
        author: "Clarke Family Reunion",
        pinned: true
      }
    ],
    potluck: [],
    trivia: [],
    branchScores: {}
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
    exportRSVPsCSV: exportRSVPsCSV
  };

})(window);
