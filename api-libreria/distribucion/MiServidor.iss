; ==============================
; SETUP
; ==============================
[Setup]
AppName=ServidorLibreria
AppVersion=3.0.2
DefaultDirName={commonappdata}\ServidorLibreria
DefaultGroupName=ServidorLibreria
OutputDir=output
OutputBaseFilename=Instalador_ServidorLibreria
Compression=lzma
SolidCompression=yes
PrivilegesRequired=admin
ArchitecturesInstallIn64BitMode=x64

; ==============================
; FILES
; ==============================
[Files]
Source: "nssm.exe"; DestDir: "{app}"
Source: "instaladores\node.msi"; DestDir: "{tmp}\instaladores"
Source: "instaladores\cloudflared.exe"; DestDir: "{tmp}\instaladores"
Source: "..\package.json"; DestDir: "{app}"
Source: "uploads\*"; DestDir: "{app}\uploads"; Flags: recursesubdirs createallsubdirs
Source: "backend\*"; DestDir: "{app}"; Flags: recursesubdirs; AfterInstall: CrearEnv

; ==============================
; DIRECTORIOS
; ==============================
[Dirs]
Name: "{app}\logs"

; ==============================
; INSTALAR NODE SILENCIOSO
; ==============================
[Run]
;Instalar Node JS
Filename: "msiexec.exe"; Parameters: "/i ""{tmp}\instaladores\node.msi"" /qn"; StatusMsg: "Instalando Node.js..."; Flags: waituntilterminated

;Instalar dependencias
Filename: "cmd.exe"; Parameters: "/C ""{pf}\nodejs\npm.cmd"" install --omit=dev"; WorkingDir: "{app}"; StatusMsg: "Instalando dependencias..."; Flags: waituntilterminated

;Instalar cloudflared
Filename: "{tmp}\instaladores\cloudflared.exe"; \
Parameters: "service install eyJhIjoiN2RjOGMzN2YzN2UyMDQ3MjE4ZGIxYWJmNmNhMDA1N2UiLCJ0IjoiYWZiZmMzZjItMmQ2ZC00ZDIwLWJlMzEtYWE4YzA5NjNlNzcxIiwicyI6Ik1XWmpOREZqT0RNdFpETm1NQzAwT1dJNExUZzFOV1l0TkRNek5qWm1ZVE0zTVdNMSJ9"; \
StatusMsg: "Instalando cloudflared..."; \
Flags: waituntilterminated

;Instalar servicio con NSSM
Filename: "{app}\nssm.exe"; \
Parameters: "install MiServidorBackup ""C:\Program Files\nodejs\node.exe"" ""{app}\dist\server.js"""; \
Flags: runhidden waituntilterminated

;Directorio de trabajo
Filename: "{app}\nssm.exe"; \
Parameters: "set MiServidorBackup AppDirectory ""{app}"""; \
Flags: runhidden waituntilterminated

;Logs
Filename: "{app}\nssm.exe"; \
Parameters: "set MiServidorBackup AppStdout ""{app}\logs\output.log"""; \
Flags: runhidden waituntilterminated

Filename: "{app}\nssm.exe"; \
Parameters: "set MiServidorBackup AppStderr ""{app}\logs\error.log"""; \
Flags: runhidden waituntilterminated

; Inicio automatico
Filename: "{app}\nssm.exe"; Parameters: "set MiServidorBackup Start SERVICE_AUTO_START"; Flags: runhidden waituntilterminated

; Iniciar servicio
Filename: "{app}\nssm.exe"; Parameters: "start MiServidorBackup"; Flags: runhidden waituntilterminated

; ==============================
; DESINSTALAR
; ==============================
[UninstallRun]
Filename: "{app}\nssm.exe"; Parameters: "stop MiServidorBackup"; Flags: runhidden waituntilterminated
Filename: "{app}\nssm.exe"; Parameters: "remove MiServidorBackup confirm"; Flags: runhidden waituntilterminated

[Code]
var
  DBPage: TInputQueryWizardPage;
  ConfigPage: TInputQueryWizardPage;

procedure InitializeWizard;
begin
  DBPage := CreateInputQueryPage(wpWelcome, 'Configuración de Base de Datos', 'Ingrese el nombre de la base de datos', 'Este valor se guardará en el archivo .env del sistema.');
  DBPage.Add('DB_NAME:', False);
  DBPage.Add('SERVIDOR_HOST:', False);
  DBPage.Add('BASE_URL:', False);

  ConfigPage := CreateInputQueryPage(wpWelcome, 'Configuración de Base de Datos', 'Ingrese los datos de conexion', 'Estos valor se guardará en el archivo .env del sistema.');
  ConfigPage.Add('DB_USER:', False);
  ConfigPage.Add('DB_PASSWORD:', False);
  ConfigPage.Add('DB_HOST:', False);
  ConfigPage.Add('DB_PORT:', False);

  // Valor Por defecto
  ConfigPage.Values[0] := 'sa';
  ConfigPage.Values[1] := '1234';
  ConfigPage.Values[2] := 'localhost';
  ConfigPage.Values[3] := '3000';
end;

procedure CrearEnv;
var
  EnvFile: string;
  EnvContent: string;
begin
  EnvFile := ExpandConstant('{app}\.env');
  EnvContent := 'DB_NAME=' + DBPage.Values[0] + #13#10 +
                'SERVIDOR_HOST=' + DBPage.Values[1] + #13#10 +
                'BASE_URL=' + DBPage.Values[2] + #13#10 +
                'DB_USER=' + ConfigPage.Values[0] + #13#10 +
                'DB_PASSWORD=' + ConfigPage.Values[1] + #13#10 +
                'DB_HOST=' + ConfigPage.Values[2] + #13#10 +
                'DB_PORT=' + ConfigPage.Values[3] + #13#10;
  SaveStringToFile(EnvFile, EnvContent, False);
end;