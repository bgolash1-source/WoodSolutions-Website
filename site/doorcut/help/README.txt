DoorCut help topics for the website.

Source of truth: DoorCut repo  Help/  folder (same files shipped beside DoorCut Cutlist.exe).

When you edit in-app help, copy updated .html and help.css here:

  DoorCut/Help/*.html  →  site/doorcut/help/
  DoorCut/Help/help.css → site/doorcut/help/help.css

Do not rename topic .html files — names must match what the app expects if you ever share paths.

web-help.css and index.html are website-only (nav bar + topic index). Re-run does not overwrite those.

After sync, spot-check site/doorcut/help/index.html links still match filenames.

If you replace topic .html files from DoorCut/Help/, re-add the Extreme Tracking script before </body> (see any main site page for the eX-barrygol-2 snippet) or run the insert from docs/deploy.md.
