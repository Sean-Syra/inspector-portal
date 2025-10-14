import React, { useState } from 'react';
import InspectorList from './components/InspectorList';
import AvailabilityView from './components/AvailabilityView';
import SchedulerForm from './components/SchedulerForm';

function App() {
  const [selectedInspector, setSelectedInspector] = useState<string | null>(null);
  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h2>Inspector Scheduling Portal (Admin)</h2>
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <InspectorList onSelect={(upn) => setSelectedInspector(upn)} />
        </div>
        <div style={{ flex: 2 }}>
          <AvailabilityView inspectorUpn={selectedInspector} />
          <SchedulerForm inspectorUpn={selectedInspector} />
        </div>
      </div>
    </div>
  );
}

export default App;
