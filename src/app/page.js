'use client';

import { useState } from 'react';
import { getNotifications } from './actions';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function Home() {
  // Separate state for input and notifications output
  const [userInput, setUserInput] = useState(''); // Input text state
  const [notifications, setNotifications] = useState(''); // Notifications output state

  return (
    <div>
      <input
        className="responsebox"
        id="text"
        type="text"
        value={userInput} // Bind input state
        onChange={event => setUserInput(event.target.value)} // Update input state
      />

      <button
        onClick={async () => {
          // Get notifications based on user input
          const { notifications } = await getNotifications(userInput);

          // Set notifications to display in a separate state
          setNotifications(JSON.stringify(notifications, null, 2));
        }}
      >
        View Notifications
      </button>

      {/* Render notifications in a <pre> tag for formatted output */}
      <pre>{notifications}</pre>
    </div>
  );
}
