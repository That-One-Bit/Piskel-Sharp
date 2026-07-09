xcopy /s /y /h c:\Users\Public\Documents\pskls-backup c:\Users\Public\Documents\Piskel-Sharp
start /wait powershell /c "npm install"
start /wait powershell /c "npm start"

set /p web=Do you want to open the index file for testing? "y" or "n" will work: 

:y
set "HTML_FILE=C:/Users/Public/Documents/Piskel-Sharp/dest/prod/index.html"
start "" "msedge" "%HTML_FILE%"

:n
pause