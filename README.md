# Fantasy Sports Race

A fun, interactive Fantasy Sports Race application where users can simulate races with customizable players across different sports. 
The races are intended to determine fantasy draft orders randomly.
This app lets users choose race settings, customize player details, and view race standings in real-time, creating an engaging sports simulation experience.

## Features

- **Customizable Players**: Add players with unique names, avatars, and background colors.
- **Race Type Selection**: Choose between "Balanced," "Hectic," or "Close" race dynamics.
- **Battle Royale Mode**: Toggle elimination-based gameplay for an intense, last-man-standing race.
- **Sport Selection**: Select from Basketball, Football, Hockey, or Baseball themes, each with custom backgrounds and audio.
- **Save & Load Settings**: Save your custom race settings and load them for future races.
- **Interactive Music**: Choose your preferred background music or load custom audio files.

## Project Structure

- `index.html`: The main HTML file that sets up the UI structure and includes controls for customizing the race.
- `styles.css`: Contains all the styling for the layout, players, and control elements.
- `script.js`: Main JavaScript file, managing the race logic, user interactions, and audio playback.
- `raceTools.js`: Utility functions for generating random player names and colors based on the selected sport.

## Getting Started

### Prerequisites

- Modern web browser with JavaScript enabled
- (Optional) Node.js and `http-server` if you prefer to run a local server.

### Setup

1. Clone or download this repository.
2. Open `index.html` in your web browser to start the application.
3. If you encounter cross-origin (CORS) issues, consider running a local server:
   - With Node.js:
     ```bash
     npx http-server .
     ```
   - Open `http://localhost:8080` in your browser.

### Usage

1. **Choose Race Settings**:
   - Select a **Race Type** (Balanced, Hectic, or Close) from the dropdown.
   - Toggle **Battle Royale Mode** for elimination-based gameplay.
   - Choose a **Sport** (Basketball, Football, Hockey, Baseball) to set the background and theme.

2. **Set Player and Race Details**:
   - Choose an **Approximate Race Time** (in seconds) for how long you want the race to last.
   - Set the **Number of Players** and click **Player List** to see and customize the player details.

3. **Customize Players**:
   - Add a name, upload an avatar image, and pick a background color for each player.

4. **Control the Race**:
   - Click **Start Race** to initiate the race.
   - **Show Standings** displays player placements after the race finishes.
   - Use **Load Music** to upload custom audio files.

5. **Save & Load Settings**:
   - Save your customized race settings with **Save Settings**.
   - Load previously saved settings with **Load Settings** for a quick setup.

## Dependencies

- **raceTools.js**: Used for random name and color generation for players.
- **Audio and Video Files**: The application supports custom audio files in `.mp4` or compatible audio formats.

## Author

- **Evan Lowe**

---

Enjoy racing!
