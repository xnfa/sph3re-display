@cd /d "%~dp0"

@goto %PROCESSOR_ARCHITECTURE%
@exit

:AMD64
@cmd /c deviceinstaller64.exe enableidd 1
@goto end

:x86
@cmd /c deviceinstaller.exe enableidd 1

:end
