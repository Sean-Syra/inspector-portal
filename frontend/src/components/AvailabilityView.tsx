import React, { useEffect, useState } from 'react';
import api from '../api';
import format from 'date-fns/format';

export default function AvailabilityView({ inspectorUpn } : { inspectorUpn: string | null }) {
  const [availability, setAvailability] = useState<any>(null);

  useEffect(() => {
    if (!inspectorUpn) return;
    const now = new Date();
    const start = new Date(now.getTime());
    const end = new Date(now.getTime() + 1000 * 60 * 60 * 24); // +24h

    api.post('/availability', {
      inspectorUpns: [inspectorUpn],
      startDateTime: start.toISOString().replace('.000',''),
      endDateTime: end.toISOString().replace('.000','')
    }).then(res => setAvailability(res.data))
    .catch(err => console.error(err));
  }, [inspectorUpn]);

  if (!inspectorUpn) return <div>Select an inspector to view availability</div>;
  if (!availability) return <div>Loading availability...</div>;

  return (
    <div>
      <h3>Availability for {inspectorUpn}</h3>
      <pre style={{ background:'#f4f4f4', padding: 10, maxHeight: 300, overflow: 'auto' }}>
        {JSON.stringify(availability, null, 2)}
      </pre>
      <div>
        <strong>Note:</strong> The API returns an availability view string that encodes busy/free intervals. Use this to compute free slots in the UI.
      </div>
    </div>
  );
}
