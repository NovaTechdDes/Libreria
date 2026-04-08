; ==============================
; SETUP
; ==============================

[Setup]
AppName=MiServidorBackup
AppVersion=1.0.0
DefaultDirName={commonappdata}\MiServidorBackup
DefaultGroupName=MiServidorBackup
OutputDir=output
OutputBaseFilename=Instalador_MiServidorBackup
Compression=lzma
SolidCompression=yes
PrivilegesRequired=admin
ArchitecturesInstallIn64BitMode=x64

; ==============================
; FILES
; ==============================

[Files]
Source: "backend/*"; DestDir: "{app}"; Flags: recursesubdirs
Source: "nssm.exe"; DestDir: "{app}"
Source: "node-v24.14.1-x64.msi"; DestDir: "{tmp}"
Source: "backend/*"; DestDir: "{app}"; Flags: recursesubdirs; AfterInstall: CrearEnv

; ==============================
; DIRECTORIOS
; ==============================

[Dirs]
Name: "{app}\logs"

; ==============================
; INSTALAR NODE SILENCIOSO
; ==============================

[Run]


Filename: "cmd.exe"; \
Parameters: "/C ""{pf}\nodejs\npm.cmd"" install --omit=dev"; \
WorkingDir: "{app}"; \
StatusMsg: "Instalando dependencias..."; \
Flags: waituntilterminated


; Instalar servicio con NSSM
Filename: "{app}\nssm.exe"; \
Parameters: "install MiServidorBackup ""C:\Program Files\nodejs\node.exe"" ""{app}\dist\server.js"""; \
Flags: runhidden waituntilterminated

; Directorio de trabajo
Filename: "{app}\nssm.exe"; \
Parameters: "set MiServidorBackup AppDirectory ""{app}"""; \
Flags: runhidden waituntilterminated

; Logs
Filename: "{app}\nssm.exe"; \
Parameters: "set MiServidorBackup AppStdout ""{app}\logs\output.log"""; \
Flags: runhidden waituntilterminated

Filename: "{app}\nssm.exe"; \
Parameters: "set MiServidorBackup AppStderr ""{app}\logs\error.log"""; \
Flags: runhidden waituntilterminated

; Inicio automático
Filename: "{app}\nssm.exe"; \
Parameters: "set MiServidorBackup Start SERVICE_AUTO_START"; \
Flags: runhidden waituntilterminated

; Iniciar servicio
Filename: "{app}\nssm.exe"; \
Parameters: "start MiServidorBackup"; \
Flags: runhidden waituntilterminated

; ==============================
; DESINSTALAR
; ==============================

[UninstallRun]

Filename: "{app}\nssm.exe"; \
Parameters: "stop MiServidorBackup"; \
Flags: runhidden waituntilterminated

Filename: "{app}\nssm.exe"; \
Parameters: "remove MiServidorBackup confirm"; \
Flags: runhidden waituntilterminated


[Code]

Var DBPage: TInputQueryWizardPage;

var USERPage: TInputQueryWizardPage;
var PASSWORDPage: TInputQueryWizardPage;
var HOSTPage: TInputQueryWizardPage;
var PORTPage: TInputQueryWizardPage;

procedure InitializeWizard;
begin
DBPage := CreateInputQueryPage(
    wpWelcome,
    'Configuración de Base de Datos',
    'Ingrese el nombre de la base de datos',
    'Este valor se guardará en el archivo .env del sistema.'
  );

  DBPage.Add('DB_NAME:', False);

   USERPage := CreateInputQueryPage(
    wpWelcome,
    'Configuración de Base de Datos',
    'Ingrese el usuario de la base de datos',
    'Este valor se guardará en el archivo .env del sistema.'
  );

  USERPage.Add('DB_USER:', False);

  PASSWORDPage := CreateInputQueryPage(
    wpWelcome,
    'Configuración de Base de Datos',
    'Ingrese la contraseña de la base de datos',
    'Este valor se guardará en el archivo .env del sistema.'
  );

  PASSWORDPage.Add('DB_PASSWORD:', False);

  HOSTPage := CreateInputQueryPage(
    wpWelcome,
    'Configuración de Base de Datos',
    'Ingrese el host de la base de datos',
    'Este valor se guardará en el archivo .env del sistema.'
  );

  HOSTPage.Add('DB_HOST:', False);

  PORTPage := CreateInputQueryPage(
    wpWelcome,
    'Configuración de Base de Datos',
    'Ingrese el puerto de la base de datos',
    'Este valor se guardará en el archivo .env del sistema.'
  );

  PORTPage.Add('DB_PORT:', False);

  //Valor Por defecto
  USERPage.Values[0] := 'sa';
  PASSWORDPage.Values[0] := '1234';
  HOSTPage.Values[0] := 'localhost';
  PORTPage.Values[0] := '3000'; 
end;

procedure CrearEnv;
var
  EnvFile: string;
  EnvContent: string;
begin
  EnvFile := ExpandConstant('{app}\.env');

  EnvContent :=
    'DB_NAME=' + DBPage.Values[0] + #13#10 +
    'DB_USER=' + USERPage.Values[0] + #13#10 +
    'DB_PASSWORD=' + PASSWORDPage.Values[0] + #13#10 +
    'DB_HOST=' + HOSTPage.Values[0] + #13#10 +
    'DB_PORT=' + PORTPage.Values[0] + #13#10;

  SaveStringToFile(EnvFile, EnvContent, False);
end;