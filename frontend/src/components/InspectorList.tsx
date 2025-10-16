import React, { useEffect, useState } from 'react';

// NOTE: This component expects an API endpoint /api/inspectors that returns inspectors
export default function InspectorList({ onSelect }: { onSelect: (upn: string) => void }) {
  const [inspectors, setInspectors] = useState<Array<{id:number, display_name:string, microsoft_upn:string}>>([]);

  useEffect(() => {
    // Placeholder: replace with real API call
    setInspectors([
      { id: 1, display_name: 'Inspector One', microsoft_upn: 'nagesh@gangachava.in' },
      { id: 2, display_name: 'Inspector Two', microsoft_upn: 'inspector2@gmail.com' }
    ]);
  }, []);

  return (
    <div>
      <h3>Inspectors</h3>
      <ul>
        {inspectors.map(i => (
          <li key={i.id}>
            <button onClick={() => onSelect(i.microsoft_upn)} style={{ cursor: 'pointer' }}>
              {i.display_name} — {i.microsoft_upn}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
