// timeUtils.js

// Function to format time in seconds into "hours:minutes:seconds" format
export function formatTime(seconds) {
  // Calculate hours, minutes, and remaining seconds
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let remainingSeconds = seconds % 60;

  // Initialize an empty string for the formatted time
  let formattedTime = '';

  // If there are hours, append them to the formatted time
  if (hours > 0) {
    formattedTime += hours + 'h ';
  }

  // If there are minutes or hours, append minutes and a colon to the formatted time
  if (minutes > 0 || hours > 0) {
    formattedTime += minutes + ':';
  }

  // Append remaining seconds to the formatted time, adding a leading zero if needed
  formattedTime += remainingSeconds + (remainingSeconds < 10 ? '0' : '');

  // Trim any extra whitespaces and return the formatted time
  return formattedTime.trim();
}

// Function to recursively convert durations in an object to formatted time
export function convertDurations(obj) {
  // Base case: if the object is not an object or is null, return it as is
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  // If the object is an array, apply the function to each element
  if (Array.isArray(obj)) {
    return obj.map(convertDurations);
  }

  // Iterate over the keys of the object
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // If the key is "duration" and the value is a number, convert it using formatTime
      if (key === 'duration' && typeof obj[key] === 'number') {
        obj[key] = formatTime(obj[key]);
      } else if (typeof obj[key] === 'object') {
        // If the value is an object, recursively apply the function to it
        obj[key] = convertDurations(obj[key]);
      }
    }
  }

  // Return the modified object
  return obj;
}
