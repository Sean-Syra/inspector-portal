const pool = require('../../src/db') || require('../db');
const { getAuthenticatedClient } = require('../graphClient');

// POST /api/availability
// body: { inspectorUpns: [...], startDateTime, endDateTime }
async function getAvailability(req, res) {
  try {
    const { inspectorUpns, startDateTime, endDateTime } = req.body;
    if (!inspectorUpns || inspectorUpns.length === 0) {
      return res.status(400).json({ error: 'inspectorUpns required' });
    }
    const client = getAuthenticatedClient();

    const body = {
      schedules: inspectorUpns,
      startTime: { dateTime: startDateTime, timeZone: 'UTC' },
      endTime: { dateTime: endDateTime, timeZone: 'UTC' },
      availabilityViewInterval: 30
    };

    const response = await client.api('/users/getSchedule').post(body);
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

// POST /api/schedule
// body: { inspectorUpn, providerEmail, startDateTime, endDateTime, subject, includeTeams, scheduledById, providerId, inspectorId }
async function scheduleMeeting(req, res) {
  try {
    const { inspectorUpn, providerEmail, startDateTime, endDateTime, subject, includeTeams, scheduledById, providerId, inspectorId } = req.body;
    if (!inspectorUpn || !providerEmail || !startDateTime || !endDateTime) {
      return res.status(400).json({ error: 'inspectorUpn, providerEmail, startDateTime, endDateTime required' });
    }
    console.log("inspectorUpn->",inspectorUpn);

    const client = getAuthenticatedClient();

    const event = {
      subject: subject || 'Site inspection – interview',
      start: { dateTime: startDateTime, timeZone: 'UTC' },
      end: { dateTime: endDateTime, timeZone: 'UTC' },
      attendees: [
        { emailAddress: { address: inspectorUpn, name: inspectorUpn }, type: 'required' },
        { emailAddress: { address: providerEmail, name: providerEmail }, type: 'required' }
      ]
    };

    if (includeTeams) {
      event.isOnlineMeeting = true;
      event.onlineMeetingProvider = 'teamsForBusiness';
    }

    const created = await client.api(`/users/${encodeURIComponent(inspectorUpn)}/events`).post(event);

    // Save to MySQL (best-effort; if DB not configured, still return created)
    try {
      const poolLocal = require('../db');
      await poolLocal.query(
        `INSERT INTO appointments (inspector_id, provider_id, scheduled_by, start_time, end_time, subject, location, teams_join_url, graph_event_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [inspectorId || null, providerId || null, scheduledById || null, startDateTime, endDateTime, created.subject, created.location || null, (created.onlineMeeting && created.onlineMeeting.joinUrl) || null, created.id]
      );
    } catch (dbErr) {
      console.warn('Could not save appointment to DB:', dbErr.message);
    }

    res.json({ createdEvent: created });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message, details: err });
  }
}

module.exports = { getAvailability, scheduleMeeting };
