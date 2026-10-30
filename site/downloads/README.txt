Place installers here before upload to public_html/downloads/

DoorCut 3.0 (current build name):
  DoorCut-Setup-3.0.exe
  Link on site:  doorcut.html  →  downloads/DoorCut-Setup-3.0.exe
  Build from:    DoorCut repo  →  build-doorcut-installer.bat
  Output:        DoorCut\artifacts\installer\DoorCut-Setup-3.0.exe

Sheet Logic 1.0.0:
  SheetLogic-Setup-1.0.0.exe
  Link on site:  sheet-logic.html  →  downloads/SheetLogic-Setup-1.0.0.exe
  Build from:    SheetLogic repo →  build-sheetlogic-installer.bat
  Output:        SheetLogic\Publish\installer\SheetLogic-Setup-1.0.0.exe

Link test (small file, safe to keep in git):
  doorcut-link-test.txt  — open in browser to verify downloads/ works before uploading the big .exe

Offcut Logic 1.0.0:
  OffcutLogic-Setup-1.0.0.exe
  Link on site:  offcut-logic.html  →  downloads/OffcutLogic-Setup-1.0.0.exe
  Build from:    Offcut Logic repo  →  build-offcut-logic-installer.bat
  Output:        Offcut Logic\Publish\installer\OffcutLogic-Setup-1.0.0.exe

Sheet Logic Builder 1.0.0:
  SheetLogicBuilder-Setup-1.0.0.exe
  Link on site:  sheet-logic-builder.html

TimberTally (live on server, not in git):
  https://www.woodsolutions.com/downloads/TimberTallySetup-1.0.0.zip

Installer .exe files are gitignored (too large). Upload them with your site zip or FTP.
Do not put SHA-256 on product pages — keep hashes in your own build-info notes if needed.

Do NOT upload api/license/config.php from git — edit config.php only on the server (Creem API key).
