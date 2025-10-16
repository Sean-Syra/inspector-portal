const express = require("express");
const router = express.Router();
const graphClient = require("../graphClient");

router.get("/getavailability/:upn", async (req, res) => {
  try {
    const inspectorUPN = req.params.upn;

    const start = new Date();
    const end = new Date();
    end.setDate(start.getDate() + 7); // next 7 days

    const response = await graphClient
      .api(`/users/${inspectorUPN}/calendar/getschedule`)
      .post({
        schedules: [inspectorUPN],
        startTime: { dateTime: start.toISOString(), timeZone: "UTC" },
        endTime: { dateTime: end.toISOString(), timeZone: "UTC" },
        availabilityViewInterval: 30
      });

    res.json(response.value[0]);
  } catch (err) {
    console.error("Graph getSchedule error:", err);
    res.status(500).json({ error: "Failed to fetch schedule", details: err.message });
  }
});

module.exports = router;
