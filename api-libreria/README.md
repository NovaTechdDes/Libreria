# Iniciar distribucion

1. Ejectuar `pnpm build`
2. Copiar la carpeta dist a la carpeta distribucion /backend
3. Luego de instalar poner habilitar puerto en el firewall `New-NetFirewallRule -DisplayName "MiServidorBackup 3000" -Direction Inbound -Protocol TCP -LocalPort 3000 -Action Allow`
