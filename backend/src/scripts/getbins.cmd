curl https://raw.githubusercontent.com/prysmaticlabs/prysm/master/prysm.bat --output ./src/bins/prysm.bat
reg add HKCU\Console /v VirtualTerminalLevel /t REG_DWORD /d 1
curl https://gethstore.blob.core.windows.net/builds/geth-windows-amd64-1.14.0-87246f3c.exe --output ./src/bins/geth.exe
