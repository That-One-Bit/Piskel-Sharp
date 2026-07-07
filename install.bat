xcopy /s /y /h c:\Users\Public\Documents\pskls-backup c:\Users\Public\Documents\Piskel-Sharp
start /wait powershell /c "npm install"
start /wait powershell /c "npm start"

set "HTML_FILE=C:/Users/Public/Documents/Piskel-Sharp/dest/prod/index.html"
start "" "msedge" "%HTML_FILE%"