import React, { useState } from 'react';
import api from '../api';

export default function SchedulerForm({ inspectorUpn } : { inspectorUpn: string | null }) {
  const [providerEmail, setProviderEmail] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [subject, setSubject] = useState('');
  const [includeTeams, setIncludeTeams] = useState(true);
  const [result, setResult] = useState<any>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!inspectorUpn) return alert('Select inspector');
    try {
      const res = await api.post('/schedule', {
        inspectorUpn,
        providerEmail,
        startDateTime: start,
        endDateTime: end,
        subject,
        includeTeams
      });
      setResult(res.data);
    } catch (err:any) {
      alert('Error: ' + (err.response?.data?.error || err.message));
    }
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Schedule Meeting</h3>
      <form onSubmit={submit}>
        <div>
          <label>Provider email</label><br/>
          <input value={providerEmail} onChange={e=>setProviderEmail(e.target.value)} placeholder="provider@contoso.com" />
        </div>
        <div>
          <label>Start (ISO, UTC)</label><br/>
          <input value={start} onChange={e=>setStart(e.target.value)} placeholder="2025-10-14T10:00:00" />
        </div>
        <div>
          <label>End (ISO, UTC)</label><br/>
          <input value={end} onChange={e=>setEnd(e.target.value)} placeholder="2025-10-14T10:30:00" />
        </div>
        <div>
          <label>Subject</label><br/>
          <input value={subject} onChange={e=>setSubject(e.target.value)} />
        </div>
        <div>
          <label><input type="checkbox" checked={includeTeams} onChange={e=>setIncludeTeams(e.target.checked)} /> Include Teams meeting</label>
        </div>
        <div style={{ marginTop: 8 }}>
          <button type="submit">Schedule</button>
        </div>
      </form>
      {result && <pre style={{ background:'#f4f4f4', padding:10 }}>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
